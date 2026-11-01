import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRANSFORMATIONS } from '../data/siteData';
import { clampSliderPercentage } from '../utils/logic';
import { ResilientImage } from './ResilientImage';
import styles from '../styles/editorial.module.css';

export const BeforeAfterSection: React.FC = () => {
  const [activePersonIndex, setActivePersonIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentTransformation = TRANSFORMATIONS[activePersonIndex];

  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPercentage = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(clampSliderPercentage(rawPercentage));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updatePositionFromClientX(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => clampSliderPercentage(prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => clampSliderPercentage(prev + 5));
    }
  };

  const handlePrevPerson = () => {
    setActivePersonIndex((prev) =>
      prev === 0 ? TRANSFORMATIONS.length - 1 : prev - 1
    );
    setSliderPosition(50);
  };

  const handleNextPerson = () => {
    setActivePersonIndex((prev) =>
      prev === TRANSFORMATIONS.length - 1 ? 0 : prev + 1
    );
    setSliderPosition(50);
  };

  return (
    <section
      aria-labelledby="transformations-heading"
      className="bg-[#080808] text-white py-20 lg:py-28 border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Minimal Header + Person Switcher (Only Name & Transformation Duration) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#9B0A0A] mb-2">
              Documented Progression
            </p>
            <h2
              id="transformations-heading"
              className={`${styles.sectionHeading} text-3xl sm:text-5xl text-white`}
            >
              Before &amp; <span className="text-[#9B0A0A]">After</span>
            </h2>
          </div>

          {/* Navigation between people showing ONLY person's name and duration */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="text-left md:text-right">
              <p className="font-display text-xl uppercase tracking-tight text-white">
                {currentTransformation.name}
              </p>
              <p className="text-xs text-[#5A5A5A] tabular-nums">
                {currentTransformation.duration}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevPerson}
                aria-label="Previous member transformation"
                className="w-11 h-11 rounded-lg border border-white/15 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPerson}
                aria-label="Next member transformation"
                className="w-11 h-11 rounded-lg border border-white/15 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Before-and-After Image Comparison with Draggable Centre Divider */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`${styles.comparisonContainer} aspect-[16/10] sm:aspect-[16/9] max-h-[680px] w-full border border-white/15 cursor-ew-resize`}
        >
          {/* After Image (Full Base Layer) */}
          <div className="absolute inset-0 w-full h-full">
            <ResilientImage
              src={currentTransformation.afterImage}
              alt={`${currentTransformation.name} after ${currentTransformation.duration}`}
              style={{ filter: currentTransformation.afterFilter }}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            <span className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-medium px-3 py-1 rounded">
              After ({currentTransformation.duration})
            </span>
          </div>

          {/* Before Image (Clipped by Slider Percentage) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <ResilientImage
              src={currentTransformation.beforeImage}
              alt={`${currentTransformation.name} before training`}
              style={{ filter: currentTransformation.beforeFilter }}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            <span className="absolute bottom-4 left-4 bg-black/80 text-white/85 text-xs font-medium px-3 py-1 rounded">
              Before
            </span>
          </div>

          {/* Draggable Centre Divider Line & Accessible Handle */}
          <div
            className={styles.dividerLine}
            style={{ left: `${sliderPosition}%` }}
          />
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Comparison divider for ${currentTransformation.name}`}
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={Math.round(sliderPosition)}
            onKeyDown={handleKeyDown}
            style={{ left: `${sliderPosition}%` }}
            className={styles.dividerHandle}
          >
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
