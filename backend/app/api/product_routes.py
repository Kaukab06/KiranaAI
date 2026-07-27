from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, func

from app.database.database import SessionLocal
from app.models.product import Product
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Create Product
# -----------------------------
@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    db_product = Product(**product.model_dump())

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


# -----------------------------
# Get All Products (Pagination)
# -----------------------------
@router.get("/", response_model=list[ProductResponse])
def get_products(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    return db.query(Product).offset(skip).limit(limit).all()


# -----------------------------
# Search Products
# -----------------------------
@router.get("/search")
def search_products(
    keyword: str,
    db: Session = Depends(get_db)
):

    return db.query(Product).filter(

        or_(

            Product.name.ilike(f"%{keyword}%"),

            Product.category.ilike(f"%{keyword}%")

        )

    ).all()


# -----------------------------
# Filter by Category
# -----------------------------
@router.get("/category/{category}")
def category_products(
    category: str,
    db: Session = Depends(get_db)
):

    return db.query(Product).filter(

        Product.category == category

    ).all()


# -----------------------------
# Low Stock
# -----------------------------
@router.get("/low-stock")
def low_stock(
    threshold: int = 10,
    db: Session = Depends(get_db)
):

    return db.query(Product).filter(

        Product.quantity <= threshold

    ).all()


# -----------------------------
# Dashboard
# -----------------------------
@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    total_products = db.query(Product).count()

    total_items = db.query(

        func.sum(Product.quantity)

    ).scalar()

    inventory_value = db.query(

        func.sum(Product.price * Product.quantity)

    ).scalar()

    low_stock_products = db.query(Product).filter(

        Product.quantity < 10

    ).count()

    return {

        "total_products": total_products,

        "total_items": total_items,

        "inventory_value": inventory_value,

        "low_stock_products": low_stock_products

    }


# -----------------------------
# Sort Products
# -----------------------------
@router.get("/sorted")
def sort_products(
    order: str = "asc",
    db: Session = Depends(get_db)
):

    if order.lower() == "desc":

        return db.query(Product).order_by(

            Product.price.desc()

        ).all()

    return db.query(Product).order_by(

        Product.price.asc()

    ).all()


# -----------------------------
# Get Product By ID
# -----------------------------
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(

        Product.id == product_id

    ).first()

    if not product:

        raise HTTPException(

            status_code=404,

            detail="Product not found"

        )

    return product


# -----------------------------
# Update Product
# -----------------------------
@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    updated_product: ProductUpdate,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(

        Product.id == product_id

    ).first()

    if not product:

        raise HTTPException(

            status_code=404,

            detail="Product not found"

        )

    update_data = updated_product.model_dump(exclude_unset=True)

    for key, value in update_data.items():

        setattr(product, key, value)

    db.commit()

    db.refresh(product)

    return product


# -----------------------------
# Delete Product
# -----------------------------
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(

        Product.id == product_id

    ).first()

    if not product:

        raise HTTPException(

            status_code=404,

            detail="Product not found"

        )

    db.delete(product)

    db.commit()

    return {

        "message": "Product deleted successfully"

    }