// src/components/Card/CardPreview.tsx
import React from 'react';
import { CardResponseDto } from '../../../types/Card';

type Props = {
  card: CardResponseDto;
  onEdit: () => void;
  onDelete: () => void;
};

const CardPreview: React.FC<Props> = ({ card, onEdit, onDelete }) => {
  return (
    <div className="card-display">
      <h2>{card.word}</h2>
      {card.transcription && <p><em>Transcription:</em> {card.transcription}</p>}
      {card.audioUrl && (
        <audio controls>
          <source src={card.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <div>
        <strong>Translations:</strong>
        <ul>
          {card.translation.map((t, i) => (
            <li key={i}>{t.text} ({t.language})</li>
          ))}
        </ul>
      </div>
      {Array.isArray(card.example) && card.example.length > 0 && (
        <div>
          <strong>Examples:</strong>
          <ul>
            {card.example.map((e, i) => (
              <li key={i}>{e.text} ({e.language})</li>
            ))}
          </ul>
        </div>
      )}
      <p><strong>Category:</strong> {card.category}</p>
      <p><strong>Difficulty:</strong> {card.difficulty}</p>
      <div className="card-actions" style={{ marginTop: '1rem' }}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} style={{ marginLeft: '1rem', color: 'red' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardPreview;