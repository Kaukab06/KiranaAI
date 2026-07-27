import easyocr
import re
from typing import List, Dict
from PIL import Image
import io

reader = None

def get_reader():
    """Lazily initialize OCR reader on first use"""
    global reader
    if reader is None:
        print("Initializing OCR reader... (first time only)")
        reader = easyocr.Reader(['en'], gpu=False)
    return reader


def extract_bill_text(image_bytes: bytes) -> str:
    """Extract text from bill image using OCR"""
    try:
        # Convert bytes to image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Get reader instance
        ocr_reader = get_reader()
        
        # Perform OCR
        results = ocr_reader.readtext(image)
        
        # Extract text
        text = "\n".join([result[1] for result in results])
        return text
    except Exception as e:
        raise Exception(f"OCR processing failed: {str(e)}")


def parse_bill_items(text: str) -> List[Dict]:
    """Parse bill text to extract product items with prices and quantities"""
    items = []
    
    # Split text into lines
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Try to find price pattern (number with 2 decimals)
        price_match = re.search(r'(\d+\.?\d*)', line)
        
        if price_match:
            price = float(price_match.group(1))
            
            # Extract product name (everything before the price)
            name_part = line[:price_match.start()].strip()
            
            # Extract quantity if present (look for "x" or "qty")
            qty_match = re.search(r'x\s*(\d+)', line, re.IGNORECASE)
            quantity = int(qty_match.group(1)) if qty_match else 1
            
            if name_part and price > 0:
                items.append({
                    "name": name_part,
                    "price": price,
                    "quantity": quantity,
                    "category": "General"  # Default category
                })
    
    return items


def process_bill(image_bytes: bytes) -> Dict:
    """Process bill image and extract product information"""
    try:
        # Extract text from image
        text = extract_bill_text(image_bytes)
        
        # Parse text to get items
        items = parse_bill_items(text)
        
        return {
            "success": True,
            "extracted_text": text,
            "items": items,
            "total_items": len(items)
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "items": []
        }

