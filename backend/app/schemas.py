from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
import uuid

class UserCreate(BaseModel):
    password: str

class UserResponse(BaseModel):
    id: uuid.UUID
    user_code: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class ChannelCreate(BaseModel):
    friend_code: str

class ChannelResponse(BaseModel):
    id: uuid.UUID
    user1_id: uuid.UUID
    user2_id: uuid.UUID
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class MessageCreate(BaseModel):
    text: str
    ttl_hours: int = 24  # Default 24 hours

class MessageResponse(BaseModel):
    id: uuid.UUID
    channel_id: uuid.UUID
    sender_id: uuid.UUID
    text: str # This will be the decrypted text
    created_at: datetime
    expiry_time: datetime
    
    model_config = ConfigDict(from_attributes=True)
