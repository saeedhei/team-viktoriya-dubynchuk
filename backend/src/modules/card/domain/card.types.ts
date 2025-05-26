// src/modules/card/domain/card.types.ts
export interface Translation {
  text: string;
  language: string;
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
