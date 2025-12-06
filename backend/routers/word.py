from fastapi import APIRouter
import random
from models.schemas import WordResponse

router = APIRouter()

WORDS_DB = [
    {
        "word": "Runway",
        "level": "Beginner",
        "meaning": "A strip of hard ground along which aircraft take off and land.",
        "example": "The jet braked hard as its wheels touched the runway.",
        "image_url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Serendipity",
        "level": "Advanced",
        "meaning": "The occurrence of events by chance in a happy or beneficial way.",
        "example": "Meeting her there was pure serendipity.",
        "image_url": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=600"
    }
]

@router.get("/word", response_model=WordResponse)
def get_random_word():
    return random.choice(WORDS_DB)
