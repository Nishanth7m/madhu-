import React from 'react';
import { Mail } from 'lucide-react';

interface WelcomeOverlayProps {
  onStart: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onStart }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-sky-100 flex items-center justify-center p-4 cursor-pointer"
      onClick={onStart}
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border-2 border-sky-200 transform hover:scale-105 transition-transform duration-300">
        <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-sky-500" />
        </div>
        <h2 className="font-handwriting text-4xl text-gray-800 mb-4">
          For Maha...
        </h2>
        <p className="font-body text-gray-500 mb-8">
          You have a special message! Tap to open.
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onStart();
          }}
          className="bg-sky-500 text-white font-body font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-600 transition-colors animate-pulse"
        >
          Open Envelope 💌
        </button>
      </div>
    </div>
  );
};