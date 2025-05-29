# 📘 Flashcard API - Full CRUD

This document describes the complete set of CRUD operations for managing flashcards.

---

## 📦 Data Model

```ts
interface Card {
  _id?: string;
  word: string;
  transcription?: string;
  translation: { text: string; language: string }[];
  example?: { text: string; language: string }[];
  audioUrl?: string;
  category:
    | 'verbs'
    | 'nouns'
    | 'adjectives'
    | 'adverbs'
    | 'pronouns'
    | 'prepositions'
    | 'conjunctions'
    | 'interjections'
    | 'phrases';
  difficulty: 'easy' | 'medium' | 'hard';
}
```

---

## 🆕 Create a Card

**POST** `/api/cards`

**Request Body:**  
Same structure as the card model above (see `create-card.md` for details).

**Success Response:**
- `201 Created`
- Returns the created card object

---

## 📥 Get All Cards

**GET** `/api/cards`

**Query Parameters (optional):**
- `category=verbs`
- `difficulty=easy`

**Success Response:**
- `200 OK`
- Returns an array of card objects

---

## 🔍 Get Single Card by ID

**GET** `/api/cards/:id`

**Success Response:**
- `200 OK`
- Returns the card object

**Error Responses:**
- `404 Not Found` – If card does not exist

---

## ✏️ Update a Card

**PUT** `/api/cards/:id`

**Request Body:**  
Same structure as the `Card` object. Partial updates may be allowed depending on implementation.

**Success Response:**
- `200 OK`
- Returns the updated card

**Error Responses:**
- `404 Not Found` – If card does not exist

---

## ❌ Delete a Card

**DELETE** `/api/cards/:id`

**Success Response:**
- `204 No Content`

**Error Responses:**
- `404 Not Found` – If card does not exist

---

## 🧪 Example Use with CURL

```bash
# Create
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "word": "run",
    "transcription": "rʌn",
    "translation": [{ "text": "دویدن", "language": "fa" }],
    "category": "verbs",
    "difficulty": "easy"
  }'

# Get All
curl http://localhost:3000/api/cards

# Get One
curl http://localhost:3000/api/cards/<CARD_ID>

# Update
curl -X PUT http://localhost:3000/api/cards/<CARD_ID> \
  -H "Content-Type: application/json" \
  -d '{ "difficulty": "medium" }'

# Delete
curl -X DELETE http://localhost:3000/api/cards/<CARD_ID>
```

---
