from fastapi import APIRouter
from models.schemas import SummaryResponse
from services.db import get_stats

router = APIRouter()

@router.get("/summary", response_model=SummaryResponse)
def get_summary():
    data = get_stats()
    
    return {
        "stats": {
            "day_streak": data["day_streak"],
            "hours_learned": int(data["hours_learned"]),
            "minutes_learned": int((data["hours_learned"] % 1) * 60),
            "missions_completed": data["missions_completed"]
        },
        "chart_data": data["chart_data"]
    }