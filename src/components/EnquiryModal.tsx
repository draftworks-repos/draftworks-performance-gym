import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { PROGRAMS, BRANCHES, BRAND_INFO } from '../data/siteData';
import { validateEnquiryForm, ValidationErrors } from '../utils/logic';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgram?: string;
  initialBranch?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialProgram = '',
  initialBranch = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(initialProgram || PROGRAMS[0].title);
  const [branch, setBranch] = useState(
    initialBranch || `${BRANCHES[0].name} (${BRANCHES[0].city})`
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialProgram) setProgram(initialProgram);
    if (initialBranch) setBranch(initialBranch);
  }, [initialProgram, initialBranch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (modalRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          modalRef.current,
          { y: 18, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm({ name, phone, program, branch });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xs"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/15 rounded-xl p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <span className="text-xs font-medium text-[#9B0A0A] tracking-wide">
              DraftWorks Floor Consultation
            </span>
            <h2
              id="enquiry-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1"
            >
              Book a <span className="text-[#9B0A0A]">Trial Session</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close enquiry popup"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white/75 hover:text-white hover:border-[#9B0A0A] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 space-y-5">
            <div className="w-12 h-12 rounded-full bg-[#9B0A0A]/20 border border-[#9B0A0A] flex items-center justify-center text-[#9B0A0A]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl uppercase text-white">
                Consultation Request Received
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Thank you, <span className="text-white font-semibold">{name}</span>. Our coaching
                desk at <span className="text-white font-semibold">{branch}</span> will call you on{' '}
                <span className="text-white font-semibold tabular-nums">{phone}</span> within 4
                working hours to schedule your biomechanical assessment for{' '}
                <span className="text-white font-semibold">{program}</span>.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/10">
              <span className="text-xs text-[#5A5A5A]">
                Direct Desk: {BRAND_INFO.phone}
              </span>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {/* Field 1: Name */}
            <div>
              <label
                htmlFor="enquiry-name"
                className="block text-xs font-medium text-white/80 mb-2"
              >
                Full Name
              </label>
              <input
                id="enquiry-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Arjun Mehta"
                className={`w-full px-4 py-3 bg-black border rounded-lg text-sm text-white placeholder:text-[#5A5A5A] focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-[#9B0A0A]'
                    : 'border-white/15 focus:border-[#9B0A0A]'
                }`}
              />
              {errors.name && (
                <p role="alert" className="mt-1.5 text-xs text-[#ff4d4d]">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Field 2: Phone Number */}
            <div>
              <label
                htmlFor="enquiry-phone"
                className="block text-xs font-medium text-white/80 mb-2"
              >
                Phone Number (India)
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="+91 98450 11223"
                className={`w-full px-4 py-3 bg-black border rounded-lg text-sm text-white placeholder:text-[#5A5A5A] tabular-nums focus:outline-none transition-colors ${
                  errors.phone
                    ? 'border-[#9B0A0A]'
                    : 'border-white/15 focus:border-[#9B0A0A]'
                }`}
              />
              {errors.phone && (
                <p role="alert" className="mt-1.5 text-xs text-[#ff4d4d]">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Field 3: Interested Program */}
            <div>
              <label
                htmlFor="enquiry-program"
                className="block text-xs font-medium text-white/80 mb-2"
              >
                Interested Program
              </label>
              <select
                id="enquiry-program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#9B0A0A] transition-colors"
              >
                {PROGRAMS.map((item) => (
                  <option key={item.id} value={item.title} className="bg-black text-white">
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 4: Preferred Branch */}
            <div>
              <label
                htmlFor="enquiry-branch"
                className="block text-xs font-medium text-white/80 mb-2"
              >
                Preferred Branch
              </label>
              <select
                id="enquiry-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#9B0A0A] transition-colors"
              >
                {BRANCHES.map((b) => {
                  const label = `${b.name} (${b.city})`;
                  return (
                    <option key={b.id} value={label} className="bg-black text-white">
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-3 rounded-lg border border-white/15 text-sm font-medium text-white/80 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#9B0A0A] hover:bg-[#b50d0d] text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Submit Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
