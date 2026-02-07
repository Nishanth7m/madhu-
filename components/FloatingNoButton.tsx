import React, { useState, useEffect, useCallback } from 'react';
import { NO_BUTTON_PHRASES } from '../constants';

export const FloatingNoButton: React.FC = () => {
  const [position, setPosition] = useState<{ top: string; left: string; position: 'static' | 'fixed' }>({
    top: 'auto',
    left: 'auto',
    position: 'static',
  });
  
  const [text, setText] = useState("No");

  const moveButton = useCallback(() => {
    // Calculate random position within viewport, keeping button fully visible
    // padding of 100px to avoid edges
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);

    // Change text randomly
    const randomPhrase = NO_BUTTON_PHRASES[Math.floor(Math.random() * NO_BUTTON_PHRASES.length)];
    setText(randomPhrase);

    setPosition({
      top: `${y}px`,
      left: `${x}px`,
      position: 'fixed',
    });
  }, []);

  return (
    <button
      className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-full shadow-md transition-all duration-200 z-50 hover:bg-gray-500 font-body whitespace-nowrap"
      style={{
        position: position.position,
        top: position.top,
        left: position.left,
        transition: 'all 0.2s ease-out', // Smooth movement
      }}
      onMouseEnter={moveButton}
      onTouchStart={moveButton} // Mobile support
      onClick={moveButton} // Fallback if they manage to click
    >
      {text}
    </button>
  );
};