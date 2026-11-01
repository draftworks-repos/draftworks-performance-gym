export const IMAGES = {
  heroDeadlift: '/temp/hero.webp',
  facilityRacks: '/temp/facility.webp',
  athleteSquat: '/temp/athlete.webp',
  coachFounder: '/temp/coach.webp',
  conditioningSled: '/temp/conditioning.webp',
};

export type PageRoute = 'home' | 'about' | 'gallery' | 'pricing' | 'contact';

export interface ProgramItem {
  id: string;
  number: string;
  title: string;
  focus: string;
  description: string;
  image: string;
  imagePosition?: string;
}

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imagePosition?: string;
}

export interface GalleryItem {
  id: string;
  label: string;
  alt: string;
  image: string;
  aspect: 'wide' | 'tall' | 'standard';
  objectPosition?: string;
}

export interface BranchItem {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  mapUrl: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  reviewerName: string;
  quote: string;
}

export interface TransformationItem {
  id: string;
  name: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  beforeFilter: string;
  afterFilter: string;
}

export interface PricingTier {
  id: string;
  name: string;
  cadence: string;
  priceInr: number;
  effectiveMonthlyInr: number;
  summary: string;
  features: string[];
  highlighted?: boolean;
}

export const BRAND_INFO = {
  name: 'DraftWorks',
  email: 'hello@draftworks.in',
  phone: '+91 89596 90529',
  phoneRaw: '+918959690529',
  founder: 'Vikramaditya Rao',
  founderTitle: 'Founder & Head of Strength Programming',
  foundedYear: 2019,
  branchCount: 4,
};

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'barbell-strength',
    number: '01',
    title: 'Barbell Strength & Powerlifting',
    focus: 'Squat · Bench · Deadlift',
    description:
      'Periodized strength cycles built around calibrated competition plates, stiff power bars, and technical velocity tracking.',
    image: IMAGES.heroDeadlift,
    imagePosition: 'center center',
  },
  {
    id: 'olympic-lifting',
    number: '02',
    title: 'Olympic Weightlifting',
    focus: 'Snatch · Clean & Jerk',
    description:
      'Explosive triple-extension mechanics, overhead positional stability, and turnover speed on shock-absorbing oak platforms.',
    image: IMAGES.athleteSquat,
    imagePosition: 'center top',
  },
  {
    id: 'hypertrophy-architecture',
    number: '03',
    title: 'Structural Hypertrophy',
    focus: 'Mechanical Tension · Volume',
    description:
      'Joint-friendly muscular development targeting weak links, scapular control, and dense structural tissue growth.',
    image: IMAGES.facilityRacks,
    imagePosition: 'center center',
  },
  {
    id: 'metabolic-conditioning',
    number: '04',
    title: 'Athletic Conditioning',
    focus: 'Alactic Power · Work Capacity',
    description:
      'Heavy prowler sled drives, ergometer intervals, and loaded carries engineered to build an uncompromising aerobic engine.',
    image: IMAGES.conditioningSled,
    imagePosition: 'center center',
  },
  {
    id: 'mobility-rehab',
    number: '05',
    title: 'Joint Resilience & Mobility',
    focus: 'End-Range Strength · Prehab',
    description:
      'Loaded isometric stretching and articular rotations that restore hip, thoracic, and shoulder capacity under heavy iron.',
    image: IMAGES.coachFounder,
    imagePosition: 'center 25%',
  },
];

export const WHY_US_POINTS = [
  {
    index: '01.',
    title: 'Calibrated Steel Only',
    description:
      'Every rack is outfitted with competition-spec 29mm power bars, IWF weightlifting bars, and calibrated kilogram plates accurate to within 10 grams.',
  },
  {
    index: '02.',
    title: 'Capped Floor Capacity',
    description:
      'We cap active floor memberships per branch so you never wait for a platform, monolift, or heavy dumbbell pair during peak evening hours.',
  },
  {
    index: '03.',
    title: 'Written Periodized Logs',
    description:
      'Members train from structured 12-week mesocycles rather than random daily workouts. Every session has a measurable load and RPE target.',
  },
  {
    index: '04.',
    title: 'Zero Distraction Architecture',
    description:
      'Matte acoustic interiors, focused overhead platform lighting, chalk bowls at every station, and an atmosphere built strictly for serious training.',
  },
];

export const COACHES: CoachItem[] = [
  {
    id: 'vikramaditya-rao',
    name: 'Vikramaditya Rao',
    role: 'Founder & Head Strength Coach',
    bio: 'Former national 93kg powerlifter and CSCS specialist with 14 years coaching competitive strength athletes across India.',
    image: IMAGES.coachFounder,
    imagePosition: 'center top',
  },
  {
    id: 'devika-menon',
    name: 'Devika Menon',
    role: 'Director of Olympic Weightlifting',
    bio: 'Senior national weightlifting medallist specializing in barbell kinematics, clean recovery, and lower-body force production.',
    image: IMAGES.athleteSquat,
    imagePosition: 'center 20%',
  },
  {
    id: 'kabir-deshmukh',
    name: 'Kabir Deshmukh',
    role: 'Lead Conditioning & Hypertrophy Coach',
    bio: 'Sports biomechanics postgraduate focused on energy-system development, sled sprint mechanics, and injury-resilient hypertrophy.',
    image: IMAGES.conditioningSled,
    imagePosition: 'center top',
  },
];

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    duration: '16 Weeks',
    beforeImage: IMAGES.heroDeadlift,
    afterImage: IMAGES.heroDeadlift,
    beforeFilter: 'grayscale(100%) brightness(0.68) contrast(0.92) saturate(0)',
    afterFilter: 'grayscale(0%) contrast(1.25) brightness(1.06) saturate(1.15)',
  },
  {
    id: 'rohan-kulkarni',
    name: 'Rohan Kulkarni',
    duration: '24 Weeks',
    beforeImage: IMAGES.athleteSquat,
    afterImage: IMAGES.athleteSquat,
    beforeFilter: 'grayscale(100%) brightness(0.65) contrast(0.9)',
    afterFilter: 'grayscale(0%) contrast(1.32) brightness(1.08)',
  },
  {
    id: 'siddharth-nair',
    name: 'Siddharth Nair',
    duration: '20 Weeks',
    beforeImage: IMAGES.conditioningSled,
    afterImage: IMAGES.conditioningSled,
    beforeFilter: 'grayscale(100%) brightness(0.68) contrast(0.92)',
    afterFilter: 'grayscale(0%) contrast(1.24) brightness(1.06) saturate(1.12)',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    label: 'Indiranagar Main Platform',
    alt: 'Athlete chalking hands over a loaded deadlift barbell on an oak platform',
    image: IMAGES.heroDeadlift,
    aspect: 'wide',
    objectPosition: 'center center',
  },
  {
    id: 'gal-2',
    label: 'Monolith Rack Bay',
    alt: 'Row of custom matte-black power racks and calibrated plates under linear lighting',
    image: IMAGES.facilityRacks,
    aspect: 'standard',
    objectPosition: 'center center',
  },
  {
    id: 'gal-3',
    label: 'Heavy Squat Session',
    alt: 'Strength athlete bracing under a heavy barbell back squat',
    image: IMAGES.athleteSquat,
    aspect: 'tall',
    objectPosition: 'center center',
  },
  {
    id: 'gal-4',
    label: 'Conditioning Turf Lane',
    alt: 'Athlete driving a weighted prowler sled down the indoor sprint track',
    image: IMAGES.conditioningSled,
    aspect: 'standard',
    objectPosition: 'center center',
  },
  {
    id: 'gal-5',
    label: 'Coaching Floor Review',
    alt: 'Head coach standing beside competition power rack between heavy sets',
    image: IMAGES.coachFounder,
    aspect: 'tall',
    objectPosition: 'center top',
  },
  {
    id: 'gal-6',
    label: 'Bandra West Iron Room',
    alt: 'Architectural detail of calibrated kilogram plates and competition collars',
    image: IMAGES.facilityRacks,
    aspect: 'wide',
    objectPosition: 'left center',
  },
];

export const BRANCHES: BranchItem[] = [
  {
    id: 'bengaluru-indiranagar',
    name: 'DraftWorks Indiranagar',
    city: 'Bengaluru',
    address: '412, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    hours: 'Mon–Sat: 5:30 AM – 10:30 PM · Sun: 7:00 AM – 6:00 PM',
    phone: '+91 89596 90529',
    mapUrl: 'https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru',
    image: IMAGES.facilityRacks,
  },
  {
    id: 'mumbai-bandra',
    name: 'DraftWorks Bandra West',
    city: 'Mumbai',
    address: 'Plot 84, Linking Road, Khar–Bandra Precinct, Mumbai, Maharashtra 400050',
    hours: 'Mon–Sat: 5:30 AM – 11:00 PM · Sun: 7:00 AM – 6:00 PM',
    phone: '+91 89596 90529',
    mapUrl: 'https://maps.google.com/?q=Linking+Road+Bandra+West+Mumbai',
    image: IMAGES.heroDeadlift,
  },
  {
    id: 'hyderabad-jubilee',
    name: 'DraftWorks Jubilee Hills',
    city: 'Hyderabad',
    address: 'Road No. 36, CBI Colony, Jubilee Hills, Hyderabad, Telangana 500033',
    hours: 'Mon–Sat: 5:30 AM – 10:30 PM · Sun: 7:00 AM – 5:00 PM',
    phone: '+91 89596 90529',
    mapUrl: 'https://maps.google.com/?q=Road+No+36+Jubilee+Hills+Hyderabad',
    image: IMAGES.athleteSquat,
  },
  {
    id: 'gurugram-dlf',
    name: 'DraftWorks Galleria Precinct',
    city: 'Delhi NCR',
    address: 'Sector 28, DLF Phase IV, Gurugram, Haryana 122009',
    hours: 'Mon–Sat: 6:00 AM – 10:30 PM · Sun: 7:00 AM – 6:00 PM',
    phone: '+91 89596 90529',
    mapUrl: 'https://maps.google.com/?q=DLF+Phase+4+Gurugram',
    image: IMAGES.conditioningSled,
  },
];

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    reviewerName: 'Pranav Subramanian',
    quote:
      'The only facility in Bengaluru with real calibrated kilogram plates, Competition combo racks, and coaches who actually understand barbell mechanics.',
  },
  {
    id: 'rev-2',
    reviewerName: 'Ananya Deshpande',
    quote:
      'Zero ego, zero commercial gym clutter. The programming structure took my deadlift from 95kg to 140kg cleanly without lower-back fatigue.',
  },
  {
    id: 'rev-3',
    reviewerName: 'Raghavendra Shetty',
    quote:
      'Capped floor capacity makes all the difference. Even at 7 PM on a Tuesday, you have a dedicated oak platform and stiff power bar ready.',
  },
  {
    id: 'rev-4',
    reviewerName: 'Meera Krishnan',
    quote:
      'Thoughtful coaching and immaculate acoustics. Every coach watches bar path and tempo rather than just counting repetitions.',
  },
  {
    id: 'rev-5',
    reviewerName: 'Zainab Merchant',
    quote:
      'Bandra West finally has a serious strength club. The atmosphere forces you to focus the moment you step onto the floor.',
  },
];

/**
 * Unified club membership pricing in INR.
 * As required, DraftWorks does not charge separate prices for individual training programs.
 * Updating any number here automatically updates all pricing displays.
 */
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'monthly',
    name: 'Monthly Membership',
    cadence: 'Billed Monthly',
    priceInr: 8500,
    effectiveMonthlyInr: 8500,
    summary: 'Full access to all strength platforms, conditioning lanes, and daily floor coaching.',
    features: [
      'Unrestricted access to all 5 training disciplines',
      'Initial biomechanical movement & barbell assessment',
      '4-week structured progression log',
      'Access to home branch during all operating hours',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly Membership',
    cadence: 'Billed Every 3 Months',
    priceInr: 22500,
    effectiveMonthlyInr: 7500,
    summary: 'Built for a complete 12-week strength mesocycle with measurable peak testing.',
    features: [
      'Unrestricted access to all 5 training disciplines',
      'Complete 12-week periodized mesocycle programming',
      'Monthly barbell velocity & technique video review',
      ' Multi-city passport access across all 4 India branches',
    ],
    highlighted: true,
  },
  {
    id: 'annual',
    name: 'Annual Membership',
    cadence: 'Billed Annually',
    priceInr: 74000,
    effectiveMonthlyInr: 6167,
    summary: 'Year-round athletic development for lifters committed to long-term strength standards.',
    features: [
      'Unrestricted access to all 5 training disciplines',
      'Four seasonal training blocks + competition prep peaking',
      'Priority 1-on-1 technique audits with senior coaching staff',
      'All-branch India passport + 30-day membership freeze allowance',
      'Dedicated locker allocation & recovery zone access',
    ],
  },
];
