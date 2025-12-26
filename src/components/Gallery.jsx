import React, { useState, useEffect } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

// 1. Load all images from src/assets/memories recursively
const imagesModules = import.meta.glob('../assets/memories/**/*.{png,jpg,jpeg,webp}', { eager: true });

// Helper to extract structure from paths
const getMemoriesFromFolders = () => {
    const folders = {};

    Object.keys(imagesModules).forEach((path) => {
        // Expected path: ../assets/memories/FOLDER_NAME/image.jpg
        const parts = path.split('/');
        // parts indices: 0:.., 1:assets, 2:memories, 3:FOLDER_NAME, 4:filename
        const folderName = parts[3];

        if (!folders[folderName]) {
            folders[folderName] = [];
        }

        // Add image URL to the folder's list
        folders[folderName].push(imagesModules[path].default);
    });

    // Convert folders object to array of memory objects
    // Convention: YEAR_Caption-Text (e.g. 2023_The-Beginning)
    const memories = Object.keys(folders).map((folderName, index) => {
        const [yearStr, ...captionParts] = folderName.split('_');
        const year = yearStr || 'Unknown Date';
        // Replace hyphens with spaces for the caption
        const caption = captionParts.join(' ').replace(/-/g, ' ') || 'Untitled';

        return {
            id: index,
            date: year,
            caption: caption,
            images: folders[folderName],
            folderName: folderName // keep raw folder name just in case
        };
    });

    // Sort by Year (Descending or Ascending) - let's do Ascending (Oldest first)
    return memories.sort((a, b) => a.date.localeCompare(b.date));
};

const Polaroid = ({ memory }) => {
    const { images } = memory;
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
        if (images.length <= 1) return;
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        if (images.length <= 1) return;
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
                {images.length === 0 ? (
                    // Fallback if folder exists but is empty
                    <div className="slide active" style={{ backgroundColor: '#eee', color: '#666', fontSize: '12px' }}>
                        Empty Folder
                    </div>
                ) : (
                    images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`slide ${idx === currentIndex ? 'active' : ''}`}
                            style={{
                                backgroundImage: `url(${img})`,
                            }}
                        />
                    ))
                )}

                {images.length > 1 && (
                    <>
                        <button className="nav-btn prev" onClick={prevImage}>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="nav-btn next" onClick={nextImage}>
                            <ChevronRight size={16} />
                        </button>
                        <div className="photo-indicators">
                            {images.map((_, idx) => (
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
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const data = getMemoriesFromFolders();
        setMemories(data);
    }, []);

    return (
        <section className="gallery-section">
            <div className="container">
                <div className="section-header">
                    <Camera className="icon" size={32} />
                    <h2>Our Sweet Memories</h2>
                    <p>Highlights from our journey so far</p>
                </div>

                <div className="gallery-grid">
                    {memories.length > 0 ? (
                        memories.map((memory) => (
                            <Polaroid key={memory.id} memory={memory} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#888' }}>
                            No memories found. Add folders to src/assets/memories/
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
