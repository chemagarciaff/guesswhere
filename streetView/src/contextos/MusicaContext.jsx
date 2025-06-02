// src/context/MusicContext.jsx
import { createContext, useRef, useState } from 'react';
import song1 from './../assets/songs/Aylex - Heaven (freetouse.com).mp3';
import song2 from '../assets/songs/Hazelwood - Maui (freetouse.com).mp3';
import song3 from '../assets/songs/Luke Bergs & Waesto - Homesick (freetouse.com).mp3';
import song4 from '../assets/songs/Lukrembo - Donut (freetouse.com).mp3';
import song5 from '../assets/songs/massobeats - gingersweet (freetouse.com).mp3';

const songs = [song1, song2, song3, song4, song5];

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const play = () => {
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const next = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
  };

  const prev = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
  };

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, play, pause, next, prev, audioRef }}>
      <audio ref={audioRef} src={songs[currentSong]} onEnded={next} />
      {children}
    </MusicContext.Provider>
  );
};
