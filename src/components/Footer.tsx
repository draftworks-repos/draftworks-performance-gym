import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_INFO, BRANCHES, PageRoute } from '../data/siteData';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-white/15">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="inline-block font-display text-3xl font-bold tracking-tight text-white"
            >
              DRAFT<span className="text-[#9B0A0A]">WORKS</span>
            </a>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Strength and performance club dedicated to calibrated barbell progression,
              biomechanical coaching, and distraction-free training across India.
            </p>
            <div className="pt-1 flex items-center gap-5 text-xs font-medium text-white/75">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#9B0A0A] transition-colors inline-flex items-center gap-1"
              >
                Instagram <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[#5A5A5A]">·</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#9B0A0A] transition-colors inline-flex items-center gap-1"
              >
                YouTube <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[#5A5A5A]">·</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#9B0A0A] transition-colors inline-flex items-center gap-1"
              >
                Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-sm tracking-wider uppercase text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {(
                [
                  ['home', 'Home'],
                  ['about', 'About Us'],
                  ['gallery', 'Gallery'],
                  ['pricing', 'Pricing'],
                  ['contact', 'Contact'],
                ] as [PageRoute, string][]
              ).map(([route, label]) => (
                <li key={route}>
                  <a
                    href={`#${route}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(route);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Branch Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm tracking-wider uppercase text-white">
              Clubs in India
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {BRANCHES.map((branch) => (
                <li key={branch.id}>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(undefined, `${branch.name} (${branch.city})`)}
                    className="text-left hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#9B0A0A] shrink-0" />
                    <span>
                      {branch.city} — {branch.name.replace('DraftWorks ', '')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm tracking-wider uppercase text-white">
              Direct Contact
            </h3>
            <div className="space-y-2.5 text-sm text-white/75">
              <p>
                <a
                  href={`tel:${BRAND_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#9B0A0A] shrink-0" />
                  <span className="tabular-nums">{BRAND_INFO.phone}</span>
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#9B0A0A] shrink-0" />
                  <span>{BRAND_INFO.email}</span>
                </a>
              </p>
              <p className="text-xs text-[#5A5A5A] pt-1">
                Mon–Sat: 5:30 AM – 10:30 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credit Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 DraftWorks. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{' '}
            <a
              href="https://draftbox.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9B0A0A] hover:text-white font-semibold underline underline-offset-4 transition-colors"
            >
              DraftBox.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
