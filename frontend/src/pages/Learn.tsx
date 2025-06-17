// src/pages/Lern.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Lern: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Willkommen beim Deutschlernen 🇩🇪</h1>
      <p className="mb-6">Hier findest du nützliche Ressourcen, um dein Deutsch zu verbessern.</p>

      <div className="space-y-4">
        <section className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">📚 Thema der Woche: Begrüßungen</h2>
          <ul className="mt-2 list-disc list-inside">
            <li><strong>Hallo</strong> – Hello</li>
            <li><strong>Guten Morgen</strong> – Good morning</li>
            <li><strong>Guten Abend</strong> – Good evening</li>
            <li><strong>Wie geht's?</strong> – How are you?</li>
          </ul>
        </section>

        <section className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">🧠 Tipp</h2>
          <p>Nutze deine <Link to="/cards" className="text-blue-600 underline">Flashcards</Link>, um diese Wörter regelmäßig zu wiederholen!</p>
        </section>

        <section className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">🚀 Ziel dieser Woche</h2>
          <p>Verwende jeden Tag 5 Minuten, um neue Vokabeln zu lernen oder zu wiederholen.</p>
        </section>
      </div>
    </div>
  );
};

export default Lern;
