import express from 'express';
import {
  getFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from '../presentation/cardResolvers.js';

const router = express.Router();

router.get('/flashcards', getFlashcards);
router.get('/flashcards/:id', getFlashcardById);
router.post('/flashcards', createFlashcard);
router.put('/flashcards/:id', updateFlashcard);
router.delete('/flashcards/:id', deleteFlashcard);

export default router;
