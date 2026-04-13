from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid

from .. import schemas, crud, models, database, auth, security

router = APIRouter(prefix="/messages", tags=["messages"])

@router.post("/{channel_id}", response_model=schemas.MessageResponse)
def send_message(channel_id: uuid.UUID, message_in: schemas.MessageCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    channel = crud.get_channel(db, channel_id)
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
        
    if current_user.id not in [channel.user1_id, channel.user2_id]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a participant in this channel")
        
    message = crud.create_message(db, channel, current_user, message_in)
    
    decrypted_text = security.decrypt_message(message.encrypted_text, channel.shared_secret)
    return schemas.MessageResponse(
        id=message.id,
        channel_id=message.channel_id,
        sender_id=message.sender_id,
        text=decrypted_text,
        created_at=message.created_at,
        expiry_time=message.expiry_time
    )

@router.get("/{channel_id}", response_model=list[schemas.MessageResponse])
def get_messages(channel_id: uuid.UUID, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    channel = crud.get_channel(db, channel_id)
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
        
    if current_user.id not in [channel.user1_id, channel.user2_id]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a participant in this channel")
        
    db_messages = crud.get_channel_messages(db, channel)
    
    response_messages = []
    for msg in db_messages:
        try:
            decrypted_text = security.decrypt_message(msg.encrypted_text, channel.shared_secret)
            response_messages.append(schemas.MessageResponse(
                id=msg.id,
                channel_id=msg.channel_id,
                sender_id=msg.sender_id,
                text=decrypted_text,
                created_at=msg.created_at,
                expiry_time=msg.expiry_time
            ))
        except Exception:
            pass
            
    return response_messages
