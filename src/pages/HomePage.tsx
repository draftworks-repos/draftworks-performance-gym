import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import gsap from 'gsap';
import {
  IMAGES,
  BRAND_INFO,
  PROGRAMS,
  WHY_US_POINTS,
  COACHES,
  GALLERY_ITEMS,
  BRANCHES,
  GOOGLE_REVIEWS,
  PageRoute,
} from '../data/siteData';
import {
  getVisibleCardCount,
  getMaxCarouselIndex,
  stepCarouselIndex,
} from '../utils/logic';
import { ResilientImage } from '../components/ResilientImage';
import { BeforeAfterSection } from '../components/BeforeAfterSection';
import { CtaBanner } from '../components/CtaBanner';
import styles from '../styles/editorial.module.css';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
  onOpenLightbox: (index: number) => void;
}

/**
 * Official-style Google 'G' SVG mark for the Google Reviews section.
 */
const GoogleGIcon: React.FC = () => (
  <svg
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    aria-label="Google Review"
    role="img"
  >
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.8c-.2-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.8z"
    />
    <path
      fill="#34A853"
      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.8C3.5 19.9 7.4 23 12 23z"
    />
  </svg>
);

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenLightbox,
}) => {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const aboutStatsRef = useRef<HTMLDivElement>(null);

  // Viewport width for responsive horizontal carousels
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Carousel indices
  const [programIndex, setProgramIndex] = useState(0);
  const [branchIndex, setBranchIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Touch swipe start X refs
  const programTouchStartX = useRef<number | null>(null);
  const branchTouchStartX = useRef<number | null>(null);
  const reviewTouchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clamp carousel indices if viewport expands
  const programVisible = getVisibleCardCount(viewportWidth, 3);
  const branchVisible = getVisibleCardCount(viewportWidth, 3);
  const reviewVisible = getVisibleCardCount(viewportWidth, 3);

  const maxProgramIdx = getMaxCarouselIndex(PROGRAMS.length, programVisible);
  const maxBranchIdx = getMaxCarouselIndex(BRANCHES.length, branchVisible);
  const maxReviewIdx = getMaxCarouselIndex(GOOGLE_REVIEWS.length, reviewVisible);

  const safeProgramIdx = Math.min(programIndex, maxProgramIdx);
  const safeBranchIdx = Math.min(branchIndex, maxBranchIdx);
  const safeReviewIdx = Math.min(reviewIndex, maxReviewIdx);

  // GSAP Hero Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroTextRef.current) return;

    gsap.fromTo(
      heroTextRef.current.children,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, []);

  useEffect(() => {
    const stats = aboutStatsRef.current;
    if (!stats || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const counters = Array.from(stats.querySelectorAll<HTMLElement>('[data-count]'));
    const timeline = gsap.timeline({ paused: true });

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      const prefix = counter.dataset.prefix ?? '';
      const suffix = counter.dataset.suffix ?? '';
      const minDigits = Number(counter.dataset.minDigits ?? 1);
      const progress = { value: 0 };
      const formatCount = (value: number) =>
        `${prefix}${String(Math.round(value)).padStart(minDigits, '0')}${suffix}`;

      timeline.to(
        progress,
        {
          value: target,
          duration: 3,
          ease: 'power1.out',
          onUpdate: () => {
            counter.textContent = formatCount(progress.value);
          },
          onComplete: () => {
            counter.textContent = formatCount(target);
          },
        },
        0
      );
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timeline.play();
      },
      { threshold: 0.35 }
    );
    observer.observe(stats);

    return () => {
      observer.disconnect();
      timeline.kill();
    };
  }, []);

  return (
    <div>
      {/* 1. HOMEPAGE FULL-SCREEN HERO (100svh background photograph) */}
      <section className="relative min-h-[100svh] bg-black text-white flex items-end pb-16 sm:pb-24 pt-28 overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={IMAGES.heroDeadlift}
            alt="Strength athlete gripping a heavy deadlift barbell on a wooden platform at DraftWorks"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          {/* Controlled dark editorial scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12">
          <div ref={heroTextRef} className="max-w-3xl space-y-6">
            <p className="text-xs sm:text-sm font-medium text-white/80 tracking-wide">
              Bengaluru · Mumbai · Hyderabad · Delhi NCR
            </p>

            <h1
              className={`${styles.heroHeadline} text-5xl sm:text-7xl lg:text-[86px] text-white`}
            >
              Built Under <span className="text-[#9B0A0A]">Heavy Iron.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
              DraftWorks is a private-format strength and conditioning club engineered around
              calibrated steel, periodized barbell programming, and uncompromising coaching.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto px-8 py-4 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white font-semibold text-sm rounded-md inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <span>Book a Trial Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-white hover:text-[#9B0A0A] py-2 transition-colors"
              >
                <span>Explore Club Memberships</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION (Light Editorial Composition — Contrast from dark hero) */}
      <section
        aria-labelledby="home-about-heading"
        className="bg-white text-black py-20 lg:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Editorial Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold text-[#9B0A0A] tracking-wide">
                01. The DraftWorks Standard
              </p>

              <h2
                id="home-about-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl lg:text-[54px] text-black`}
              >
                A Training Hall For <span className="text-[#9B0A0A]">Serious Lifters</span>, Not
                A Commercial Fitness Floor.
              </h2>

              <p className="text-base text-black/80 leading-relaxed">
                Founded in {BRAND_INFO.foundedYear} in Indiranagar, Bengaluru by former national
                93kg powerlifter <strong className="font-semibold text-black">{BRAND_INFO.founder}</strong>,
                DraftWorks was created to solve a simple problem: Indian metropolitan cities had
                hundreds of treadmill gyms, but almost nowhere to squat, pull, and press with
                competition-standard equipment.
              </p>

              <p className="text-base text-black/75 leading-relaxed">
                Across our <strong className="font-semibold text-black">{BRAND_INFO.branchCount} branches</strong> in
                Bengaluru, Mumbai, Hyderabad, and Delhi NCR, our philosophy remains unchanged—progressive
                overload, logged mesocycles, and floor coaches who correct biomechanics on every platform.
              </p>

              {/* Editorial Key Facts Row (2x2 on tablet/mobile, 4 across on desktop) */}
              <div
                ref={aboutStatsRef}
                className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-black/15"
              >
                <div>
                  <p
                    className="font-display text-3xl font-bold text-black tabular-nums"
                    data-count={BRAND_INFO.branchCount}
                    data-min-digits="2"
                  >
                    0{BRAND_INFO.branchCount}
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Branches in India</p>
                </div>
                <div>
                  <p
                    className="font-display text-3xl font-bold text-black tabular-nums"
                    data-count="2019"
                  >
                    2019
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Founded in Bengaluru</p>
                </div>
                <div>
                  <p
                    className="font-display text-3xl font-bold text-[#9B0A0A] tabular-nums"
                    data-count="10"
                    data-prefix="+"
                    data-suffix="g"
                  >
                    +10g
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Plate Calibration</p>
                </div>
                <div>
                  <p
                    className="font-display text-3xl font-bold text-black tabular-nums"
                    data-count="12"
                    data-suffix=" Wk"
                  >
                    12 Wk
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Periodized Cycles</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-[#9B0A0A] transition-colors cursor-pointer"
                >
                  <span>Read Our Full Story &amp; Philosophy</span>
                  <ArrowRight className="w-4 h-4 text-[#9B0A0A]" />
                </button>
              </div>
            </div>

            {/* Right Asymmetric Photography Composition */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-end">
              <div className="sm:col-span-7 rounded-xl overflow-hidden bg-black aspect-[3/4]">
                <ResilientImage
                  src={IMAGES.coachFounder}
                  alt="Founder Vikramaditya Rao standing beside competition barbell rack"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-5 space-y-4">
                <div className="rounded-xl overflow-hidden bg-black aspect-[4/3]">
                  <ResilientImage
                    src={IMAGES.facilityRacks}
                    alt="DraftWorks custom matte-black power racks and lifting platforms"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 rounded-xl bg-[#F4F4F4] border border-black/10 space-y-1.5">
                  <p className="font-display text-sm uppercase tracking-wider text-[#9B0A0A]">
                    Founder Note
                  </p>
                  <p className="text-xs text-black/80 leading-relaxed">
                    “Strength is not an aesthetic trend. It is a measurable physical skill built
                    through years of disciplined execution.”
                  </p>
                  <p className="text-xs font-semibold text-black pt-1">
                    — {BRAND_INFO.founder}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES / TRAINING PROGRAMS (Horizontal Carousel on Dark Canvas) */}
      <section
        aria-labelledby="programs-heading"
        className="bg-black text-white py-20 lg:py-28 border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header + Desktop/Tablet Carousel Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-medium text-[#9B0A0A] mb-2">
                02. Training Disciplines
              </p>
              <h2
                id="programs-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-white`}
              >
                Five Core <span className="text-[#9B0A0A]">Programs.</span> One Unified Club.
              </h2>
            </div>

            {/* Desktop & Tablet Controls (Hidden on mobile, placed below container on mobile per requirement 12) */}
            <div className="hidden sm:flex justify-end items-center gap-3 w-1/2 lg:w-auto">
              <span className="text-xs text-[#5A5A5A] tabular-nums mr-2">
                0{safeProgramIdx + 1} / 0{maxProgramIdx + 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setProgramIndex((prev) =>
                    stepCarouselIndex(prev, 'prev', PROGRAMS.length, programVisible)
                  )
                }
                disabled={safeProgramIdx === 0}
                aria-label="Previous training program"
                className="w-11 h-11 rounded-lg border border-white/20 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setProgramIndex((prev) =>
                    stepCarouselIndex(prev, 'next', PROGRAMS.length, programVisible)
                  )
                }
                disabled={safeProgramIdx >= maxProgramIdx}
                aria-label="Next training program"
                className="w-11 h-11 rounded-lg border border-white/20 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Smooth Horizontal Sliding Carousel Track */}
          <div
            className={styles.carouselViewport}
            onTouchStart={(e) => {
              programTouchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (programTouchStartX.current === null) return;
              const deltaX = e.changedTouches[0].clientX - programTouchStartX.current;
              if (deltaX < -40) {
                setProgramIndex((prev) =>
                  stepCarouselIndex(prev, 'next', PROGRAMS.length, programVisible)
                );
              } else if (deltaX > 40) {
                setProgramIndex((prev) =>
                  stepCarouselIndex(prev, 'prev', PROGRAMS.length, programVisible)
                );
              }
              programTouchStartX.current = null;
            }}
          >
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translate3d(-${safeProgramIdx * (100 / programVisible)}%, 0, 0)`,
              }}
            >
              {PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  style={{ flex: `0 0 ${100 / programVisible}%` }}
                  className="px-2.5 first:pl-0 last:pr-0 box-border"
                >
                  <article className="h-full bg-[#0C0C0C] border border-white/15 rounded-xl overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <ResilientImage
                          src={program.image}
                          alt={program.title}
                          style={{ objectPosition: program.imagePosition || 'center' }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute top-4 left-4 font-display text-2xl font-bold text-[#9B0A0A] tabular-nums">
                          {program.number}
                        </span>
                      </div>

                      <div className="p-6 space-y-2.5">
                        <p className="text-xs text-[#5A5A5A]">{program.focus}</p>
                        <h3 className="font-display text-2xl uppercase tracking-tight text-white">
                          {program.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {program.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <button
                        type="button"
                        onClick={() => onOpenEnquiry(program.title)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#9B0A0A] transition-colors cursor-pointer"
                      >
                        <span>Enquire About This Discipline</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#9B0A0A]" />
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel Controls BELOW Card Container (Requirement 12) */}
          <div className="mt-6 flex sm:hidden items-center justify-between">
            <span className="text-xs text-[#5A5A5A] tabular-nums">
              Program 0{safeProgramIdx + 1} of 0{PROGRAMS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setProgramIndex((prev) =>
                    stepCarouselIndex(prev, 'prev', PROGRAMS.length, programVisible)
                  )
                }
                disabled={safeProgramIdx === 0}
                aria-label="Previous training program mobile"
                className="w-11 h-11 rounded-lg border border-white/20 text-white hover:border-[#9B0A0A] disabled:opacity-35 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setProgramIndex((prev) =>
                    stepCarouselIndex(prev, 'next', PROGRAMS.length, programVisible)
                  )
                }
                disabled={safeProgramIdx >= maxProgramIdx}
                aria-label="Next training program mobile"
                className="w-11 h-11 rounded-lg border border-white/20 text-white hover:border-[#9B0A0A] disabled:opacity-35 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY US SECTION (Distinctive Editorial Composition on Light Surface — NOT a card grid) */}
      <section
        aria-labelledby="why-us-heading"
        className="bg-[#F7F7F7] text-black py-20 lg:py-28 border-t border-black/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-[#9B0A0A] tracking-wide mb-6">
                03. Why DraftWorks
              </p>

              <h2
                id="why-us-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-black max-w-3xl`}
              >
                Built Around <span className="text-[#9B0A0A]">Strength.</span>
                <br />
                Not Membership Numbers.
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-base text-black/75 leading-relaxed max-w-lg">
                Every decision on our floor has a purpose. From equipment selection
                to training space, we prioritize the things that actually move
                your performance forward.
              </p>
            </div>
          </div>

          {/* Training Principles */}
          <div className="grid gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/20 border-b border-black/20">
            {WHY_US_POINTS.map((point, idx) => (
              <div
                key={point.index}
                className={`py-8 lg:py-10 pr-6 ${
                  idx !== 3 ? 'lg:border-r border-black/15' : ''
                } ${
                  idx % 2 === 0 ? 'sm:border-r border-black/15' : ''
                } lg:pl-7 first:lg:pl-0`}
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="font-display text-3xl font-bold text-[#9B0A0A] tabular-nums">
                    {point.index}
                  </span>
                  <span className="text-xs text-black/40 tracking-widest">
                    / 04
                  </span>
                </div>

                <h3 className="font-display text-2xl uppercase tracking-tight text-black mb-3">
                  {point.title}
                </h3>

                <p className="text-sm sm:text-base text-black/65 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Visual Statement */}
          <div className="relative mt-10 min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden bg-black">
            <ResilientImage
              src={IMAGES.athleteSquat}
              alt="Athlete preparing for a heavy squat"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

          </div>

        </div>
      </section>


      {/* 5. BEFORE & AFTER TRANSFORMATION SECTION (Draggable Centre Divider) */}
      <BeforeAfterSection />

      {/* 6. OUR COACHES SECTION (Light Surface, Strong Trainer Photography) */}
      <section
        aria-labelledby="coaches-heading"
        className="bg-white text-black py-20 lg:py-28 border-t border-black/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold text-[#9B0A0A] mb-2">
                04. Coaching Leadership
              </p>
              <h2
                id="coaches-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-black`}
              >
                Led By Competitive <span className="text-[#9B0A0A]">Strength Coaches.</span>
              </h2>
            </div>
            <p className="text-sm text-[#5A5A5A] max-w-md">
              Every floor coach holds accredited strength and conditioning credentials and
              active competition experience on the platform.
            </p>
          </div>

          {/* Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COACHES.map((coach) => (
              <article key={coach.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black mb-5">
                  <ResilientImage
                    src={coach.image}
                    alt={`${coach.name} — ${coach.role}`}
                    style={{ objectPosition: coach.imagePosition || 'center top' }}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs font-semibold text-[#9B0A0A]">
                  {coach.role}
                </p>
                <h3 className="font-display text-2xl uppercase tracking-tight text-black mt-1">
                  {coach.name}
                </h3>
                <p className="text-sm text-black/75 leading-relaxed mt-2">
                  {coach.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY SECTION (Asymmetric Editorial Arrangement on Dark Surface, Minimal Label + Fullscreen Control Only) */}
      <section
        aria-labelledby="home-gallery-heading"
        className="bg-black text-white py-20 lg:py-28 border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-medium text-[#9B0A0A] mb-2">
                05. Inside The Iron Rooms
              </p>
              <h2
                id="home-gallery-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-white`}
              >
                Architectural <span className="text-[#9B0A0A]">Spaces.</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                onNavigate('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#9B0A0A] transition-colors cursor-pointer"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 text-[#9B0A0A]" />
            </button>
          </div>

          {/* Asymmetric Editorial Grid (Not a standard uniform 3-column grid) */}
          
{/* Responsive Asymmetric Bento Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-5">

  {GALLERY_ITEMS.slice(0, 4).map((item, idx) => {
    const colSpanClass =
      idx === 0
        ? 'md:col-span-7'
        : idx === 1
        ? 'md:col-span-5'
        : idx === 2
        ? 'md:col-span-5'
        : 'md:col-span-7';

    const heightClass =
      'h-[280px] sm:h-[280px] md:h-[340px] lg:h-[400px]';

    return (
      <div
        key={item.id}
        className={`
          ${colSpanClass}
          ${heightClass}
          relative group rounded-xl overflow-hidden
          bg-[#111111] border border-white/10
          min-w-0
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
          <span className="text-xs font-medium text-white/90">
            {item.label}
          </span>

          <button
            type="button"
            onClick={() => onOpenLightbox(idx)}
            aria-label={`View ${item.label} fullscreen`}
            className="shrink-0 w-9 h-9 rounded-lg bg-black/80 border border-white/20 text-white hover:bg-[#9B0A0A] hover:border-[#9B0A0A] flex items-center justify-center transition-colors cursor-pointer"
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

      {/* 8. BRANCHES SECTION (Horizontally Navigable Carousel on Light Surface) */}
      <section
        aria-labelledby="branches-heading"
        className="bg-[#F5F5F5] text-black py-20 lg:py-28 border-t border-black/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold text-[#9B0A0A] mb-2">
                06. Club Locations
              </p>
              <h2
                id="branches-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-black`}
              >
                Four Branches Across <span className="text-[#9B0A0A]">India.</span>
              </h2>
            </div>

            {/* Desktop & Tablet Controls */}
            <div className="hidden sm:flex justify-end items-center gap-3 w-1/2 lg:w-auto">
              <span className="text-xs text-[#5A5A5A] tabular-nums mr-2">
                0{safeBranchIdx + 1} / 0{maxBranchIdx + 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setBranchIndex((prev) =>
                    stepCarouselIndex(prev, 'prev', BRANCHES.length, branchVisible)
                  )
                }
                disabled={safeBranchIdx === 0}
                aria-label="Previous branch"
                className="w-11 h-11 rounded-lg border border-black/20 text-black hover:border-[#9B0A0A] hover:bg-[#9B0A0A] hover:text-white disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setBranchIndex((prev) =>
                    stepCarouselIndex(prev, 'next', BRANCHES.length, branchVisible)
                  )
                }
                disabled={safeBranchIdx >= maxBranchIdx}
                aria-label="Next branch"
                className="w-11 h-11 rounded-lg border border-black/20 text-black hover:border-[#9B0A0A] hover:bg-[#9B0A0A] hover:text-white disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className={styles.carouselViewport}
            onTouchStart={(e) => {
              branchTouchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (branchTouchStartX.current === null) return;
              const deltaX = e.changedTouches[0].clientX - branchTouchStartX.current;
              if (deltaX < -40) {
                setBranchIndex((prev) =>
                  stepCarouselIndex(prev, 'next', BRANCHES.length, branchVisible)
                );
              } else if (deltaX > 40) {
                setBranchIndex((prev) =>
                  stepCarouselIndex(prev, 'prev', BRANCHES.length, branchVisible)
                );
              }
              branchTouchStartX.current = null;
            }}
          >
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translate3d(-${safeBranchIdx * (100 / branchVisible)}%, 0, 0)`,
              }}
            >
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  style={{ flex: `0 0 ${100 / branchVisible}%` }}
                  className="px-2.5 first:pl-0 last:pr-0 box-border"
                >
                  <article className="h-full bg-white border border-black/12 rounded-xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-black">
                        <ResilientImage
                          src={branch.image}
                          alt={branch.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 space-y-2">
                        <p className="text-xs font-semibold text-[#9B0A0A]">
                          {branch.city}
                        </p>
                        <h3 className="font-display text-2xl uppercase tracking-tight text-black">
                          {branch.name}
                        </h3>
                        <p className="text-sm text-black/75 leading-relaxed">
                          {branch.address}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-4 border-t border-black/10">
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:text-[#9B0A0A] transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#9B0A0A]" />
                        <span>Get Directions</span>
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          onOpenEnquiry(undefined, `${branch.name} (${branch.city})`)
                        }
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#9B0A0A] hover:text-black transition-colors cursor-pointer"
                      >
                        <span>Enquire</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Controls Below Container */}
          <div className="mt-6 flex sm:hidden items-center justify-between">
            <span className="text-xs text-[#5A5A5A] tabular-nums">
              Branch 0{safeBranchIdx + 1} of 0{BRANCHES.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setBranchIndex((prev) =>
                    stepCarouselIndex(prev, 'prev', BRANCHES.length, branchVisible)
                  )
                }
                disabled={safeBranchIdx === 0}
                aria-label="Previous branch mobile"
                className="w-11 h-11 rounded-lg border border-black/20 text-black disabled:opacity-35 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setBranchIndex((prev) =>
                    stepCarouselIndex(prev, 'next', BRANCHES.length, branchVisible)
                  )
                }
                disabled={safeBranchIdx >= maxBranchIdx}
                aria-label="Next branch mobile"
                className="w-11 h-11 rounded-lg border border-black/20 text-black disabled:opacity-35 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GOOGLE REVIEWS SECTION (Recognizable Google Reviews with ONLY Google Icon, Reviewer Name, and Short Quote) */}
      <section
        aria-labelledby="reviews-heading"
        className="bg-black text-white py-20 lg:py-28 border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center shrink-0">
                <GoogleGIcon />
              </div>
              <div>
                <p className="text-xs font-medium text-[#9B0A0A]">
                  Verified Member Feedback
                </p>
                <h2
                  id="reviews-heading"
                  className={`${styles.sectionHeading} text-3xl sm:text-5xl text-white`}
                >
                  Google <span className="text-[#9B0A0A]">Reviews</span>
                </h2>
              </div>
            </div>

            {/* Desktop & Tablet Carousel Controls */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-[#5A5A5A] tabular-nums mr-2">
                0{safeReviewIdx + 1} / 0{maxReviewIdx + 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setReviewIndex((prev) =>
                    stepCarouselIndex(prev, 'prev', GOOGLE_REVIEWS.length, reviewVisible)
                  )
                }
                disabled={safeReviewIdx === 0}
                aria-label="Previous Google review"
                className="w-11 h-11 rounded-lg border border-white/20 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setReviewIndex((prev) =>
                    stepCarouselIndex(prev, 'next', GOOGLE_REVIEWS.length, reviewVisible)
                  )
                }
                disabled={safeReviewIdx >= maxReviewIdx}
                aria-label="Next Google review"
                className="w-11 h-11 rounded-lg border border-white/20 text-white hover:border-[#9B0A0A] hover:bg-[#9B0A0A] disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className={styles.carouselViewport}
            onTouchStart={(e) => {
              reviewTouchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (reviewTouchStartX.current === null) return;
              const deltaX = e.changedTouches[0].clientX - reviewTouchStartX.current;
              if (deltaX < -40) {
                setReviewIndex((prev) =>
                  stepCarouselIndex(prev, 'next', GOOGLE_REVIEWS.length, reviewVisible)
                );
              } else if (deltaX > 40) {
                setReviewIndex((prev) =>
                  stepCarouselIndex(prev, 'prev', GOOGLE_REVIEWS.length, reviewVisible)
                );
              }
              reviewTouchStartX.current = null;
            }}
          >
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translate3d(-${safeReviewIdx * (100 / reviewVisible)}%, 0, 0)`,
              }}
            >
              {GOOGLE_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  style={{ flex: `0 0 ${100 / reviewVisible}%` }}
                  className="px-2.5 first:pl-0 last:pr-0 box-border"
                >
                  {/* Strictly ONLY Google icon, Reviewer name, and Short review quote */}
                  <article className="h-full bg-[#0C0C0C] border border-white/15 rounded-xl p-7 flex flex-col justify-between space-y-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-xl uppercase tracking-tight text-white">
                        {review.reviewerName}
                      </span>
                      <GoogleGIcon />
                    </div>

                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      “{review.quote}”
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel Controls Below Card Container */}
          <div className="mt-6 flex sm:hidden items-center justify-between">
            <span className="text-xs text-[#5A5A5A] tabular-nums">
              Review 0{safeReviewIdx + 1} of 0{GOOGLE_REVIEWS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setReviewIndex((prev) =>
                    stepCarouselIndex(prev, 'prev', GOOGLE_REVIEWS.length, reviewVisible)
                  )
                }
                disabled={safeReviewIdx === 0}
                aria-label="Previous Google review mobile"
                className="w-11 h-11 rounded-lg border border-white/20 text-white disabled:opacity-35 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setReviewIndex((prev) =>
                    stepCarouselIndex(prev, 'next', GOOGLE_REVIEWS.length, reviewVisible)
                  )
                }
                disabled={safeReviewIdx >= maxReviewIdx}
                aria-label="Next Google review mobile"
                className="w-11 h-11 rounded-lg border border-white/20 text-white disabled:opacity-35 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FULL-WIDTH PHOTOGRAPHIC CTA SECTION */}
      <CtaBanner onOpenEnquiry={() => onOpenEnquiry()} />
    </div>
  );
};
