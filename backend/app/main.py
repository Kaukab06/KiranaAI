from fastapi import FastAPI

from app.database.init_db import init_db
from app.api.product_routes import router

app = FastAPI(
    title="KiranaAI API",
    version="1.0.0",
    description="AI-powered Inventory Management"
)

# Create Database
init_db()

# Register Product APIs
app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Welcome to KiranaAI Backend 🚀"
    }