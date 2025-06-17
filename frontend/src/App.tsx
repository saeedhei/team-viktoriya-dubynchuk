// src/App.tsx
import React from 'react';
import './App.css';
import Navbar from './common/NavBar';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
