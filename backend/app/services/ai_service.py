import os
import logging
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    logging.error("GEMINI_API_KEY not set in environment or .env")
else:
    genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_ai(question: str):
    """Ask the Gemini model. Raises RuntimeError if API key missing or logs and re-raises on request errors."""
    if not API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not set. Set GEMINI_API_KEY in your environment or .env file.")

    try:
        response = model.generate_content(question)
        # response may be an object; attempt to return text if available
        return getattr(response, "text", str(response))
    except Exception:
        logging.exception("Generative AI request failed")
        raise