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
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4">Welcome to EasyDeutsch</h1>
      <p className="lead">
        Learn German more effectively with flashcards designed to improve your vocabulary and grammar.
      </p>

      {!registered ? (
        <div className="card p-4 mt-4 shadow-sm">
          <h2 className="h4 mb-3">Register to get started</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                id="email" 
                className="form-control" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-control" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className="alert alert-success mt-4" role="alert">
          Thank you for registering! You can now start using the app.
        </div>
      )}
    </div>
  );
};

export default HomePage;
