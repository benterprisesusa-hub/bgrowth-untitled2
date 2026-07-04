/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  email: string;
  name: string;
  plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise';
  role: 'owner' | 'member' | 'admin';
  isAdmin: boolean;
  companyName?: string;
  logoUrl?: string;
  themeColor?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'sky' | 'violet' | 'slate';
}

export interface AppModule {
  id: string;
  name: string;
  category: 'Gig Work' | 'Home Services' | 'Care Services' | 'Education' | 'Financial' | 'Productivity' | 'Analytics' | 'AI' | 'Customer Management' | 'Platform' | 'Marketplace' | 'Professional Services';
  ico: string;
  color: string;
  description: string;
  planRequired: 'Free' | 'Starter' | 'Pro' | 'Enterprise';
  available: boolean;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
  prefs: string;
  lastJob?: string;
}

export interface Job {
  id: string;
  date: string;
  time: string;
  client: string;
  clientId: string;
  serviceType: string;
  pricingMethod: 'hour' | 'sqft' | 'rooms';
  duration: number;
  value: number;
  discount: number;
  extraFee: number;
  expense: number;
  notes: string;
  status: 'Scheduled' | 'Done' | 'Canceled';
  assignedTo?: string;
  assignedName?: string;
}

export interface Trip {
  id: string;
  date: string;
  app: string;
  startMiles: number;
  endMiles: number;
  miles: number;
  rate: number;
  deduction: number;
  purpose: string;
}

export interface Batch {
  id: string;
  date: string;
  store: string;
  basePay: number;
  tips: number;
  miles: number;
  orders: number;
  notes: string;
}

// Notary Types
export interface NotaryProfile {
  fullName: string;
  commissionNum: string;
  commissionState: string;
  commissionCounty: string;
  expirationDate: string;
  signatureUrl: string;
  sealUrl: string;
  status: 'Complete' | 'Pending';
}

export interface JournalSettings {
  type: 'Physical' | 'Digital';
  book: number;
  page: number;
  line: number;
  maxPage: number;
  maxLine: number;
}

export interface NotaryCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  county: string;
  state: string;
  idType: string;
  idNum: string;
  idExpiration?: string;
  signatureUrl?: string;
  thumbprintUrl?: string;
  dateAdded: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  time: string;
  book: number;
  page: number;
  line: number;
  customerId: string;
  customerName: string;
  actType: string; // 'Acknowledgment' | 'Jurat' | 'Oath / Affirmation' | 'Copy Certification' | 'Signature Witnessing' | etc.
  docType: string;
  docDate: string;
  fee: number;
  location: string;
  notes?: string;
  status: 'Complete' | 'Pending' | 'Canceled';
  witnessName?: string;
  witnessSigUrl?: string;
}

export interface CertificateTemplate {
  id: string;
  title: string;
  state: string;
  actType: string;
  text: string;
}

export interface GeneratedCertificate {
  id: string;
  certificateNum: string;
  clientName: string;
  actType: string;
  date: string;
  notaryName: string;
  commissionNum: string;
  commissionExpiration: string;
  state: string;
  county: string;
  documentDescription: string;
  generatedText: string;
  signatureUrl?: string;
  sealUrl?: string;
}

export interface NotaryAppointment {
  id: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address: string;
  signingType: string; // 'Loan Signing' | 'Refinance' | 'Seller Only' | 'Jurat' | 'Acknowledgment'
  fee: number;
  status: 'Unassigned' | 'Assigned' | 'En Route' | 'Completed' | 'Canceled';
  notaryName?: string;
  notes?: string;
  documents?: { name: string; required: boolean; uploaded: boolean }[];
}

export interface NotaryExpense {
  id: string;
  date: string;
  category: 'Gas' | 'Supplies' | 'Printing' | 'Tolls' | 'Insurance' | 'Other';
  description: string;
  amount: number;
  paymentMethod: string;
}

// Buffet Types
export interface BuffetLead {
  id: string;
  eventType: 'Wedding' | 'Birthday' | 'Corporate' | 'Baby Shower' | 'Graduation' | 'Religious' | 'Other';
  eventDate: string;
  startTime: string;
  endTime: string;
  guests: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  venueDefined: boolean;
  services: string[];
  menuPreference: 'Traditional' | 'Premium' | 'Gourmet' | 'Cocktail' | 'Finger Foods' | 'Custom';
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  theme?: string;
  colors?: string;
  dietaryRestrictions?: string;
  specialNeeds?: string;
  estimatedPrice: number;
  status: 'New Lead' | 'In Analysis' | 'Proposal Sent' | 'Closed' | 'Event Confirmed';
  createdAt: string;
  menuItems?: string[];
}

export interface BuffetIngredient {
  name: string;
  quantity: number; // base quantity per 100 guests
  unit: string;
}

export interface BuffetRecipe {
  id: string;
  name: string;
  category: 'Appetizer' | 'Main Course' | 'Side Dish' | 'Dessert' | 'Beverage';
  ingredients: BuffetIngredient[];
}


