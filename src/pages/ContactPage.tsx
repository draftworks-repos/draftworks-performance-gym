import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { IMAGES, BRAND_INFO, BRANCHES, PROGRAMS } from '../data/siteData';
import { validateEnquiryForm, ValidationErrors } from '../utils/logic';
import { SplitHero } from '../components/SplitHero';
import styles from '../styles/editorial.module.css';

interface ContactPageProps {
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenEnquiry }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(PROGRAMS[0].title);
  const [branch, setBranch] = useState(`${BRANCHES[0].name} (${BRANCHES[0].city})`);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEnquiryForm({ name, phone, program, branch, message });
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div>
      {/* Internal Page Split Hero (100svh) */}
      <SplitHero
        kicker="Direct Desk & Club Locations"
        titlePrefix="Visit A DraftWorks"
        titleHighlight="Training Hall."
        description="Speak directly with our floor coaches in Bengaluru, Mumbai, Hyderabad, or Delhi NCR to schedule your initial movement assessment."
        primaryCtaLabel="Open Quick Enquiry Popup"
        onPrimaryCta={() => onOpenEnquiry()}
        image={IMAGES.conditioningSled}
        imageAlt="Athlete pushing a weighted sled at DraftWorks performance club"
        imageCaption="Direct Coaching Line: +91 89596 90529"
      />

      {/* Section 1: Contact Details & Validated Enquiry Form (Light Surface) */}
      <section
        aria-labelledby="contact-form-heading"
        className="bg-white text-black py-20 lg:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-semibold text-[#9B0A0A] mb-2">
                  01. Direct Communication
                </p>
                <h2
                  id="contact-form-heading"
                  className={`${styles.sectionHeading} text-4xl sm:text-5xl text-black`}
                >
                  Speak With Our <span className="text-[#9B0A0A]">Floor Desk.</span>
                </h2>
                <p className="text-base text-black/75 leading-relaxed mt-4">
                  Whether you are transitioning from recreational lifting or preparing for a
                  sanctioned powerlifting meet, our coaching team will match you with the right
                  branch and starting block.
                </p>
              </div>

              <div className="space-y-5 pt-4 border-t border-black/15">
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#9B0A0A] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#5A5A5A]">Phone &amp; WhatsApp Desk</p>
                    <a
                      href={`tel:${BRAND_INFO.phoneRaw}`}
                      className="font-display text-2xl font-bold text-black hover:text-[#9B0A0A] transition-colors tabular-nums"
                    >
                      {BRAND_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#9B0A0A] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#5A5A5A]">Official Email</p>
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="font-display text-2xl font-bold text-black hover:text-[#9B0A0A] transition-colors"
                    >
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#9B0A0A] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#5A5A5A]">Operating Hours (All Branches)</p>
                    <p className="text-sm font-semibold text-black mt-0.5">
                      Mon – Sat: 5:30 AM – 10:30 PM IST
                    </p>
                    <p className="text-sm text-black/70">
                      Sunday: 7:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Trial Enquiry Form */}
            <div className="lg:col-span-7 bg-[#0A0A0A] text-white rounded-xl p-7 sm:p-10 border border-black/15">
              {submitted ? (
                <div className="py-8 space-y-5">
                  <div className="w-12 h-12 rounded-full bg-[#9B0A0A]/20 border border-[#9B0A0A] flex items-center justify-center text-[#9B0A0A]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-3xl uppercase text-white">
                    Enquiry Logged With {branch}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed max-w-lg">
                    Thank you, <span className="font-semibold text-white">{name}</span>. Our
                    head coach on duty will contact you at{' '}
                    <span className="font-semibold text-white tabular-nums">{phone}</span> to
                    confirm your slot for <span className="font-semibold text-white">{program}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-3 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-4 border-b border-white/10">
                    <h3 className="font-display text-2xl uppercase text-white">
                      Send A Direct Club Enquiry
                    </h3>
                    <p className="text-xs text-white/65 mt-1">
                      Complete the fields below to book a floor visit or trial assessment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-white/80 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Rohan Kulkarni"
                        className={`w-full px-4 py-3 bg-black border rounded-lg text-sm text-white placeholder:text-[#5A5A5A] focus:outline-none ${
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

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-white/80 mb-2"
                      >
                        Mobile Number (India)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="+91 98450 11223"
                        className={`w-full px-4 py-3 bg-black border rounded-lg text-sm text-white placeholder:text-[#5A5A5A] tabular-nums focus:outline-none ${
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-program"
                        className="block text-xs font-medium text-white/80 mb-2"
                      >
                        Interested Program
                      </label>
                      <select
                        id="contact-program"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#9B0A0A]"
                      >
                        {PROGRAMS.map((item) => (
                          <option key={item.id} value={item.title} className="bg-black">
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-branch"
                        className="block text-xs font-medium text-white/80 mb-2"
                      >
                        Preferred Branch
                      </label>
                      <select
                        id="contact-branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#9B0A0A]"
                      >
                        {BRANCHES.map((b) => {
                          const label = `${b.name} (${b.city})`;
                          return (
                            <option key={b.id} value={label} className="bg-black">
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-white/80 mb-2"
                    >
                      Training Background / Goals (Optional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your current lifts, injury history, or preferred training time..."
                      className="w-full px-4 py-3 bg-black border border-white/15 rounded-lg text-sm text-white placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#9B0A0A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-[#9B0A0A] hover:bg-[#b50d0d] text-white text-sm font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Submit Floor Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Branch Directory & Responsive Embedded Google Map (Dark Surface) */}
      <section
        aria-labelledby="branches-map-heading"
        className="bg-black text-white py-20 lg:py-28 border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div>
            <p className="text-xs font-medium text-[#9B0A0A] mb-2">
              02. Branch Directory &amp; Directions
            </p>
            <h2
              id="branches-map-heading"
              className={`${styles.sectionHeading} text-4xl sm:text-5xl text-white`}
            >
              Our Four <span className="text-[#9B0A0A]">Training Centres.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRANCHES.map((b) => (
              <article
                key={b.id}
                className="p-7 bg-[#0C0C0C] border border-white/15 rounded-xl flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#9B0A0A]">
                    {b.city}
                  </span>
                  <h3 className="font-display text-2xl uppercase text-white">
                    {b.name}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">{b.address}</p>
                  <p className="text-xs text-[#5A5A5A] pt-1">{b.hours}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#9B0A0A] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#9B0A0A]" />
                    <span>Open Directions in Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`tel:${BRAND_INFO.phoneRaw}`}
                    className="text-xs text-white/70 hover:text-white tabular-nums"
                  >
                    {b.phone}
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Responsive Embedded Google Map */}
          <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0C0C0C]">
            <div className="p-4 sm:px-6 bg-[#111111] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-white/85">
                <MapPin className="w-4 h-4 text-[#9B0A0A]" />
                <span>Flagship Location: 100 Feet Road, Indiranagar, Bengaluru 560038</span>
              </div>
              <a
                href={BRANCHES[0].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#9B0A0A] hover:text-white inline-flex items-center gap-1"
              >
                <span>Get Turn-by-Turn Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-full h-[360px] sm:h-[440px]">
              <iframe
                title="DraftWorks Indiranagar Bengaluru Google Map"
                src="https://www.google.com/maps?q=100+Feet+Road+Indiranagar+Bengaluru&output=embed"
                className="w-full h-full border-0 filter grayscale contrast-125 invert-[90%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
