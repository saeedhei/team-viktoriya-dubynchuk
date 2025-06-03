// src/components/card/SearchBar.tsx
import React from 'react';

type Props = {
  onSearch: (term: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="border p-2 rounded w-full mb-4"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
