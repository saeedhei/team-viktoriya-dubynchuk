// src/components/Card/CardForm.tsx
import React, { useState, useEffect } from 'react';
import { createCard, updateCard, deleteCard } from './services/cardService';
import { CardResponseDto } from './types/card';
import CardFormFields from './CardFormFields.tsx';
import CardPreview from './ CardPreview.tsx';
import {
  allowedCategories,
  allowedDifficulties,
  buildCardPayload,
} from './cardFormUtils';

type CardFormProps = {
  onAdded: () => void;
  editingCard?: CardResponseDto;
  onUpdated?: () => void;
  onDeleted?: () => void;
  onEdit: (card: CardResponseDto | null) => void;
};

const CardForm: React.FC<CardFormProps> = ({
  onAdded,
  editingCard,
  onUpdated,
  onDeleted,
  onEdit,
}) => {
  const [formData, setFormData] = useState({
    word: '',
    transcription: '',
    translation: '',
    example: '',
    audioUrl: '',
    category: '',
    difficulty: 'easy',
  });

  const [savedCard, setSavedCard] = useState<CardResponseDto | null>(null);

  useEffect(() => {
    if (editingCard) {
      setFormData({
        word: editingCard.word || '',
        transcription: editingCard.transcription || '',
        translation: editingCard.translation?.map(t => t.text).join(', ') || '',
        example: editingCard.example?.map(e => e.text).join(', ') || '',
        audioUrl: editingCard.audioUrl || '',
        category: editingCard.category || '',
        difficulty: editingCard.difficulty || 'easy',
      });
      setSavedCard(null);
    } else {
      setFormData({
        word: '',
        transcription: '',
        translation: '',
        example: '',
        audioUrl: '',
        category: '',
        difficulty: 'easy',
      });
      setSavedCard(null);
    }
  }, [editingCard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { category, difficulty } = formData;
    if (!allowedCategories.includes(category)) {
      alert(`Category must be one of: ${allowedCategories.join(', ')}`);
      return;
    }
    if (!allowedDifficulties.includes(difficulty)) {
      alert(`Difficulty must be one of: ${allowedDifficulties.join(', ')}`);
      return;
    }

    const payload = buildCardPayload(formData);

    try {
      if (editingCard && editingCard._id) {
        const response = await updateCard(editingCard._id, payload);
        onUpdated?.();
        setSavedCard(response.data);
      } else {
        const response = await createCard(payload);
        onAdded();
        setSavedCard(response.data);
        setFormData({
          word: '',
          transcription: '',
          translation: '',
          example: '',
          audioUrl: '',
          category: '',
          difficulty: 'easy',
        });
      }
    } catch (error) {
      console.error('Error submitting card:', error);
    }
  };

  const handleDelete = async () => {
    if (!savedCard?._id) return;
    if (!window.confirm(`Are you sure you want to delete "${savedCard.word}"?`)) return;

    try {
      await deleteCard(savedCard._id);
      setSavedCard(null);
      onDeleted?.();
      onEdit(null);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEditClick = () => {
    if (savedCard) onEdit(savedCard);
  };

  return (
    <>
      <form className="flashcard-table" onSubmit={handleSubmit}>
        <CardFormFields formData={formData} setFormData={setFormData} />
        <button type="submit">{editingCard ? 'Update Card' : 'Add Card'}</button>
      </form>

      {savedCard && (
        <CardPreview card={savedCard} onEdit={handleEditClick} onDelete={handleDelete} />
      )}
    </>
  );
};

export default CardForm;

