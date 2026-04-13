from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
import uuid
import random
import string
from datetime import datetime, timedelta, timezone

from . import models, schemas, security

def generate_user_code(db: Session, length: int = 8) -> str:
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
        if not db.query(models.User).filter(models.User.user_code == code).first():
            return code

def create_user(db: Session, user: schemas.UserCreate):
    code = generate_user_code(db)
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(user_code=code, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_code(db: Session, user_code: str):
    return db.query(models.User).filter(models.User.user_code == user_code).first()

def create_channel(db: Session, current_user: models.User, friend_user: models.User):
    existing_channel = db.query(models.Channel).filter(
        or_(
            and_(models.Channel.user1_id == current_user.id, models.Channel.user2_id == friend_user.id),
            and_(models.Channel.user1_id == friend_user.id, models.Channel.user2_id == current_user.id)
        )
    ).first()
    
    if existing_channel:
        return existing_channel

    shared_secret = security.generate_shared_secret()
    db_channel = models.Channel(
        user1_id=current_user.id,
        user2_id=friend_user.id,
        shared_secret=shared_secret
    )
    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    return db_channel

def get_channel(db: Session, channel_id: uuid.UUID):
    return db.query(models.Channel).filter(models.Channel.id == channel_id).first()

def create_message(db: Session, channel: models.Channel, sender: models.User, message: schemas.MessageCreate):
    encrypted_text = security.encrypt_message(message.text, channel.shared_secret)
    # The default for naive datetime is local time, we should use utc.
    expiry = datetime.now(timezone.utc) + timedelta(hours=message.ttl_hours)
    
    db_message = models.Message(
        channel_id=channel.id,
        sender_id=sender.id,
        encrypted_text=encrypted_text,
        expiry_time=expiry
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_channel_messages(db: Session, channel: models.Channel):
    return db.query(models.Message).filter(models.Message.channel_id == channel.id).all()
