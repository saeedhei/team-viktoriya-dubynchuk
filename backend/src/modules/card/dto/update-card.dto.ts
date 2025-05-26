// src/modules/card/dto/update-card.dto.ts
import { Translation, CardCategory, CardDifficulty } from '../domain/card.types.js';

export interface UpdateCardDto {
  word?: string;
  transcription?: string;
  translation?: Translation[];
  example?: Translation[];
  audioUrl?: string;
  category?: CardCategory;
  difficulty?: CardDifficulty;
}
