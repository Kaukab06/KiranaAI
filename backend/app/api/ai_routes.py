from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import ask_ai

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class AIRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(data: AIRequest):

    answer = ask_ai(data.question)

    return {
        "answer": answer
    }