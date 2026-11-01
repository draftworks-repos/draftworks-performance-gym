import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import styles from '../styles/editorial.module.css';

interface CtaBannerProps {
  onOpenEnquiry: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenEnquiry }) => {
  return (
    <section
      aria-labelledby="cta-banner-heading"
      className="relative bg-black text-white overflow-hidden border-t border-white/15"
    >
      {/* Full-width Background Photograph with Controlled Black Overlay */}
      <div className="absolute inset-0">
        <ResilientImage
          src={IMAGES.heroDeadlift}
          alt="Loaded competition barbell inside DraftWorks strength club"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="max-w-2xl space-y-6">
          <h2
            id="cta-banner-heading"
            className={`${styles.sectionHeading} text-4xl sm:text-6xl text-white`}
          >
            Step Onto The <span className="text-[#9B0A0A]">Platform.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
            Schedule a 1-on-1 floor consultation and movement assessment at any DraftWorks
            branch in Bengaluru, Mumbai, Hyderabad, or Delhi NCR.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-8 py-4 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white font-semibold text-sm rounded-md inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <span>Book a Trial Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
