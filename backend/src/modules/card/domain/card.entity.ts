// src/modules/card/domain/card.entity.ts
import { Translation, CardCategory, CardDifficulty } from './card.types.js';

export class Card {
  constructor(
    public word: string,
    public translation: Translation[],
    public category: CardCategory,
    public difficulty: CardDifficulty,
    public _id?: string,
    public transcription?: string,
    public example?: Translation[],
    public audioUrl?: string,
  ) {}
}
