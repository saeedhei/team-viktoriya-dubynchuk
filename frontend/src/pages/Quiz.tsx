import React, { useState } from 'react';

type Question = {
  german: string;
  options: string[];
  correct: string;
};

const questions: Question[] = [
  {
    german: 'Danke',
    options: ['Hello', 'Thank you', 'Goodbye', 'Please'],
    correct: 'Thank you',
  },
  {
    german: 'Wie geht es dir?',
    options: ['How are you?', 'What time is it?', 'Where are you?', 'Who are you?'],
    correct: 'How are you?',
  },
  {
    german: 'Guten Nacht',
    options: ['Good morning', 'Good night', 'Good evening', 'Goodbye'],
    correct: 'Good night',
  },
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    if (answer === questions[current].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setCurrent(prev => prev + 1);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
  };

  const isFinished = current >= questions.length;

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">German Quiz 🇩🇪</h1>

      {isFinished ? (
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">You scored {score} out of {questions.length}!</p>
          <button
            onClick={restartQuiz}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">Translate: <strong>{questions[current].german}</strong></p>
          <div className="space-y-2">
            {questions[current].options.map((option, index) => {
              const isCorrect = option === questions[current].correct;
              const isSelected = option === selected;

              let bg = 'bg-white';
              if (selected) {
                if (isSelected && isCorrect) bg = 'bg-green-200';
                else if (isSelected && !isCorrect) bg = 'bg-red-200';
              }

              return (
                <button
                  key={index}
                  onClick={() => !selected && handleAnswer(option)}
                  className={`block w-full text-left p-2 border rounded ${bg}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected && (
            <button
              onClick={nextQuestion}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
