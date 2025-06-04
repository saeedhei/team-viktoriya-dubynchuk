// src/components/HomePage.tsx
import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just simulate registration success
    if (email && password) {
      setRegistered(true);
    }
  };

  return (
   <div className="max-w-xl mx-auto mt-12 px-4">
  <h1 className="text-3xl font-bold mb-4">Welcome to <span> </span>
    <span className="text-blue-600">Easy</span>
  <span className="text-red-500">Deutsch</span></h1>
  <p className="text-lg text-gray-700">
    Learn German more effectively with flashcards designed to improve your vocabulary and grammar.
  </p>

  {!registered ? (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Register to get started</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
          
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  ) : (
    <div
      className="mt-6 px-4 py-3 bg-green-100 text-green-800 border border-green-200 rounded-md"
      role="alert"
    >
      Thank you for registering! You can now start using the app.
    </div>
  )}
</div>

  );
};

export default HomePage;
