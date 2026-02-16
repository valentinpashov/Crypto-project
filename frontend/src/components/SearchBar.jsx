import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search assets..." 
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;