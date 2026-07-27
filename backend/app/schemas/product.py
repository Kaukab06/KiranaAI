from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int
    description: str
    expiry_date: Optional[datetime] = None
    low_stock_threshold: Optional[int] = 10


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    description: Optional[str] = None
    expiry_date: Optional[datetime] = None
    low_stock_threshold: Optional[int] = None


class ProductResponse(ProductCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True