import React from 'react';
import Hero from './components/Hero';
import Timer from './components/Timer';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import MusicPlayer from './components/MusicPlayer';
import FloatingHearts from './components/FloatingHearts';
import Reasons from './components/Reasons';

function App() {
  return (
    <div className="app">
      <FloatingHearts />
      <Hero />
      <Timer />
      <Gallery />
      <Reasons />
      <Letter />
      <MusicPlayer />
    </div>
  );
}

export default App;
