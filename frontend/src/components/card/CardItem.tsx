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
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{card.word}</strong> ({card.category}, {card.difficulty})
      </div>
      <div className="btn-group">
        {onEdit && (
          <button
            onClick={() => onEdit(card._id)}
            className="btn btn-warning btn-sm"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(card._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default CardItem;
