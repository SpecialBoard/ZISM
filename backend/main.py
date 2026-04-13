import threading
import time
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app import models, database
from app.routers import auth, channels, messages

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="ZISM - Zero-Identity Secure Messaging", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(channels.router)
app.include_router(messages.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to ZISM API"}

def cleanup_expired_messages():
    while True:
        try:
            db: Session = database.SessionLocal()
            now = datetime.now(timezone.utc)
            expired_msgs = db.query(models.Message).filter(models.Message.expiry_time <= now).all()
            for msg in expired_msgs:
                db.delete(msg)
            if expired_msgs:
                db.commit()
            db.close()
        except Exception as e:
            print(f"Cleanup error: {e}")
        
        time.sleep(60)

@app.on_event("startup")
def start_background_jobs():
    thread = threading.Thread(target=cleanup_expired_messages, daemon=True)
    thread.start()
