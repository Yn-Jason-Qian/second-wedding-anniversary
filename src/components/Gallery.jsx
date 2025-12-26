import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

// Placeholders for user photos. 
// Replace the color arrays with paths to images in public/images, e.g., ['/images/us1.jpg', '/images/us2.jpg']
const memories = [
    {
        id: 1,
        date: '2023',
        caption: 'The Beginning',
        images: ['#ffcdd2', '#ef9a9a', '#e57373']
    },
    {
        id: 2,
        date: '2024',
        caption: 'First Trip Together',
        images: ['#f8bbd0', '#f48fb1']
    },
    {
        id: 3,
        date: '2024',
        caption: 'Our Little Home',
        images: ['#e1bee7', '#ce93d8', '#ba68c8']
    },
    {
        id: 4,
        date: '2025',
        caption: 'Anniversary Dinner',
        images: ['#d1c4e9', '#b39ddb']
    },
    {
        id: 5,
        date: '2025',
        caption: 'Adventures',
        images: ['#c5cae9', '#9fa8da', '#7986cb']
    },
    {
        id: 6,
        date: 'Forever',
        caption: 'To Many More',
        images: ['#b3e5fc', '#81d4fa']
    },
];

const Polaroid = ({ memory }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        }
        if (isRightSwipe) {
            prevImage();
        }
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        if (memory.images.length <= 1) return;
        setCurrentIndex((prev) => (prev + 1) % memory.images.length);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        if (memory.images.length <= 1) return;
        setCurrentIndex((prev) => (prev - 1 + memory.images.length) % memory.images.length);
    };

    return (
        <div className="polaroid">
            <div
                className="photo-placeholder"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{ touchAction: 'pan-y' }}
            >
                {memory.images.map((img, idx) => {
                    const isColor = img.startsWith('#');
                    return (
                        <div
                            key={idx}
                            className={`slide ${idx === currentIndex ? 'active' : ''}`}
                            style={{
                                backgroundColor: isColor ? img : 'transparent',
                                backgroundImage: isColor ? 'none' : `url(${img})`,
                            }}
                        >
                            {isColor && <span>Photo {idx + 1}</span>}
                        </div>
                    );
                })}

                {memory.images.length > 1 && (
                    <>
                        <button className="nav-btn prev" onClick={prevImage}>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="nav-btn next" onClick={nextImage}>
                            <ChevronRight size={16} />
                        </button>
                        <div className="photo-indicators">
                            {memory.images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="caption">
                <p className="caption-text">{memory.caption}</p>
                <span className="date">{memory.date}</span>
            </div>
        </div>
    );
};

const Gallery = () => {
    return (
        <section className="gallery-section">
            <div className="container">
                <div className="section-header">
                    <Camera className="icon" size={32} />
                    <h2>Our Sweet Memories</h2>
                    <p>Highlights from our journey so far</p>
                </div>

                <div className="gallery-grid">
                    {memories.map((memory) => (
                        <Polaroid key={memory.id} memory={memory} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
