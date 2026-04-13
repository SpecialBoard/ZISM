# ZISM - Zero-Identity Secure Messaging

ZISM is a privacy-first, ephemeral messaging platform designed with a single guiding principle: **Absolute Privacy.** 

Unlike traditional messaging apps, ZISM operates on a Zero-Identity protocol. It collects no personally identifiable information (PII)—no names, no emails, no phone numbers. Users authenticate and connect via randomized alphanumeric codes, ensuring that true identities never touch our servers.

## 🚀 The Protocol

1.  **Zero-PII**: Accounts are mathematically generated alphanumeric strings. If you lose your code, your account is gone. We cannot recover what we do not know.
2.  **At-Rest Protection**: Messages are encrypted *before* they are committed to database storage. Only authenticated participants in a channel can render the content readable.
3.  **Ephemeral Auto-Wipe**: Data is a liability. Everything sent over ZISM is bound by a strict 24-hour Time-To-Live (TTL). Once the countdown hits zero, records are hard-deleted. No logs, no metadata, no backups.

---

## 🏗️ Architecture Breakdown

ZISM is built as a split-stack application: **FastAPI** for a high-performance Python backend, and **React + Vite** for a premium, cinematic frontend experience.

### Backend (`/backend`)

The backend is built with **FastAPI** and **SQLite**, optimized for speed and simplicity.

*   **`main.py`**: The entry point. It wires up the FastAPI application, CORS middleware, and configures the automated background tasks (like the 24-hour cleanup cron job).
*   **`app/security.py`**: The Cryptographic Engine. Handles password/passcode hashing using `Bcrypt` and provides server-side symmetric encryption using `PyNaCl`.
*   **`app/database.py` & `app/models.py`**: The physical schema representation. We utilize `SQLAlchemy` for ORM mapping to standard SQLite. Storage is fully ephemeral—if a row is older than 24 hours, the `main.py` cleanup task drops it.
*   **`app/routers/`**: Segmented API logic:
    *   `auth.py`: Handles `/register` and `/login`. Issues JWT tokens for session management without ever asking for an email.
    *   `channels.py`: Manages the creation and retrieval of direct communication lines between user codes.
    *   `messages.py`: Intercepts plaintext, passes it to the encryption engine, stores the cipher, and handles decryption upon authenticated request.

### Frontend (`/frontend`)

The frontend is a **React (Vite)** SPA focused on executing a "Formless AI" aesthetic. It utilizes deep darkness, glassmorphism, and cinematic transitions.

*   **`App.jsx`**: The core routing engine. It entirely bypasses heavy routers like `react-router-dom` in favor of state-based view switching. It orchestrates the `blur-in` cinematic transitions between components.
*   **`components/GlassSurface.jsx`**: A reusable rendering engine that fakes physical glass. It uses `backdrop-filter: blur()`, drop shadows, and subtle bright inner borders to simulate light refraction over the liquid background.
*   **`components/Grainient.jsx`**: The WebGL liquid background. Through raw WebGL shaders, it runs a continuously moving fluid simulation combined with a filmic grain overlay.
*   **`components/InfoPages/` (`Security.jsx`, `Documentation.jsx`, `FAQ.jsx`)**: The privacy hubs. These components use CSS Grid and Flexbox to organize our manifesto, privacy policy, and user questions into elegant, space-efficient vertical stacks with fluid accordion animations.

---

## ✨ Features Highlight

*   **Cinematic "Slow Blur" Transitions**: Navigating between pages doesn't snap; it glides through a 1.2s `cubic-bezier` blur effect.
*   **Glassmorphic Auth Card**: The login interface is a completely transparent, refractive `.glass-card` that distorts the fluid WebGL background running beneath it.
*   **Friend-Code Connect**: No contact lists syncing with your phone book. You type in a 6-character code, and the channel opens.
*   **Pure Dark Mode**: Optimized entirely for low-light legibility and premium editorial aesthetics.

---

## 💻 Setup & Local Development

To run ZISM locally, you'll need to spin up both the backend server and the frontend development server.

### 1. Backend Setup

```bash
cd backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

In a new terminal window:

```bash
cd frontend

# Install Node modules
npm install

# Start the Vite development environment
npm run dev
```
The app will be available at `http://localhost:5173`.
