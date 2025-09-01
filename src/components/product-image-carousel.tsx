'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ProductImageCarouselProps {
  images: string[];
  productTitle: string;
  onImageClick: (imageUrl: string) => void;
  className?: string;
  indicatorStyle?: 'dots' | 'bars';
}

export default function ProductImageCarousel({ 
  images, 
  productTitle, 
  onImageClick,
  className = "",
  indicatorStyle = 'bars'
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragThreshold = 50;

  useEffect(() => {
    setCurrentIndex(0);
    setTranslateX(0);
  }, [images]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (images.length <= 1) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  }, [images.length]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || images.length <= 1) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    
    e.preventDefault();
    setTranslateX(deltaX);
  }, [isDragging, startX, images.length]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || images.length <= 1) return;

    setIsDragging(false);
    
    if (Math.abs(translateX) > dragThreshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (translateX < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
    
    setTranslateX(0);
  }, [isDragging, translateX, dragThreshold, currentIndex, images.length]);

  const handleMouseStart = useCallback((e: React.MouseEvent) => {
    if (images.length <= 1) return;
    setIsDragging(true);
    setStartX(e.clientX);
  }, [images.length]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || images.length <= 1) return;
    
    const currentX = e.clientX;
    const deltaX = currentX - startX;
    setTranslateX(deltaX);
  }, [isDragging, startX, images.length]);

  const handleMouseEnd = useCallback(() => {
    if (!isDragging || images.length <= 1) return;

    setIsDragging(false);
    
    if (Math.abs(translateX) > dragThreshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (translateX < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
    
    setTranslateX(0);
  }, [isDragging, translateX, dragThreshold, currentIndex, images.length]);

  const handleImageClick = () => {
    if (!isDragging && Math.abs(translateX) < 10) {
      onImageClick(images[currentIndex]);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setTranslateX(0);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div className={`relative bg-white group ${className}`}>
      <div 
        ref={containerRef}
        className="relative overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseEnd}
        onMouseLeave={handleMouseEnd}
        style={{ touchAction: images.length > 1 ? 'pan-y' : 'auto' }}
      >
        <div
          className={`transition-transform duration-300 ease-out ${isDragging ? 'scale-95' : ''}`}
          style={{
            transform: `translateX(${translateX}px)`,
            cursor: isDragging ? 'grabbing' : (images.length > 1 ? 'grab' : 'pointer')
          }}
        >
          <Image
            alt={productTitle}
            className="w-full h-60 object-contain bg-white cursor-pointer transition-transform hover:scale-105"
            src={currentImage}
            width={400}
            height={240}
            onClick={handleImageClick}
            draggable={false}
            priority={currentIndex === 0}
          />
        </div>

        {images.length > 1 && currentIndex === 0 && !isDragging && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 rounded-full px-6 py-3 text-sm font-semibold text-gray-800 shadow-xl animate-pulse border-2 border-white">
                👈 Desliza para ver más 👉
              </div>
            </div>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 bg-black/70 rounded-full px-4 py-2.5 backdrop-blur-sm shadow-lg">
          {images.map((_: string, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={
                indicatorStyle === 'bars'
                  ? `h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-white w-8 shadow-lg"
                        : "bg-white/50 hover:bg-white/75 w-5"
                    }`
                  : `w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-white scale-125 shadow-lg ring-2 ring-white/30"
                        : "bg-white/50 hover:bg-white/75 hover:scale-110"
                    }`
              }
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/80 text-white text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg border border-white/20">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
}
