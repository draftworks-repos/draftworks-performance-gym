import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ResilientImage } from './ResilientImage';
import styles from '../styles/editorial.module.css';

interface SplitHeroProps {
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  primaryCtaLabel: string;
  onPrimaryCta: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCta?: () => void;
  image: string;
  imageAlt: string;
  imageCaption?: string;
}

export const SplitHero: React.FC<SplitHeroProps> = ({
  kicker,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  description,
  primaryCtaLabel,
  onPrimaryCta,
  secondaryCtaLabel,
  onSecondaryCta,
  image,
  imageAlt,
  imageCaption,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
      );
    }
    if (imageWrapRef.current) {
      gsap.fromTo(
        imageWrapRef.current,
        { scale: 1.03, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.08 }
      );
    }
  }, [titlePrefix, titleHighlight]);

  return (
    <section className="min-h-[100svh] bg-black text-white pt-20 flex items-stretch border-b border-white/10">
      <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Editorial Content */}
        <div
          ref={contentRef}
          className="lg:col-span-6 flex flex-col justify-center space-y-6 py-4"
        >
          <p className="text-xs sm:text-sm font-medium text-[#9B0A0A] tracking-wide">
            {kicker}
          </p>

          <h1
            className={`${styles.heroHeadline} text-4xl sm:text-6xl lg:text-[64px] text-white max-w-xl`}
          >
            {titlePrefix}{' '}
            <span className="text-[#9B0A0A]">{titleHighlight}</span>
            {titleSuffix ? ` ${titleSuffix}` : ''}
          </h1>

          <p className="text-base sm:text-lg text-white/75 max-w-lg leading-relaxed">
            {description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              onClick={onPrimaryCta}
              className="px-7 py-4 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white font-semibold text-sm rounded-md inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {secondaryCtaLabel && onSecondaryCta && (
              <button
                type="button"
                onClick={onSecondaryCta}
                className="px-6 py-4 border border-white/20 hover:border-white text-white font-medium text-sm rounded-md inline-flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {secondaryCtaLabel}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Full-Height Split Photography */}
        <div
          ref={imageWrapRef}
          className="lg:col-span-6 relative min-h-[360px] sm:min-h-[460px] lg:min-h-full rounded-xl overflow-hidden border border-white/15 bg-[#0D0D0D]"
        >
          <ResilientImage
            src={image}
            alt={imageAlt}
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
          {imageCaption && (
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white/80">
              <span>{imageCaption}</span>
              <span className="text-[#9B0A0A] font-semibold">DraftWorks India</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
