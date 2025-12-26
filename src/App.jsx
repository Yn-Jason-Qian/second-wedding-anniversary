import React from 'react';
import Hero from './components/Hero';
import Timer from './components/Timer';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <div className="app">
      <Hero />
      <Timer />
      <Gallery />
      <Letter />
      <MusicPlayer />
    </div>
  );
}

export default App;
