import React, { useState } from 'react';
import FlashcardService from "../services/flashcard.service";

type AddFlashcardProps = {
  onAdded: () => void; 
};


const AddFlashcard: React.FC<AddFlashcardProps> = ({ onAdded }) => {
  const [word, setWord] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');

  const handleAddFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      word,
      translation,
      category,
      audioUrl,
    };

    try {
      const response = await FlashcardService.createFlashcard(data);
      console.log('Flashcard added:', response.data);
      setWord('');
      setTranslation('');
      setCategory('');
      setAudioUrl('');
      onAdded();
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  return (
    <form onSubmit={handleAddFlashcard}>
      <input
        type="text"
        placeholder="German Word/Phrase"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Translation"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category/Topic"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Audio URL"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
      />
      <button type="submit">Add Flashcard</button>
    </form>
  );
};

export default AddFlashcard;
