import React, { useState, useEffect } from 'react';
import './App.css';

import SearchForm from './components/SearchFlashCard';
import SearchResults from './components/SearchResults';
import AddFlashcard from './components/AddFlashcard';

import FlashcardData from './types/flashcard.type';
import FlashcardService from './services/flashcard.service';

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Fetch flashcards based on search query and page
  const handleSearch = async (query: string = '', page: number = 1) => {
    try {
      const response = await FlashcardService.searchFlashcards(query, page);
      if (response.data.flashcards) {
        setFlashcards(response.data.flashcards);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setError(null);
      } else {
        setError('No flashcards found.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching flashcards.');
    }
  };

  // Load flashcards when query or page changes
  useEffect(() => {
    handleSearch(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <h1>Flashcard Manager</h1>

      <SearchForm
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // Reset to first page on new search
        }}
      />

      <AddFlashcard onAdded={() => handleSearch(searchQuery)} />

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <SearchResults
          results={flashcards}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onSearch={() => handleSearch(searchQuery, currentPage)}
        />
      )}
    </div>
  );
};

export default App;

