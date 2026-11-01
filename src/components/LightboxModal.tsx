import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface LightboxModalProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onClose, onPrev, onNext]);

  if (activeIndex === null || !items[activeIndex]) return null;

  const currentItem = items[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen view: ${currentItem.label}`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3 text-sm text-white/80">
          <span className="font-mono text-xs text-[#9B0A0A] tabular-nums">
            0{activeIndex + 1} / 0{items.length}
          </span>
          <span className="text-[#5A5A5A]">·</span>
          <span className="font-medium text-white">{currentItem.label}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close fullscreen image viewer"
          className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/20 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Frame */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous gallery photograph"
          className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/80 border border-white/20 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <ResilientImage
          src={currentItem.image}
          alt={currentItem.alt}
          loading="eager"
          className="max-h-[78vh] max-w-[90vw] object-contain rounded-lg border border-white/10"
        />

        <button
          type="button"
          onClick={onNext}
          aria-label="Next gallery photograph"
          className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/80 border border-white/20 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Minimal Label */}
      <div className="text-center text-xs text-white/60">
        {currentItem.label}
      </div>
    </div>
  );
};
