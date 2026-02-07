import React, { useState, useEffect } from 'react';
import { FloatingNoButton } from './components/FloatingNoButton';
import { SuccessView } from './components/SuccessView';
import { BackgroundMusic } from './components/BackgroundMusic';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { IMAGES, MESSAGES } from './constants';
import { Heart, Stars } from 'lucide-react';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  
  // Create 3D floating hearts for background
  useEffect(() => {
    const container = document.body;
    const heartCount = 60; 
    // Maximize Unicorns 🦄 frequency
    const heartEmojis = ['💙', '✨', '🦄', '🦄', '🦄', '☁️', '🦄']; 
    
    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < heartCount; i++) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('floating-heart');
      
      const inner = document.createElement('span');
      inner.classList.add('heart-inner');
      inner.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      
      wrapper.appendChild(inner);

      // Random 3D Properties
      const depth = Math.random(); // 0 is far, 1 is close
      const size = Math.floor(Math.random() * 25 + 15) + (depth * 30); // Bigger range
      const blur = (1 - depth) * 4; // Blur for depth
      const duration = 15 - (depth * 8); // Faster movement if closer
      const delay = Math.random() * 15;
      const opacity = 0.3 + (depth * 0.7); 
      const rotateStart = Math.random() * 360;
      
      wrapper.style.left = `${Math.random() * 100}vw`;
      wrapper.style.fontSize = `${size}px`;
      wrapper.style.filter = `blur(${blur}px)`;
      wrapper.style.opacity = `${opacity}`;
      wrapper.style.animation = `floatUp ${duration}s linear infinite`;
      wrapper.style.animationDelay = `-${delay}s`; 
      wrapper.style.transform = `rotate(${rotateStart}deg)`; // Initial rotation
      wrapper.style.zIndex = depth > 0.8 ? '20' : '0'; 

      // Randomize sway speed
      inner.style.animationDuration = `${3 + Math.random() * 4}s`;

      container.appendChild(wrapper);
      elements.push(wrapper);
    }

    return () => {
      elements.forEach(el => el.remove());
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
  };

  const handleYes = () => {
    setAccepted(true);
  };

  if (!started) {
    return <WelcomeOverlay onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-sky-200 to-sky-300">
      <BackgroundMusic isPlaying={started} />
      
      {/* Decorative fixed background elements */}
      <div className="absolute top-10 left-10 text-white/50 animate-pulse z-0">
        <Stars size={48} />
      </div>
      <div className="absolute bottom-10 right-10 text-white/50 animate-pulse z-0" style={{ animationDelay: '1s' }}>
        <Heart size={48} />
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        {!accepted ? (
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-2 border-white/50 flex flex-col items-center text-center max-w-lg w-full transform transition-all hover:scale-[1.01] duration-500 relative z-10">
            <div className="w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden bg-black relative shadow-inner group">
               <img 
                 src={IMAGES.cuteBegging} 
                 alt="Blue Heart" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                 onError={(e) => {
                   // Fallback logic: Try the backup image, if that fails too, keep existing (or let it stay broken/black)
                   // We check if we've already tried the backup to avoid infinite loops
                   const imgElement = e.target as HTMLImageElement;
                   if (imgElement.src !== IMAGES.cuteBeggingBackup) {
                     imgElement.src = IMAGES.cuteBeggingBackup;
                   }
                 }}
               />
               {/* Overlay gradient for text readability if needed, or just aesthetic */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
               
               <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <Heart className="w-12 h-12 text-white fill-white animate-bounce drop-shadow-xl" />
               </div>
            </div>
            
            <h1 className="font-handwriting text-5xl md:text-6xl text-sky-600 mb-8 leading-tight drop-shadow-sm">
              {MESSAGES.proposal}
            </h1>

            <div className="flex flex-row items-center justify-center gap-6 w-full mt-4 h-20 relative">
              <button
                onClick={handleYes}
                className="bg-sky-500 hover:bg-sky-600 text-white font-body font-bold text-xl px-12 py-4 rounded-full shadow-sky-300/50 shadow-xl transform hover:-translate-y-1 transition-all duration-200 animate-pulse z-20"
              >
                {MESSAGES.buttonYes}
              </button>
              
              <div className="relative z-50">
                 <FloatingNoButton />
              </div>
            </div>
          </div>
        ) : (
          <SuccessView />
        )}
      </div>
      
      <footer className="absolute bottom-4 text-sky-700/60 font-body text-xs z-0">
        Made with 💙 for Maha
      </footer>
    </div>
  );
};

export default App;