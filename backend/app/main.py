from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.models import product

from app.api import product_routes


# Create database tables
product.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Kirana AI API"
)


# CORS Configuration
app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)



# Include Routes

app.include_router(
    product_routes.router
)



@app.get("/")
def home():

    return {
        "message":"Kirana AI Backend Running"
    }