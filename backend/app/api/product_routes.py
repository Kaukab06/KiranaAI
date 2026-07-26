from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# POST API - Add Product
@router.post("/products", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):

    new_product = Product(
        product_name=product.product_name,
        quantity=product.quantity,
        category=product.category,
        expiry_date=product.expiry_date,
        buying_price=product.buying_price,
        selling_price=product.selling_price
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# GET API - Get All Products
@router.get("/products", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):

    return db.query(Product).all()