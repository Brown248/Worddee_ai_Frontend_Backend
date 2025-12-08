from pydantic import BaseModel
from typing import List, Optional

class WordResponse(BaseModel):
    word: str
    level: str
    meaning: str
    example: str
    image_url: Optional[str] = None

class SentenceSubmission(BaseModel):
    word: str
    sentence: str
    duration: Optional[float] = 0.0 

class AIResponse(BaseModel):
    score: float
    level: str
    suggestion: str
    corrected_sentence: str

class SummaryStats(BaseModel):
    day_streak: int
    hours_learned: int
    minutes_learned: int
    missions_completed: bool

class ChartDataPoint(BaseModel):
    name: str
    score: float

class SummaryResponse(BaseModel):
    stats: SummaryStats
    chart_data: List[ChartDataPoint]