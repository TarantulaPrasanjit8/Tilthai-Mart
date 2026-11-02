import React, { useState } from 'react';
import './SearchSuggestion.css';
import { useCart } from '../../context/StoreContext';

// Mock list of data to filter from
const DATA_ITEMS = [
  // Fruits & Grocery Variations
  'Apple', 'Apples', 'Red Apple', 'Green Apple',
  'Banana', 'Bananas', 'Ripe Banana',
  'Blueberry', 'Blueberries', 'Berries',
  'Blackberry', 'Blackberries',
  'Cherry', 'Cherries',
  'Coconut', 'Coconuts', 'Nariyal', 'Coconut Water',
  'Date', 'Dates', 'Khajur',
  'Dragonfruit', 'Dragon fruit',
  'Grape', 'Grapes', 'Green Grapes', 'Black Grapes',
  'Grapefruit', 'Grapefruits',
  'Kiwi', 'Kiwis',
  'Lemon', 'Lemons', 'Lemonade',
  'Lime', 'Limes', 'Lime Juice',
  'Mango', 'Mangoes', 'Alphonso', 'Aam', 'Mango Shake',
  'Orange', 'Oranges', 'Santra', 'Orange Juice',
  'Papaya', 'Papayas',
  'Peach', 'Peaches',
  'Pear', 'Pears',
  'Pineapple', 'Pineapples',
  'Strawberry', 'Strawberries', 'Strawberry Ice Cream',
  'Watermelon', 'Watermelons', 'Tarbooz',

  // Food & Ready Meals
  'biriyani', 'biryani', 'chicken biryani', 'mutton biryani', 'veg biryani',

  // Wallpaper & Decor
  'wall paper', 'wallpaper', 'wall coverings', 'wall stickers',

  // Raw Meat & Fish (Expanded for your specific categories)
  'raw chicken', 'chicken breast', 'chicken meat', 
  'raw mutton', 'mutton chops', 'goat meat',
  'raw fish', 'fresh fish', 'salmon', 'tuna', 'seafood'
];

export default function SearchSuggestion() {
  const {setOnSearched} = useCart()
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setOnSearched("")
      setIsOpen(false);
      return;
    }

    // Filter items that strictly *start with* the typed text (case-insensitive)
    const filtered = DATA_ITEMS.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestions(filtered);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setIsOpen(false); // Hide the box after selection
  };
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Type to search fruits, biriyani, grocery, etc..."
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue && setIsOpen(true)}
        // Blur with timeout allows the click event on the suggestion to fire first
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} 
      />
      
      {isOpen && suggestions.length > 0 && (
        <ul className="suggestion-box">
          {suggestions.map((item, index) => (
            <li 
              key={index} 
              className="suggestion-item"
              onClick={() => {handleSuggestionClick(item), setOnSearched(item)}}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
