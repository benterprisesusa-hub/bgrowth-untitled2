export type Lang = 'pt' | 'en' | 'es' | 'fr';

export interface PetHealth {
  vaccines: { name: string; date: string; status: 'Up to Date' | 'Pending' | 'Expired' }[];
  allergies: string[];
  illnesses: string[];
  medications: { name: string; dosage: string; frequency: string }[];
  surgeries: string[];
  restrictions: string[];
  insurance: string;
  veterinarian: { name: string; phone: string; clinic: string };
  hospitalPreferential: string;
}

export interface PetFeeding {
  brand: string;
  amount: string;
  times: string[];
  restrictions: string[];
  snacksAllowed: boolean;
  snacksDetails: string;
}

export interface PetBehavior {
  sociable: boolean;
  aggressive: boolean;
  anxious: boolean;
  fearful: boolean;
  barksMuch: boolean;
  bites: boolean;
  friendlyWithDogs: boolean;
  friendlyWithKids: boolean;
  fearFireworks: boolean;
  fearStorms: boolean;
  lovesToPlay: boolean;
  favoriteToys: string[];
}

export interface PetCareProfile {
  brushing: boolean;
  bathing: boolean;
  medicationsNeeded: boolean;
  walksFrequency: string;
  specialNeeds: string[];
  dailyRoutine: string;
}

export interface Pet {
  id: string;
  name: string;
  clientId: string;
  photo: string;
  species: 'Dog' | 'Cat' | 'Other';
  breed: string;
  sex: 'Male' | 'Female';
  weight: number; // in kg
  age: number; // in years
  color: string;
  microchip: string;
  neutered: boolean;
  birthdate: string;
  health: PetHealth;
  feeding: PetFeeding;
  behavior: PetBehavior;
  care: PetCareProfile;
  documents: { name: string; type: string; url: string; date: string }[];
  photos: string[];
  customChecklist: string[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  documentCpf: string;
  emergencyContact: { name: string; phone: string; relation: string };
  paymentMethod: string;
  notes: string;
  keyControl: {
    hasKey: boolean;
    keyCode: string;
    instructions: string;
    holder: string;
  };
  packagesRemaining: number;
}

export interface PetService {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  color: string;
  category: string;
  description: string;
  requiredItems: string[];
  notes: string;
}

export interface VisitLog {
  id: string;
  petIds: string[];
  clientId: string;
  serviceId: string;
  date: string;
  scheduledTime: string;
  workerId: string;
  status: 'Scheduled' | 'Checked-In' | 'Completed' | 'Cancelled';
  checkInTime?: string;
  checkInGPS?: string;
  checkInPhoto?: string;
  checkInNotes?: string;
  checkOutTime?: string;
  checkOutGPS?: string;
  checkOutPhoto?: string;
  checkOutNotes?: string;
  completedTasks: string[]; // checklist completed items
  reportNotes?: string;
  rating?: number;
}

export interface Staff {
  id: string;
  name: string;
  photo: string;
  role: string;
  specialties: string[];
  availability: string[];
  documents: string[];
  contact: string;
  rating: number;
  notes: string;
}

export interface FinancialRecord {
  id: string;
  type: 'Income' | 'Expense';
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  description: string;
}
