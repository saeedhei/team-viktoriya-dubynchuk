// src/components/QuizPage.tsx
import React, { useState, useEffect } from 'react';
import { CardResponseDto, CardDifficulty } from '../types/card';
import { getAllCards } from '../services/cardService';
import { toast } from 'react-toastify';

const difficulties: CardDifficulty[] = ['easy', 'medium', 'hard'];

const QuizPage: React.FC = () => {
  const [cards, setCards] = useState<CardResponseDto[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<CardDifficulty>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    fetchCards();
  }, []);

  const filteredCards = cards.filter(card => card.difficulty === selectedDifficulty);

  const currentCard = filteredCards[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCard) return;

    const correctTranslations = currentCard.translation.map(t => t.text.toLowerCase().trim());
    if (correctTranslations.includes(userAnswer.toLowerCase().trim())) {
      setScore(score + 1);
      alert('Correct!');
    } else {
      alert(`Incorrect! Correct answer(s): ${correctTranslations.join(', ')}`);
    }
    setUserAnswer('');
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setCurrentIndex((currentIndex + 1) % filteredCards.length);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value as CardDifficulty);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
  };

  if (loading) return <p>Loading cards...</p>;

  if (filteredCards.length === 0)
    return (
      <div className="container mt-4">
        <h1>Quiz</h1>
        <p>No cards available for this difficulty level.</p>
        <select
          className="form-select w-auto"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        >
          {difficulties.map(level => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );

  return (
    <div className="p-10 max-w-3xl mx-auto mt-6 px-4">
    <h1 className="text-2xl font-bold mb-6">
      Quiz – {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Level
    </h1>

    <div className="mb-6">
      <label htmlFor="difficultySelect" className="block text-sm font-medium text-gray-700 mb-2">
        Select Difficulty Level:
      </label>
      <select
        id="difficultySelect"
        className="block w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        value={selectedDifficulty}
        onChange={handleDifficultyChange}
      >
        {difficulties.map((level) => (
          <option key={level} value={level}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </option>
        ))}
      </select>
    </div>

    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2">{currentCard.word}</h2>

      {currentCard.transcription && (
        <p className="text-gray-700 italic mb-2">
          Transcription: {currentCard.transcription}
        </p>
      )}

      {currentCard.audioUrl && (
        <audio controls className="mb-4">
          <source src={currentCard.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {!showResult ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="answerInput" className="block text-sm font-medium text-gray-700 mb-1">
              Your answer (translation):
            </label>
            <input
              id="answerInput"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Check Answer
          </button>
        </form>
      ) : (
        <button
          onClick={handleNext}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Next Card
        </button>
      )}
    </div>

    <p className="text-gray-700 font-medium">
      Score: {score} / {filteredCards.length}
    </p>
  </div>
  );
};

export default QuizPage;
