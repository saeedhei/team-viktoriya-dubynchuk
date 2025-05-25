import React, { useState } from 'react';
import FlashcardService from "../services/flashcard.service";
import "./AddFlashcard.css"

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

  const translationArray = translation
    .split(',')
    .map(text => ({ language: 'en', text: text.trim() }));

  // Validate category is one of allowed enums (optional but recommended)
  const allowedCategories = [
    'verbs', 'nouns', 'adjectives', 'adverbs', 'pronouns',
    'prepositions', 'conjunctions', 'interjections', 'phrases'
  ];
  if (!allowedCategories.includes(category)) {
    alert(`Category must be one of: ${allowedCategories.join(', ')}`);
    return;
  }

    const data = {
      word,
      translation:translationArray,
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
    <form className='flashcard-table' onSubmit={handleAddFlashcard}>
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
