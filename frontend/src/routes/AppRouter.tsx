//// src/components/routes/AppRouter.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Cards from '../pages/Cards';
import Learn from '../pages/Learn';
import Quiz from '../pages/Quiz';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default AppRouter;
