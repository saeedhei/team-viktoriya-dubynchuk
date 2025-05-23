export type Translation = {
  language: string;
  text: string;
};

export interface Card {
  _id?: string;
  word: string;
  transcription?: string;
  translation: Translation[];
  example?: Translation[];
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