/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute, GALLERY_ITEMS } from './data/siteData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { LightboxModal } from './components/LightboxModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';

const PAGE_METADATA: Record<PageRoute, { title: string; description: string }> = {
  home: {
    title: 'DraftWorks — Strength & Performance Club | India',
    description:
      'DraftWorks is a premier strength-training and performance club across Bengaluru, Mumbai, Hyderabad, and Delhi NCR. Built for disciplined barbell progression.',
  },
  about: {
    title: 'About DraftWorks — Story, Founder & Training Philosophy',
    description:
      'Founded in 2019 by Vikramaditya Rao, DraftWorks operates 4 calibrated barbell strength clubs across Bengaluru, Mumbai, Hyderabad, and Delhi NCR.',
  },
  gallery: {
    title: 'Gallery — Inside DraftWorks Strength & Conditioning Clubs',
    description:
      'Explore the architectural spaces, competition power racks, oak lifting platforms, and conditioning lanes at DraftWorks India.',
  },
  pricing: {
    title: 'Club Memberships & Pricing (INR) — DraftWorks India',
    description:
      'Transparent Monthly, Quarterly, and Annual INR memberships with full access to all 5 barbell and conditioning programs at DraftWorks.',
  },
  contact: {
    title: 'Contact & Branches — DraftWorks Strength Club India',
    description:
      'Book a trial session or visit DraftWorks in Indiranagar Bengaluru, Bandra West Mumbai, Jubilee Hills Hyderabad, or DLF Phase 4 Gurugram.',
  },
};

function parseRouteFromHash(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash.replace('#', '').toLowerCase();
  if (
    raw === 'about' ||
    raw === 'gallery' ||
    raw === 'pricing' ||
    raw === 'contact'
  ) {
    return raw;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(parseRouteFromHash);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Enquiry Modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProgram, setEnquiryProgram] = useState<string | undefined>(undefined);
  const [enquiryBranch, setEnquiryBranch] = useState<string | undefined>(undefined);

  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync URL hash and page-specific SEO metadata
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(parseRouteFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const meta = PAGE_METADATA[currentPage];
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }
  }, [currentPage]);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
  };

  const handleOpenEnquiry = (defaultProgram?: string, defaultBranch?: string) => {
    setEnquiryProgram(defaultProgram);
    setEnquiryBranch(defaultBranch);
    setIsEnquiryOpen(true);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1;
    });
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onOpenEnquiry={() => handleOpenEnquiry()}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage onOpenEnquiry={handleOpenEnquiry} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onOpenEnquiry={handleOpenEnquiry} />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProgram={enquiryProgram}
        initialBranch={enquiryBranch}
      />

      <LightboxModal
        items={GALLERY_ITEMS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}
