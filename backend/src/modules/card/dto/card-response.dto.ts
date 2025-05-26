// src/modules/card/dto/card-response.dto.ts
import { Translation, CardCategory, CardDifficulty } from '../domain/card.types.js';

export interface CardResponseDto {
  _id: string;
  word: string;
  transcription?: string;
  translation: Translation[];
  example?: Translation[];
  audioUrl?: string;
  category: CardCategory;
  difficulty: CardDifficulty;
}
