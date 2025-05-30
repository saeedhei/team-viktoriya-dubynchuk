// src/components/Card/CardForm.tsx
import React, { useState, useEffect } from 'react';
import { createCard, updateCard, deleteCard } from './services/cardService';
import { CardResponseDto } from './types/card';
import './CardForm.css';

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
  const [word, setWord] = useState(editingCard?.word || '');
  const [transcription, setTranscription] = useState(editingCard?.transcription || '');
  const [translation, setTranslation] = useState(
    editingCard?.translation?.map(t => t.text).join(', ') || ''
  );
  const [example, setExample] = useState(
    editingCard?.example?.map(e => e.text).join(', ') || ''
  );
  const [audioUrl, setAudioUrl] = useState(editingCard?.audioUrl || '');
  const [category, setCategory] = useState(editingCard?.category || '');
  const [difficulty, setDifficulty] = useState(editingCard?.difficulty || 'easy');

  const [savedCard, setSavedCard] = useState<CardResponseDto | null>(null);

  const allowedCategories = [
    'verbs', 'nouns', 'adjectives', 'adverbs', 'pronouns',
    'prepositions', 'conjunctions', 'interjections', 'phrases'
  ];

  const allowedDifficulties = ['easy', 'medium', 'hard'];

  useEffect(() => {
    if (editingCard) {
      setWord(editingCard.word || '');
      setTranscription(editingCard.transcription || '');
      setTranslation(editingCard.translation?.map(t => t.text).join(', ') || '');
      setExample(editingCard.example?.map(e => e.text).join(', ') || '');
      setAudioUrl(editingCard.audioUrl || '');
      setCategory(editingCard.category || '');
      setDifficulty(editingCard.difficulty || 'easy');
      setSavedCard(null);
    } else {
      
      setWord('');
      setTranscription('');
      setTranslation('');
      setExample('');
      setAudioUrl('');
      setCategory('');
      setDifficulty('easy');
      setSavedCard(null);
    }
  }, [editingCard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allowedCategories.includes(category)) {
      alert(`Category must be one of: ${allowedCategories.join(', ')}`);
      return;
    }

    if (!allowedDifficulties.includes(difficulty)) {
      alert(`Difficulty must be one of: ${allowedDifficulties.join(', ')}`);
      return;
    }

    const translationArray = translation
      .split(',')
      .map(text => ({ language: 'en', text: text.trim() }))
      .filter(t => t.text.length > 0);

    const exampleArray = example
      ? example
          .split(',')
          .map(text => ({ language: 'en', text: text.trim() }))
          .filter(e => e.text.length > 0)
      : [];

    const data = {
      word: word.trim(),
      transcription: transcription.trim() || undefined,
      translation: translationArray,
      example: exampleArray,
      audioUrl: audioUrl.trim() || undefined,
      category,
      difficulty,
    };

    try {
      if (editingCard && editingCard._id) {
        const response = await updateCard(editingCard._id, data);
        if (onUpdated) onUpdated();
        setSavedCard(response.data);
      } else {
        const response = await createCard(data);
        onAdded();
        setSavedCard(response.data);
        setWord('');
        setTranscription('');
        setTranslation('');
        setExample('');
        setAudioUrl('');
        setCategory('');
        setDifficulty('easy');
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
      if (onDeleted) onDeleted();
      onEdit(null);  
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEditClick = () => {
    if (!savedCard) return;
    onEdit(savedCard);
  };

  return (
    <>
      <form className="flashcard-table" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Transcription (optional)"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Translation(s), comma-separated"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Example(s), comma-separated (optional)"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />
        <input
          type="text"
          placeholder="Audio URL (optional)"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button type="submit">{editingCard ? 'Update Card' : 'Add Card'}</button>
      </form>

      {savedCard && (
        <div className="card-display">
          <h2>{savedCard.word}</h2>
          {savedCard.transcription && <p><em>Transcription:</em> {savedCard.transcription}</p>}
          {savedCard.audioUrl && (
            <audio controls>
              <source src={savedCard.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <div>
            <strong>Translations:</strong>
            {savedCard.translation && savedCard.translation.length > 0 ? (
              <ul>
                {savedCard.translation.map((t, i) => (
                  <li key={i}>
                    {typeof t === 'string' ? t : `${t.text} (${t.language})`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No translations</p>
            )}
          </div>
          {savedCard.example && savedCard.example.length > 0 && (
            <div>
              <strong>Examples:</strong>
              <ul>
                {savedCard.example.map((e, i) => (
                  <li key={i}>{e.text} ({e.language})</li>
                ))}
              </ul>
            </div>
          )}
          <p><strong>Category:</strong> {savedCard.category}</p>
          <p><strong>Difficulty:</strong> {savedCard.difficulty}</p>

          <div className="card-actions" style={{ marginTop: '1rem' }}>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDelete} style={{ marginLeft: '1rem', color: 'red' }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CardForm;

