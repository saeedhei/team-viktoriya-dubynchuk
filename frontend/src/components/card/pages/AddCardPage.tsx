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
      // fetchCards(); // You can choose to remove this if onDeleted triggers fetchCards()
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
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header and Add New Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold">Flashcards</h1>
        <button
          onClick={handleAddNew}
          className="btn btn-success"
        >
          + Add New Flashcard
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Cards List */}
      <PaginatedFlashcards
        cards={cards}
        searchTerm={searchTerm}
        onDelete={handleDelete}
        onEdit={handleEdit}
        itemsPerPage={10}
      />

      {/* Modal for Add/Edit Form */}
      {modalOpen && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setModalOpen(false);
            setEditingCard(null);
          }}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content p-4">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Close"
                onClick={() => {
                  setModalOpen(false);
                  setEditingCard(null);
                }}
              />

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
        </div>
      )}
    </div>
  );
};


export default AddCardPage;