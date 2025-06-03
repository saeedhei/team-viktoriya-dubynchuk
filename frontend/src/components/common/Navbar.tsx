// src/components/common/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          EasyDeutsch
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/cards">
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/learn">
                Learn
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/quiz">
                Quiz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

