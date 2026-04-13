from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
import jwt

from . import database, models

SECRET_KEY = "ZISM_SUPER_SECRET_KEY_PLEASE_CHANGE_IN_PROD"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 1 week expiration

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

class TokenData(BaseModel):
    user_code: Optional[str] = None

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_code: str = payload.get("sub")
        if user_code is None:
            raise credentials_exception
        token_data = TokenData(user_code=user_code)
    except jwt.InvalidTokenError:
        raise credentials_exception
    
    user = db.query(models.User).filter(models.User.user_code == token_data.user_code).first()
    if user is None:
        raise credentials_exception
    return user
