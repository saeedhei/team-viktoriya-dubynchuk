// src/components/LearnPage.tsx
import React, { useState, useEffect } from 'react';
import { CardResponseDto, CardDifficulty } from '../types/card';
import { getAllCards } from '../services/cardService';
import { toast } from 'react-toastify';

const difficulties: CardDifficulty[] = ['easy', 'medium', 'hard'];

const LearnPage: React.FC = () => {
  const [cards, setCards] = useState<CardResponseDto[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<CardDifficulty>('easy');
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await getAllCards();
      setCards(response.data);
    } catch (error) {
      toast.error('Failed to load cards');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Filter cards by selected difficulty
  const filteredCards = cards.filter(card => card.difficulty === selectedDifficulty);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Learn - {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Level</h1>

      <div className="mb-3">
        <label htmlFor="difficultySelect" className="form-label">
          Select Difficulty Level:
        </label>
        <select
          id="difficultySelect"
          className="form-select"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as CardDifficulty)}
        >
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading cards...</p>
      ) : filteredCards.length === 0 ? (
        <p>No cards found for this difficulty level.</p>
      ) : (
        <ul className="list-group">
          {filteredCards.map(card => (
            <li key={card._id} className="list-group-item">
              <strong>{card.word}</strong> ({card.category})<br />
              Translation: {card.translation.map(t => t.text).join(', ')}<br />
              {card.example && card.example.length > 0 && (
                <em>Example: {card.example.map(e => e.text).join('; ')}</em>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LearnPage;
