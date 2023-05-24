import React, { useState } from 'react';
import './util.css'

const Autocomplete = ({onSelectCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    const results = performSearch(value);
    setSuggestions(results);
  };

  const performSearch = (value) => {

    const suggestions = ['Technology', 'Travel', 'Food', 'Art', 'Social'];
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchTerm(suggestion);
    setSuggestions([]);
    onSelectCategory(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search catogery"
        value={searchTerm}
        onChange={handleChange}
        className="sugestionText"
        
      />
      <ul className='list'>
        {suggestions.map((suggestion) => (
          <li
          className='listItem'
            key={suggestion}
            onClick={() => handleSelectSuggestion(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
      {/* <p>Selected suggestion: {selectedSuggestion}</p> */}
    </div>
  );
};

export default Autocomplete;