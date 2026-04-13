from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid

from .. import schemas, crud, models, database, auth

router = APIRouter(prefix="/channels", tags=["channels"])

@router.post("/add-friend", response_model=schemas.ChannelResponse)
def add_friend(channel_req: schemas.ChannelCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if channel_req.friend_code == current_user.user_code:
        raise HTTPException(status_code=400, detail="Cannot add yourself as a friend")
        
    friend = crud.get_user_by_code(db, channel_req.friend_code)
    if not friend:
        raise HTTPException(status_code=404, detail="Friend code not found")
        
    channel = crud.create_channel(db, current_user, friend)
    return channel

@router.get("/", response_model=list[schemas.ChannelResponse])
def get_channels(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    from sqlalchemy import or_
    channels = db.query(models.Channel).filter(
        or_(models.Channel.user1_id == current_user.id, models.Channel.user2_id == current_user.id)
    ).all()
    return channels
