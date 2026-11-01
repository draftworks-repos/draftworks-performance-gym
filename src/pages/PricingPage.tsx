import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { IMAGES, PRICING_TIERS, PROGRAMS } from '../data/siteData';
import { formatInrPrice } from '../utils/logic';
import { SplitHero } from '../components/SplitHero';
import { CtaBanner } from '../components/CtaBanner';
import styles from '../styles/editorial.module.css';

interface PricingPageProps {
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div>
      {/* Internal Page Split Hero (100svh) */}
      <SplitHero
        kicker="Club Memberships (INR)"
        titlePrefix="One All-Access"
        titleHighlight="Membership."
        description="DraftWorks does not charge separate fees for powerlifting, Olympic weightlifting, or conditioning. Every membership includes full platform access and floor coaching."
        primaryCtaLabel="Book a Trial Session"
        onPrimaryCta={() => onOpenEnquiry()}
        image={IMAGES.heroDeadlift}
        imageAlt="Athlete preparing for a heavy deadlift on the DraftWorks platform"
        imageCaption="All-Inclusive Coaching & Calibrated Floor Access"
      />

      {/* Membership Tiers Section (Light Surface for crisp contrast) */}
      <section
        aria-labelledby="pricing-tiers-heading"
        className="bg-white text-black py-20 lg:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold text-[#9B0A0A] mb-2">
                01. Transparent Indian Rupee Pricing
              </p>
              <h2
                id="pricing-tiers-heading"
                className={`${styles.sectionHeading} text-4xl sm:text-5xl text-black`}
              >
                Select Your Training <span className="text-[#9B0A0A]">Commitment.</span>
              </h2>
            </div>
            <p className="text-sm text-[#5A5A5A] max-w-md">
              All prices are in INR (₹) inclusive of 18% GST. Every tier includes full access to
              all five training disciplines.
            </p>
          </div>

          {/* Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier) => {
              const isHighlighted = Boolean(tier.highlighted);
              return (
                <article
                  key={tier.id}
                  className={`rounded-xl p-8 flex flex-col justify-between border transition-colors ${
                    isHighlighted
                      ? 'bg-black text-white border-black'
                      : 'bg-[#F8F8F8] text-black border-black/15'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          isHighlighted ? 'text-[#9B0A0A]' : 'text-[#5A5A5A]'
                        }`}
                      >
                        {tier.cadence}
                      </span>
                      {isHighlighted && (
                        <span className="text-xs font-semibold text-white">
                          Recommended Mesocycle
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display text-3xl uppercase tracking-tight">
                        {tier.name}
                      </h3>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-5xl font-bold tabular-nums">
                          {formatInrPrice(tier.priceInr)}
                        </span>
                        <span
                          className={`text-xs ${
                            isHighlighted ? 'text-white/65' : 'text-[#5A5A5A]'
                          }`}
                        >
                          / {tier.id === 'monthly' ? 'month' : tier.id === 'quarterly' ? '3 months' : 'year'}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 tabular-nums ${
                          isHighlighted ? 'text-white/65' : 'text-[#5A5A5A]'
                        }`}
                      >
                        Effective {formatInrPrice(tier.effectiveMonthlyInr)} / month
                      </p>
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        isHighlighted ? 'text-white/80' : 'text-black/75'
                      }`}
                    >
                      {tier.summary}
                    </p>

                    <ul className="space-y-3 pt-4 border-t border-current/10 text-sm">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#9B0A0A] shrink-0 mt-0.5" />
                          <span className={isHighlighted ? 'text-white/85' : 'text-black/80'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 mt-8 border-t border-current/10">
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry()}
                      className={`w-full py-4 px-6 rounded-md font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        isHighlighted
                          ? 'bg-[#9B0A0A] hover:bg-[#b50d0d] text-white'
                          : 'bg-black hover:bg-[#9B0A0A] text-white'
                      }`}
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* All-Inclusive Disciplines Strip (Confirming no separate program charges) */}
          <div className="mt-16 p-8 rounded-xl bg-[#F4F4F4] border border-black/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-2">
                <p className="text-xs font-semibold text-[#9B0A0A]">
                  Unified Training Access
                </p>
                <h3 className="font-display text-2xl sm:text-3xl uppercase text-black">
                  All 5 Training Disciplines Included In Every Membership
                </h3>
                <p className="text-sm text-black/70 leading-relaxed">
                  We never gate equipment or programming behind separate program fees. Your
                  membership grants unrestricted access to all disciplines below:
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROGRAMS.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 bg-white rounded-lg border border-black/10 flex items-baseline gap-3"
                  >
                    <span className="font-display text-lg font-bold text-[#9B0A0A] tabular-nums">
                      {prog.number}.
                    </span>
                    <div>
                      <p className="font-display text-base uppercase text-black">
                        {prog.title}
                      </p>
                      <p className="text-xs text-[#5A5A5A] mt-0.5">{prog.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner onOpenEnquiry={() => onOpenEnquiry()} />
    </div>
  );
};
