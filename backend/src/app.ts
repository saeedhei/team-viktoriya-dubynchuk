import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './infrastructure/database/connections.js';

import {
  getFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from './domain/cards/presentation/cardResolvers.js';

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.get('/api/flashcards', getFlashcards);
app.get('/api/flashcards/:id', getFlashcardById);
app.post('/api/flashcards', createFlashcard);
app.put('/api/flashcards/:id', updateFlashcard);
app.delete('/api/flashcards/:id', deleteFlashcard);

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
