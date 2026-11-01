import React from 'react';
import { Maximize2 } from 'lucide-react';
import { IMAGES, GALLERY_ITEMS } from '../data/siteData';
import { SplitHero } from '../components/SplitHero';
import { ResilientImage } from '../components/ResilientImage';
import { CtaBanner } from '../components/CtaBanner';
import styles from '../styles/editorial.module.css';

interface GalleryPageProps {
  onOpenEnquiry: () => void;
  onOpenLightbox: (index: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenEnquiry,
  onOpenLightbox,
}) => {
  return (
    <div>
      {/* Internal Page Split Hero (100svh) */}
      <SplitHero
        kicker="Visual Archive"
        titlePrefix="Architecture Of"
        titleHighlight="Strength."
        description="Inside our Bengaluru, Mumbai, Hyderabad, and Gurugram training halls. Select any photograph to inspect in full-screen resolution."
        primaryCtaLabel="Book a Floor Visit"
        onPrimaryCta={onOpenEnquiry}
        image={IMAGES.athleteSquat}
        imageAlt="Athlete bracing for a heavy barbell back squat inside DraftWorks"
        imageCaption="Main Squat Bay — Calibrated Steel & Monolith Racks"
      />

      {/* Asymmetric Editorial Photography Section */}
      <section
        aria-labelledby="gallery-grid-heading"
        className="bg-black text-white py-20 lg:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-medium text-[#9B0A0A] mb-2">
                01. Club Photography
              </p>
              <h2
                id="gallery-grid-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-white`}
              >
                Platforms, Racks &amp; <span className="text-[#9B0A0A]">Heavy Iron.</span>
              </h2>
            </div>
            <p className="text-xs text-[#5A5A5A]">
              Click any frame to open the full-screen viewer
            </p>
          </div>

          {/* Asymmetric Editorial Layout: Varying spans with strict minimal label + fullscreen button */}
          
{/* Responsive Asymmetric Editorial Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
  {GALLERY_ITEMS.map((item, idx) => {
    const spanClasses =
      idx === 0
        ? 'md:col-span-8'
        : idx === 1
        ? 'md:col-span-4'
        : idx === 2
        ? 'md:col-span-4'
        : idx === 3
        ? 'md:col-span-8'
        : 'md:col-span-6';

    const heightClasses =
      'h-[280px] sm:h-[300px] md:h-[340px] lg:h-[400px]';

    return (
      <div
        key={item.id}
        onClick={() => onOpenLightbox(idx)}
        className={`
          ${spanClasses}
          ${heightClasses}
          relative group rounded-xl overflow-hidden
          bg-[#111111] border border-white/12
          min-w-0 cursor-pointer
        `}
      >
        <ResilientImage
          src={item.image}
          alt={item.alt}
          style={{
            objectPosition: item.objectPosition || 'center',
          }}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
          <span className="text-xs font-medium text-white/90 min-w-0 truncate">
            {item.label}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(idx);
            }}
            aria-label={`Open ${item.label} in fullscreen viewer`}
            className="shrink-0 w-10 h-10 rounded-lg bg-black/80 border border-white/20 text-white group-hover:bg-[#9B0A0A] group-hover:border-[#9B0A0A] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  })}
</div>

        </div>
      </section>

      <CtaBanner onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
