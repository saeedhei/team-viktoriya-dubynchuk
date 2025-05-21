import http from "../axios-http";
import FlashcardData from "../types/flashcard.type";


type SearchFlashcardsProps = {
  totalPages: number;
  currentPage: number;
  flashcards: FlashcardData[]
};

class FlashcardService {

  searchFlashcards(query: string, page: number) {
    return http.get<SearchFlashcardsProps>(`/flashcards?search=${query}&page=${page}&limit=5`);
  }

  readFlashcard(id: string) {
    return http.get<FlashcardData>(`/flashcards/${id}`);
  }

  createFlashcard(data: object) {
    return http.post<FlashcardData>("/flashcards", data);
  }

  updateFlashcard(data: object, id: string) {
    return http.put<FlashcardData>(`/flashcards/${id}`, data);
  }

  deleteFlashcard(id: string) {
    return http.delete<FlashcardData>(`/flashcards/${id}`);
  }

  deleteAll() {
    return http.delete<FlashcardData[]>(`/flashcards`);
  }
}

export default new FlashcardService();