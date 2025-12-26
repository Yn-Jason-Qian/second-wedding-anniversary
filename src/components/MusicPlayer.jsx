import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.log("Audio playback failed:", error);
                    alert("Please interact with the document first or allow audio to play.");
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Note: Most browsers block autoplay. User interaction is needed.

    return (
        <div className="music-player">
            <audio
                ref={audioRef}
                loop
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            // Placeholder royalty-free music. User should replace this.
            />
            <button
                className={`music-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label="Toggle Music"
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
        </div>
    );
};

export default MusicPlayer;
