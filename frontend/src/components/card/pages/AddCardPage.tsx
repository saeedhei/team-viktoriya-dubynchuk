//src/components/Card/pages/CardPage.tsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CardResponseDto } from '../types/card';
import PaginatedFlashcards from '../PaginatedFlashcards';
import CardForm from '../CardForm';
import { deleteCard, getAllCards } from '../services/cardService';
import SearchBar from '../SearchBar';


const AddCardPage: React.FC = () => {
  const [cards, setCards] = useState<CardResponseDto[]>([]);
  const [editingCard, setEditingCard] = useState<CardResponseDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCards = async () => {
    try {
      const response = await getAllCards();
      setCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards', error);
      toast.error('Failed to load cards');
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        setEditingCard(null);
      }
    };
    if (modalOpen) {
      window.addEventListener('keydown', onEsc);
    }
    return () => window.removeEventListener('keydown', onEsc);
  }, [modalOpen]);

  const handleAddedOrUpdated = () => {
    fetchCards();
    setEditingCard(null);
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCard(id);
      toast.success('Card deleted');
      if (editingCard?._id === id) {
        setEditingCard(null);
        setModalOpen(false);
      }
      fetchCards();
    } catch (error) {
      console.error('Failed to delete card', error);
      toast.error('Failed to delete card');
    }
  };

  const handleEdit = (card: CardResponseDto) => {
    setEditingCard(card);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingCard(null);
    setModalOpen(true);
  };

  return (
    <div className="p-10 max-w-7xl  mx-auto mt-6 px-4">
      <div className="mb-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Flashcards</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition duration-200"
        >
          + Add New Flashcard
        </button>
      </div>

      <SearchBar onSearch={setSearchTerm} />

      <PaginatedFlashcards
        cards={cards}
        searchTerm={searchTerm}
        onDelete={handleDelete}
        onEdit={handleEdit}
        itemsPerPage={10}
      />

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center  bg-[url('/AddCard.jpg')] bg-cover bg-center bg-opacity-50"
          onClick={() => {
            setModalOpen(false);
            setEditingCard(null);
          }}
        >
          <div
            className="relative  w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Close Button */}
            <button
              aria-label="Close Modal"
              className="absolute top-0 right-0 text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => {
                setModalOpen(false);
                setEditingCard(null);
              }}
            >
              &times;
            </button>

            {/* Card Form */}
            <CardForm
              editingCard={editingCard || undefined}
              onAdded={handleAddedOrUpdated}
              onUpdated={handleAddedOrUpdated}
              onEdit={setEditingCard}
              onDeleted={() => {
                setModalOpen(false);
                fetchCards();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCardPage;