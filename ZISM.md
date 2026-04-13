# ZISM — Zero-Identity Secure Messaging Platform

> *"A privacy-first messaging backend where users connect via codes, messages are encrypted, and data automatically disappears."*

**Stack:** FastAPI · Python · SQLite → PostgreSQL  
**Author:** Sami Khan · [samikhan.in](https://samikhan.in)  
**Type:** Hobby Project · GitHub Portfolio

---

## Overview

A backend messaging system built for privacy. No emails, no phone numbers — just a random code and a password. Messages are encrypted in storage and wipe themselves after a set time. Designed to be simple, buildable, and honest about its limitations.

| Stat | Value |
|------|-------|
| PII Required | 0 |
| User Code Length | 6–8 chars |
| Max Message TTL | 24 hours |

### Core Goals

- Build a real-world backend system from scratch
- Implement secure authentication with hashed passwords
- Apply practical encryption — no overkill, no theatre
- Give users privacy and control over their data
- Keep the system simple, scalable, and actually buildable

### System Architecture

| Layer | Tech |
|-------|------|
| Frontend | Web UI |
| Backend | FastAPI (Python) |
| Database | SQLite → PostgreSQL |

> **Note:** This is a hobby project. The encryption is server-side — designed for learning and portfolio purposes. It's "encrypted at rest", not end-to-end. That's an honest, intentional tradeoff.

---

## Security Model

### ✅ Guaranteed

- Messages encrypted in database
- Passwords hashed with bcrypt
- No plaintext message storage
- HTTPS network transport

### ❌ Not Guaranteed

- Preventing screenshots
- Stopping message copies
- Full anonymity vs advanced tracking
- True end-to-end encryption

### Security Principles

- **Password protection** — bcrypt hashing, plaintext never stored
- **Network security** — HTTPS only, no interception vectors
- **Server trust model** — validate all input server-side, trust nothing from frontend
- **Data hygiene** — secrets live only in the backend, never in JS

### Browser Inspection

| Users CAN See | Users CANNOT See |
|---------------|-----------------|
| HTML structure | Backend source code |
| CSS styling | Database contents |
| JavaScript logic | Server logic & secrets |

> **Golden rule:** Never put secrets in the frontend. Ever.

---

## Authentication

### Registration Flow

1. User opens the app for the first time
2. Backend generates a unique `user_code` — e.g. `X7K9P2` (6–8 chars, alphanumeric)
3. User sets their password. Hashed with `bcrypt` before storage.

### Users Table Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Internal primary key |
| `user_code` | String | Public login identifier (e.g. X7K9P2) |
| `password_hash` | String | bcrypt-hashed password |
| `created_at` | DateTime | Account creation timestamp |

### Login Flow

1. User submits `user_code` + password
2. Backend looks up user, verifies password via bcrypt comparison
3. On success, returns a `JWT token` for session management

### Session Management

- JWT tokens sent in `Authorization: Bearer <token>` header
- Backend validates on every protected request
- Stateless — no server-side session storage needed

---

## Messaging & Encryption

### Friend / Channel System

1. User enters a friend's `user_code`
2. Backend verifies the code exists, then creates a shared channel

### Channels Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Channel identifier |
| `user1_id` | UUID | First participant |
| `user2_id` | UUID | Second participant |
| `created_at` | DateTime | Channel creation time |

### Messages Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Message identifier |
| `channel_id` | UUID | Parent channel reference |
| `encrypted_text` | Text | Encrypted message content |
| `created_at` | DateTime | Sent timestamp |
| `expiry_time` | DateTime | Auto-delete deadline |

### Encryption Design

**Library:** PyNaCl (recommended)

- Each chat channel gets a **shared secret key**
- Messages encrypted **before saving** to the database
- Decrypted only **when fetched** by authenticated users
- Simple, practical, honest — perfect for learning and portfolio

### Message Expiry

**TTL Options:** 1 hour · 4 hours · 24 hours

**Cleanup Logic:**
- Store `expiry_time` per message
- Periodic background job runs cleanup
- Hard-deletes expired rows from database

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Create new user, get user_code |
| `POST` | `/login` | Authenticate, receive JWT token |
| `POST` | `/add-friend` | Add friend by code, create channel |
| `POST` | `/send-message` | Send encrypted message to channel |
| `GET` | `/messages/{channel_id}` | Fetch & decrypt messages |

---

## Development Roadmap

- **Phase 01 — Foundation:** Setup FastAPI project, implement `/register` and `/login` endpoints
- **Phase 02 — Social Layer:** Friend system, channel creation via user codes
- **Phase 03 — Messaging Core:** Send and receive messages within channels
- **Phase 04 — Encryption:** PyNaCl integration — encrypt before save, decrypt on fetch
- **Phase 05 — Expiry System:** TTL per message, background cleanup job
- **Phase 06 — Polish & Ship:** Testing, documentation, GitHub push

---

## Optional Future Features

- Read receipts + auto-delete after read
- Code rotation system
- No-history mode
- Rate limiting
- UI improvements

---

## Limitations

- Cannot stop screenshots or message copying
- Not fully anonymous against advanced tracking
- Server-side encryption — not true E2E

---

*ZISM v1.0 · 2025 · samikhan.in*
