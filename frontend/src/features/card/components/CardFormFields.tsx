// src/components/Card/CardFormFields.tsx
import React from 'react';
import { allowedDifficulties } from './cardFormUtils.ts';

type Props = {
  formData: {
    word: string;
    transcription: string;
    translation: string;
    example: string;
    audioUrl: string;
    category: string;
    difficulty: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<Props['formData']>>;
};

const CardFormFields: React.FC<Props> = ({ formData, setFormData }) => {
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev: Props['formData']) => ({ ...prev, [field]: e.target.value }));
  };

  return (
<>
  <input
    type="text"
    placeholder="Word"
    value={formData.word}
    onChange={handleChange('word')}
    required
    className="w-full p-2 border border-black rounded-md"
  />

  <input
    type="text"
    placeholder="Transcription (optional)"
    value={formData.transcription}
    onChange={handleChange('transcription')}
    className="w-full p-2 border border-black rounded-md"
  />

  <input
    type="text"
    placeholder="Translation(s), comma-separated"
    value={formData.translation}
    onChange={handleChange('translation')}
    required
    className="w-full p-2 border border-black rounded-md"
  />

  <input
    type="text"
    placeholder="Example(s), comma-separated (optional)"
    value={formData.example}
    onChange={handleChange('example')}
    className="w-full p-2 border border-black rounded-md"
  />

  <input
    type="text"
    placeholder="Audio URL (optional)"
    value={formData.audioUrl}
    onChange={handleChange('audioUrl')}
    className="w-full p-2 border border-black rounded-md"
  />

  <input
    type="text"
    placeholder="Category"
    value={formData.category}
    onChange={handleChange('category')}
    required
    className="w-full p-2 border border-black rounded-md"
  />

  <select
    value={formData.difficulty}
    onChange={handleChange('difficulty')}
    className="w-full p-2 border border-black rounded-md bg-white"
  >
    {allowedDifficulties.map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ))}
  </select>
</>

  );
};

export default CardFormFields;