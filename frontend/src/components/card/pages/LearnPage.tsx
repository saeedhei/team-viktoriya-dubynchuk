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


  const filteredCards = cards.filter(card => card.difficulty === selectedDifficulty);

  return (
      <div className="p-10 max-w-4xl mx-auto mt-6 px-4">
    <h1 className="text-2xl font-bold mb-6">
      Learn – {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Level
    </h1>

    <div className="mb-6">
      <label htmlFor="difficultySelect" className="block text-sm font-medium text-gray-700 mb-2">
        Select Difficulty Level:
      </label>
      <select
        id="difficultySelect"
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
      <p className="text-gray-600">Loading cards...</p>
    ) : filteredCards.length === 0 ? (
      <p className="text-gray-500 italic">No cards found for this difficulty level.</p>
    ) : (
      <ul className="space-y-4">
        {filteredCards.map((card) => (
          <li
            key={card._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
          >
            <p className="text-lg font-semibold">{card.word} <span className="text-sm text-gray-500">({card.category})</span></p>
            <p className="mt-1 text-gray-700">
              <strong>Translation:</strong> {card.translation.map((t) => t.text).join(', ')}
            </p>
            {card.example && card.example.length > 0 && (
              <p className="mt-1 text-sm text-gray-600 italic">
                Example: {card.example.map((e) => e.text).join('; ')}
              </p>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default LearnPage;
