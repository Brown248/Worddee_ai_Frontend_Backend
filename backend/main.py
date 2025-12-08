from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import word, validate, summary
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Worddee.ai API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       
    allow_credentials=False,  
    allow_methods=["*"],      
    allow_headers=["*"],     
)

app.include_router(word.router, prefix="/api", tags=["Word"])
app.include_router(validate.router, prefix="/api", tags=["Validate"])
app.include_router(summary.router, prefix="/api", tags=["Summary"])

@app.get("/")
def read_root():
    return {
        "message": "Worddee.ai Backend is running",
        "status": "OK"
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
