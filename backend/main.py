from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import word, validate, summary
import os
from dotenv import load_dotenv

# โหลดค่า Environment Variables (ถ้ามี .env)
load_dotenv()

app = FastAPI(title="Worddee.ai API")

# ---------------------------------------
# 🔥 CORS Settings (รองรับทุก origin)
# ---------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # ยอมรับทุก domain → ไม่ block frontend
    allow_credentials=False,   # ต้องเป็น False ถ้าใช้ allow_origins=["*"]
    allow_methods=["*"],       # อนุญาตทุก HTTP method
    allow_headers=["*"],       # อนุญาตทุก header
)

# ---------------------------------------
# 🔥 Include Routers
# ---------------------------------------
app.include_router(word.router, prefix="/api", tags=["Word"])
app.include_router(validate.router, prefix="/api", tags=["Validate"])
app.include_router(summary.router, prefix="/api", tags=["Summary"])


# ---------------------------------------
# 🔥 Root Endpoint (สำหรับ test backend)
# ---------------------------------------
@app.get("/")
def read_root():
    return {
        "message": "Worddee.ai Backend is running",
        "status": "OK"
    }


# ---------------------------------------
# 🚀 Start Server
# ---------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
