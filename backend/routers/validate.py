from fastapi import APIRouter, HTTPException
from models.schemas import SentenceSubmission, AIResponse
# ✅ แก้ไขบรรทัดนี้ให้ถูกต้อง:
from utils.n8n_client import send_to_n8n
from services.db import save_result

router = APIRouter()

@router.post("/validate-sentence", response_model=AIResponse)
def validate_sentence(submission: SentenceSubmission):
    if not submission.sentence.strip():
        raise HTTPException(status_code=400, detail="Sentence cannot be empty")

    # 1. ส่งให้ AI ตรวจผ่าน n8n
    result = send_to_n8n(submission.word, submission.sentence)

    # 2. บันทึกลง Database จริง
    save_result(
        word=submission.word,
        score=result.get("score", 0),
        user_sentence=submission.sentence
    )

    return AIResponse(
        score = result.get("score", 0.0),
        level = result.get("level", "Unknown"),
        suggestion = result.get("suggestion", submission.sentence),
        corrected_sentence = result.get("corrected_sentence", submission.sentence)
    )