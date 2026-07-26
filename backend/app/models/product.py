from sqlalchemy import Column, Integer, String, Float, Date
from app.database.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    product_name = Column(String, nullable=False)

    quantity = Column(Integer, nullable=False)

    category = Column(String)

    expiry_date = Column(Date)

    buying_price = Column(Float)

    selling_price = Column(Float)