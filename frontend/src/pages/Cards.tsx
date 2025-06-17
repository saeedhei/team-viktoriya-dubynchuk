// src/pages/Cards.tsx 

import React, { useEffect, useState } from 'react';
import CardForm from '../features/card/components/CardForm';
import SearchBar from '../features/card/components/SearchBar';
import PaginatedFlashcards from '../features/card/components/PaginatedFlashcards';
import { CardResponseDto } from '../types/Card'; // Adjust path if needed
import { getAllCards, deleteCard } from '../features/card/services/CardService'; // You must create this

const Cards: React.FC = () => {
  const [cards, setCards] = useState<CardResponseDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await getAllCards();
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    loadCards();
  }, [refreshList]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCardAddedOrEdited = () => {
    setRefreshList(prev => !prev);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCard(id);
      setRefreshList(prev => !prev);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEdit = (card: CardResponseDto) => {
    // TODO: You can populate a form with this card data if needed
    console.log('Edit card:', card);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Flashcards</h1>

      <CardForm
        onAdded={handleCardAddedOrEdited}
        onEdit={handleCardAddedOrEdited}
      />

      <div className="mt-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mt-6">
        <PaginatedFlashcards
          cards={cards}
          searchTerm={searchTerm}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Cards;

