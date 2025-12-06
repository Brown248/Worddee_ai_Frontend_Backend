from fastapi import APIRouter, HTTPException
from models.schemas import SentenceSubmission, AIResponse
from utils.n8n_client import send_to_n8n

router = APIRouter()

@router.post("/validate-sentence", response_model=AIResponse)
def validate_sentence(submission: SentenceSubmission):
    if not submission.sentence.strip():
        raise HTTPException(status_code=400, detail="Sentence cannot be empty")

    # ส่งไปที่ n8n
    result = send_to_n8n(submission.word, submission.sentence)

    # ทำให้ครบทุก field เสมอ
    return AIResponse(
        score = result.get("score", 0.0),
        level = result.get("level", "Unknown"),
        suggestion = result.get("suggestion", submission.sentence),
        corrected_sentence = result.get("corrected_sentence", submission.sentence)
    )
