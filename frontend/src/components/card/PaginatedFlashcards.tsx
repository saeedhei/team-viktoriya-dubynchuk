
// src/components/Card/PaginatedCards.tsx
import React, { useState, useMemo } from 'react';
import { CardResponseDto } from './types/card';
import CardItem from './CardItem';

type PaginatedFlashcardsProps = {
  cards: CardResponseDto[];
  searchTerm: string;
  onDelete: (id: string) => void;
  onEdit: (card: CardResponseDto) => void;
  itemsPerPage?: number;
};

const PaginatedFlashcards: React.FC<PaginatedFlashcardsProps> = ({
  cards,
  searchTerm,
  onDelete,
  onEdit,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter cards by search term (case insensitive)
  const filteredCards = useMemo(() => {
    if (!searchTerm.trim()) return cards;
    return cards.filter(card =>
      card.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cards, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div>
      {filteredCards.length === 0 ? (
        <p>No flashcards found.</p>
      ) : (
        <>
          <ul>
            {paginatedCards.map((card) => (
              <CardItem
                key={card._id}
                card={card}
                onDelete={onDelete}
                onEdit={() => onEdit(card)}
              />
            ))}
          </ul>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedFlashcards;


