//src/components/Card/pages/CardPage.tsx
import React, { useState, useEffect } from 'react';
import { CardResponseDto } from '../types/card';
import CardList from '../CardList';
import CardForm from '../CardForm';
import { deleteCard, getAllCards } from '../services/cardService';

const CardsPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [cards, setCards] = useState<CardResponseDto[]>([]);
  const [editingCard, setEditingCard] = useState<CardResponseDto | null>(null);

  const fetchCards = async () => {
    try {
      const response = await getAllCards();
      setCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [refresh]);

  const handleAdded = () => {
    setEditingCard(null);  
    setRefresh((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCard(id);
      setRefresh((prev) => !prev);
      if (editingCard?._id === id) {
        setEditingCard(null);
      }
    } catch (error) {
      console.error('Failed to delete card', error);
    }
  };

  const handleEdit = (id: string) => {
    const cardToEdit = cards.find(card => card._id === id) || null;
    setEditingCard(cardToEdit);
  };

  const handleUpdated = () => {
    setEditingCard(null);  
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <CardForm
        onAdded={handleAdded}
        editingCard={editingCard || undefined}
        onUpdated={handleUpdated}
        onEdit={setEditingCard}  
      />
      <CardList
        onDelete={handleDelete}
        onEdit={handleEdit}
        cards={cards}
      />
    </div>
  );
};

export default CardsPage;






