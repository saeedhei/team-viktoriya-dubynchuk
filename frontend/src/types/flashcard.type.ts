export default interface FlashcardData {
  _id?: string;
  word: string;
  translation: string;
  category?: string;
  audioUrl?: string;
}