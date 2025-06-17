import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to <span className="text-blue-600">Easy</span>
        <span className="text-red-500">Deutsch</span>
      </h1>
      <p className="text-lg text-gray-700">
        Learn German more effectively with flashcards designed to improve your vocabulary and grammar.
      </p>

      <div className="mt-6 space-y-3">
        <Link
          to="/register"
          className="block w-full text-center bg-blue-600 !text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="block w-full text-center bg-gray-600 !text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
        >
          Login
        </Link>
        <Link
          to="/cards"
          className="block w-full text-center bg-green-600 !text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Flashcards
        </Link>
        <Link
          to="/learn"
          className="block w-full text-center bg-yellow-500 !text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
        >
          Learn
        </Link>
        <Link
          to="/quiz"
          className="block w-full text-center bg-purple-600 !text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
        >
          Quiz
        </Link>
      </div>
    </div>
  );
};

export default Home;
