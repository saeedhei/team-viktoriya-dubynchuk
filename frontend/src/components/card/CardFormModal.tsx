// src/components/card/FlashcardFormModal.tsx
import React from 'react';
import CardForm from './CardForm';
import { CardResponseDto } from './types/card';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  initialData?: CardResponseDto | null;
};

const FlashcardFormModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <button className="float-right" onClick={onClose}>✖️</button>
        <CardForm
          editingCard={initialData || undefined}
          onAdded={() => onSubmit(initialData)}
          onEdit={() => {}}
        />
      </div>
    </div>
  );
};

export default FlashcardFormModal;
