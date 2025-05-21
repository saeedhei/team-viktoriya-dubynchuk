import React, { useState } from 'react';
import FlashcardData from '../types/flashcard.type';
import FlashcardService from '../services/flashcard.service';
import './SearchResults.css';

type SearchResultsProps = {
  results: FlashcardData[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearch: () => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
}) => {
  const [editingFlashcard, setEditingFlashcard] = useState<FlashcardData | null>(null);
  const [editedWord, setEditedWord] = useState('');
  const [editedTranslation, setEditedTranslation] = useState('');

  const handleEditClick = (flashcard: FlashcardData) => {
    setEditingFlashcard(flashcard);
    setEditedWord(flashcard.word);
    setEditedTranslation(flashcard.translation);
  };

  const handleSaveClick = async () => {
    if (editingFlashcard) {
      const data = {
        word: editedWord,
        translation: editedTranslation,
      };

      try {
        await FlashcardService.updateFlashcard(data, editingFlashcard._id!);
      } catch (e) {
        console.error(e);
      }

      setEditingFlashcard(null);
      onSearch();
    }
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await FlashcardService.deleteFlashcard(id);
    } catch (e) {
      console.error(e);
    }
    onSearch();
  };

  return (
    <div>
      <ul>
        {results.map((flashcard) => (
          <li key={flashcard._id}>
            {editingFlashcard && editingFlashcard._id === flashcard._id ? (
              <>
                <input
                  type="text"
                  value={editedWord}
                  onChange={(e) => setEditedWord(e.target.value)}
                />
                <input
                  type="text"
                  value={editedTranslation}
                  onChange={(e) => setEditedTranslation(e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={() => setEditingFlashcard(null)}>Cancel</button>
              </>
            ) : (
              <>
                {flashcard.word} - {flashcard.translation}
                <button onClick={() => handleEditClick(flashcard)}>Edit</button>
                <button onClick={() => handleDeleteClick(flashcard._id!)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
