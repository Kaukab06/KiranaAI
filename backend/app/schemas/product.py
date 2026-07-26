from datetime import date
from pydantic import BaseModel


class ProductCreate(BaseModel):
    product_name: str
    quantity: int
    category: str
    expiry_date: date
    buying_price: float
    selling_price: float


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True