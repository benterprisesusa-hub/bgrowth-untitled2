/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BuffetLead, BuffetRecipe } from '../types';

export const initialBuffetLeads: BuffetLead[] = [
  {
    id: 'ORC-2026-00448',
    eventType: 'Wedding',
    eventDate: '2026-07-18',
    startTime: '17:00',
    endTime: '23:00',
    guests: 120,
    address: '450 Bella Vista Estates',
    city: 'Windermere',
    state: 'FL',
    zip: '34786',
    venueDefined: true,
    services: ['Full Buffet', 'Drinks', 'Dessert Table', 'Cake', 'Decoration', 'DJ', 'Waitstaff', 'Bartender'],
    menuPreference: 'Premium',
    clientName: 'Sarah Jenkins',
    clientPhone: '(407) 555-8833',
    clientEmail: 'sarah.jenkins@outlook.com',
    notes: 'Bride requested a warm pastel color theme. Prefers elegant plating and setup.',
    theme: 'Rustic Elegance',
    colors: 'Blush pink, gold, sage green',
    dietaryRestrictions: '3 Gluten-Free guests, 1 Vegan guest',
    specialNeeds: 'Microphone for toasts and speech',
    estimatedPrice: 9450,
    status: 'Event Confirmed',
    createdAt: '2026-06-15',
    menuItems: ['Mini Beef Sliders', 'Slow-Roasted Prime Rib', 'Garlic Mashed Potatoes', 'Roasted Seasonal Vegetables', 'Mini New York Cheesecakes']
  },
  {
    id: 'ORC-2026-00450',
    eventType: 'Corporate',
    eventDate: '2026-07-25',
    startTime: '12:00',
    endTime: '15:30',
    guests: 80,
    address: 'BGrowth Innovation Hub, 100 Plaza Dr',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    venueDefined: true,
    services: ['Full Buffet', 'Drinks', 'Waitstaff'],
    menuPreference: 'Traditional',
    clientName: 'TechCorp Events Group',
    clientPhone: '(321) 555-0912',
    clientEmail: 'corporate-events@techcorp.com',
    notes: 'Annual summer team luncheon. Quick setup and tear-down required.',
    theme: 'Modern Professional',
    colors: 'Navy blue, silver',
    dietaryRestrictions: 'Vegetarian alternatives for 12 team members',
    specialNeeds: 'Self-serving hot buffet stations',
    estimatedPrice: 4200,
    status: 'Proposal Sent',
    createdAt: '2026-06-20',
    menuItems: ['Gourmet Crostini with Brie and Fig', 'Wild Mushroom Risotto (V)', 'Classic Caesar Salad']
  },
  {
    id: 'ORC-2026-00451',
    eventType: 'Birthday',
    eventDate: '2026-08-05',
    startTime: '19:00',
    endTime: '01:00',
    guests: 60,
    address: 'Private Residence, 882 Forest Hills Dr',
    city: 'Winter Park',
    state: 'FL',
    zip: '32789',
    venueDefined: false,
    services: ['Drinks', 'Dessert Table', 'DJ', 'Bartender', 'Security'],
    menuPreference: 'Cocktail',
    clientName: 'Michael Chang',
    clientPhone: '(407) 555-7711',
    clientEmail: 'mchang86@gmail.com',
    notes: '40th birthday party celebration. Heavy appetizers and premium mixology.',
    theme: 'Neon Neon Nightlife',
    colors: 'Hot pink, electric blue, black',
    dietaryRestrictions: 'None reported',
    specialNeeds: 'Bar station with dry ice effects',
    estimatedPrice: 3850,
    status: 'In Analysis',
    createdAt: '2026-06-25',
    menuItems: ['Mini Beef Sliders', 'Caprese Skewers', 'Signature Citrus Punch (Non-Alcoholic)', 'Premium Cocktail Base']
  },
  {
    id: 'ORC-2026-00452',
    eventType: 'Baby Shower',
    eventDate: '2026-08-16',
    startTime: '14:00',
    endTime: '17:00',
    guests: 45,
    address: 'Grand Park Clubhouse, 501 Clubhouse Rd',
    city: 'Kissimmee',
    state: 'FL',
    zip: '34741',
    venueDefined: true,
    services: ['Drinks', 'Dessert Table', 'Cake', 'Decoration'],
    menuPreference: 'Finger Foods',
    clientName: 'Jessica Alencar',
    clientPhone: '(321) 555-3344',
    clientEmail: 'jess.alencar@yahoo.com',
    notes: 'Unisex woodland forest theme baby shower. Light food, cupcakes and punch.',
    theme: 'Woodland Forest Whisper',
    colors: 'Sage green, soft brown, white',
    dietaryRestrictions: 'Pregnant women-friendly menu choices (no raw/unpasteurized)',
    specialNeeds: 'Gift station and custom photo backdrop area',
    estimatedPrice: 2850,
    status: 'New Lead',
    createdAt: '2026-06-29',
    menuItems: ['Gourmet Crostini with Brie and Fig', 'Caprese Skewers', 'Signature Citrus Punch (Non-Alcoholic)']
  }
];

export const initialRecipes: BuffetRecipe[] = [
  {
    id: 'rec_001',
    name: 'Gourmet Crostini with Brie and Fig',
    category: 'Appetizer',
    ingredients: [
      { name: 'French Baguettes', quantity: 15, unit: 'units' },
      { name: 'Premium Brie Cheese', quantity: 2.5, unit: 'kg' },
      { name: 'Organic Black Fig Jam', quantity: 1.5, unit: 'kg' },
      { name: 'Fresh Rosemary Sprigs', quantity: 0.3, unit: 'kg' },
      { name: 'Clover Honey', quantity: 0.8, unit: 'L' }
    ]
  },
  {
    id: 'rec_002',
    name: 'Mini Beef Sliders',
    category: 'Appetizer',
    ingredients: [
      { name: 'Ground Angus Beef', quantity: 6.0, unit: 'kg' },
      { name: 'Brioche Mini Buns', quantity: 200, unit: 'units' },
      { name: 'Sharp Cheddar Cheese Slices', quantity: 2.0, unit: 'kg' },
      { name: 'Red Onions (for caramelizing)', quantity: 3.0, unit: 'kg' },
      { name: 'House Secret Sauce', quantity: 1.5, unit: 'L' }
    ]
  },
  {
    id: 'rec_003',
    name: 'Caprese Skewers',
    category: 'Appetizer',
    ingredients: [
      { name: 'Cherry Tomatoes', quantity: 5.0, unit: 'kg' },
      { name: 'Fresh Mozzarella Bocconcini Pearls', quantity: 4.5, unit: 'kg' },
      { name: 'Sweet Basil Leaves', quantity: 0.8, unit: 'kg' },
      { name: 'Aged Balsamic Glaze', quantity: 1.0, unit: 'L' },
      { name: 'Extra Virgin Olive Oil', quantity: 0.5, unit: 'L' }
    ]
  },
  {
    id: 'rec_004',
    name: 'Slow-Roasted Prime Rib',
    category: 'Main Course',
    ingredients: [
      { name: 'Prime Beef Ribeye Roast', quantity: 25.0, unit: 'kg' },
      { name: 'Fresh Whole Garlic Bulbs', quantity: 0.8, unit: 'kg' },
      { name: 'Fresh Rosemary & Thyme Bundle', quantity: 0.4, unit: 'kg' },
      { name: 'Coarse Sea Salt & Black Pepper', quantity: 0.6, unit: 'kg' },
      { name: 'Red Wine (for Au Jus reduction)', quantity: 4.0, unit: 'L' }
    ]
  },
  {
    id: 'rec_005',
    name: 'Grilled Salmon with Lemon Dill Cream',
    category: 'Main Course',
    ingredients: [
      { name: 'Atlantic Salmon Fillets (Portioned)', quantity: 20.0, unit: 'kg' },
      { name: 'Heavy Whipping Cream', quantity: 4.0, unit: 'L' },
      { name: 'Fresh Lemons (for juice & garnish)', quantity: 35, unit: 'units' },
      { name: 'Fresh Organic Dill', quantity: 0.5, unit: 'kg' },
      { name: 'White Wine (for reduction)', quantity: 2.0, unit: 'L' }
    ]
  },
  {
    id: 'rec_006',
    name: 'Wild Mushroom Risotto (V)',
    category: 'Main Course',
    ingredients: [
      { name: 'Arborio Risotto Rice', quantity: 10.0, unit: 'kg' },
      { name: 'Assorted Porcini & Cremini Mushrooms', quantity: 4.5, unit: 'kg' },
      { name: 'Shallots', quantity: 1.5, unit: 'kg' },
      { name: 'Grated Parmigiano-Reggiano', quantity: 2.0, unit: 'kg' },
      { name: 'Rich Vegetable Broth Stock', quantity: 20.0, unit: 'L' },
      { name: 'Salted Butter', quantity: 1.5, unit: 'kg' }
    ]
  },
  {
    id: 'rec_007',
    name: 'Garlic Mashed Potatoes',
    category: 'Side Dish',
    ingredients: [
      { name: 'Russet Potatoes', quantity: 25.0, unit: 'kg' },
      { name: 'Unsalted Butter Plugs', quantity: 4.0, unit: 'kg' },
      { name: 'Whole Milk', quantity: 5.0, unit: 'L' },
      { name: 'Roasted Garlic Cloves', quantity: 1.2, unit: 'kg' },
      { name: 'Sour Cream', quantity: 2.0, unit: 'kg' }
    ]
  },
  {
    id: 'rec_008',
    name: 'Roasted Seasonal Vegetables',
    category: 'Side Dish',
    ingredients: [
      { name: 'Green Asparagus Spears', quantity: 5.0, unit: 'kg' },
      { name: 'Baby Heirloom Carrots', quantity: 5.0, unit: 'kg' },
      { name: 'Fresh Green Zucchini', quantity: 4.0, unit: 'kg' },
      { name: 'Red & Yellow Bell Peppers', quantity: 4.0, unit: 'kg' },
      { name: 'Avocado Oil Spray', quantity: 0.5, unit: 'L' }
    ]
  },
  {
    id: 'rec_009',
    name: 'Classic Caesar Salad',
    category: 'Side Dish',
    ingredients: [
      { name: 'Fresh Romaine Lettuce Heads', quantity: 14, unit: 'units' },
      { name: 'Gourmet Caesar Creamy Dressing', quantity: 3.5, unit: 'L' },
      { name: 'Garlic Butter Croutons', quantity: 2.0, unit: 'kg' },
      { name: 'Shaved Parmesan Cheese', quantity: 1.2, unit: 'kg' }
    ]
  },
  {
    id: 'rec_010',
    name: 'Mini New York Cheesecakes',
    category: 'Dessert',
    ingredients: [
      { name: 'Premium Cream Cheese', quantity: 8.0, unit: 'kg' },
      { name: 'Graham Crackers (Crushed)', quantity: 2.2, unit: 'kg' },
      { name: 'Refined White Sugar', quantity: 2.5, unit: 'kg' },
      { name: 'Sweet Strawberries (for topping glaze)', quantity: 3.0, unit: 'kg' },
      { name: 'Vanilla Extract', quantity: 0.2, unit: 'L' }
    ]
  },
  {
    id: 'rec_011',
    name: 'Signature Citrus Punch (Non-Alcoholic)',
    category: 'Beverage',
    ingredients: [
      { name: 'Pure Squeezed Orange Juice', quantity: 15.0, unit: 'L' },
      { name: 'Sweet Pineapple Juice', quantity: 10.0, unit: 'L' },
      { name: 'Ginger Ale Sodas', quantity: 15.0, unit: 'L' },
      { name: 'Fresh Mint Bunches', quantity: 0.4, unit: 'kg' },
      { name: 'Orange & Lime Wheel Slices', quantity: 2.5, unit: 'kg' }
    ]
  },
  {
    id: 'rec_012',
    name: 'Premium Cocktail Base',
    category: 'Beverage',
    ingredients: [
      { name: 'Imported Russian Vodka / Gin', quantity: 12.0, unit: 'L' },
      { name: 'Natural Fresh Lime Juice', quantity: 5.0, unit: 'L' },
      { name: 'Organic Liquid Cane Syrup', quantity: 4.0, unit: 'L' },
      { name: 'Premium Craft Tonic Water', quantity: 20.0, unit: 'L' },
      { name: 'Block Cocktail Ice Bags', quantity: 10, unit: 'units' }
    ]
  }
];

// Helper calculations for dynamic quoting
export const BASE_MENU_PRICES: Record<BuffetLead['menuPreference'], number> = {
  Traditional: 35,
  Premium: 50,
  Gourmet: 70,
  Cocktail: 40,
  'Finger Foods': 30,
  Custom: 60
};

export const OPTIONAL_SERVICES_PRICES: Record<string, { type: 'perGuest' | 'flat'; price: number }> = {
  'Full Buffet': { type: 'flat', price: 500 },
  'Drinks': { type: 'perGuest', price: 12 },
  'Dessert Table': { type: 'perGuest', price: 8 },
  'Cake': { type: 'flat', price: 350 },
  'Decoration': { type: 'flat', price: 1200 },
  'DJ': { type: 'flat', price: 800 },
  'Photography': { type: 'flat', price: 1500 },
  'Ceremonial': { type: 'flat', price: 1000 },
  'Venue Space': { type: 'flat', price: 2500 },
  'Waitstaff': { type: 'flat', price: 450 }, // Estimated base staffing
  'Bartender': { type: 'flat', price: 300 },
  'Security': { type: 'flat', price: 360 }
};

export function calculateEstimatedPrice(
  guests: number,
  menuPreference: BuffetLead['menuPreference'],
  selectedServices: string[]
): number {
  const baseMenuPricePerGuest = BASE_MENU_PRICES[menuPreference] || 35;
  let total = baseMenuPricePerGuest * guests;

  selectedServices.forEach(srv => {
    const srvConfig = OPTIONAL_SERVICES_PRICES[srv];
    if (srvConfig) {
      if (srvConfig.type === 'perGuest') {
        total += srvConfig.price * guests;
      } else {
        total += srvConfig.price;
      }
    }
  });

  return total;
}

// Recommended Staffing guidelines for buffet owners:
// Waitstaff: Seated/Gourmet/Premium: 1 waiter per 15 guests. Traditional/Finger: 1 waiter per 25 guests.
// Bartender: 1 bartender per 50 guests if drinks is active.
// Security: 1 guard per 100 guests if corporate/wedding.
export function getRecommendedStaff(guests: number, menuPreference: string, services: string[]) {
  const needsDrinks = services.includes('Drinks') || services.includes('Bartender');
  const needsSecurity = services.includes('Security');
  const needsWaitstaff = services.includes('Waitstaff') || services.includes('Full Buffet');

  let waiters = 0;
  if (needsWaitstaff) {
    const ratio = (menuPreference === 'Gourmet' || menuPreference === 'Premium') ? 15 : 25;
    waiters = Math.max(1, Math.ceil(guests / ratio));
  }

  let bartenders = 0;
  if (needsDrinks) {
    bartenders = Math.max(1, Math.ceil(guests / 50));
  }

  let security = 0;
  if (needsSecurity) {
    security = Math.max(1, Math.ceil(guests / 100));
  }

  return { waiters, bartenders, security };
}
