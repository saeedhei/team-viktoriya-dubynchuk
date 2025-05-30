// src/components/Card/CardItem.tsx
import React from 'react';
import { CardResponseDto } from './types/card';

interface CardItemProps {
  card: CardResponseDto;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onDelete, onEdit }) => {
  return (
    <li className="border p-2 rounded mb-2 flex justify-between items-center">
      <div>
        <strong>{card.word}</strong> ({card.category}, {card.difficulty})
      </div>
      <div className="space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(card._id)}
            className="px-2 py-1 bg-yellow-400 text-white rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(card._id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default CardItem;
