# 📘 Create Flashcard API

This endpoint allows you to create a new flashcard in the system.

---

## 🔗 Endpoint

```
POST /api/cards
```

---

## 📥 Request Headers

```http
Content-Type: application/json
```

---

## 📦 Request Body

| Field         | Type              | Required | Description                                                 |
|---------------|-------------------|----------|-------------------------------------------------------------|
| `word`        | `string`          | ✅       | The word being studied                                      |
| `transcription` | `string`        | ⛔️       | Phonetic transcription of the word                          |
| `translation` | `Translation[]`   | ✅       | Array of translated meanings (see structure below)          |
| `example`     | `Translation[]`   | ⛔️       | Example usage sentences in multiple languages (optional)    |
| `audioUrl`    | `string`          | ⛔️       | URL to the pronunciation audio                              |
| `category`    | `string`          | ✅       | One of: `verbs`, `nouns`, `adjectives`, etc. (see below)    |
| `difficulty`  | `string`          | ✅       | One of: `easy`, `medium`, `hard`                            |

---

## 🧱 Translation Structure

Each `translation` or `example` item must follow this structure:

```json
{
  "text": "your translated text",
  "language": "languageCode"
}
```

Example:

```json
[
  { "text": "run", "language": "en" },
  { "text": "دویدن", "language": "fa" }
]
```

---

## 🎯 Example Request

```json
{
  "word": "run",
  "transcription": "rʌn",
  "translation": [
    { "text": "دویدن", "language": "fa" }
  ],
  "example": [
    { "text": "I run every morning.", "language": "en" },
    { "text": "من هر صبح می‌دوم.", "language": "fa" }
  ],
  "audioUrl": "https://example.com/audio/run.mp3",
  "category": "verbs",
  "difficulty": "easy"
}
```

---

## 📌 Category Options

- `verbs`
- `nouns`
- `adjectives`
- `adverbs`
- `pronouns`
- `prepositions`
- `conjunctions`
- `interjections`
- `phrases`

---

## 📌 Difficulty Levels

- `easy`
- `medium`
- `hard`

---

## ✅ Success Response

```json
{
  "_id": "664f7e4f12a1bc1234567890",
  "word": "run",
  "category": "verbs",
  ...
}
```

---

## ❌ Error Responses

- `400 Bad Request`: Missing or invalid fields
- `500 Internal Server Error`: Server-side issue

---
