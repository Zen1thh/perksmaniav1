import { Perk, Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', userName: 'Alice G.', rating: 5, comment: 'Absolutely amazing deal! The service was impeccable and the savings were real. Highly recommended to everyone.', date: '2 days ago' },
  { id: 'r2', userName: 'Mark Z.', rating: 4, comment: 'Great value for money. The waiting time was a bit long but the staff was friendly.', date: '1 week ago' },
  { id: 'r3', userName: 'Sarah J.', rating: 5, comment: 'Will definitely come back. Everything was smooth from redemption to service.', date: '3 weeks ago' },
  { id: 'r4', userName: 'Kevin D.', rating: 3, comment: 'It was okay, but I expected a bit more based on the description.', date: '1 month ago' },
];

export const DEFAULT_TERMS = [
  "Valid for one-time use only.",
  "Cannot be combined with other offers or promotions.",
  "Present this digital voucher upon arrival to claim your perk.",
  "Subject to availability and blackout dates may apply.",
  "Non-refundable and non-exchangeable for cash.",
  "The management reserves the right to amend terms without prior notice."
];

export const DEFAULT_DESCRIPTION = "Experience premium quality and exceptional service with this exclusive offer. Whether you're treating yourself or looking for the perfect gift, this deal provides outstanding value. Redeemable at all participating locations. Don't miss out on this limited-time opportunity to save while enjoying the best we have to offer.";

// Mock Data Generator
export const MOCK_PERKS: Perk[] = [
  // Automotive
  {
    id: '1',
    title: 'Full Synthetic Oil Change',
    merchant: 'AutoFix Pro',
    category: 'Automotive & Motorcycles',
    discount: '30%',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200&h=200',
    location: 'Makati City',
    rating: 4.8,
    reviewCount: 124,
    originalPrice: 4500,
    price: 3150,
    description: "Keep your engine running smoothly with our premium Full Synthetic Oil Change package. Includes up to 4 liters of high-grade synthetic oil, a new oil filter, and a comprehensive 20-point safety inspection to ensure your vehicle is in top condition.",
    operatingHours: "Mon-Sat: 8:00 AM - 6:00 PM"
  },
  // Babies
  {
    id: '2',
    title: 'Premium Diapers Bulk Pack',
    merchant: 'BabyCare Plus',
    category: 'Babies & Kids',
    discount: '25%',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=200&h=200',
    isNew: true,
    rating: 4.9,
    reviewCount: 89,
    originalPrice: 1200,
    price: 900,
    operatingHours: "Daily: 9:00 AM - 8:00 PM"
  },
  // Clothing
  {
    id: '3',
    title: 'Summer Collection Sale',
    merchant: 'Urban Vogue',
    category: 'Clothing & Accessories',
    discount: 'Up to 50%',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=200&h=200',
    expiresIn: '2 days',
    rating: 4.5,
    reviewCount: 432,
    operatingHours: "Daily: 10:00 AM - 9:00 PM"
  },
  // Computers
  {
    id: '4',
    title: 'MacBook Pro M3 Pro',
    merchant: 'TechZone',
    category: 'Computers & Mobile',
    discount: '₱5,000 OFF',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5.0,
    reviewCount: 22,
    originalPrice: 129990,
    price: 124990,
    isFeatured: true,
    description: "Experience the power of the new M3 Pro chip. This MacBook Pro features a stunning Liquid Retina XDR display, all-day battery life, and pro-level performance for your most demanding workflows. Limited stock available.",
    operatingHours: "Mon-Sun: 10:00 AM - 9:00 PM"
  },
  // Electronics
  {
    id: '5',
    title: 'Smart 4K LED TV 55"',
    merchant: 'Vision Electronics',
    category: 'Electronics & Appliances',
    discount: '15%',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=200&h=200',
    location: 'Quezon City',
    originalPrice: 25000,
    price: 21250,
    operatingHours: "Daily: 10:00 AM - 8:30 PM"
  },
  // Entertainment
  {
    id: '6',
    title: 'IMAX Movie Ticket Bundle',
    merchant: 'CinemaOne',
    category: 'Entertainment & Movies',
    discount: 'Buy 2 Get 1',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.7,
    reviewCount: 1500,
    operatingHours: "Daily: 11:00 AM - 12:00 AM"
  },
  // Groceries
  {
    id: '7',
    title: 'Organic Fresh Produce Box',
    merchant: 'Green Farm',
    category: 'Groceries',
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=200&h=200',
    isNew: true,
    expiresIn: '1 day',
    originalPrice: 1500,
    price: 1200,
    operatingHours: "Mon-Sat: 7:00 AM - 7:00 PM"
  },
  // Health
  {
    id: '8',
    title: 'Full Body Massage (60 mins)',
    merchant: 'Zen Spa Retreat',
    category: 'Health & Beauty',
    discount: '40%',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=200&h=200',
    location: 'BGC, Taguig',
    rating: 4.9,
    reviewCount: 88,
    originalPrice: 1000,
    price: 600,
    description: "Relax and rejuvenate with our signature Full Body Massage. Our expert therapists use a blend of Swedish and Shiatsu techniques to relieve tension, improve circulation, and promote deep relaxation.",
    operatingHours: "Daily: 1:00 PM - 11:00 PM"
  },
  // Restaurant
  {
    id: '9',
    title: 'Wagyu Beef Burger Set',
    merchant: 'Grill Master',
    category: 'Restaurant',
    discount: '35%',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.6,
    reviewCount: 340,
    originalPrice: 850,
    price: 552,
    isFeatured: true,
    operatingHours: "Daily: 11:00 AM - 10:00 PM"
  },
  // Services
  {
    id: '10',
    title: 'Home Cleaning Service',
    merchant: 'CleanSweep',
    category: 'Services',
    discount: '₱200 OFF',
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200&h=200',
    location: 'Metro Manila',
    rating: 4.8,
    reviewCount: 56,
    operatingHours: "Mon-Sat: 8:00 AM - 5:00 PM"
  },
  // Sporting
  {
    id: '11',
    title: 'Gym Membership (1 Month)',
    merchant: 'Iron Fitness',
    category: 'Sporting & Outdoor Activities',
    discount: '50% First Month',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200&h=200',
    isNew: true,
    originalPrice: 2500,
    price: 1250,
    isFeatured: true,
    operatingHours: "24 Hours (Staffed 8AM-8PM)"
  },
  // Travel
  {
    id: '12',
    title: '3D2N Boracay Package',
    merchant: 'Island Hopper',
    category: 'Travel & Leisure',
    discount: '25%',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=200&h=200',
    expiresIn: '12 hours',
    rating: 4.9,
    reviewCount: 210,
    originalPrice: 12000,
    price: 9000,
    operatingHours: "Mon-Fri: 9:00 AM - 6:00 PM"
  },
  // Gaming
  {
    id: '13',
    title: 'Gaming Headset Pro',
    merchant: 'CyberZone',
    category: 'Video Games & Gaming',
    discount: '15%',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800',
    logo: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.4,
    reviewCount: 78,
    originalPrice: 3500,
    price: 2975,
    operatingHours: "Daily: 10:00 AM - 9:00 PM"
  }
];