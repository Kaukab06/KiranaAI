from typing import Optional
from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int
    description: str


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    description: Optional[str] = None


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True