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
        "image_url": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Serendipity",
        "level": "Advanced",
        "meaning": "The occurrence of events by chance in a happy or beneficial way.",
        "example": "Meeting her there was pure serendipity.",
        "image_url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Resilience",
        "level": "Intermediate",
        "meaning": "The capacity to recover quickly from difficulties; toughness.",
        "example": "She showed great resilience after the accident.",
        "image_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Ephemeral",
        "level": "Advanced",
        "meaning": "Lasting for a very short time.",
        "example": "Fashions are ephemeral, changing with every season.",
        "image_url": "https://images.unsplash.com/photo-1502622796232-e88458466c33?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Nostalgia",
        "level": "Intermediate",
        "meaning": "A sentimental longing for the past.",
        "example": "He was filled with nostalgia for his college days.",
        "image_url": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Eloquent",
        "level": "Intermediate",
        "meaning": "Fluent or persuasive in speaking or writing.",
        "example": "An eloquent speech that moved the audience to tears.",
        "image_url": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Labyrinth",
        "level": "Advanced",
        "meaning": "A complicated irregular network of passages or paths.",
        "example": "We got lost in the labyrinth of narrow streets.",
        "image_url": "https://images.unsplash.com/photo-1598520106830-8c45c2035460?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Tranquil",
        "level": "Beginner",
        "meaning": "Free from disturbance; calm.",
        "example": "The lake was tranquil in the early morning.",
        "image_url": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Ambition",
        "level": "Intermediate",
        "meaning": "A strong desire to do or to achieve something.",
        "example": "Her ambition is to become a pilot.",
        "image_url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Solitude",
        "level": "Intermediate",
        "meaning": "The state or situation of being alone.",
        "example": "He enjoyed the peace and solitude of the woods.",
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"
    }
]

@router.get("/word", response_model=WordResponse)
def get_random_word():
    return random.choice(WORDS_DB)