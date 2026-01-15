import React from 'react';

export type CategoryType = 
  | 'All'
  | 'Automotive & Motorcycles'
  | 'Babies & Kids'
  | 'Clothing & Accessories'
  | 'Computers & Mobile'
  | 'Electronics & Appliances'
  | 'Entertainment & Movies'
  | 'Groceries'
  | 'Health & Beauty'
  | 'Restaurant'
  | 'Services'
  | 'Sporting & Outdoor Activities'
  | 'Travel & Leisure'
  | 'Video Games & Gaming';

export type Tab = 'home' | 'merchants' | 'partners' | 'affiliate' | 'profile' | 'settings' | 'about';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Perk {
  id: string;
  title: string;
  merchant: string;
  category: CategoryType;
  discount: string;
  image: string;
  logo?: string;
  isNew?: boolean;
  expiresIn?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  originalPrice?: number;
  price?: number;
  isFeatured?: boolean;
  
  // Detailed fields
  description?: string;
  terms?: string[];
  reviews?: Review[];
  operatingHours?: string;
}

export interface Category {
  id: string;
  name: CategoryType;
  icon: React.ReactNode;
  color?: string;
}

export enum AppState {
  LOADING = 'LOADING',
  WELCOME = 'WELCOME',
  ONBOARDING = 'ONBOARDING',
  READY = 'READY'
}