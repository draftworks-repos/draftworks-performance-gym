import React, { useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { PageRoute, BRAND_INFO } from '../data/siteData';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const drawerPanelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when mobile/tablet drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // GSAP drawer entrance animation respecting reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!drawerPanelRef.current || !backdropRef.current) return;

    if (isDrawerOpen) {
      if (prefersReducedMotion) {
        gsap.set(backdropRef.current, { opacity: 1 });
        gsap.set(drawerPanelRef.current, { x: '0%', opacity: 1 });
      } else {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
        gsap.fromTo(
          drawerPanelRef.current,
          { x: '100%', opacity: 0.6 },
          { x: '0%', opacity: 1, duration: 0.35, ease: 'power3.out' }
        );
      }
    }
  }, [isDrawerOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  const handleLinkClick = (page: PageRoute) => {
    onNavigate(page);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/88 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (single element, no extra subtitle pills) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B0A0A]"
          >
            DRAFT<span className="text-[#9B0A0A]">WORKS</span>
          </a>

          {/* Zone 2: Essential Page Navigation (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-medium"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isActive
                      ? 'text-white font-semibold after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#9B0A0A]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Tablet/Mobile Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Book a Trial
            </button>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-white/15 text-white hover:border-[#9B0A0A] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Overlay Drawer for Tablet & Mobile (Never pushes page layout) */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Right-to-left Slide Panel */}
          <div
            ref={drawerPanelRef}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black border-l border-white/15 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  DRAFT<span className="text-[#9B0A0A]">WORKS</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-white/15 text-white hover:border-[#9B0A0A] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav aria-label="Mobile Page Navigation" className="mt-8 flex flex-col space-y-2">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = currentPage === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.id);
                      }}
                      className={`group flex items-center justify-between py-3.5 border-b border-white/10 font-display text-2xl uppercase tracking-tight transition-colors ${
                        isActive ? 'text-[#9B0A0A]' : 'text-white hover:text-[#9B0A0A]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-sans text-xs text-[#5A5A5A] tabular-nums">
                        0{idx + 1}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-8 space-y-5">
              <div className="space-y-1 text-sm text-white/70">
                <p className="text-xs text-[#5A5A5A]">Direct Line</p>
                <a
                  href={`tel:${BRAND_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-white font-medium hover:text-[#9B0A0A] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#9B0A0A]" />
                  {BRAND_INFO.phone}
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3.5 px-6 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white font-semibold text-sm rounded-md inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Book a Trial</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
