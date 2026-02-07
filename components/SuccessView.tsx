import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { IMAGES, MESSAGES, REASONS_WHY_I_LOVE_YOU } from '../constants';
import { Heart } from 'lucide-react';

export const SuccessView: React.FC = () => {
  
  useEffect(() => {
    // Fire confetti immediately on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#ffffff'] // Blue theme colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-4 border-sky-200 text-center w-full">
        <h1 className="font-handwriting text-5xl md:text-7xl text-sky-600 mb-6 drop-shadow-sm">
          {MESSAGES.success}
        </h1>
        
        <div className="relative w-64 h-64 mx-auto mb-8">
          <img 
            src={IMAGES.happyCelebration} 
            alt="Happy Celebration" 
            className="w-full h-full object-contain rounded-2xl drop-shadow-lg"
          />
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Heart className="text-sky-500 fill-sky-500 w-12 h-12" />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Heart className="text-sky-500 fill-sky-500 w-10 h-10" />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-body font-semibold text-xl text-gray-700 mb-4 uppercase tracking-widest">
            Reasons Why I Love You
          </h2>
          <div className="h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-100">
            <div className="space-y-3">
              {REASONS_WHY_I_LOVE_YOU.map((reason, index) => (
                <div 
                  key={reason.id}
                  className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-center space-x-4 transform hover:scale-[1.02] transition-transform"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-2xl">{reason.emoji}</span>
                  <span className="font-body text-gray-700 text-lg font-medium text-left">{reason.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};