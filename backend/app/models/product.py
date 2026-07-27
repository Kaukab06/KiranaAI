from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.database.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    category = Column(String(100))

    price = Column(Float)

    quantity = Column(Integer)

    description = Column(String(300))

    expiry_date = Column(DateTime, nullable=True)

    low_stock_threshold = Column(Integer, default=10)

    created_at = Column(DateTime, default=datetime.utcnow)

    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
   