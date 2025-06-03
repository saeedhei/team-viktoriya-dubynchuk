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

  // Filter cards by difficulty
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
    <div className="container mt-4">
      <h1>Quiz - {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Level</h1>
      <div className="mb-3">
        <label htmlFor="difficultySelect" className="form-label">
          Select Difficulty Level:
        </label>
        <select
          id="difficultySelect"
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

      <div className="card p-4 mb-3">
        <h2>{currentCard.word}</h2>
        {currentCard.transcription && <p><em>Transcription:</em> {currentCard.transcription}</p>}
        {currentCard.audioUrl && (
          <audio controls>
            <source src={currentCard.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        {!showResult ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="answerInput" className="form-label">
                Your answer (translation):
              </label>
              <input
                id="answerInput"
                className="form-control"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Check Answer
            </button>
          </form>
        ) : (
          <button className="btn btn-secondary mt-3" onClick={handleNext}>
            Next Card
          </button>
        )}

      </div>

      <p>
        Score: {score} / {filteredCards.length}
      </p>
    </div>
  );
};

export default QuizPage;
