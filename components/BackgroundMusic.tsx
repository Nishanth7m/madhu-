import React, { useEffect, useRef } from 'react';
import { IMAGES } from '../constants';

interface BackgroundMusicProps {
  isPlaying: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.volume = 0.4; // Soft background level
      audioRef.current.play().catch((err) => {
        console.warn("Audio autoplay blocked:", err);
      });
    }
  }, [isPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src={IMAGES.musicUrl} 
      loop 
      preload="auto"
    />
  );
};