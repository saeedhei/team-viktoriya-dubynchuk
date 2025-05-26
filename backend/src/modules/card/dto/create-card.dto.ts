// src/modules/card/dto/create-card.dto.ts
import { Translation, CardCategory, CardDifficulty } from '../domain/card.types.js';

export interface CreateCardDto {
  word: string;
  transcription?: string;
  translation: Translation[];
  example?: Translation[];
  audioUrl?: string;
  category: CardCategory;
  difficulty: CardDifficulty;
}
