import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onSortChange, currentSort }) => {
  return (
    <div className="search-controls-container">
      <input 
        type="text" 
        placeholder="Search assets..." 
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
      
      <select 
        className="sort-select" 
        value={currentSort} 
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Sort by Default</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="price_asc">Price: Low to High</option>
      </select>
    </div>
  );
};

export default SearchBar;