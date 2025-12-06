from fastapi import APIRouter
from models.schemas import SummaryResponse

router = APIRouter()

@router.get("/summary", response_model=SummaryResponse)
def get_summary():
    # Mock Data ตาม UI Dashboard
    return {
        "stats": {
            "day_streak": 1,
            "hours_learned": 10,
            "minutes_learned": 0,
            "missions_completed": True
        },
        "chart_data": [
            {"name": "Day 1", "score": 6.5},
            {"name": "Day 2", "score": 7.0},
            {"name": "Day 3", "score": 6.8},
            {"name": "Day 4", "score": 8.5},
            {"name": "Day 5", "score": 7.5},
            {"name": "Day 6", "score": 9.0},
            {"name": "Day 7", "score": 8.5},
        ]
    }