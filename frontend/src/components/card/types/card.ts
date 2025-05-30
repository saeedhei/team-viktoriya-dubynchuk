// src/types/card.ts
export interface Translation {
  language: string;
  text: string;
}

export type CardCategory = 
  | 'verbs'
  | 'nouns'
  | 'adjectives'
  | 'adverbs'
  | 'pronouns'
  | 'prepositions'
  | 'conjunctions'
  | 'interjections'
  | 'phrases';

export type CardDifficulty = 'easy' | 'medium' | 'hard';

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
