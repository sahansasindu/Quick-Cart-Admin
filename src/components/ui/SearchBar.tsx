import React from 'react';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Can add custom props if needed
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', ...props }) => {
  return (
    <input
      type="text"
      className={`search-bar ${className}`.trim()}
      {...props}
    />
  );
};

export default SearchBar;
