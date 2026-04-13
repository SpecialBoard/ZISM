import uuid
import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.types import TypeDecorator, CHAR

from .database import Base

class GUID(TypeDecorator):
    """Platform-independent GUID type."""
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        if not isinstance(value, uuid.UUID):
            return "%.32x" % uuid.UUID(value).int
        else:
            return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        if not isinstance(value, uuid.UUID):
            value = uuid.UUID(value)
        return value

class User(Base):
    __tablename__ = "users"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_code = Column(String(8), unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))

class Channel(Base):
    __tablename__ = "channels"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user1_id = Column(GUID(), ForeignKey("users.id"))
    user2_id = Column(GUID(), ForeignKey("users.id"))
    shared_secret = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))

class Message(Base):
    __tablename__ = "messages"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    channel_id = Column(GUID(), ForeignKey("channels.id"), index=True)
    sender_id = Column(GUID(), ForeignKey("users.id"))
    encrypted_text = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    expiry_time = Column(DateTime)
