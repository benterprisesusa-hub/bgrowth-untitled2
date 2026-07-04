import React, { useState } from 'react';
import {
  Heart, Calendar, DollarSign, Award, Users, CheckCircle2, Clock, MapPin, Sparkles,
  Trash2, Plus, Search, LogOut, Globe, Activity, Shield, Star, User, Camera,
  AlertTriangle, ChevronRight, X, Send, Lock, RefreshCw, Eye, BookOpen, Check,
  ArrowRight, ShieldCheck, Download, Gift, Share2, TrendingUp, BarChart3, Settings,
  CalendarCheck, Trash, AlertCircle, ShoppingBag, PlusCircle, CheckSquare, Layers
} from 'lucide-react';

// Multilingual text dictionary
type Lang = 'pt' | 'en' | 'es' | 'fr';

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  pt: {
    title: 'BGrowth Customer Experience™',
    subtitle: 'Módulo Universal de Fidelização, Assinaturas e Portal do Cliente',
    switchIndustry: 'Selecionar Setor (Demo):',
    adminView: 'Painel da Empresa',
    portalView: 'Portal do Cliente',
    greeting: 'Olá, Sarah!',
    loyaltyLevel: 'Nível de Fidelidade',
    activePackage: 'Pacote de Serviços Ativo',
    usedVisits: 'visitas utilizadas',
    remainingVisits: 'restantes',
    expiresOn: 'Expira em',
    scheduleNext: 'Agendar Próxima Visita',
    renewPackage: 'Renovar Pacote',
    buyVisits: 'Comprar Créditos Extras',
    loyaltyPoints: 'Pontos Acumulados',
    referralTitle: 'Indique um Amigo',
    referralDesc: 'Indique um amigo! Quando ele agendar o primeiro serviço, ambos ganham R$50 em créditos.',
    membershipBenefits: 'Benefícios da sua Assinatura',
    serviceHistory: 'Histórico de Atendimentos',
    giftCardTitle: 'Cartão Presente Digital',
    upcomingServices: 'Próximas Visitas Agendadas',
    addOptional: 'Deseja adicionar opcionais nesta visita?',
    packageTimeline: 'Linha do Tempo do Pacote',
    totalSpent: 'Faturamento Total',
    redemptionRate: 'Taxa de Resgate',
    activeMembers: 'Assinantes Ativos',
    averageLtv: 'LTV Médio',
    customerSegments: 'Segmentos de Clientes',
    createNewPackage: 'Criar Novo Pacote',
    loyaltyRules: 'Regras de Recompensa',
    customRules: 'Configurar Regras de Pontuação',
    pointsEarnedDesc: 'Pontos por cada R$1 gasto:',
  },
  en: {
    title: 'BGrowth Customer Experience™',
    subtitle: 'Universal Loyalty, Subscriptions, and Client Portal Platform',
    switchIndustry: 'Select Industry Context (Demo):',
    adminView: 'Business Admin Panel',
    portalView: 'Client Portal',
    greeting: 'Hello, Sarah!',
    loyaltyLevel: 'Loyalty Level',
    activePackage: 'Active Service Package',
    usedVisits: 'visits used',
    remainingVisits: 'remaining',
    expiresOn: 'Expires on',
    scheduleNext: 'Schedule Next Visit',
    renewPackage: 'Renew Package',
    buyVisits: 'Buy Extra Credits',
    loyaltyPoints: 'Accumulated Points',
    referralTitle: 'Refer a Friend',
    referralDesc: 'Invite friends! When they book their first service, you both receive $50 in service credits.',
    membershipBenefits: 'Your Membership Benefits',
    serviceHistory: 'Service Completed History',
    giftCardTitle: 'Digital Gift Card',
    upcomingServices: 'Upcoming Appointments',
    addOptional: 'Would you like to purchase add-ons for this session?',
    packageTimeline: 'Package Milestone Timeline',
    totalSpent: 'Total Revenue',
    redemptionRate: 'Redemption Rate',
    activeMembers: 'Active Subscribers',
    averageLtv: 'Average LTV',
    customerSegments: 'Customer Segments',
    createNewPackage: 'Create New Package',
    loyaltyRules: 'Loyalty & Reward Rules',
    customRules: 'Configure Scoring Rules',
    pointsEarnedDesc: 'Points earned per $1 spent:',
  },
  es: {
    title: 'BGrowth Customer Experience™',
    subtitle: 'Módulo Universal de Fidelización, Membresías y Portal del Cliente',
    switchIndustry: 'Seleccionar Sector (Demo):',
    adminView: 'Panel de la Empresa',
    portalView: 'Portal del Cliente',
    greeting: '¡Hola, Sarah!',
    loyaltyLevel: 'Nivel de Fidelidad',
    activePackage: 'Paquete de Servicios Activo',
    usedVisits: 'visitas consumidas',
    remainingVisits: 'restantes',
    expiresOn: 'Vence el',
    scheduleNext: 'Programar Próxima Visita',
    renewPackage: 'Renovar Paquete',
    buyVisits: 'Comprar Créditos Extra',
    loyaltyPoints: 'Puntos Acumulados',
    referralTitle: 'Recomendar a un Amigo',
    referralDesc: '¡Invita a tus amigos! Cuando reserven su primer servicio, ambos recibirán $50 de crédito.',
    membershipBenefits: 'Beneficios de tu Suscripción',
    serviceHistory: 'Historial de Servicios',
    giftCardTitle: 'Tarjeta Regalo Digital',
    upcomingServices: 'Próximas Visitas Programadas',
    addOptional: '¿Deseas agregar servicios opcionales?',
    packageTimeline: 'Línea de Tiempo del Paquete',
    totalSpent: 'Ingresos Totales',
    redemptionRate: 'Tasa de Canje',
    activeMembers: 'Miembros Activos',
    averageLtv: 'LTV Promedio',
    customerSegments: 'Segmentos de Clientes',
    createNewPackage: 'Crear Nuevo Paquete',
    loyaltyRules: 'Reglas del Programa de Fidelidad',
    customRules: 'Configurar Puntos por Compra',
    pointsEarnedDesc: 'Puntos por cada $1 gastado:',
  },
  fr: {
    title: 'BGrowth Customer Experience™',
    subtitle: 'Module Universel de Fidélisation, Abonnements et Portail Client',
    switchIndustry: 'Sélectionner le Secteur (Demo):',
    adminView: 'Tableau de Bord Entreprise',
    portalView: 'Portail Client Privé',
    greeting: 'Bonjour, Sarah !',
    loyaltyLevel: 'Niveau de Fidélité',
    activePackage: 'Forfait de Services Actif',
    usedVisits: 'visites consommées',
    remainingVisits: 'restantes',
    expiresOn: 'Expire le',
    scheduleNext: 'Planifier la Prochaine Visite',
    renewPackage: 'Renouveler le Forfait',
    buyVisits: 'Acheter des Crédits Extras',
    loyaltyPoints: 'Points Accumulés',
    referralTitle: 'Parrainez un Ami',
    referralDesc: 'Invitez vos amis ! Lorsqu\'ils réservent leur premier service, vous recevez tous les deux 50 $ de crédit.',
    membershipBenefits: 'Avantages de votre Abonnement',
    serviceHistory: 'Historique des Prestations',
    giftCardTitle: 'Carte Cadeau Numérique',
    upcomingServices: 'Prochaines Visites Planifiées',
    addOptional: 'Souhaitez-vous ajouter des options pour cette visite ?',
    packageTimeline: 'Frise Chronologique du Forfait',
    totalSpent: 'Chiffre d\'Affaires',
    redemptionRate: 'Taux d\'Utilisation',
    activeMembers: 'Membres Actifs',
    averageLtv: 'LTV Moyen',
    customerSegments: 'Segments de Clientèle',
    createNewPackage: 'Créer un Nouveau Forfait',
    loyaltyRules: 'Règles de Fidélité',
    customRules: 'Configurer les Règles de Points',
    pointsEarnedDesc: 'Points gagnés par 1 $ dépensé :',
  }
};

type IndustryContext = 'cleaning' | 'petcare' | 'babysitter' | 'lawncare' | 'detailing';

interface IndustryConfig {
  name: string;
  emoji: string;
  packageName: string;
  defaultVisits: number;
  price: number;
  availableAddons: { id: string; name: string; price: number; emoji: string }[];
  membershipName: string;
  membershipPrice: number;
  membershipBenefits: string[];
  serviceHistoryLogs: { date: string; worker: string; duration: string; rating: number; report: string; photo: string }[];
}

const INDUSTRY_PRESETS: Record<IndustryContext, IndustryConfig> = {
  cleaning: {
    name: 'Cleaning Management',
    emoji: '✨',
    packageName: 'Premium Home Deep Cleaning Plan',
    defaultVisits: 8,
    price: 320,
    availableAddons: [
      { id: 'oven', name: 'Inside Oven Scrubbing', price: 45, emoji: '🍳' },
      { id: 'fridge', name: 'Inside Refrigerator Detail', price: 35, emoji: '🥬' },
      { id: 'windows', name: 'Interior Windows Clean', price: 50, emoji: '🪟' },
      { id: 'laundry', name: 'Wash, Dry & Fold Laundry', price: 60, emoji: '🧺' },
      { id: 'closet', name: 'Closet Organization & Declutter', price: 80, emoji: '👚' }
    ],
    membershipName: 'Gold Elite Cleaning Club',
    membershipPrice: 49,
    membershipBenefits: [
      'Guaranteed Priority Next-Day Bookings',
      'Flat 15% discount on all optional add-ons',
      '1 Free Annual Carpet Deep Cleaning session',
      'Exclusive holiday coupons and free home scent kits',
      'Double Loyalty Points on weekend cleanings'
    ],
    serviceHistoryLogs: [
      { date: '2026-06-12', worker: 'Amanda Souza', duration: '3.5 Hours', rating: 5, report: 'Dusting, kitchen surface sanitization, floors polished. Oven add-on completed successfully.', photo: '✨' },
      { date: '2026-05-28', worker: 'Lucas Neves', duration: '3 Hours', rating: 5, report: 'Living room carpets vacuumed, trash emptied, bedroom beds neatly made with clean sheets.', photo: '🛏️' },
      { date: '2026-05-10', worker: 'Amanda Souza', duration: '4 Hours', rating: 4, report: 'Standard housekeeping package. Checked out bathroom fixtures, cleaned windows.', photo: '🧼' }
    ]
  },
  petcare: {
    name: 'BGrowth Pet Care™',
    emoji: '🐕',
    packageName: 'Active Dog Walker & Boarding Routine',
    defaultVisits: 20,
    price: 450,
    availableAddons: [
      { id: 'grooming', name: 'Premium Bath & Brush-out', price: 55, emoji: '🧼' },
      { id: 'training', name: 'Basic Leash Pulling Training', price: 40, emoji: '🦮' },
      { id: 'meds', name: 'Complex Medication Visit', price: 15, emoji: '💊' },
      { id: 'nail', name: 'Claw Nail Trimming & Safe Polish', price: 25, emoji: '✂️' },
      { id: 'taxi', name: 'Pet Taxi to Local Vet Clinic', price: 45, emoji: '🚕' }
    ],
    membershipName: 'VIP Club Wagging Tail',
    membershipPrice: 39,
    membershipBenefits: [
      'Priority emergency dog walking slots under 3 hours',
      'Complimentary GPS tracking and activity feed',
      'Free boarding day on your pet’s birthday',
      '10% off any premium organic food or treats packages',
      'Direct WhatsApp access to senior vet advisors'
    ],
    serviceHistoryLogs: [
      { date: '2026-06-20', worker: 'Jessica Mendes', duration: '45 Mins Walk', rating: 5, report: 'Walked around Ibirapuera park. Max pooped once (bagged), had plenty of cold fresh water.', photo: '🌳' },
      { date: '2026-06-15', worker: 'Gabriel Lima', duration: '1 Full Boarding Night', rating: 5, report: 'Cozy night inside. Fed twice, slept on orthopedic bed. Shared lots of cute photos.', photo: '🏡' },
      { date: '2026-06-01', worker: 'Jessica Mendes', duration: '1 Hour Feeding Visit', rating: 5, report: 'Fresh food served, medication administered. Brushing and active ball fetch in yard.', photo: '🎾' }
    ]
  },
  babysitter: {
    name: 'BGrowth Babysitter™',
    emoji: '🍼',
    packageName: 'Premium Hourly Childcare Package',
    defaultVisits: 12,
    price: 480,
    availableAddons: [
      { id: 'overtime', name: 'Emergency Overtime (Per hour)', price: 25, emoji: '⏰' },
      { id: 'meal', name: 'Toddler Organic Meal Prep', price: 30, emoji: '🍎' },
      { id: 'doctor', name: 'Doctor Visit Safe Transportation', price: 50, emoji: '🩺' },
      { id: 'homework', name: 'School Homework Tutoring', price: 35, emoji: '📚' },
      { id: 'night', name: 'Late Night Midnight Transition Fee', price: 40, emoji: '🌙' }
    ],
    membershipName: 'Platinum Parent Circle',
    membershipPrice: 59,
    membershipBenefits: [
      'Priority Booking for emergency sick-child care days',
      'Complementary Montessori learning toolkit shipped monthly',
      'No fees on same-day bookings cancellation',
      'Free Background screening checkups on any secondary babysitter',
      'Direct phone access to child psychology counselor'
    ],
    serviceHistoryLogs: [
      { date: '2026-06-25', worker: 'Ana Silva', duration: '8 Hours Shift', rating: 5, report: 'Beatriz finished her lunch nicely. Played memory games, had a solid 1.5 hr afternoon nap.', photo: '👧' },
      { date: '2026-06-11', worker: 'Ana Silva', duration: '6 Hours Shift', rating: 5, report: 'Leo had his iron supplement. Outdoor sand play and nursery rhymes. Highly active and playful.', photo: '👶' },
      { date: '2026-05-30', worker: 'Camila Pinto', duration: '4 Hours Shift', rating: 4, report: 'Dante homework completed. Supervised play with educational Legos. Warm bath done.', photo: '🧸' }
    ]
  },
  lawncare: {
    name: 'Lawn & Landscape Care',
    emoji: '🏡',
    packageName: 'Regular Mowing & Garden Grooming Plan',
    defaultVisits: 6,
    price: 240,
    availableAddons: [
      { id: 'weed', name: 'Intense Flowerbed Weeding', price: 40, emoji: '🌱' },
      { id: 'fertilizer', name: 'Premium Organic Lawn Fertilization', price: 65, emoji: '🧪' },
      { id: 'leaves', name: 'Autumn Leaves Vacuum & Bagging', price: 30, emoji: '🍂' },
      { id: 'trim', name: 'Hedge Sculpting & Bush Trimming', price: 45, emoji: '🌳' },
      { id: 'sprinkler', name: 'Sprinkler System Calibration & Check', price: 55, emoji: '💦' }
    ],
    membershipName: 'Green Meadow Royal Premium',
    membershipPrice: 29,
    membershipBenefits: [
      'Automatic reschedule in case of heavy storm days',
      'Guaranteed weekend slots for pristine party prep',
      'Free diagnostic soil test on subscription launch',
      '15% discount on massive seasonal cleanups',
      'Direct line to expert botanist'
    ],
    serviceHistoryLogs: [
      { date: '2026-06-18', worker: 'Carlos Rocha', duration: '2 Hours Mowing', rating: 5, report: 'Grass trimmed to exactly 3 inches, borders edged beautifully, pathways swept clean.', photo: '🌾' },
      { date: '2026-05-20', worker: 'Carlos Rocha', duration: '3 Hours Mowing', rating: 5, report: 'Trimming done. Optional fertilizer applied correctly. Soil hydration tested.', photo: '💧' }
    ]
  },
  detailing: {
    name: 'Mobile Car Detailing',
    emoji: '🚗',
    packageName: 'Monthly Deep Gloss Wash Club',
    defaultVisits: 4,
    price: 180,
    availableAddons: [
      { id: 'claybar', name: 'Clay Bar & Carnauba Wax Polish', price: 70, emoji: '✨' },
      { id: 'interior', name: 'Pet Hair Extraction & Vacuuming', price: 40, emoji: '🐶' },
      { id: 'leather', name: 'Leather Seat Cleaning & Balm', price: 35, emoji: '💺' },
      { id: 'engine', name: 'Engine Bay Safe Detail & Dress', price: 50, emoji: '🔌' },
      { id: 'ozone', name: 'Ozone Smoke Odor Eliminator', price: 60, emoji: '💨' }
    ],
    membershipName: 'Diamond Gloss Shield Club',
    membershipPrice: 35,
    membershipBenefits: [
      'Complementary rain-repelling windshield treatment',
      'No water or power hooks needed (we bring generators)',
      'Free dashboard sanitization wipe kits delivered',
      'VIP priority mobile dispatcher queue',
      'Cancel or move booking anytime with 0 fees'
    ],
    serviceHistoryLogs: [
      { date: '2026-06-22', worker: 'Felipe Santos', duration: '1.5 Hours Clean', rating: 5, report: 'Exterior foam washed. Clay bar done. Interior carpets shampooed, leather balm massaged.', photo: '🧼' },
      { date: '2026-06-05', worker: 'Felipe Santos', duration: '1 Hour Wash', rating: 5, report: 'Wheel grime blasted, body dried with plush microfiber. Dash trim looking brand new.', photo: '🏎️' }
    ]
  }
};

interface CustomerExperienceAppProps {
  user: {
    email: string;
    name: string;
    plan: string;
  };
  onBack: () => void;
}

export default function CustomerExperienceApp({ user, onBack }: CustomerExperienceAppProps) {
  // Global settings
  const [lang, setLang] = useState<Lang>('pt');
  const [industry, setIndustry] = useState<IndustryContext>('cleaning');
  const [currentView, setCurrentView] = useState<'client' | 'business'>('client');
  const [activeClientTab, setActiveClientTab] = useState<string>('portal_dashboard');

  const config = INDUSTRY_PRESETS[industry];

  // Dynamic state simulation for user package credits
  const [packageBalance, setPackageBalance] = useState({
    packageName: config.packageName,
    totalVisits: config.defaultVisits,
    usedVisits: Math.floor(config.defaultVisits * 0.7),
    expirationDate: '2026-12-31',
    pricePaid: config.price,
    status: 'Active'
  });

  // Dynamically update package balance when the industry is switched
  const handleSwitchIndustry = (newInd: IndustryContext) => {
    setIndustry(newInd);
    const newConfig = INDUSTRY_PRESETS[newInd];
    setPackageBalance({
      packageName: newConfig.packageName,
      totalVisits: newConfig.defaultVisits,
      usedVisits: Math.floor(newConfig.defaultVisits * 0.75),
      expirationDate: '2026-12-31',
      pricePaid: newConfig.price,
      status: 'Active'
    });
    // Reset booking forms and states
    setNewBooking({
      date: '2026-07-05',
      time: '10:00',
      addons: [] as string[],
      notes: ''
    });
  };

  // User loyalty program points state
  const [loyaltyPoints, setLoyaltyPoints] = useState(245);
  const [friendEmail, setFriendEmail] = useState('');
  const [referredFriends, setReferredFriends] = useState([
    { email: 'john.doe@email.com', status: 'Pending Book', date: '2026-06-28', reward: '$50 Credit' },
    { email: 'gabriela.m@email.com', status: 'Completed ✓', date: '2026-05-15', reward: 'Earned + Redemed' }
  ]);

  // Gift card states
  const [giftCards, setGiftCards] = useState([
    { recipient: 'Minha Mãe', amount: 150, message: 'Feliz aniversário! Aproveite uma folga.', code: 'BGCX-MOM-992', date: '2026-06-10' }
  ]);
  const [newGiftCard, setNewGiftCard] = useState({ recipient: '', amount: 100, message: '' });

  // Upcoming appointments booking states
  const [upcomingServices, setUpcomingServices] = useState([
    { id: 'apt-1', date: '2026-07-02', time: '09:00', worker: 'Amanda Souza', serviceType: 'Standard Session', status: 'Confirmed', addons: ['Oven Scrubbing'] },
    { id: 'apt-2', date: '2026-07-15', time: '14:00', worker: 'Lucas Neves', serviceType: 'Routine Care', status: 'Confirmed', addons: [] }
  ]);

  const [newBooking, setNewBooking] = useState({
    date: '2026-07-05',
    time: '10:00',
    addons: [] as string[],
    notes: ''
  });

  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Business Admin Custom Package & Rules state
  const [adminPackages, setAdminPackages] = useState([
    { id: 'p1', name: '4-Visit Weekly Essential', visits: 4, discount: '5%', price: 180, activePurchases: 28 },
    { id: 'p2', name: '8-Visit Bi-Weekly Premium', visits: 8, discount: '12%', price: 320, activePurchases: 45 },
    { id: 'p3', name: '12-Visit Daily Heavy Care', visits: 12, discount: '20%', price: 460, activePurchases: 12 }
  ]);
  const [newAdminPackage, setNewAdminPackage] = useState({ name: '', visits: 4, discount: '10%', price: 200 });

  const [loyaltyRules, setLoyaltyRules] = useState({
    pointsPerDollar: 1,
    signupBonus: 100,
    referralBonus: 150,
    tierGoldThreshold: 1500,
    tierVipThreshold: 3000
  });

  const [activeSegmentFilter, setActiveSegmentFilter] = useState<string>('All');
  const mockCustomerSegments = [
    { id: 'c1', name: 'Sarah Connor', level: 'VIP', visits: 18, totalSpend: 980, activePackage: 'Premium Deep Clean', loyaltyScore: 245, email: 'sarah.c@email.com' },
    { id: 'c2', name: 'Dante Oliveira', level: 'Gold', visits: 12, totalSpend: 540, activePackage: 'Weekly Essential', loyaltyScore: 190, email: 'dante.o@email.com' },
    { id: 'c3', name: 'Amanda Alencar', level: 'Silver', visits: 6, totalSpend: 280, activePackage: 'Standard Care', loyaltyScore: 90, email: 'amanda.a@email.com' },
    { id: 'c4', name: 'Rodrigo Faro', level: 'VIP', visits: 32, totalSpend: 1560, activePackage: 'Gold Subscription Club', loyaltyScore: 480, email: 'rodrigo.f@email.com' },
    { id: 'c5', name: 'Bruno Senna', level: 'New', visits: 1, totalSpend: 95, activePackage: 'None (One-off)', loyaltyScore: 20, email: 'bruno.s@email.com' }
  ];

  const triggerSuccessBanner = (message: string) => {
    setSuccessBanner(message);
    setTimeout(() => {
      setSuccessBanner(null);
    }, 4500);
  };

  const handleBookNextVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (packageBalance.totalVisits - packageBalance.usedVisits <= 0) {
      alert(lang === 'pt' ? 'Você não possui visitas suficientes no seu pacote! Faça a renovação primeiro.' : 'No credits remaining on your package! Please renew first.');
      return;
    }

    // Deduct credit
    setPackageBalance(prev => ({
      ...prev,
      usedVisits: prev.usedVisits + 1
    }));

    // Add appointment
    const newApt = {
      id: `apt-${Date.now()}`,
      date: newBooking.date,
      time: newBooking.time,
      worker: industry === 'cleaning' ? 'Amanda Souza' : industry === 'petcare' ? 'Jessica Mendes' : 'Ana Silva',
      serviceType: 'Package Session Deduction',
      status: 'Confirmed',
      addons: newBooking.addons
    };

    setUpcomingServices(prev => [newApt, ...prev]);
    // Reward points for booking addons
    const addonPoints = newBooking.addons.length * 30;
    if (addonPoints > 0) {
      setLoyaltyPoints(p => p + addonPoints);
    }

    triggerSuccessBanner(lang === 'pt' ? '✓ Visita agendada com sucesso! 1 crédito foi debitado do seu pacote.' : '✓ Visit successfully scheduled! 1 credit was deducted from your package.');
    setActiveClientTab('portal_dashboard');
  };

  const handleCancelApt = (id: string) => {
    if (confirm(lang === 'pt' ? 'Deseja mesmo cancelar essa visita? O crédito retornará ao seu pacote.' : 'Are you sure you want to cancel? The credit will be returned to your package.')) {
      setUpcomingServices(prev => prev.filter(a => a.id !== id));
      // Refund credit
      setPackageBalance(prev => ({
        ...prev,
        usedVisits: Math.max(0, prev.usedVisits - 1)
      }));
      triggerSuccessBanner(lang === 'pt' ? 'Visita cancelada! O crédito de serviço foi devolvido ao seu plano.' : 'Visit cancelled! Service credit refunded to your active package.');
    }
  };

  const handleRescheduleApt = (id: string, newDate: string, newTime: string) => {
    setUpcomingServices(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, date: newDate, time: newTime, status: 'Rescheduled ✓' };
      }
      return a;
    }));
    triggerSuccessBanner(lang === 'pt' ? 'Data e horário alterados com sucesso!' : 'Rescheduled successfully!');
  };

  const handleRenewPackage = () => {
    setPackageBalance(prev => ({
      ...prev,
      usedVisits: 0,
      totalVisits: config.defaultVisits,
      expirationDate: '2027-06-30'
    }));
    setLoyaltyPoints(p => p + 150); // bonus loyalty points for renewing
    triggerSuccessBanner(lang === 'pt' ? '🎉 Pacote renovado com sucesso! Seus créditos foram redefinidos.' : '🎉 Package successfully renewed! Credits reset.');
  };

  const handleBuyExtraVisits = () => {
    setPackageBalance(prev => ({
      ...prev,
      totalVisits: prev.totalVisits + 2
    }));
    setLoyaltyPoints(p => p + 50);
    triggerSuccessBanner(lang === 'pt' ? 'Adicionado +2 visitas extras ao seu pacote atual!' : 'Added +2 extra visits to your active package!');
  };

  const handleSendReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendEmail) return;
    setReferredFriends(prev => [
      { email: friendEmail, status: 'Pending Book', date: new Date().toISOString().split('T')[0], reward: '$50 Credit' },
      ...prev
    ]);
    setFriendEmail('');
    triggerSuccessBanner(lang === 'pt' ? 'Link de indicação enviado! Você receberá o prêmio quando seu amigo contratar.' : 'Referral link dispatched! Credits will be rewarded upon their first booking.');
  };

  const handleBuyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGiftCard.recipient) return;
    const code = `BGCX-GIFT-${Math.floor(Math.random() * 9000 + 1000)}`;
    setGiftCards(prev => [
      {
        recipient: newGiftCard.recipient,
        amount: Number(newGiftCard.amount),
        message: newGiftCard.message || 'Um presente de cuidados especiais!',
        code: code,
        date: new Date().toISOString().split('T')[0]
      },
      ...prev
    ]);
    setLoyaltyPoints(p => p + Math.round(newGiftCard.amount * 0.8));
    setNewGiftCard({ recipient: '', amount: 100, message: '' });
    triggerSuccessBanner(lang === 'pt' ? `Cartão Presente gerado com sucesso! Código: ${code}` : `Digital Gift Card created! Code: ${code}`);
  };

  const handleAddAdminPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPackage.name) return;
    setAdminPackages(prev => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        name: newAdminPackage.name,
        visits: Number(newAdminPackage.visits),
        discount: newAdminPackage.discount,
        price: Number(newAdminPackage.price),
        activePurchases: 0
      }
    ]);
    setNewAdminPackage({ name: '', visits: 4, discount: '10%', price: 200 });
    triggerSuccessBanner('Novo pacote de serviços cadastrado na plataforma com sucesso!');
  };

  // Quick translation helper
  const translate = (key: string) => {
    return TRANSLATIONS[lang][key] || key;
  };

  // Dynamically calculate Customer Loyalty Level/Tier Badge based on loyaltyPoints
  const getLoyaltyBadgeInfo = () => {
    if (loyaltyPoints >= 1000) {
      return { label: 'VIP ELITE', color: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' };
    } else if (loyaltyPoints >= 500) {
      return { label: 'GOLD MEMBER', color: 'bg-amber-500 text-slate-950 shadow-sm font-black' };
    } else {
      return { label: 'SILVER TIER', color: 'bg-slate-100 text-slate-700' };
    }
  };

  const loyaltyBadge = getLoyaltyBadgeInfo();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col font-sans transition-all">
      
      {/* Dynamic Action Success Notification Toast Banner */}
      {successBanner && (
        <div className="bg-slate-900 border-b border-indigo-500/30 text-emerald-400 text-xs font-black py-2.5 px-6 text-center animate-bounce flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" /> {successBanner}
        </div>
      )}

      {/* Main Core Header bar */}
      <div className="bg-white border-b border-slate-100 p-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-3xs">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">❤️</span>
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                {translate('title')}
              </h1>
              <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                Universal CX Engine
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">
              {translate('subtitle')}
            </p>
          </div>
        </div>

        {/* Global Controls & Industry Demo Context Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Industry Selection dropdown list to simulate adaptability */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide px-1">
              {translate('switchIndustry')}
            </span>
            <select
              value={industry}
              onChange={(e) => handleSwitchIndustry(e.target.value as IndustryContext)}
              className="bg-white border-0 text-xs font-extrabold text-indigo-700 focus:ring-1 focus:ring-indigo-300 rounded-lg py-1 px-2.5 shadow-3xs outline-none cursor-pointer"
            >
              <option value="cleaning">✨ Cleaning Service</option>
              <option value="petcare">🐕 Pet Care Service</option>
              <option value="babysitter">🍼 Babysitter Suite</option>
              <option value="lawncare">🏡 Lawn & Landscaping</option>
              <option value="detailing">🚗 Car Mobile Wash</option>
            </select>
          </div>

          {/* Languages Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
            {(['pt', 'en', 'es', 'fr'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase transition-all ${
                  lang === l ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Double Sided View toggle bar: Business Admin Panel vs Client Experience Portal */}
      <div className="bg-slate-900 text-slate-100 p-3.5 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400 text-xs font-extrabold tracking-wide uppercase">
            {lang === 'pt' ? 'Mudar Área de Visualização:' : 'Switch Active Platform Side:'}
          </span>
          <div className="inline-flex bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => { setCurrentView('client'); setActiveClientTab('portal_dashboard'); }}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentView === 'client' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3 h-3" /> {translate('portalView')}
            </button>
            <button
              onClick={() => { setCurrentView('business'); }}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentView === 'business' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3 h-3" /> {translate('adminView')}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <span>Active Context:</span>
          <span className="bg-white/15 px-3 py-1 rounded-lg text-white font-extrabold uppercase tracking-widest flex items-center gap-1">
            <span>{config.emoji}</span> {config.name}
          </span>
        </div>
      </div>

      {/* Dynamic Sub-Panels render */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* ======================================= */}
        {/* OPTION A: CLIENT EXPERIENCE PORTAL VIEW */}
        {/* ======================================= */}
        {currentView === 'client' && (
          <>
            {/* Client Side Mini Navigation bar */}
            <aside className="w-full md:w-56 bg-white border-r border-slate-100 p-4 shrink-0 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">PORTAL MENU</div>
                <nav className="space-y-1">
                  {[
                    { id: 'portal_dashboard', label: lang === 'pt' ? 'Meu Dashboard' : 'My Dashboard', icon: <Activity className="w-4 h-4" /> },
                    { id: 'portal_packages', label: lang === 'pt' ? 'Créditos e Forfaits' : 'Packages & Credits', icon: <CheckSquare className="w-4 h-4" /> },
                    { id: 'portal_book', label: translate('scheduleNext'), icon: <CalendarCheck className="w-4 h-4" /> },
                    { id: 'portal_membership', label: lang === 'pt' ? 'Minha Assinatura' : 'My Membership', icon: <ShieldCheck className="w-4 h-4" /> },
                    { id: 'portal_rewards', label: lang === 'pt' ? 'Recompensas & Indicações' : 'Loyalty & Referrals', icon: <Gift className="w-4 h-4" /> },
                    { id: 'portal_history', label: translate('serviceHistory'), icon: <BookOpen className="w-4 h-4" /> }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveClientTab(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-3 transition-all ${
                        activeClientTab === item.id
                          ? 'bg-indigo-50 text-indigo-600 font-extrabold shadow-3xs'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Account Level Block */}
              <div className="mt-8 bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2 text-center">
                <span className="text-[9px] text-slate-400 font-black block uppercase">{translate('loyaltyLevel')}</span>
                <span className={`inline-block text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${loyaltyBadge.color}`}>
                  {loyaltyBadge.label}
                </span>
                <p className="text-[9px] text-slate-400 font-bold leading-relaxed">
                  {loyaltyPoints} points accumulated. Next award tier in {500 - (loyaltyPoints % 500)} pts!
                </p>
              </div>
            </aside>

            {/* Client portal active content views */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto">
              
              {/* TAB 1: CLIENT PORTAL HOME DASHBOARD */}
              {activeClientTab === 'portal_dashboard' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Greeting header & Client profile overview */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">☀️</span>
                        <h2 className="text-lg font-black text-slate-950 uppercase">
                          {translate('greeting')}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed mt-1">
                        {lang === 'pt' 
                          ? `Bem-vindo de volta ao seu portal de bem-estar. Obrigado por ser um parceiro fiel do ${config.name}!`
                          : `Welcome back to your personalized space. Thank you for being a faithful partner of our ${config.name}!`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase block text-right">Loyalty Points Balance</span>
                      <div className="bg-amber-50 border border-amber-200/50 text-amber-600 text-sm font-black px-3.5 py-2 rounded-2xl flex items-center gap-1.5">
                        <Award className="w-4 h-4" /> {loyaltyPoints} PTS
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE PACKAGE RADAR PROGRESS WIDGET */}
                  <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-slate-100 rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-4">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-full -mr-8 -mt-8"></div>
                    
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="bg-indigo-600/50 text-indigo-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider border border-indigo-400/20">
                          {translate('activePackage')}
                        </span>
                        <h3 className="text-base font-black text-white">{packageBalance.packageName}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">{translate('expiresOn')}</span>
                        <span className="text-xs font-black text-white">{packageBalance.expirationDate}</span>
                      </div>
                    </div>

                    {/* Progress Bar with elegant visualization */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>{packageBalance.usedVisits} {translate('usedVisits')}</span>
                        <span className="text-white font-extrabold">{packageBalance.totalVisits - packageBalance.usedVisits} {translate('remainingVisits')}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-indigo-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(packageBalance.usedVisits / packageBalance.totalVisits) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                        Package Usage: {Math.round((packageBalance.usedVisits / packageBalance.totalVisits) * 100)}% complete
                      </p>
                    </div>

                    {/* Quick Action buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                      <button
                        onClick={() => setActiveClientTab('portal_book')}
                        className="bg-white text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-all"
                      >
                        <CalendarCheck className="w-4 h-4 text-indigo-600" />
                        {translate('scheduleNext')}
                      </button>
                      <button
                        onClick={handleRenewPackage}
                        className="bg-indigo-600 text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition-all border border-indigo-500/20"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        {translate('renewPackage')}
                      </button>
                      <button
                        onClick={handleBuyExtraVisits}
                        className="bg-slate-800 text-slate-300 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-700 transition-all border border-slate-700/50"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
                        {translate('buyVisits')}
                      </button>
                    </div>
                  </div>

                  {/* TWO SIDE-BY-SIDE CARDS: UPCOMING VISITS & LOYALTY SUMMARY */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* List of Scheduled Future appointments */}
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          {translate('upcomingServices')}
                        </h4>
                        <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-2 py-0.5 rounded-full">
                          {upcomingServices.length} Active Bookings
                        </span>
                      </div>

                      {upcomingServices.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs">
                          No upcoming services booked yet. Click below to use your package credits!
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          {upcomingServices.map((apt) => (
                            <div key={apt.id} className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-start gap-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-black text-slate-950">{apt.date}</span>
                                  <span className="text-[10px] text-slate-400">@</span>
                                  <span className="text-xs font-black text-slate-700">{apt.time}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">
                                  Provider: {apt.worker} • {apt.serviceType}
                                </p>
                                {apt.addons.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {apt.addons.map((ad, idx) => (
                                      <span key={idx} className="bg-amber-100/60 border border-amber-200 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded-md">
                                        + {ad}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleRescheduleApt(apt.id, '2026-07-20', '11:00')}
                                  className="text-[10px] text-indigo-600 font-extrabold px-2.5 py-1 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-100"
                                >
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => handleCancelApt(apt.id)}
                                  className="p-1 hover:bg-red-50 text-red-600 rounded-lg transition-colors border border-red-100"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Loyalty Points Redemption and Quick Rewards panel */}
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          Redeem Loyalty Rewards
                        </h4>
                        <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> {loyaltyPoints} PTS Available
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-indigo-50/50 border border-indigo-100/30 rounded-2xl flex justify-between items-center gap-3">
                          <div>
                            <span className="text-xs font-black text-slate-900">1 Free Service Add-On</span>
                            <p className="text-[10px] text-slate-500">Apply to any upcoming package booking session</p>
                          </div>
                          <button
                            onClick={() => {
                              if (loyaltyPoints >= 150) {
                                setLoyaltyPoints(p => p - 150);
                                triggerSuccessBanner('✓ Recompensa resgatada! Cupão de opcional gratuito gerado na sua conta.');
                              } else {
                                alert('Saldo de pontos insuficiente!');
                              }
                            }}
                            className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap"
                          >
                            150 PTS
                          </button>
                        </div>

                        <div className="p-3 bg-amber-50/50 border border-amber-100/30 rounded-2xl flex justify-between items-center gap-3">
                          <div>
                            <span className="text-xs font-black text-slate-900">Free Organic Treat / Home Scent Set</span>
                            <p className="text-[10px] text-slate-500">Delivered during your next scheduled appointment</p>
                          </div>
                          <button
                            onClick={() => {
                              if (loyaltyPoints >= 200) {
                                setLoyaltyPoints(p => p - 200);
                                triggerSuccessBanner('✓ Recompensa resgatada! Brinde incluído na sua próxima visita.');
                              } else {
                                alert('Saldo de pontos insuficiente!');
                              }
                            }}
                            className="bg-amber-600 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap"
                          >
                            200 PTS
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* INDIQUE UM AMIGO / REFERRAL BANNER */}
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    <div className="lg:col-span-2 space-y-1">
                      <h4 className="text-sm font-black text-slate-950 uppercase flex items-center gap-2">
                        <Gift className="w-4 h-4 text-emerald-500" /> {translate('referralTitle')}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {translate('referralDesc')}
                      </p>
                    </div>
                    <form onSubmit={handleSendReferral} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="amigo@email.com"
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 text-white text-xs font-black uppercase px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" /> Invite
                      </button>
                    </form>
                  </div>

                </div>
              )}

              {/* TAB 2: DETAILED REMAINING VISITS & TIMELINE TRACKER */}
              {activeClientTab === 'portal_packages' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-black text-slate-950 uppercase">Packages & Service Remaining</h3>
                      <p className="text-xs text-slate-400 font-semibold">Active usage statistics, limits and purchase history log</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-black uppercase px-3 py-1 rounded-full border border-emerald-100">
                      Balance Active ✓
                    </span>
                  </div>

                  {/* Progress milestones timeline */}
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-6">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{translate('packageTimeline')}</h4>
                    
                    {/* Visual Milestone Progress Tracker */}
                    <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2">
                      {/* Horizontal Connective Line */}
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -z-10 hidden md:block"></div>
                      
                      {/* Milestones steps */}
                      {[
                        { step: 1, title: 'Purchased', desc: `${packageBalance.totalVisits} Credits`, status: 'completed' },
                        { step: 2, title: 'First half', desc: 'Starting strong', status: 'completed' },
                        { step: 3, title: 'Current Status', desc: `${packageBalance.totalVisits - packageBalance.usedVisits} Remaining`, status: 'active' },
                        { step: 4, title: 'Completed', desc: 'Bonus points reward', status: 'pending' }
                      ].map((m, idx) => (
                        <div key={idx} className="flex md:flex-col items-center gap-3 text-left md:text-center relative z-10 w-full md:w-1/4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border ${
                            m.status === 'completed'
                              ? 'bg-emerald-500 border-emerald-600 text-white'
                              : m.status === 'active'
                                ? 'bg-indigo-600 border-indigo-700 text-white animate-pulse'
                                : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}>
                            {m.status === 'completed' ? '✓' : m.step}
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-950">{m.title}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">{m.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Purchase details list & upgrade recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[9px] text-slate-400 font-black block uppercase">Package Purchase Date</span>
                      <p className="text-sm font-black text-slate-950">June 01, 2026</p>
                      <p className="text-[10px] text-slate-500">Secure transaction via Google Pay</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[9px] text-slate-400 font-black block uppercase">Price & Credits Charged</span>
                      <p className="text-sm font-black text-slate-950">R$ {packageBalance.pricePaid || 320},00</p>
                      <p className="text-[10px] text-slate-500">Includes free emergency scheduling</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[9px] text-slate-400 font-black block uppercase">Status</span>
                      <p className="text-sm font-black text-emerald-600 uppercase">ACTIVE & EXEMPT</p>
                      <p className="text-[10px] text-slate-500">No extra dispatch fees on weekends</p>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: SELF-SERVICE SCHEDULING WORKFLOW */}
              {activeClientTab === 'portal_book' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-950 uppercase">{translate('scheduleNext')}</h3>
                    <p className="text-xs text-slate-400 font-semibold">Self-service booking. Uses 1 credit from your remaining package balance.</p>
                  </div>

                  <form onSubmit={handleBookNextVisit} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs space-y-6">
                    
                    {/* Date and Time slots selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-900 uppercase block">Choose Available Date</label>
                        <input
                          type="date"
                          required
                          value={newBooking.date}
                          onChange={(e) => setNewBooking(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-900 uppercase block">Select Preferred Arrival Time</label>
                        <select
                          value={newBooking.time}
                          onChange={(e) => setNewBooking(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="08:00">08:00 AM (Morning Slot)</option>
                          <option value="10:00">10:00 AM (Mid Morning)</option>
                          <option value="13:00">01:00 PM (Afternoon Shift)</option>
                          <option value="15:00">03:00 PM (Late Afternoon)</option>
                          <option value="19:00">07:00 PM (Night Shift)</option>
                        </select>
                      </div>
                    </div>

                    {/* SELECT OPTIONAL PREMIUM ADD-ON SERVICES TO UPSELL */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-900 uppercase block">{translate('addOptional')}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {config.availableAddons.map((addon) => {
                          const isSelected = newBooking.addons.includes(addon.name);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => {
                                setNewBooking(prev => {
                                  const alreadyHas = prev.addons.includes(addon.name);
                                  const updated = alreadyHas
                                    ? prev.addons.filter(a => a !== addon.name)
                                    : [...prev.addons, addon.name];
                                  return { ...prev, addons: updated };
                                });
                              }}
                              className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-indigo-50/75 border-indigo-400 text-indigo-900 shadow-3xs'
                                  : 'bg-white border-slate-200/60 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{addon.emoji}</span>
                                <div>
                                  <p className="text-xs font-black">{addon.name}</p>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase">+ {addon.price} credits/pts equivalent</p>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'bg-indigo-600 border-indigo-700 text-white' : 'border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Special instruction notes */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-900 uppercase block">Special Access Code / Entry Instructions</label>
                      <textarea
                        rows={2}
                        placeholder="Register door code, lockbox coordinates, or special medical routine checklist details here..."
                        value={newBooking.notes}
                        onChange={(e) => setNewBooking(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Submit confirmation button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase px-6 py-3 rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-1.5"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Confirm Booking & Deduct 1 Credit
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 4: MEMBERSHIP BENEFITS VIEW */}
              {activeClientTab === 'portal_membership' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-black text-slate-950 uppercase">{translate('membershipBenefits')}</h3>
                      <p className="text-xs text-slate-400 font-semibold">Active Subscription: Gold Elite Privilege tier active</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      R$ {config.membershipPrice || 39}/month active
                    </span>
                  </div>

                  {/* List of custom membership benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.membershipBenefits.map((b, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                          ✓
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">{b}</p>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
                            Included on active Gold tier. Valid across any home service dispatcher.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Digital Gift cards section within client portal */}
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-6">
                    <div className="border-b border-slate-50 pb-2">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        {translate('giftCardTitle')}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Gift special care hours to friends or family members!</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Active Purchased Gift cards list */}
                      <div className="lg:col-span-2 space-y-3.5">
                        {giftCards.map((g, idx) => (
                          <div key={idx} className="p-4 bg-amber-50/50 border border-amber-200/30 rounded-2xl flex justify-between items-center gap-3">
                            <div className="space-y-1">
                              <span className="text-[9px] text-amber-700 font-black uppercase bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                                Active Gift Coupon Code
                              </span>
                              <p className="text-sm font-black text-slate-950">R$ {g.amount},00 for {g.recipient}</p>
                              <p className="text-xs text-slate-500 italic">"{g.message}"</p>
                            </div>
                            <div className="text-right">
                              <span className="font-mono text-xs font-extrabold bg-white border border-slate-200 px-2.5 py-1 rounded-lg block text-slate-700 select-all">
                                {g.code}
                              </span>
                              <span className="text-[9px] text-slate-400 font-bold block mt-1">Sent on {g.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Buy new Gift card form */}
                      <form onSubmit={handleBuyGiftCard} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl space-y-3.5">
                        <span className="text-[10px] text-slate-400 font-black uppercase block">Buy Gift Coupon</span>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 font-bold uppercase">Recipient Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Grandma Clara"
                            value={newGiftCard.recipient}
                            onChange={(e) => setNewGiftCard(prev => ({ ...prev, recipient: e.target.value }))}
                            className="w-full bg-white border border-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 font-bold uppercase">Value (R$)</label>
                          <select
                            value={newGiftCard.amount}
                            onChange={(e) => setNewGiftCard(prev => ({ ...prev, amount: Number(e.target.value) }))}
                            className="w-full bg-white border border-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-bold"
                          >
                            <option value="50">R$ 50,00</option>
                            <option value="100">R$ 100,00</option>
                            <option value="150">R$ 150,00</option>
                            <option value="200">R$ 200,00</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-500 font-bold uppercase">Short Message</label>
                          <input
                            type="text"
                            placeholder="Enjoy your day!"
                            value={newGiftCard.message}
                            onChange={(e) => setNewGiftCard(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full bg-white border border-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 text-white font-black text-[10px] uppercase py-2.5 rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Purchase & Generate Code
                        </button>
                      </form>

                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: COMPLETED VISIT HISTORY & REPORT ARCHIVE */}
              {activeClientTab === 'portal_history' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-950 uppercase">{translate('serviceHistory')}</h3>
                    <p className="text-xs text-slate-400 font-semibold font-mono">Completed checkouts logs, GPS checkpoints & supervisor reviews</p>
                  </div>

                  <div className="space-y-5">
                    {config.serviceHistoryLogs.map((log, index) => (
                      <div key={index} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs space-y-3.5">
                        
                        {/* Header: Date, Rating, Worker */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-slate-50">
                          <div>
                            <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                              Completed Service ✓
                            </span>
                            <h4 className="text-sm font-black text-slate-950 mt-1">{log.date} — Serviced by {log.worker}</h4>
                          </div>

                          {/* Interactive Double sided review stars */}
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3.5 h-3.5 ${s <= log.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`} />
                            ))}
                            <span className="text-xs font-bold text-slate-500 ml-1">({log.rating}.0)</span>
                          </div>
                        </div>

                        {/* Mid report row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl text-center">
                            <span className="text-[9px] text-slate-400 font-bold block uppercase">Checkin GPS</span>
                            <span className="text-[11px] font-mono text-slate-600 block">Verified Lock ✓</span>
                          </div>
                          <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl text-center">
                            <span className="text-[9px] text-slate-400 font-bold block uppercase">Session Duration</span>
                            <span className="text-[11px] font-black text-slate-700 block">{log.duration}</span>
                          </div>
                          <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl text-center">
                            <span className="text-[9px] text-slate-400 font-bold block uppercase">Client Portal Photo</span>
                            <span className="text-lg block">{log.photo}</span>
                          </div>
                          <div className="p-2 flex justify-center">
                            <button
                              onClick={() => alert(`Enviando PDF da fatura do dia ${log.date} para o seu email: ${user.email}`)}
                              className="text-[10px] text-slate-600 font-black border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" /> Get PDF Invoice
                            </button>
                          </div>
                        </div>

                        {/* Text report review */}
                        <p className="text-xs text-slate-500 bg-slate-50/50 p-3 rounded-2xl border border-slate-200/20 italic">
                          " {log.report} "
                        </p>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: DEDICATED LOYALTY PROGRESS BAR SCREEN */}
              {activeClientTab === 'portal_rewards' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-950 uppercase">BGrowth Rewards Program</h3>
                    <p className="text-xs text-slate-400 font-semibold">Track points, redeem premium treats, and refer your colleagues</p>
                  </div>

                  {/* Active Point Tracker Box */}
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    
                    <div className="space-y-2 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Your Points Engine</span>
                      <span className="text-3xl font-black text-indigo-600 block">{loyaltyPoints} PTS</span>
                      <span className={`inline-block text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${loyaltyBadge.color}`}>
                        {loyaltyBadge.label}
                      </span>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                      <h4 className="text-xs font-black text-slate-900 uppercase">Points multipliers on {config.name}:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center gap-2">
                          <span className="text-lg">💰</span>
                          <div>
                            <p className="font-black text-slate-900">1x Points Standard</p>
                            <p className="text-[10px] text-slate-400">Earned per $1 spent</p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center gap-2">
                          <span className="text-lg">⭐</span>
                          <div>
                            <p className="font-black text-slate-900">5x Referral Multipiler</p>
                            <p className="text-[10px] text-slate-400">Earn 150 pts per new friend join</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Referred friend status history tracker */}
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-4">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Referral Tracking History</h4>
                    <div className="space-y-3">
                      {referredFriends.map((f, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">✉️</span>
                            <div>
                              <p className="font-black text-slate-900">{f.email}</p>
                              <p className="text-[10px] text-slate-400">Invited on {f.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              f.status.includes('Completed')
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse'
                            }`}>
                              {f.status}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 font-extrabold">{f.reward}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </main>
          </>
        )}

        {/* ======================================= */}
        {/* OPTION B: BUSINESS ADMIN MANAGEMENT VIEW */}
        {/* ======================================= */}
        {currentView === 'business' && (
          <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto">
            
            {/* Business admin metrics summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
              <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs">
                <span className="text-[9px] text-slate-400 font-black block uppercase">{translate('totalSpent')}</span>
                <span className="text-lg font-black text-slate-950">R$ 14.850,00</span>
                <span className="text-emerald-600 font-bold text-[10px] block mt-1">↑ 18% month-over-month</span>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs">
                <span className="text-[9px] text-slate-400 font-black block uppercase">{translate('redemptionRate')}</span>
                <span className="text-lg font-black text-slate-950">84.5%</span>
                <span className="text-indigo-600 font-bold text-[10px] block mt-1">High fidelity repeat rate</span>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs">
                <span className="text-[9px] text-slate-400 font-black block uppercase">{translate('activeMembers')}</span>
                <span className="text-lg font-black text-slate-950">142 Clients</span>
                <span className="text-purple-600 font-bold text-[10px] block mt-1">On Gold/VIP subscriptions</span>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs">
                <span className="text-[9px] text-slate-400 font-black block uppercase">{translate('averageLtv')}</span>
                <span className="text-lg font-black text-slate-950">R$ 480,00</span>
                <span className="text-amber-600 font-bold text-[10px] block mt-1">Per active profile account</span>
              </div>
            </div>

            {/* Admin Package management grid & Creation form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Existing Packages list */}
              <div className="lg:col-span-2 bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Active Customer Packages Catalog
                  </h4>
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {adminPackages.length} Models registered
                  </span>
                </div>

                <div className="space-y-3">
                  {adminPackages.map((p) => (
                    <div key={p.id} className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-center">
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-slate-900">{p.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Includes {p.visits} sessions • Bundle Discount: {p.discount}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-900">R$ {p.price},00</span>
                        <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">{p.activePurchases} clients active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create new package templates */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {translate('createNewPackage')}
                </h4>
                
                <form onSubmit={handleAddAdminPackage} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold uppercase block">Package Template Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10 Dog Walks Deluxe Package"
                      value={newAdminPackage.name}
                      onChange={(e) => setNewAdminPackage(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-bold uppercase block">Total Visits</label>
                      <input
                        type="number"
                        required
                        value={newAdminPackage.visits}
                        onChange={(e) => setNewAdminPackage(prev => ({ ...prev, visits: Number(e.target.value) }))}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-bold uppercase block">Price (R$)</label>
                      <input
                        type="number"
                        required
                        value={newAdminPackage.price}
                        onChange={(e) => setNewAdminPackage(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black text-[10px] uppercase py-2 rounded-xl shadow-md"
                  >
                    Save & Deploy Template
                  </button>
                </form>
              </div>

            </div>

            {/* Interactive Loyalty program rules setup & config */}
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
              <div className="border-b border-slate-50 pb-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {translate('customRules')}
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold">Rules apply across all connected multi-tenant systems</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <label className="text-[10px] text-slate-500 font-black uppercase block">{translate('pointsEarnedDesc')}</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={loyaltyRules.pointsPerDollar}
                      onChange={(e) => setLoyaltyRules(prev => ({ ...prev, pointsPerDollar: Number(e.target.value) }))}
                      className="w-20 bg-white border border-slate-200 text-xs font-black rounded-lg p-1.5 focus:outline-none focus:ring-1"
                    />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">PTS per R$</span>
                  </div>
                </div>

                <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <label className="text-[10px] text-slate-500 font-black uppercase block">Client Signup Bonus points:</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={loyaltyRules.signupBonus}
                      onChange={(e) => setLoyaltyRules(prev => ({ ...prev, signupBonus: Number(e.target.value) }))}
                      className="w-20 bg-white border border-slate-200 text-xs font-black rounded-lg p-1.5 focus:outline-none focus:ring-1"
                    />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">PTS one-off</span>
                  </div>
                </div>

                <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <label className="text-[10px] text-slate-500 font-black uppercase block">Referral Code bonus:</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={loyaltyRules.referralBonus}
                      onChange={(e) => setLoyaltyRules(prev => ({ ...prev, referralBonus: Number(e.target.value) }))}
                      className="w-20 bg-white border border-slate-200 text-xs font-black rounded-lg p-1.5 focus:outline-none focus:ring-1"
                    />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">PTS awarded</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Levels & CRM segmentation lists */}
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {translate('customerSegments')}
                </h4>
                <div className="flex items-center gap-1.5">
                  {['All', 'VIP', 'Gold', 'Silver', 'New'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSegmentFilter(s)}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${
                        activeSegmentFilter === s ? 'bg-indigo-600 text-white shadow-3xs' : 'text-slate-400 hover:text-slate-900 bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-black uppercase tracking-wider text-[9px]">
                      <th className="py-2 px-3">Client Name</th>
                      <th className="py-2 px-3">Active Segment</th>
                      <th className="py-2 px-3">Active Package</th>
                      <th className="py-2 px-3">Total Spent</th>
                      <th className="py-2 px-3">Loyalty score</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCustomerSegments
                      .filter(c => activeSegmentFilter === 'All' || c.level === activeSegmentFilter)
                      .map((c) => (
                        <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 font-black text-slate-900">{c.name}</td>
                          <td className="py-3 px-3">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                              c.level === 'VIP'
                                ? 'bg-purple-100 text-purple-700'
                                : c.level === 'Gold'
                                  ? 'bg-amber-100 text-amber-700'
                                  : c.level === 'Silver'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-slate-100 text-slate-600'
                            }`}>
                              {c.level}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-500">{c.activePackage}</td>
                          <td className="py-3 px-3 font-mono font-black text-slate-700">R$ {c.totalSpend},00</td>
                          <td className="py-3 px-3 font-semibold text-amber-600">{c.loyaltyScore} PTS</td>
                          <td className="py-3 px-3">
                            <span className="text-[10px] text-emerald-600 font-bold block">✓ Fully synced</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
