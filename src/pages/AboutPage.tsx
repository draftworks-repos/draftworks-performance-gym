import React from 'react';
import {
  IMAGES,
  BRAND_INFO,
  COACHES,
  BRANCHES,
  PageRoute,
} from '../data/siteData';
import { SplitHero } from '../components/SplitHero';
import { ResilientImage } from '../components/ResilientImage';
import { CtaBanner } from '../components/CtaBanner';
import styles from '../styles/editorial.module.css';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

const FACILITY_STANDARDS = [
  {
    number: '01.',
    title: 'Competition Barbell Fleet',
    detail:
      'Every lifting station is equipped with 29mm stiff power bars, 28mm IWF Olympic bars, and calibrated kilogram steel plates.',
  },
  {
    number: '02.',
    title: 'Solid Oak & High-Density Platforms',
    detail:
      'Eight dedicated shock-absorbing deadlift and clean-and-jerk platforms per branch engineered for heavy overhead drops.',
  },
  {
    number: '03.',
    title: '25-Metre Indoor Prowler Sprint Lane',
    detail:
      'High-friction turf track outfitted with weighted sleds, farmer carry handles, yokes, and Concept2 ergometers.',
  },
  {
    number: '04.',
    title: 'Biomechanical Video Audit Rig',
    detail:
      'Floor-mounted bar-velocity trackers and coaching tablets used to review squat depth, bar path, and lockout mechanics.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  return (
    <div>
      {/* Internal Page Split Hero (100svh) */}
      <SplitHero
        kicker="About DraftWorks"
        titlePrefix="Where Discipline Meets"
        titleHighlight="Calibrated Steel."
        description="Founded in 2019 in Bengaluru, DraftWorks operates 4 strength and performance clubs across India built exclusively around progressive barbell training."
        primaryCtaLabel="Book a Trial Session"
        onPrimaryCta={() => onOpenEnquiry()}
        secondaryCtaLabel="View Club Pricing"
        onSecondaryCta={() => {
          onNavigate('pricing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        image={IMAGES.facilityRacks}
        imageAlt="DraftWorks strength club interior with power racks and competition plates"
        imageCaption="Indiranagar Flagship Floor — Established 2019"
      />

      {/* Section 1: Gym Story, Background & Founder Introduction (Light Section) */}
      <section
        aria-labelledby="story-heading"
        className="bg-white text-black py-20 lg:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden bg-black aspect-[3/4]">
                <ResilientImage
                  src={IMAGES.coachFounder}
                  alt="Vikramaditya Rao — Founder of DraftWorks"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-semibold text-[#9B0A0A] tracking-wide">
                01. Origin &amp; Leadership
              </p>

              <h2
                id="story-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-black`}
              >
                Built By A Lifter Who Refused Commercial <span className="text-[#9B0A0A]">Compromise.</span>
              </h2>

              <p className="text-base text-black/80 leading-relaxed">
                DraftWorks began in {BRAND_INFO.foundedYear} inside a 4,200 sq. ft. industrial
                warehouse off 100 Feet Road in Indiranagar, Bengaluru. Founder{' '}
                <strong className="font-semibold text-black">{BRAND_INFO.founder}</strong>—a
                former national 93kg powerlifter and Certified Strength &amp; Conditioning
                Specialist—spent over a decade training athletes in cramped commercial gyms where
                barbells were bent, plates varied by up to two kilograms, and deadlifting was
                discouraged.
              </p>

              <p className="text-base text-black/75 leading-relaxed">
                He established DraftWorks as an antidote to high-churn fitness centres. Today,
                DraftWorks operates <strong className="font-semibold text-black">4 branches</strong>{' '}
                across Bengaluru, Mumbai, Hyderabad, and Delhi NCR, serving competitive lifters,
                field athletes, and working professionals who treat strength as a lifelong craft.
              </p>

              {/* Statistics Grid: 2x2 on tablet/mobile, 4 across on desktop */}
              <div className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-black/15">
                <div>
                  <p className="font-display text-4xl font-bold text-black tabular-nums">
                    04
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Branches Across India</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-[#9B0A0A] tabular-nums">
                    32
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Competition Racks</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-black tabular-nums">
                    18
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Accredited Coaches</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-black tabular-nums">
                    2019
                  </p>
                  <p className="text-xs text-[#5A5A5A] mt-1">Year Founded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Training Philosophy & Facilities (Dark Section) */}
      <section
        aria-labelledby="philosophy-heading"
        className="bg-black text-white py-20 lg:py-28 border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-medium text-[#9B0A0A]">
                02. Philosophy &amp; Facilities
              </p>
              <h2
                id="philosophy-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-white`}
              >
                Progression Logged In <span className="text-[#9B0A0A]">Kilograms,</span> Not
                Guesswork.
              </h2>
              <p className="text-base text-white/75 leading-relaxed">
                We do not run randomized circuit classes or novelty workouts. Every member starts
                with a biomechanical screening and trains on structured 12-week mesocycles tailored
                to their leverages, recovery capacity, and orthopedic history.
              </p>

              <div className="rounded-xl overflow-hidden aspect-[4/3] border border-white/15">
                <ResilientImage
                  src={IMAGES.conditioningSled}
                  alt="Athlete pushing a weighted sled on the DraftWorks conditioning turf"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-white/15 border-t border-b border-white/15">
              {FACILITY_STANDARDS.map((item) => (
                <div
                  key={item.number}
                  className="py-7 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                >
                  <span className="sm:col-span-2 font-display text-2xl sm:text-3xl font-bold text-[#9B0A0A] tabular-nums">
                    {item.number}
                  </span>
                  <div className="sm:col-span-10 space-y-2">
                    <h3 className="font-display text-2xl uppercase tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Coaching Team & Branch Footprint (Light Section) */}
      <section
        aria-labelledby="about-coaches-heading"
        className="bg-[#F7F7F7] text-black py-20 lg:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-semibold text-[#9B0A0A] mb-2">
                  03. Senior Coaching Roster
                </p>
                <h2
                  id="about-coaches-heading"
                  className={`${styles.sectionHeading} text-4xl sm:text-5xl text-black`}
                >
                  The Coaching <span className="text-[#9B0A0A]">Directorate.</span>
                </h2>
              </div>
              <p className="text-sm text-[#5A5A5A] max-w-md">
                Our coaches supervise every lifting platform on the floor—included in your club
                membership without mandatory personal training upsells.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COACHES.map((coach) => (
                <article
                  key={coach.id}
                  className="bg-white border border-black/10 rounded-xl overflow-hidden flex flex-col"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-black">
                    <ResilientImage
                      src={coach.image}
                      alt={coach.name}
                      style={{ objectPosition: coach.imagePosition || 'center top' }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <p className="text-xs font-semibold text-[#9B0A0A]">{coach.role}</p>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-black">
                      {coach.name}
                    </h3>
                    <p className="text-sm text-black/75 leading-relaxed">{coach.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 4 Branches Overview Strip */}
          <div className="pt-12 border-t border-black/15">
            <h3 className="font-display text-2xl uppercase tracking-tight text-black mb-6">
              Our 04 Club Locations Across India
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRANCHES.map((branch, index) => (
                <div
                  key={branch.id}
                  className="p-5 bg-white border border-black/12 rounded-xl space-y-2"
                >
                  <span className="font-display text-lg font-bold text-[#9B0A0A] tabular-nums">
                    0{index + 1} · {branch.city}
                  </span>
                  <h4 className="font-display text-xl uppercase text-black">
                    {branch.name}
                  </h4>
                  <p className="text-xs text-black/70 leading-relaxed">
                    {branch.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner onOpenEnquiry={() => onOpenEnquiry()} />
    </div>
  );
};
