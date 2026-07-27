from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services.ocr_service import process_bill

router = APIRouter(
    prefix="/bills",
    tags=["Bills"]
)


@router.post("/extract-ocr")
async def extract_bill_ocr(file: UploadFile = File(...)):
    """Upload a bill image and extract products using OCR"""
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="File must be an image (JPEG, PNG)"
        )
    
    try:
        # Read file bytes
        contents = await file.read()
        
        # Process bill with OCR
        result = process_bill(contents)
        
        if not result["success"]:
            raise HTTPException(
                status_code=400,
                detail=result.get("error", "Failed to process bill")
            )
        
        return result
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing bill: {str(e)}"
        )


@router.post("/confirm-items")
async def confirm_bill_items(bill_items: dict):
    """Confirm and finalize bill items for adding to inventory"""
    try:
        items = bill_items.get("items", [])
        
        if not items:
            raise HTTPException(
                status_code=400,
                detail="No items to process"
            )
        
        return {
            "success": True,
            "message": f"Processing {len(items)} items for inventory",
            "items_processed": len(items)
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
