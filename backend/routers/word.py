from fastapi import APIRouter
import random
from models.schemas import WordResponse

router = APIRouter()

# คลังคำศัพท์ 10 คำ พร้อมภาพสวยๆ
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
    },
    {
        "word": "Resilience",
        "level": "Intermediate",
        "meaning": "The capacity to recover quickly from difficulties; toughness.",
        "example": "She showed great resilience after the accident.",
        "image_url": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Ephemeral",
        "level": "Advanced",
        "meaning": "Lasting for a very short time.",
        "example": "Fashions are ephemeral, changing with every season.",
        "image_url": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Nostalgia",
        "level": "Intermediate",
        "meaning": "A sentimental longing for the past.",
        "example": "He was filled with nostalgia for his college days.",
        "image_url": "https://images.unsplash.com/photo-1542359570-55e5c7091217?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Eloquent",
        "level": "Intermediate",
        "meaning": "Fluent or persuasive in speaking or writing.",
        "example": "An eloquent speech that moved the audience to tears.",
        "image_url": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Labyrinth",
        "level": "Advanced",
        "meaning": "A complicated irregular network of passages or paths.",
        "example": "We got lost in the labyrinth of narrow streets.",
        "image_url": "https://images.unsplash.com/photo-1505569127510-bde1536937af?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Tranquil",
        "level": "Beginner",
        "meaning": "Free from disturbance; calm.",
        "example": "The lake was tranquil in the early morning.",
        "image_url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Ambition",
        "level": "Intermediate",
        "meaning": "A strong desire to do or to achieve something.",
        "example": "Her ambition is to become a pilot.",
        "image_url": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600"
    },
    {
        "word": "Solitude",
        "level": "Intermediate",
        "meaning": "The state or situation of being alone.",
        "example": "He enjoyed the peace and solitude of the woods.",
        "image_url": "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?auto=format&fit=crop&q=80&w=600"
    }
]

@router.get("/word", response_model=WordResponse)
def get_random_word():
    return random.choice(WORDS_DB)