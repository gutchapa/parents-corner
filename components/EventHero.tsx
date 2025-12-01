import React, { useEffect, useState, useRef } from 'react';
import { CarouselImage } from '../types';

interface EventHeroProps {
  images: CarouselImage[];
}

const EventHero: React.FC<EventHeroProps> = ({ images }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // Pixels per frame

    const scroll = () => {
      scrollPos += speed;
      // Reset if we've scrolled past the first set of images (assuming duplicated list for infinite effect)
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Duplicate images content for seamless loop
    const originalContent = scrollContainer.innerHTML;
    scrollContainer.innerHTML = originalContent + originalContent;

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [images]);

  return (
    <div className="w-full h-32 md:h-40 bg-brand-900 rounded-xl overflow-hidden relative shadow-inner my-6">
      <div className="absolute top-2 left-3 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
        Recent Events
      </div>
      <div 
        ref={scrollRef}
        className="flex h-full overflow-x-hidden whitespace-nowrap items-center"
      >
        {images.map((img) => (
          <div key={img.id} className="inline-block h-full w-64 md:w-80 flex-shrink-0 border-r-2 border-white/20 relative group">
            <img 
              src={img.url} 
              alt={img.alt} 
              className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2">
              <span className="text-white text-sm font-medium">{img.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventHero;
