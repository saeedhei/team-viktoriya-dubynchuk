export interface Translation {
  language: string;
  text: string;
}

export default interface FlashcardData {
  _id?: string;
  word: string;
  translation: Translation[];   
  category?: string;
  audioUrl?: string;
}