
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.services.ai_service import ask_ai
from app.database.database import SessionLocal
from app.models.product import Product

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class AIRequest(BaseModel):
    question: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/chat")
def chat(data: AIRequest):

    answer = ask_ai(data.question)

    return {
        "answer": answer
    }


@router.get("/recommendations")
def get_recommendations(db: Session = Depends(get_db)):
    """Get AI-powered product recommendations based on inventory status"""
    
    try:
        # Get inventory data
        all_products = db.query(Product).all()
        
        if not all_products:
            return {
                "success": True,
                "recommendations": [],
                "message": "No products in inventory yet"
            }
        
        # Get low stock products
        low_stock = db.query(Product).filter(
            Product.quantity <= Product.low_stock_threshold
        ).all()
        
        # Get expiring products
        today = datetime.utcnow()
        expiry_threshold = today + timedelta(days=7)
        expiring = db.query(Product).filter(
            Product.expiry_date.isnot(None),
            Product.expiry_date >= today,
            Product.expiry_date <= expiry_threshold
        ).all()
        
        # Get expired products
        expired = db.query(Product).filter(
            Product.expiry_date.isnot(None),
            Product.expiry_date < today
        ).all()
        
        # Build AI prompt
        inventory_summary = f"""
Analyze this store inventory and provide 3-5 actionable recommendations:

Total Products: {len(all_products)}
Low Stock Items ({len(low_stock)}): {[p.name for p in low_stock]}
Expiring Soon ({len(expiring)}): {[p.name for p in expiring]}
Expired Items ({len(expired)}): {[p.name for p in expired]}

Recent Products: {[p.name for p in all_products[-5:]]}

Please provide:
1. Restocking priorities
2. Products to promote/clear
3. Inventory optimization tips

Keep response concise and actionable.
        """
        
        # Get AI recommendations
        ai_response = ask_ai(inventory_summary)
        
        return {
            "success": True,
            "recommendations": ai_response,
            "summary": {
                "total_products": len(all_products),
                "low_stock_count": len(low_stock),
                "expiring_count": len(expiring),
                "expired_count": len(expired)
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "recommendations": []
        }


@router.post("/analyze-category")
def analyze_category(category: str, db: Session = Depends(get_db)):
    """Get AI recommendations for a specific product category"""
    
    try:
        # Get products in category
        category_products = db.query(Product).filter(
            Product.category.ilike(f"%{category}%")
        ).all()
        
        if not category_products:
            return {
                "success": False,
                "error": f"No products found in category: {category}"
            }
        
        # Build AI prompt
        analysis_prompt = f"""
Analyze this product category and provide recommendations:

Category: {category}
Products ({len(category_products)}): 
{chr(10).join([f"- {p.name}: ₹{p.price} (Qty: {p.quantity})" for p in category_products])}

Provide:
1. Pricing recommendations
2. Stock level suggestions
3. Opportunities for cross-selling
4. Popular trends in this category

Keep it brief and practical.
        """
        
        ai_response = ask_ai(analysis_prompt)
        
        return {
            "success": True,
            "category": category,
            "analysis": ai_response,
            "product_count": len(category_products)
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
