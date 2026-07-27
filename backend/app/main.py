from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from app.database.database import engine

# Models
from app.models.product import Base, Product
from app.models.user import User

# Routes
from app.api.product_routes import router as product_router
from app.api.auth_routes import router as auth_router
from app.api.user_routes import router as user_router
from app.api.bill_routes import router as bill_router


# Create all database tables
Base.metadata.create_all(bind=engine)


# FastAPI App
app = FastAPI(
    title="Kirana AI API",
    version="1.0.0",
    description="Backend API for Kirana AI Store Management System"
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API Routes
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(product_router)
app.include_router(bill_router)


# Root Endpoint
@app.get("/")
def home():
    return {
        "message": "🚀 Kirana AI Backend Running Successfully"
    }
from app.api.ai_routes import router as ai_router

app.include_router(ai_router)