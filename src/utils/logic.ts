export interface EnquiryFormInput {
  name: string;
  phone: string;
  program: string;
  branch: string;
  message?: string;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  program?: string;
  branch?: string;
}

/**
 * Computes how many cards are visible in a horizontal carousel based on viewport width.
 * Desktop (>= 1024px): desktopCount
 * Tablet (640px - 1023px): 2 cards
 * Mobile (< 640px): 1 card
 */
export function getVisibleCardCount(viewportWidth: number, desktopCount = 3): number {
  if (viewportWidth >= 1024) {
    return desktopCount;
  }
  if (viewportWidth >= 640) {
    return 2;
  }
  return 1;
}

/**
 * Computes maximum valid starting index for a carousel so it never scrolls into empty void.
 */
export function getMaxCarouselIndex(totalItems: number, visibleCount: number): number {
  if (totalItems <= 0 || visibleCount <= 0) return 0;
  return Math.max(0, totalItems - visibleCount);
}

/**
 * Clamps or steps carousel index safely within [0, maxIndex].
 */
export function stepCarouselIndex(
  currentIndex: number,
  direction: 'next' | 'prev',
  totalItems: number,
  visibleCount: number
): number {
  const maxIndex = getMaxCarouselIndex(totalItems, visibleCount);
  if (direction === 'next') {
    return Math.min(maxIndex, currentIndex + 1);
  }
  return Math.max(0, currentIndex - 1);
}

/**
 * Clamps the before/after transformation divider percentage within a usable [5, 95] range.
 */
export function clampSliderPercentage(rawPercentage: number): number {
  if (Number.isNaN(rawPercentage)) return 50;
  return Math.min(95, Math.max(5, Math.round(rawPercentage * 10) / 10));
}

/**
 * Validates Indian phone number and required fields for the DraftWorks enquiry form.
 */
export function validateEnquiryForm(input: EnquiryFormInput): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  const trimmedName = (input.name || '').trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const rawPhone = (input.phone || '').trim();
  const digitsOnly = rawPhone.replace(/[\s\-+()]/g, '');
  // Supports 10-digit Indian mobile numbers or 91 + 10 digits
  const isValidIndianPhone =
    /^[6-9]\d{9}$/.test(digitsOnly) || /^91[6-9]\d{9}$/.test(digitsOnly);

  if (!rawPhone) {
    errors.phone = 'Please enter your mobile number.';
  } else if (!isValidIndianPhone) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (e.g. +91 98765 43210).';
  }

  if (!(input.program || '').trim()) {
    errors.program = 'Please select a training program.';
  }

  if (!(input.branch || '').trim()) {
    errors.branch = 'Please select a preferred branch.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats an amount in INR using Indian numbering format (e.g. ₹22,500).
 */
export function formatInrPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
