from passlib.context import CryptContext
from nacl.secret import SecretBox
import nacl.utils
import base64

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def generate_shared_secret() -> str:
    """Generate a random 32-byte key for SecretBox and return as base64 string"""
    key = nacl.utils.random(SecretBox.KEY_SIZE)
    return base64.b64encode(key).decode('utf-8')

def encrypt_message(plain_text: str, shared_secret_b64: str) -> str:
    key = base64.b64decode(shared_secret_b64)
    box = SecretBox(key)
    encrypted = box.encrypt(plain_text.encode('utf-8'))
    return base64.b64encode(encrypted).decode('utf-8')

def decrypt_message(encrypted_text_b64: str, shared_secret_b64: str) -> str:
    key = base64.b64decode(shared_secret_b64)
    box = SecretBox(key)
    encrypted = base64.b64decode(encrypted_text_b64)
    decrypted = box.decrypt(encrypted)
    return decrypted.decode('utf-8')
