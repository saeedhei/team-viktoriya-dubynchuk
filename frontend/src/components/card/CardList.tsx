// src/components/Card/CardList.tsx
import React from 'react';
import { CardResponseDto } from './types/card';
import CardItem from './CardItem';

type CardListProps = {
  cards: CardResponseDto[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
};

const CardList: React.FC<CardListProps> = ({ cards, onDelete, onEdit }) => {
  return (
    <ul>
      {cards.map((card) => (
        <CardItem key={card._id} card={card} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default CardList;

