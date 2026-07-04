import React, { useState } from 'react';
import {
  Heart, Calendar, DollarSign, Award, Users, CheckCircle2, Clock, MapPin, Sparkles,
  Trash2, Plus, Search, LogOut, Globe, Activity, Shield, Star, User, Camera,
  AlertTriangle, ChevronRight, X, Send, Lock, RefreshCw, Eye, BookOpen, Check,
  ArrowRight, ShieldCheck, Download, Gift, Share2, TrendingUp, BarChart3, Settings,
  CalendarCheck, Trash, AlertCircle, ShoppingBag, PlusCircle, CheckSquare, Layers, EyeOff,
  Phone, Mail, FileText, CheckSquare2, FileCheck2, Info, ArrowLeftRight, HelpCircle
} from 'lucide-react';

import { Lang, Pet, Client, PetService, VisitLog, Staff, FinancialRecord } from './PetCareTypes';
import { PET_CARE_TRANSLATIONS } from './PetCareTranslations';
import {
  DEFAULT_CLIENTS,
  DEFAULT_PETS,
  DEFAULT_SERVICES,
  DEFAULT_STAFF,
  DEFAULT_VISIT_LOGS,
  DEFAULT_FINANCIALS
} from './PetCareData';

interface PetCareAppProps {
  user: {
    email: string;
    name: string;
    plan: string;
  };
  onBack: () => void;
}

export default function PetCareApp({ user, onBack }: PetCareAppProps) {
  // Locale & UI State
  const [lang, setLang] = useState<Lang>('pt');
  const [currentView, setCurrentView] = useState<'business' | 'client'>('business');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeClientPortalTab, setActiveClientPortalTab] = useState<string>('my_pets');
  
  // Data State Pools (rehydrate from default mock data)
  const [clients, setClients] = useState<Client[]>(DEFAULT_CLIENTS);
  const [pets, setPets] = useState<Pet[]>(DEFAULT_PETS);
  const [services, setServices] = useState<PetService[]>(DEFAULT_SERVICES);
  const [staff, setStaff] = useState<Staff[]>(DEFAULT_STAFF);
  const [visitLogs, setVisitLogs] = useState<VisitLog[]>(DEFAULT_VISIT_LOGS);
  const [financials, setFinancials] = useState<FinancialRecord[]>(DEFAULT_FINANCIALS);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [petFilter, setPetFilter] = useState<'All' | 'Dog' | 'Cat'>('All');
  const [staffFilter, setStaffFilter] = useState('All');

  // Selected Records for Details View
  const [selectedPetId, setSelectedPetId] = useState<string | null>('p1');
  const [selectedClientId, setSelectedClientId] = useState<string | null>('c1');
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);

  // Modal / Form triggers
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [isSchedulingVisit, setIsSchedulingVisit] = useState(false);

  // Check-In Active Session Simulation State
  const [activeSimulatingVisitId, setActiveSimulatingVisitId] = useState<string | null>(null);
  const [simCheckInNotes, setSimCheckInNotes] = useState('');
  const [simCheckOutNotes, setSimCheckOutNotes] = useState('');
  const [simChecklistCompleted, setSimChecklistCompleted] = useState<string[]>([]);

  // Client Portal States
  const [clientMessageText, setClientMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'staff', text: 'Olá Sarah! Acabamos de iniciar o passeio com a Bella.', time: '08:03', photo: '🐕' },
    { sender: 'staff', text: 'Ela foi ao parque, brincou e já tomou o Apoquel. Segue foto da patota.', time: '08:45', photo: '🌳' },
    { sender: 'client', text: 'Perfeito, muito obrigada! Ela adora esse parque.', time: '08:48' }
  ]);

  // Form State Containers
  const [newClientForm, setNewClientForm] = useState({
    name: '', phone: '', email: '', address: '', documentCpf: '',
    emergencyName: '', emergencyPhone: '', emergencyRelation: '',
    paymentMethod: 'Credit Card', notes: '', hasKey: false, keyCode: '', keyInstructions: ''
  });

  const [newPetForm, setNewPetForm] = useState({
    name: '', clientId: 'c1', species: 'Dog' as 'Dog' | 'Cat', breed: '', sex: 'Male' as 'Male' | 'Female',
    weight: 10, age: 2, color: '', microchip: '', neutered: true, birthdate: '2024-01-01',
    vaccine1Name: 'V10', vaccine1Date: '2026-01-10',
    allergy: '', medication: '', restriction: '', brand: 'Royal Canin', amount: '150g'
  });

  const [newServiceForm, setNewServiceForm] = useState({
    name: '', price: 50, duration: 45, category: 'Dog Walking', description: '', notes: ''
  });

  const [newStaffForm, setNewStaffForm] = useState({
    name: '', role: 'Cuidador', specialties: '', contact: '', notes: ''
  });

  const [newScheduleForm, setNewScheduleForm] = useState({
    clientId: 'c1', petIds: [] as string[], serviceId: 's1', workerId: 'e1', date: '2026-06-30', time: '14:00'
  });

  // Success Notification
  const [notification, setNotification] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const t = (key: string) => {
    return PET_CARE_TRANSLATIONS[lang][key] || key;
  };

  // --- CRUD FUNCTIONS ---
  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Client = {
      id: `c-${Date.now()}`,
      name: newClientForm.name,
      phone: newClientForm.phone,
      email: newClientForm.email,
      address: newClientForm.address,
      documentCpf: newClientForm.documentCpf,
      emergencyContact: {
        name: newClientForm.emergencyName,
        phone: newClientForm.emergencyPhone,
        relation: newClientForm.emergencyRelation
      },
      paymentMethod: newClientForm.paymentMethod,
      notes: newClientForm.notes,
      keyControl: {
        hasKey: newClientForm.hasKey,
        keyCode: newClientForm.keyCode || 'N/A',
        instructions: newClientForm.keyInstructions,
        holder: newClientForm.hasKey ? 'BGrowth Office Vault' : 'None'
      },
      packagesRemaining: 10
    };

    setClients(prev => [...prev, created]);
    setIsAddingClient(false);
    setNewClientForm({
      name: '', phone: '', email: '', address: '', documentCpf: '',
      emergencyName: '', emergencyPhone: '', emergencyRelation: '',
      paymentMethod: 'Credit Card', notes: '', hasKey: false, keyCode: '', keyInstructions: ''
    });
    triggerToast('Cliente cadastrado com sucesso!');
  };

  const handleCreatePet = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Pet = {
      id: `p-${Date.now()}`,
      name: newPetForm.name,
      clientId: newPetForm.clientId,
      photo: newPetForm.species === 'Dog' ? '🐕' : '🐱',
      species: newPetForm.species,
      breed: newPetForm.breed,
      sex: newPetForm.sex,
      weight: Number(newPetForm.weight),
      age: Number(newPetForm.age),
      color: newPetForm.color,
      microchip: newPetForm.microchip || 'N/A',
      neutered: newPetForm.neutered,
      birthdate: newPetForm.birthdate,
      health: {
        vaccines: [{ name: newPetForm.vaccine1Name, date: newPetForm.vaccine1Date, status: 'Up to Date' }],
        allergies: newPetForm.allergy ? [newPetForm.allergy] : [],
        illnesses: [],
        medications: newPetForm.medication ? [{ name: newPetForm.medication, dosage: '1 unit', frequency: 'As directed' }] : [],
        surgeries: [],
        restrictions: newPetForm.restriction ? [newPetForm.restriction] : [],
        insurance: 'None',
        veterinarian: { name: 'Clinica Geral', phone: 'N/A', clinic: 'Local Vet' },
        hospitalPreferential: 'Pronto Socorro Local'
      },
      feeding: {
        brand: newPetForm.brand,
        amount: newPetForm.amount,
        times: ['08:00', '18:00'],
        restrictions: [],
        snacksAllowed: true,
        snacksDetails: 'Apenas snacks caninos permitidos'
      },
      behavior: {
        sociable: true, aggressive: false, anxious: false, fearful: false, barksMuch: false, bites: false,
        friendlyWithDogs: true, friendlyWithKids: true, fearFireworks: true, fearStorms: true, lovesToPlay: true,
        favoriteToys: ['Corda', 'Bolinha']
      },
      care: {
        brushing: true, bathing: false, medicationsNeeded: !!newPetForm.medication, walksFrequency: 'Diário',
        specialNeeds: [], dailyRoutine: 'Rotina de cuidados padrão.'
      },
      documents: [],
      photos: ['📸 Primeiro dia na plataforma!'],
      customChecklist: [
        'Trocar água da tigela por água fresca',
        'Oferecer refeição recomendada no comedouro',
        'Verificar se o pet urinou ou defecou durante o período'
      ]
    };

    setPets(prev => [...prev, created]);
    setIsAddingPet(false);
    triggerToast('Pet cadastrado no Prontuário Digital com sucesso!');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PetService = {
      id: `s-${Date.now()}`,
      name: newServiceForm.name,
      price: Number(newServiceForm.price),
      duration: Number(newServiceForm.duration),
      color: 'indigo',
      category: newServiceForm.category,
      description: newServiceForm.description,
      requiredItems: ['Coleira', 'Guia do tutor'],
      notes: newServiceForm.notes
    };
    setServices(prev => [...prev, created]);
    setIsAddingService(false);
    triggerToast('Serviço personalizado criado com sucesso!');
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const created: VisitLog = {
      id: `v-${Date.now()}`,
      petIds: newScheduleForm.petIds,
      clientId: newScheduleForm.clientId,
      serviceId: newScheduleForm.serviceId,
      workerId: newScheduleForm.workerId,
      date: newScheduleForm.date,
      scheduledTime: newScheduleForm.time,
      status: 'Scheduled',
      completedTasks: []
    };
    setVisitLogs(prev => [created, ...prev]);
    setIsSchedulingVisit(false);
    triggerToast('Atendimento agendado com sucesso!');
  };

  const handleSendClientMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientMessageText.trim()) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [
      ...prev,
      { sender: 'client', text: clientMessageText, time: nowStr }
    ]);
    setClientMessageText('');
    
    // Auto simulated response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'staff', text: 'Entendido! Já estamos a caminho e cuidaremos de todos os checklists.', time: nowStr, photo: '👍' }
      ]);
    }, 1500);
  };

  // --- VISIT WORKFLOW SIMULATOR ---
  const handleCheckIn = (visitId: string) => {
    setActiveSimulatingVisitId(visitId);
    setSimCheckInNotes('Cheguei no local. Chaves funcionaram perfeitamente.');
    setSimChecklistCompleted(['Water refreshed']); // default pre-completed task for demo
    setVisitLogs(prev => prev.map(v => {
      if (v.id === visitId) {
        return {
          ...v,
          status: 'Checked-In',
          checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          checkInGPS: '-23.5629, -46.6544 (BGrowth Certified Location)',
          checkInPhoto: '📸 Foto do Check-in no local'
        };
      }
      return v;
    }));
    triggerToast('Check-in registrado com GPS e Foto simulados!');
  };

  const handleCheckOut = () => {
    if (!activeSimulatingVisitId) return;
    setVisitLogs(prev => prev.map(v => {
      if (v.id === activeSimulatingVisitId) {
        return {
          ...v,
          status: 'Completed',
          checkOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          checkOutGPS: '-23.5631, -46.6541 (BGrowth Certified Location)',
          checkOutPhoto: '📸 Foto do Pet alimentado e tranquilo',
          completedTasks: simChecklistCompleted,
          reportNotes: simCheckOutNotes || 'Tudo ocorreu perfeitamente bem. O pet brincou bastante e se alimentou corretamente.',
          rating: 5
        };
      }
      return v;
    }));
    setActiveSimulatingVisitId(null);
    setSimCheckInNotes('');
    setSimCheckOutNotes('');
    setSimChecklistCompleted([]);
    triggerToast('✓ Check-out concluído! Relatório de Visita enviado para o Portal do Cliente.');
  };

  const toggleSimTask = (task: string) => {
    setSimChecklistCompleted(prev =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  // --- DYNAMIC SEGMENT COUNTERS ---
  const todayDateStr = '2026-06-30';
  const todaysVisits = visitLogs.filter(v => v.date === todayDateStr);
  const pendingRequestsCount = 2; // simulated
  const activeStaffWorking = staff.filter(s => s.id !== 'e3').length; // active walkers
  
  // Financial Sum
  const totalIncomeMonth = financials.filter(f => f.type === 'Income').reduce((sum, curr) => sum + curr.amount, 0);
  const totalExpensesMonth = financials.filter(f => f.type === 'Expense').reduce((sum, curr) => sum + curr.amount, 0);
  const todaysRevenue = financials.filter(f => f.date === todayDateStr && f.type === 'Income').reduce((sum, curr) => sum + curr.amount, 0);

  // --- COMPORTAMENTAL / ROUTINE LOGIC (Rotina Inteligente ⭐) ---
  const getSmartRoutineInstructions = (pet: Pet) => {
    const routines = [];
    if (pet.species === 'Dog') {
      routines.push('Verificar coleira e peitoral antes de abrir portas para a rua.');
      if (pet.behavior.anxious || pet.behavior.fearful) {
        routines.push('Evitar ruas movimentadas ou buzinas. Manter guia curta.');
      }
      if (pet.weight > 25) {
        routines.push('Evitar atividade física intensa sob o sol forte (Risco de hipertermia).');
      }
    } else if (pet.species === 'Cat') {
      routines.push('Certificar-se de fechar todas as telas de proteção ao entrar/sair.');
      routines.push('Trocar a água da fonte. Gatos preferem água corrente e fresca.');
    }

    if (pet.health.medications.length > 0) {
      routines.push('Administrar os medicamentos orais misturados em sachê para evitar estresse.');
    }
    return routines;
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="bg-slate-900 border-b border-teal-500 text-teal-400 text-xs font-black py-3 px-6 text-center animate-bounce flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" /> {notification}
        </div>
      )}

      {/* Primary Workspace Header */}
      <div className="bg-white border-b border-slate-100 p-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🐾</span>
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                {t('title')}
              </h1>
              <span className="bg-teal-50 border border-teal-100 text-teal-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                BGrowth Club v2.5
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* View Toggler (Business vs Client Portal) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrentView('business')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentView === 'business' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> {t('businessPanel')}
            </button>
            <button
              onClick={() => setCurrentView('client')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentView === 'client' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" /> {t('clientPortal')}
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
            {(['pt', 'en', 'es', 'fr'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase transition-all ${
                  lang === l ? 'bg-white text-teal-600 shadow-3xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* ======================================= */}
        {/* VIEW 1: BUSINESS ADMINISTRATION PORTAL  */}
        {/* ======================================= */}
        {currentView === 'business' && (
          <>
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-56 bg-white border-r border-slate-100 p-4 shrink-0">
              <div className="space-y-4">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">EMPRESA</div>
                <nav className="space-y-1">
                  {[
                    { id: 'dashboard', label: t('todayDashboard'), icon: <Activity className="w-4 h-4" /> },
                    { id: 'pets', label: t('activePets') + ' Prontuário', icon: <Heart className="w-4 h-4 text-rose-500" /> },
                    { id: 'clients', label: t('activeClients') + ' & Chaves', icon: <Users className="w-4 h-4" /> },
                    { id: 'services', label: t('services'), icon: <Settings className="w-4 h-4" /> },
                    { id: 'staff', label: t('team'), icon: <ShieldCheck className="w-4 h-4" /> },
                    { id: 'financial', label: t('financial'), icon: <DollarSign className="w-4 h-4 text-emerald-600" /> },
                    { id: 'reports', label: t('reports'), icon: <BarChart3 className="w-4 h-4" /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-3 transition-all ${
                        activeTab === tab.id
                          ? 'bg-teal-50 text-teal-700 font-extrabold shadow-3xs'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>

                {/* Visit Simulation Control Box (Float if active) */}
                {visitLogs.some(v => v.status === 'Checked-In') && (
                  <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-black text-amber-800 uppercase">
                      <Clock className="w-4 h-4 text-amber-600 animate-pulse" /> Atendimento Ativo
                    </div>
                    <p className="text-[9px] text-slate-600 font-bold leading-relaxed">
                      Você possui uma visita iniciada no momento. Registre os checklists e faça o check-out.
                    </p>
                    <button
                      onClick={() => {
                        const activeId = visitLogs.find(v => v.status === 'Checked-In')?.id;
                        if (activeId) {
                          setActiveSimulatingVisitId(activeId);
                        }
                      }}
                      className="w-full bg-amber-600 text-white text-[10px] font-black uppercase py-1.5 rounded-lg text-center"
                    >
                      Abrir Simulator
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* Business Content Viewport */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto">
              
              {/* TAB: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Indicators Bento Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    
                    <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-3xs space-y-1">
                      <span className="text-[10px] text-slate-400 font-black uppercase block">{t('todaysServices')}</span>
                      <div className="text-xl font-black text-slate-900 flex items-center justify-between">
                        <span>{todaysVisits.length}</span>
                        <Calendar className="w-5 h-5 text-teal-500" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block">
                        {todaysVisits.filter(v => v.status === 'Completed').length} concluídos
                      </span>
                    </div>

                    <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-3xs space-y-1">
                      <span className="text-[10px] text-slate-400 font-black uppercase block">{t('workingStaff')}</span>
                      <div className="text-xl font-black text-slate-900 flex items-center justify-between">
                        <span>{activeStaffWorking}</span>
                        <ShieldCheck className="w-5 h-5 text-indigo-500" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block">Cuidadores na rua</span>
                    </div>

                    <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-3xs space-y-1">
                      <span className="text-[10px] text-slate-400 font-black uppercase block">{t('activePets')}</span>
                      <div className="text-xl font-black text-slate-900 flex items-center justify-between">
                        <span>{pets.length}</span>
                        <Heart className="w-5 h-5 text-rose-500" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block">Prontuários salvos</span>
                    </div>

                    <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-3xs space-y-1">
                      <span className="text-[10px] text-slate-400 font-black uppercase block">{t('todayRevenue')}</span>
                      <div className="text-xl font-black text-teal-600 flex items-center justify-between">
                        <span>R$ {todaysRevenue}</span>
                        <DollarSign className="w-5 h-5 text-teal-500" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block">Receita hoje</span>
                    </div>

                    <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-3xs col-span-2 lg:col-span-1 space-y-1">
                      <span className="text-[10px] text-slate-400 font-black uppercase block">{t('monthlyRevenue')}</span>
                      <div className="text-xl font-black text-slate-900 flex items-center justify-between">
                        <span>R$ {totalIncomeMonth}</span>
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                      </div>
                      <span className="text-[9px] text-emerald-500 font-black block">Net: R$ {totalIncomeMonth - totalExpensesMonth}</span>
                    </div>

                  </div>

                  {/* Operational Agenda & Simulated Map Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Chronological Agenda */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <Clock className="w-4 h-4 text-teal-600" /> {t('agendaOfDay')}
                        </h3>
                        <button
                          onClick={() => setIsSchedulingVisit(true)}
                          className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" /> Novo Atendimento
                        </button>
                      </div>

                      <div className="space-y-3.5">
                        {visitLogs.map((visit) => {
                          const client = clients.find(c => c.id === visit.clientId);
                          const service = services.find(s => s.id === visit.serviceId);
                          const visitPets = pets.filter(p => visit.petIds.includes(p.id));
                          const worker = staff.find(s => s.id === visit.workerId);

                          return (
                            <div
                              key={visit.id}
                              className={`p-4 border rounded-2xl transition-all relative ${
                                visit.status === 'Completed'
                                  ? 'bg-emerald-50/40 border-emerald-100'
                                  : visit.status === 'Checked-In'
                                  ? 'bg-amber-50/70 border-amber-100 ring-2 ring-amber-400/30'
                                  : 'bg-slate-50 border-slate-100'
                              }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="bg-slate-900 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                                      {visit.scheduledTime}
                                    </span>
                                    <span className="text-xs font-bold text-slate-400">|</span>
                                    <div className="flex gap-1.5">
                                      {visitPets.map(p => (
                                        <span key={p.id} className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-full text-xs font-black">
                                          <span>{p.photo}</span>
                                          <span>{p.name}</span>
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-xs font-black text-slate-900">{service?.name}</p>
                                  <p className="text-[10px] text-slate-500 font-bold">
                                    Cliente: {client?.name} • Responsável: {worker?.name}
                                  </p>
                                </div>

                                <div className="text-right flex flex-col items-end gap-1.5">
                                  {visit.status === 'Scheduled' && (
                                    <button
                                      onClick={() => handleCheckIn(visit.id)}
                                      className="bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-3xs transition-all"
                                    >
                                      Check-In
                                    </button>
                                  )}
                                  {visit.status === 'Checked-In' && (
                                    <button
                                      onClick={() => setActiveSimulatingVisitId(visit.id)}
                                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-3xs transition-all animate-pulse"
                                    >
                                      Continuar Visita
                                    </button>
                                  )}
                                  {visit.status === 'Completed' && (
                                    <div className="flex items-center gap-1.5 text-emerald-600">
                                      <CheckCircle2 className="w-4 h-4" />
                                      <span className="text-[9px] font-black uppercase tracking-wider">Concluído</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Show Visit Report Summary inline if completed */}
                              {visit.status === 'Completed' && (
                                <div className="mt-3 pt-3 border-t border-slate-200/50 space-y-1.5">
                                  <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider">Relatório de Visita Gerado:</span>
                                  <p className="text-[10px] text-slate-600 italic">"{visit.reportNotes}"</p>
                                  <div className="flex gap-2 text-[9px] text-slate-400">
                                    <span>🕒 {visit.checkInTime} - {visit.checkOutTime}</span>
                                    <span>📍 GPS: {visit.checkOutGPS ? 'Verificado ✓' : 'N/A'}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interactive CSS Location Map of Services */}
                    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2 mb-3">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-rose-500" /> {t('mapView')}
                        </h3>
                        <span className="bg-rose-50 text-rose-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Realtime GPS Mock
                        </span>
                      </div>

                      {/* Map Container using styled SVG / HTML elements */}
                      <div className="bg-slate-950 h-64 rounded-xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
                        {/* Map Grid background */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                        
                        {/* Simulated roads and parks */}
                        <div className="absolute w-2/3 h-12 bg-slate-900 border-y border-slate-800 rotate-12 left-0 top-1/3"></div>
                        <div className="absolute w-1/3 h-48 bg-emerald-950/40 border border-emerald-900/30 rounded-3xl right-10 top-10 flex items-center justify-center">
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800">Parque Trianon</span>
                        </div>
                        
                        {/* Map Marker Pin 1: Bella Walk */}
                        <div className="absolute top-1/4 left-1/4 group cursor-pointer">
                          <div className="w-3 h-3 bg-teal-500 rounded-full animate-ping absolute"></div>
                          <div className="w-3 h-3 bg-teal-500 rounded-full border border-white relative z-10"></div>
                          <div className="bg-slate-900 text-white border border-slate-800 rounded-lg p-1.5 text-[8px] absolute top-4 left-0 w-24 shadow-md opacity-90">
                            <span className="font-black text-teal-400">🐕 Bella (Em Passeio)</span>
                            <span className="block text-slate-400">Walker: Jessica Mendes</span>
                          </div>
                        </div>

                        {/* Map Marker Pin 2: Max Sitting */}
                        <div className="absolute top-2/3 right-1/3 group cursor-pointer">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping absolute"></div>
                          <div className="w-3 h-3 bg-indigo-500 rounded-full border border-white relative z-10"></div>
                          <div className="bg-slate-900 text-white border border-slate-800 rounded-lg p-1.5 text-[8px] absolute top-4 left-0 w-24 shadow-md opacity-90">
                            <span className="font-black text-indigo-400">🐱 Max (Sitting)</span>
                            <span className="block text-slate-400">Sitter: Felipe Santos</span>
                          </div>
                        </div>

                        {/* Map Marker Pin 3: Luna Vet visit */}
                        <div className="absolute top-1/2 right-1/4 group cursor-pointer">
                          <div className="w-3 h-3 bg-rose-500 rounded-full border border-white relative z-10"></div>
                          <div className="bg-slate-900 text-white border border-slate-800 rounded-lg p-1.5 text-[8px] absolute top-4 left-0 w-24 shadow-md opacity-90">
                            <span className="font-black text-rose-400">🐕 Luna (Scheduled)</span>
                            <span className="block text-slate-400">11:00 - Medication</span>
                          </div>
                        </div>

                        <span className="absolute bottom-2 right-2 bg-slate-900/80 border border-slate-800 text-[8px] text-slate-400 font-bold px-2 py-0.5 rounded-md">
                          São Paulo Zone Map Grid
                        </span>
                      </div>

                      <div className="mt-3 text-[10px] text-slate-400 leading-relaxed font-bold">
                        ℹ️ Todos os caminhos e rotas de passeio são rastreados via satélite por GPS e compartilhados instantaneamente com o tutor através do relatório de check-out.
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB: PETS DIRECTORY (PRONTUÁRIO DIGITAL ⭐) */}
              {activeTab === 'pets' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-500" /> {t('petProntuario')}
                      </h2>
                      <p className="text-[10px] font-bold text-slate-400">Centralize informações de saúde, alimentação, behavior, rotinas e chaves de segurança.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingPet(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-black uppercase px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <Plus className="w-4 h-4" /> {t('registerPet')}
                    </button>
                  </div>

                  {/* Split Master Detail Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left List of Pets */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {(['All', 'Dog', 'Cat'] as const).map(f => (
                          <button
                            key={f}
                            onClick={() => setPetFilter(f)}
                            className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                              petFilter === f ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            {f}s
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2.5">
                        {pets
                          .filter(p => petFilter === 'All' || p.species === petFilter)
                          .map(pet => {
                            const petOwner = clients.find(c => c.id === pet.clientId);
                            return (
                              <button
                                key={pet.id}
                                onClick={() => setSelectedPetId(pet.id)}
                                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                  selectedPetId === pet.id
                                    ? 'bg-teal-50 border-teal-300 ring-1 ring-teal-200 shadow-3xs'
                                    : 'bg-white border-slate-100 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl bg-slate-50 border border-slate-100 p-2 rounded-xl">{pet.photo}</span>
                                  <div>
                                    <h4 className="text-xs font-black text-slate-950">{pet.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{pet.breed} • {pet.age} anos</p>
                                    <span className="text-[9px] text-slate-500 font-bold">Tutor: {petOwner?.name}</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Right Detailed Prontuário Digital ⭐ */}
                    {selectedPetId && (
                      <div className="lg:col-span-2 bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-6">
                        {(() => {
                          const pet = pets.find(p => p.id === selectedPetId);
                          if (!pet) return null;
                          const owner = clients.find(c => c.id === pet.clientId);

                          return (
                            <div className="space-y-6 animate-fade-in">
                              
                              {/* Header Profile Summary */}
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-5">
                                <div className="flex items-center gap-4">
                                  <span className="text-5xl bg-slate-50 border border-slate-200/50 p-4 rounded-3xl">{pet.photo}</span>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-black text-slate-900">{pet.name}</h3>
                                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                        pet.sex === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                                      }`}>
                                        {pet.sex === 'Male' ? 'Macho' : 'Fêmea'}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">{pet.breed} • {pet.color}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">Microchip ID: <span className="text-slate-700 font-extrabold">{pet.microchip}</span></p>
                                  </div>
                                </div>

                                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-left space-y-1">
                                  <span className="text-[9px] text-slate-400 font-black uppercase block">Tutor Responsável</span>
                                  <span className="text-xs font-black text-slate-900 block">{owner?.name}</span>
                                  <span className="text-[9px] text-slate-500 block">📞 {owner?.phone}</span>
                                </div>
                              </div>

                              {/* Tabs Bento Grid: Saúde, Alimentação, Comportamento, Custom Checklists */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                
                                {/* HEALTH & VACCINES SEC (Foco Saúde ⭐) */}
                                <div className="bg-rose-50/20 border border-rose-100/30 p-4 rounded-2xl space-y-3">
                                  <h4 className="text-[10px] font-black text-rose-700 uppercase tracking-widest flex items-center gap-1.5">
                                    <Shield className="w-4 h-4 text-rose-500" /> Prontuário de Saúde & Alertas
                                  </h4>
                                  
                                  <div className="space-y-2 text-xs">
                                    <div>
                                      <span className="text-[9px] text-slate-400 font-black uppercase block">Alergias Alimentares/Contato:</span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {pet.health.allergies.length > 0 ? (
                                          pet.health.allergies.map((a, idx) => (
                                            <span key={idx} className="bg-rose-100 border border-rose-200 text-rose-800 text-[9px] font-black px-2 py-0.5 rounded-md">
                                              ⚠️ {a}
                                            </span>
                                          ))
                                        ) : (
                                          <span className="text-slate-400 italic">Nenhuma alergia relatada</span>
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <span className="text-[9px] text-slate-400 font-black uppercase block">Medicações Ativas:</span>
                                      {pet.health.medications.length > 0 ? (
                                        pet.health.medications.map((m, idx) => (
                                          <div key={idx} className="bg-white border border-slate-200 p-2 rounded-xl mt-1 text-[10px]">
                                            <span className="font-black text-rose-600 block">{m.name}</span>
                                            <span className="text-slate-500 block">Dose: {m.dosage} • {m.frequency}</span>
                                          </div>
                                        ))
                                      ) : (
                                        <span className="text-slate-400 italic">Nenhuma medicação diária recomendada</span>
                                      )}
                                    </div>

                                    <div>
                                      <span className="text-[9px] text-slate-400 font-black uppercase block">Restrições e Cuidados Especiais:</span>
                                      <ul className="list-disc pl-4 space-y-1 text-slate-600 mt-1">
                                        {pet.health.restrictions.map((r, idx) => (
                                          <li key={idx} className="font-bold text-[10px]">{r}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* VACCINATION CHART STATUS (Foco Saúde ⭐) */}
                                <div className="bg-emerald-50/20 border border-emerald-100/30 p-4 rounded-2xl space-y-3">
                                  <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
                                    <FileCheck2 className="w-4 h-4 text-emerald-500" /> Controle de Vacinas & Alertas
                                  </h4>

                                  <div className="space-y-2">
                                    {pet.health.vaccines.map((v, idx) => (
                                      <div key={idx} className="flex justify-between items-center text-xs p-1.5 bg-white border border-slate-100 rounded-lg">
                                        <div>
                                          <span className="font-black text-slate-900 block">{v.name}</span>
                                          <span className="text-[9px] text-slate-400 block">Data aplicação: {v.date}</span>
                                        </div>
                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                          v.status === 'Up to Date'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-rose-100 text-rose-800 animate-pulse'
                                        }`}>
                                          {v.status === 'Up to Date' ? 'Em dia ✓' : 'Atrasada ⚠️'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="bg-white border border-emerald-100 p-3 rounded-xl space-y-1 text-left">
                                    <span className="text-[9px] text-emerald-600 font-black uppercase block">Veterinário e Hospital 24h</span>
                                    <p className="text-[10px] font-black text-slate-900">{pet.health.veterinarian.name} ({pet.health.veterinarian.clinic})</p>
                                    <p className="text-[9px] text-slate-400">Emergência: <span className="text-rose-600 font-bold">{pet.health.hospitalPreferential}</span></p>
                                  </div>
                                </div>

                                {/* FOOD GUIDELINES (Diet & Nutrition) */}
                                <div className="bg-amber-50/20 border border-amber-100/30 p-4 rounded-2xl space-y-3">
                                  <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-amber-500" /> Nutrição, Ração & Horários
                                  </h4>

                                  <div className="space-y-2 text-xs">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-black block uppercase">Marca Recomendada</span>
                                        <span className="font-bold text-slate-950 text-[10px] block">{pet.feeding.brand}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-slate-400 font-black block uppercase">Porção/Quantidade</span>
                                        <span className="font-bold text-slate-950 text-[10px] block">{pet.feeding.amount}</span>
                                      </div>
                                    </div>

                                    <div>
                                      <span className="text-[9px] text-slate-400 font-black block uppercase">Horários de Servir</span>
                                      <div className="flex gap-1.5 mt-1">
                                        {pet.feeding.times.map((t, idx) => (
                                          <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                                            🕒 {t}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <span className="text-[9px] text-slate-400 font-black block uppercase">Petiscos & Agrados</span>
                                      <p className="text-[10px] text-slate-600 font-bold leading-relaxed">{pet.feeding.snacksDetails}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* BEHAVIORAL DIAGNOSTIC (Comportamento ⭐) */}
                                <div className="bg-blue-50/20 border border-blue-100/30 p-4 rounded-2xl space-y-3">
                                  <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-1.5">
                                    <Info className="w-4 h-4 text-blue-500" /> Diagnóstico Comportamental
                                  </h4>

                                  <div className="grid grid-cols-2 gap-2 text-[9px] font-black uppercase text-slate-600">
                                    <span className={`p-1.5 rounded-lg border text-center ${pet.behavior.sociable ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
                                      {pet.behavior.sociable ? '✓ Sociável' : '⚠️ Anti-social'}
                                    </span>
                                    <span className={`p-1.5 rounded-lg border text-center ${pet.behavior.friendlyWithDogs ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
                                      {pet.behavior.friendlyWithDogs ? '✓ Amigo de Cães' : '⚠️ Medo de Cães'}
                                    </span>
                                    <span className={`p-1.5 rounded-lg border text-center ${pet.behavior.friendlyWithKids ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
                                      {pet.behavior.friendlyWithKids ? '✓ Amigo de Crianças' : '⚠️ Evitar Crianças'}
                                    </span>
                                    <span className={`p-1.5 rounded-lg border text-center ${pet.behavior.fearFireworks ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-slate-50 border-slate-100'}`}>
                                      {pet.behavior.fearFireworks ? '⚠️ Medo de Fogos' : '✓ Sem Medos'}
                                    </span>
                                  </div>

                                  <div className="space-y-1 text-[10px] text-slate-500">
                                    <span className="font-bold text-slate-400 block">Brinquedos Preferidos:</span>
                                    <p className="text-slate-700 font-bold">{pet.behavior.favoriteToys.join(', ')}</p>
                                  </div>
                                </div>

                              </div>

                              {/* KEY CONTROL & PHYSICAL ACCESS DATA (Diferencial ⭐) */}
                              <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl space-y-3">
                                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-amber-400" /> Custódia de Chaves & Códigos de Acesso
                                  </span>
                                  <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                    Vault Security Active
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                  <div>
                                    <span className="text-[9px] text-slate-400 font-black block uppercase">Status da Chave Física</span>
                                    <span className="font-extrabold text-white block">
                                      {owner?.keyControl.hasKey ? `Guarda Ativa (${owner.keyControl.keyCode})` : 'Não depositou chave'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-slate-400 font-black block uppercase">Portador Responsável</span>
                                    <span className="font-extrabold text-white block">
                                      {owner?.keyControl.hasKey ? owner.keyControl.holder : 'N/A'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-slate-400 font-black block uppercase">Portão / Teclado Eletrônico</span>
                                    <span className="font-extrabold text-amber-400 block">
                                      {owner?.keyControl.hasKey ? 'N/A' : 'Utiliza Senha Digital'}
                                    </span>
                                  </div>
                                </div>

                                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-[10px] text-slate-300 leading-relaxed font-bold">
                                  🔒 <span className="text-white font-extrabold">Instruções de Entrada:</span> "{owner?.keyControl.instructions}"
                                </div>
                              </div>

                              {/* TAILORED VISUAL TIMELINE OF RECENT SERVICES (Diferencial ⭐) */}
                              <div className="space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Linha do Tempo de Atendimentos & Eventos</span>
                                
                                <div className="relative pl-6 border-l border-teal-200 space-y-4">
                                  {visitLogs
                                    .filter(v => v.petIds.includes(pet.id) && v.status === 'Completed')
                                    .map((visit, idx) => (
                                      <div key={idx} className="relative">
                                        <div className="absolute -left-8 top-1 bg-teal-500 border-2 border-white w-3.5 h-3.5 rounded-full"></div>
                                        <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-xs space-y-1">
                                          <div className="flex justify-between font-black text-slate-900">
                                            <span>Concluído: {services.find(s => s.id === visit.serviceId)?.name}</span>
                                            <span className="text-slate-400">{visit.date}</span>
                                          </div>
                                          <p className="text-slate-500 text-[10px] italic">"{visit.reportNotes}"</p>
                                          <p className="text-[9px] text-slate-400 font-bold">Cuidador: {staff.find(s => s.id === visit.workerId)?.name} • Relatório validado com check-out por GPS.</p>
                                        </div>
                                      </div>
                                    ))}

                                  {/* Static Vaccine application point */}
                                  <div className="relative">
                                    <div className="absolute -left-8 top-1 bg-indigo-500 border-2 border-white w-3.5 h-3.5 rounded-full"></div>
                                    <div className="bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-2xl text-xs">
                                      <div className="flex justify-between font-black text-indigo-950">
                                        <span>💉 Vacina Aplicada: V10 & Raiva</span>
                                        <span className="text-slate-400">2026-05-10</span>
                                      </div>
                                      <p className="text-[9px] text-indigo-700 mt-1">Status: Atualizado no sistema. Próxima aplicação recomendada para Maio de 2027.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* ROTINA INTELIGENTE SUGERIDA (Diferencial ⭐) */}
                              <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl space-y-2">
                                <span className="text-[10px] text-teal-800 font-black uppercase tracking-wider block flex items-center gap-1">
                                  <Sparkles className="w-4 h-4 text-teal-600 animate-spin" /> Rotina Inteligente BGrowth™
                                </span>
                                <p className="text-[10px] text-slate-600 font-bold">
                                  Com base no perfil comportamental, restrições e espécie de <span className="text-slate-900 font-extrabold">{pet.name}</span>, o sistema prescreve automaticamente:
                                </p>
                                <ul className="list-disc pl-4 space-y-1.5 text-[10px] text-slate-700 font-bold">
                                  {getSmartRoutineInstructions(pet).map((inst, idx) => (
                                    <li key={idx}>{inst}</li>
                                  ))}
                                </ul>
                              </div>

                              {/* CUSTOM CHECKLISTS (Diferencial ⭐) */}
                              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
                                <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-900">
                                    Checklist de Visita Personalizado
                                  </span>
                                  <span className="bg-slate-200 text-slate-700 text-[8px] font-black px-1.5 py-0.5 rounded">
                                    {pet.customChecklist.length} tarefas obrigatórias
                                  </span>
                                </div>

                                <div className="space-y-1.5">
                                  {pet.customChecklist.map((task, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                                      <CheckSquare2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                                      <span>{task}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                            </div>
                          );
                        })()}
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* TAB: CLIENTS */}
              {activeTab === 'clients' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider">{t('clientList')}</h2>
                      <p className="text-[10px] font-bold text-slate-400">Gerencie contatos de emergência, formas de pagamento preferidas e chaves físicas guardadas.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingClient(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-black uppercase px-3 py-2 rounded-xl flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> {t('registerClient')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clients.map(client => (
                      <div key={client.id} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-black text-slate-900">{client.name}</h3>
                            <span className="bg-slate-100 text-slate-700 text-[9px] font-black px-2 py-0.5 rounded-md uppercase block w-max mt-1">
                              CPF: {client.documentCpf}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 font-black block uppercase">Visitas em Aberto / Pacote</span>
                            <span className="text-sm font-black text-teal-600">{client.packagesRemaining} Passeios</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 font-bold border-y border-slate-50 py-3">
                          <div>
                            <span className="text-[9px] text-slate-400 font-black block uppercase">Telefone</span>
                            <span className="text-slate-900 block">{client.phone}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 font-black block uppercase">E-mail</span>
                            <span className="text-slate-900 block truncate">{client.email}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[9px] text-slate-400 font-black block uppercase">Endereço de Acesso</span>
                            <span className="text-slate-900 block">{client.address}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl text-[10px] space-y-1 font-bold">
                          <span className="text-[9px] text-amber-600 font-black uppercase block">Contato de Emergência</span>
                          <p className="text-slate-900">{client.emergencyContact.name} ({client.emergencyContact.relation}) - <span className="font-extrabold">{client.emergencyContact.phone}</span></p>
                        </div>

                        {/* Keys Control Widget */}
                        <div className={`p-3.5 rounded-2xl border text-xs flex justify-between items-center ${
                          client.keyControl.hasKey ? 'bg-teal-50/50 border-teal-100' : 'bg-rose-50/50 border-rose-100'
                        }`}>
                          <div>
                            <span className="text-[9px] text-slate-400 font-black uppercase block">Custódia de Chave</span>
                            <span className="font-extrabold text-slate-900 block">
                              {client.keyControl.hasKey ? `Armazenada (${client.keyControl.keyCode})` : 'Acesso Digital / Código'}
                            </span>
                          </div>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            client.keyControl.hasKey ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {client.keyControl.hasKey ? 'Seguro' : 'Sem Chave'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider">Tabela de Serviços Personalizados</h2>
                      <p className="text-[10px] font-bold text-slate-400">Configure preços por hora, duração de passeios, checklists obrigatórios e instruções especiais.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingService(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-black uppercase px-3 py-2 rounded-xl flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Criar Serviço
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {services.map(service => (
                      <div key={service.id} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="bg-teal-50 text-teal-700 border border-teal-100 text-[8px] font-black uppercase px-2 py-0.5 rounded">
                              {service.category}
                            </span>
                            <h3 className="text-sm font-black text-slate-900 mt-1">{service.name}</h3>
                          </div>

                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 font-black block uppercase">Preço / Sessão</span>
                            <span className="text-sm font-black text-teal-600">R$ {service.price}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 font-bold leading-relaxed">{service.description}</p>

                        <div className="bg-slate-50 p-3.5 rounded-2xl space-y-2 text-xs font-bold">
                          <span className="text-[9px] text-slate-400 font-black block uppercase">Itens Obrigatórios de Saída</span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.requiredItems.map((item, idx) => (
                              <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-[9px] font-black px-2 py-0.5 rounded-lg">
                                ✓ {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-[9px] text-rose-500 font-black block uppercase">⚠️ Nota de Serviço: {service.notes}</p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB: TEAM / STAFF */}
              {activeTab === 'staff' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider">{t('team')}</h2>
                      <p className="text-[10px] font-bold text-slate-400">Controle a escala de cuidadores parceiros, avaliações de clientes e especialidades clínicas.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingStaff(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-black uppercase px-3 py-2 rounded-xl flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Novo Cuidador
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {staff.map(person => (
                      <div key={person.id} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl bg-slate-50 border border-slate-200 p-3 rounded-2xl">{person.photo}</span>
                          <div>
                            <h3 className="text-sm font-black text-slate-900">{person.name}</h3>
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">{person.role}</span>
                            <div className="flex items-center gap-1 mt-1 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="text-xs font-black text-slate-700">{person.rating} / 5.0</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs text-slate-600 font-bold border-t border-slate-50 pt-3">
                          <span className="text-[9px] text-slate-400 font-black block uppercase">Disponibilidade</span>
                          <span className="text-slate-900 block">{person.availability.join(', ')}</span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[9px] text-slate-400 font-black block uppercase">Especialidades & Treinamentos</span>
                          <div className="flex flex-wrap gap-1">
                            {person.specialties.map((spec, idx) => (
                              <span key={idx} className="bg-teal-50 border border-teal-100 text-teal-800 text-[9px] font-black px-2 py-0.5 rounded-md">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 italic">"{person.notes}"</p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB: FINANCIAL */}
              {activeTab === 'financial' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider">{t('financial')}</h2>
                    <p className="text-[10px] font-bold text-slate-400">Fluxo de Caixa, renovações de pacotes, deduções de faturamento e comissões dos cuidadores.</p>
                  </div>

                  {/* Financial Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl text-emerald-800">
                      <span className="text-[9px] font-black uppercase tracking-wider block">Entradas Totais</span>
                      <span className="text-2xl font-black">R$ {totalIncomeMonth}</span>
                    </div>
                    <div className="bg-rose-50 border border-rose-100 p-5 rounded-3xl text-rose-800">
                      <span className="text-[9px] font-black uppercase tracking-wider block">Despesas Totais</span>
                      <span className="text-2xl font-black">R$ {totalExpensesMonth}</span>
                    </div>
                    <div className="bg-slate-900 text-white p-5 rounded-3xl">
                      <span className="text-[9px] font-black uppercase tracking-wider block text-slate-400">Saldo Líquido</span>
                      <span className="text-2xl font-black">R$ {totalIncomeMonth - totalExpensesMonth}</span>
                    </div>
                  </div>

                  {/* Cash Flow Logs Table */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Registro Geral de Transações</span>
                    
                    <div className="space-y-2.5">
                      {financials.map(rec => (
                        <div key={rec.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center gap-3">
                          <div className="space-y-1">
                            <span className="text-xs font-black text-slate-950">{rec.description}</span>
                            <span className="text-[9px] text-slate-400 block uppercase">{rec.category} • {rec.date} • {rec.paymentMethod}</span>
                          </div>

                          <span className={`text-xs font-black ${rec.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {rec.type === 'Income' ? '+' : '-'} R$ {rec.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: REPORTS */}
              {activeTab === 'reports' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider">{t('reports')}</h2>
                    <p className="text-[10px] font-bold text-slate-400">Respostas analíticas rápidas sobre a saúde do seu negócio de Pet Care.</p>
                  </div>

                  {/* Analytical Questions & Solutions Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-3">
                      <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Qual serviço gera mais faturamento?</h3>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700">1. Dog Walking (Passeios)</span>
                          <span className="font-black text-teal-600">R$ 1.840,00 (55%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700">2. Pet Sitting (Cuidados)</span>
                          <span className="font-black text-slate-900">R$ 920,00 (27%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700">3. Pet Boarding (Hospedagem)</span>
                          <span className="font-black text-slate-900">R$ 580,00 (18%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-3">
                      <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Quais clientes possuem pacotes expirando?</h3>
                      <div className="space-y-3 text-xs">
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl flex justify-between items-center">
                          <div>
                            <span className="font-black text-slate-900 block">Maria Julia Abreu</span>
                            <span className="text-[9px] text-rose-600 font-extrabold uppercase">0 Passeios restantes!</span>
                          </div>
                          <span className="text-[10px] bg-slate-900 text-white font-black px-2.5 py-1 rounded-md cursor-pointer">Recomendar Renovação</span>
                        </div>

                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl flex justify-between items-center">
                          <div>
                            <span className="font-black text-slate-900 block">Roberto Alencar</span>
                            <span className="text-[9px] text-amber-700 font-extrabold uppercase">8 Passeios restantes (Vencendo em breve)</span>
                          </div>
                          <span className="text-[10px] bg-slate-900 text-white font-black px-2.5 py-1 rounded-md cursor-pointer">Notificar</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </main>
          </>
        )}

        {/* ======================================= */}
        {/* VIEW 2: CLIENT SELF-SERVICE PORTAL VIEW */}
        {/* ======================================= */}
        {currentView === 'client' && (
          <>
            {/* Client Portal Sidebar */}
            <aside className="w-full md:w-56 bg-white border-r border-slate-100 p-4 shrink-0">
              <div className="space-y-4">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">PORTAL DO TUTOR</div>
                <nav className="space-y-1">
                  {[
                    { id: 'my_pets', label: 'Meus Pets & Vacinas', icon: <Heart className="w-4 h-4 text-rose-500" /> },
                    { id: 'my_appointments', label: 'Ver Próximas Visitas', icon: <CalendarCheck className="w-4 h-4" /> },
                    { id: 'my_album', label: 'Álbum de Fotos', icon: <Camera className="w-4 h-4 text-teal-600" /> },
                    { id: 'my_chat', label: 'Conversas & Chaves', icon: <Send className="w-4 h-4" /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveClientPortalTab(tab.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-3 transition-all ${
                        activeClientPortalTab === tab.id
                          ? 'bg-indigo-50 text-indigo-700 font-extrabold shadow-3xs'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Client Portal Views */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto">
              
              {/* TAB: MY PETS */}
              {activeClientPortalTab === 'my_pets' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-slate-100 p-6 rounded-3xl relative overflow-hidden shadow-md">
                    <span className="bg-indigo-600 text-indigo-100 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider block w-max">
                      Tutor logado: Sarah Connor
                    </span>
                    <h2 className="text-xl font-black text-white mt-1">Bem-vindo ao Portal de Cuidado Familiar do seu Pet! 🐾</h2>
                    <p className="text-[10px] text-slate-400 font-bold max-w-xl mt-1 leading-relaxed">
                      Aqui você visualiza em tempo real as fotos das visitas, histórico de saúde do prontuário do pet, pendências de vacina e controla instruções de acesso à casa.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Render client pets */}
                    {pets.filter(p => p.clientId === 'c1').map(pet => (
                      <div key={pet.id} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-5">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl bg-slate-50 border border-slate-100 p-3 rounded-2xl">{pet.photo}</span>
                          <div>
                            <h3 className="text-sm font-black text-slate-900">{pet.name}</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{pet.breed} • {pet.age} anos</p>
                            <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-[9px] font-black px-2 py-0.5 rounded-md mt-1 block w-max">
                              Microchip: {pet.microchip}
                            </span>
                          </div>
                        </div>

                        {/* Vaccines health status */}
                        <div className="bg-emerald-50/20 border border-emerald-100/30 p-4 rounded-2xl space-y-2">
                          <span className="text-[9px] text-emerald-700 font-black uppercase block tracking-wider">Vacinas Aplicadas Ativas</span>
                          <div className="space-y-1">
                            {pet.health.vaccines.map((v, idx) => (
                              <div key={idx} className="flex justify-between text-[10px] font-bold text-slate-700">
                                <span>{v.name}</span>
                                <span className={v.status === 'Up to Date' ? 'text-emerald-600' : 'text-rose-600'}>
                                  {v.status === 'Up to Date' ? 'Válida ✓' : 'Expirada! ⚠️'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Feeding instructions */}
                        <div className="bg-amber-50/20 border border-amber-100/30 p-4 rounded-2xl space-y-1 text-xs">
                          <span className="text-[9px] text-amber-700 font-black uppercase block tracking-wider">Diretrizes Alimentares</span>
                          <p className="font-extrabold text-slate-900">{pet.feeding.brand}</p>
                          <p className="text-[10px] text-slate-500">Porção diária: {pet.feeding.amount} às {pet.feeding.times.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB: MY APPOINTMENTS */}
              {activeClientPortalTab === 'my_appointments' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider">Próximos Agendamentos & Visitas Concluídas</h2>
                  </div>

                  <div className="space-y-4">
                    {visitLogs.filter(v => v.clientId === 'c1').map(visit => {
                      const service = services.find(s => s.id === visit.serviceId);
                      const visitPets = pets.filter(p => visit.petIds.includes(p.id));
                      
                      return (
                        <div key={visit.id} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded">
                                  {visit.date} @ {visit.scheduledTime}
                                </span>
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  visit.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                                }`}>
                                  {visit.status === 'Completed' ? 'Concluído' : 'Agendado'}
                                </span>
                              </div>
                              <h3 className="text-sm font-black text-slate-900 mt-1">{service?.name}</h3>
                              <div className="flex gap-1 mt-1">
                                {visitPets.map(p => (
                                  <span key={p.id} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full text-[10px] font-black">
                                    {p.photo} {p.name}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <span className="text-xs font-black text-teal-600">Preço: R$ {service?.price}</span>
                          </div>

                          {visit.status === 'Completed' && (
                            <div className="p-4 bg-teal-50/30 border border-teal-100 rounded-2xl space-y-2">
                              <span className="text-[9px] text-teal-800 font-black uppercase block tracking-wider">Relatório de Visita do Cuidador ⭐</span>
                              <p className="text-xs text-slate-700 italic">"{visit.reportNotes}"</p>
                              
                              <div className="flex flex-wrap gap-2 text-[9px] text-slate-500 font-bold mt-2">
                                <span>⏱️ Entrada: {visit.checkInTime}</span>
                                <span>⏱️ Saída: {visit.checkOutTime}</span>
                                <span>🗺️ GPS: Local verificado por satélite ✓</span>
                              </div>

                              <div className="mt-2.5 pt-2.5 border-t border-teal-100/50">
                                <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider mb-1">Checklist de Cuidados Executados:</span>
                                <div className="grid grid-cols-2 gap-1">
                                  {visit.completedTasks.map((task, idx) => (
                                    <span key={idx} className="text-[10px] text-slate-600 font-bold flex items-center gap-1.5">
                                      <Check className="w-3.5 h-3.5 text-teal-600" /> {task}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* TAB: MY ALBUM */}
              {activeClientPortalTab === 'my_album' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider">Álbum de Fotos das Visitas ⭐</h2>
                    <p className="text-[10px] font-bold text-slate-400">Todas as fotos capturadas e enviadas no check-out ficam registradas na galeria de memórias do pet.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center space-y-2">
                      <span className="text-5xl block">🐕</span>
                      <span className="font-black text-xs block text-slate-900">Bella no Parque Trianon</span>
                      <span className="text-[9px] text-slate-400 block">Enviada hoje às 08:32 por Jessica Mendes</span>
                    </div>

                    <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center space-y-2">
                      <span className="text-5xl block">💤</span>
                      <span className="font-black text-xs block text-slate-900">Bella descansando após passeio</span>
                      <span className="text-[9px] text-slate-400 block">Enviada hoje às 08:49 por Jessica Mendes</span>
                    </div>

                    <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center space-y-2">
                      <span className="text-5xl block">🦴</span>
                      <span className="font-black text-xs block text-slate-900">Comendo petisco recomendado</span>
                      <span className="text-[9px] text-slate-400 block">Enviada ontem por Jessica Mendes</span>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: CHAT & KEYS CUSTODY */}
              {activeClientPortalTab === 'my_chat' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                  
                  {/* Direct chat component */}
                  <div className="lg:col-span-2 bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs flex flex-col justify-between h-[450px]">
                    <div className="border-b border-slate-50 pb-2 mb-3 flex justify-between items-center">
                      <span className="text-xs font-black text-slate-900 uppercase">Falar com o Cuidador do Dia</span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                    </div>

                    {/* Message Area */}
                    <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}>
                          <div className={`p-3 rounded-2xl max-w-xs text-xs font-bold leading-relaxed ${
                            msg.sender === 'client' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {msg.photo && <span className="text-xl block mb-1">{msg.photo}</span>}
                            <span>{msg.text}</span>
                          </div>
                          <span className="text-[8px] text-slate-400 font-bold block mt-1 px-1">{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendClientMessage} className="flex gap-2 pt-3 border-t border-slate-50">
                      <input
                        type="text"
                        placeholder="Digite sua mensagem para o cuidador..."
                        value={clientMessageText}
                        onChange={(e) => setClientMessageText(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 flex-1 focus:outline-none"
                      />
                      <button type="submit" className="bg-indigo-600 text-white text-xs font-black uppercase px-4 py-2 rounded-xl">
                        Enviar
                      </button>
                    </form>
                  </div>

                  {/* Custody & Keys Security settings viewable by client */}
                  <div className="bg-slate-900 text-slate-100 p-5 rounded-3xl space-y-4">
                    <span className="text-[10px] text-slate-400 font-black uppercase block tracking-wider">Protocolo de Custódia de Chaves</span>
                    
                    <div className="p-4 bg-slate-800 rounded-2xl space-y-2 border border-slate-700">
                      <span className="text-[9px] text-emerald-400 font-black block uppercase">Chave Física Cadastrada</span>
                      <p className="text-sm font-black">Código: KEY-501A</p>
                      <p className="text-[10px] text-slate-300 font-bold">
                        Esta chave está guardada em nosso cofre com segurança militar. Somente o cuidador escalado possui permissão para retirá-la temporariamente no dia do atendimento.
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <span className="text-[9px] text-slate-400 font-black block uppercase">Última retirada do cofre:</span>
                      <p className="font-extrabold text-white">Retirada em 2026-06-30 às 07:30</p>
                      <p className="text-[10px] text-slate-400">Por: Jessica Mendes (Concluída devolução no mesmo dia às 09:15)</p>
                    </div>
                  </div>

                </div>
              )}

            </main>
          </>
        )}

      </div>

      {/* ========================================================= */}
      {/* SIMULATED BOTTOM DRAWER MODAL FOR VISIT IN PROGRESS (Simulator) */}
      {/* ========================================================= */}
      {activeSimulatingVisitId && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 space-y-5 animate-scale-up shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                  BGrowth On-The-Field Simulator™
                </span>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mt-1">Registrar Visita & Executar Cuidados</h3>
              </div>
              <button onClick={() => setActiveSimulatingVisitId(null)} className="p-1.5 hover:bg-slate-50 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Check-In Details */}
            <div className="bg-slate-50 p-3.5 rounded-2xl grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[9px] text-slate-400 font-black block uppercase">Check-In GPS Registrado</span>
                <span className="text-slate-900 font-extrabold block">✓ -23.5629, -46.6544</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-black block uppercase">Hora Chegada</span>
                <span className="text-slate-900 font-extrabold block">🕒 {visitLogs.find(v => v.id === activeSimulatingVisitId)?.checkInTime || '08:00'}</span>
              </div>
            </div>

            {/* Task Checklist Selector */}
            <div className="space-y-2.5">
              <span className="text-[10px] text-slate-400 font-black uppercase block tracking-wider">Marcar cuidados realizados:</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { key: 'Water refreshed', label: '💧 Água fresca trocada' },
                  { key: 'Meal served', label: '🥣 Alimentação servida' },
                  { key: 'Walk completed', label: '🐕 Passeio de 30-45 minutos' },
                  { key: 'Medication administered', label: '💊 Medicação administrada' },
                  { key: 'Litter box/Hygienics', label: '🧼 Caixinha de areia/Higiene limpa' },
                  { key: 'Playtime & Attention', label: '🎾 Brincadeiras e Carinho' },
                  { key: 'Coat brushing', label: '✂️ Escovação de pelos' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleSimTask(item.key)}
                    className={`p-3 rounded-2xl border text-xs text-left font-black transition-all flex items-center justify-between ${
                      simChecklistCompleted.includes(item.key)
                        ? 'bg-teal-50 border-teal-300 text-teal-800'
                        : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {simChecklistCompleted.includes(item.key) ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-200"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout report notes form */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 font-black uppercase block tracking-wider">Relatório de Visita para o Tutor (Será enviado ao e-mail/portal):</label>
              <textarea
                value={simCheckOutNotes}
                onChange={(e) => setSimCheckOutNotes(e.target.value)}
                placeholder="Exemplo: O pet estava muito alegre hoje, fez todas as necessidades fora, bebeu bastante água e tomou o comprimido junto com o sachê."
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-500 min-h-[80px]"
              />
            </div>

            {/* Checkout Action Button */}
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setActiveSimulatingVisitId(null)}
                className="px-4 py-2 text-xs font-black text-slate-500 uppercase hover:bg-slate-50 rounded-xl"
              >
                Voltar
              </button>
              <button
                onClick={handleCheckOut}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5 transition-all shadow-md"
              >
                <FileCheck2 className="w-4 h-4" /> Concluir e Fazer Check-Out
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG FORM MODALS (CLIENT, PET, SERVICE, STAFF, SCHEDULE) */}
      {/* ========================================================= */}
      
      {/* Modal: Add Client */}
      {isAddingClient && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleCreateClient} className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-slate-900 uppercase">Cadastrar Novo Cliente</h3>
              <button type="button" onClick={() => setIsAddingClient(false)} className="p-1 hover:bg-slate-50 rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Nome Completo</label>
                <input required type="text" placeholder="Sarah Connor" value={newClientForm.name} onChange={e => setNewClientForm({...newClientForm, name: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Documento CPF</label>
                <input required type="text" placeholder="123.456.789-00" value={newClientForm.documentCpf} onChange={e => setNewClientForm({...newClientForm, documentCpf: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">E-mail</label>
                <input required type="email" placeholder="sarah@email.com" value={newClientForm.email} onChange={e => setNewClientForm({...newClientForm, email: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Telefone / WhatsApp</label>
                <input required type="text" placeholder="+55 11 98888-7777" value={newClientForm.phone} onChange={e => setNewClientForm({...newClientForm, phone: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="font-extrabold text-slate-500">Endereço Completo</label>
                <input required type="text" placeholder="Av. Paulista, 1000, Bela Vista, São Paulo - SP" value={newClientForm.address} onChange={e => setNewClientForm({...newClientForm, address: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>

              <div className="sm:col-span-2 border-t pt-3">
                <span className="font-black text-slate-900 block uppercase mb-2">Segurança & Custódia de Chave</span>
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" id="hasKey" checked={newClientForm.hasKey} onChange={e => setNewClientForm({...newClientForm, hasKey: e.target.checked})} className="rounded text-teal-600 focus:ring-teal-500" />
                  <label htmlFor="hasKey" className="font-black text-[11px] text-slate-700">A Empresa ficará em posse de chave física guardada no cofre seguro?</label>
                </div>

                {newClientForm.hasKey && (
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Código da Chave (Ex: KEY-21B)" value={newClientForm.keyCode} onChange={e => setNewClientForm({...newClientForm, keyCode: e.target.value})} className="p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-xs" />
                    <input type="text" placeholder="Instruções de Acesso Especiais" value={newClientForm.keyInstructions} onChange={e => setNewClientForm({...newClientForm, keyInstructions: e.target.value})} className="p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-xs" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setIsAddingClient(false)} className="px-4 py-2 text-xs font-black uppercase text-slate-500">Voltar</button>
              <button type="submit" className="px-5 py-2 bg-teal-600 text-white text-xs font-black uppercase rounded-xl">Salvar Cliente</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Add Pet */}
      {isAddingPet && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleCreatePet} className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-slate-900 uppercase">Novo Prontuário Digital do Pet</h3>
              <button type="button" onClick={() => setIsAddingPet(false)} className="p-1 hover:bg-slate-50 rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Nome do Pet</label>
                <input required type="text" placeholder="Ex: Bella, Max, Luna" value={newPetForm.name} onChange={e => setNewPetForm({...newPetForm, name: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Tutor Responsável</label>
                <select value={newPetForm.clientId} onChange={e => setNewPetForm({...newPetForm, clientId: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Espécie</label>
                <select value={newPetForm.species} onChange={e => setNewPetForm({...newPetForm, species: e.target.value as 'Dog' | 'Cat'})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
                  <option value="Dog">Cachorro 🐕</option>
                  <option value="Cat">Gato 🐱</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Raça</label>
                <input required type="text" placeholder="Ex: Golden Retriever, Srd, Persa" value={newPetForm.breed} onChange={e => setNewPetForm({...newPetForm, breed: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Peso (Kg)</label>
                <input required type="number" placeholder="28" value={newPetForm.weight} onChange={e => setNewPetForm({...newPetForm, weight: Number(e.target.value)})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Idade (anos)</label>
                <input required type="number" placeholder="4" value={newPetForm.age} onChange={e => setNewPetForm({...newPetForm, age: Number(e.target.value)})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
              </div>

              <div className="sm:col-span-2 border-t pt-3">
                <span className="font-black text-slate-900 block uppercase mb-2">Saúde & Vacinas do Prontuário</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Nome da primeira vacina obrigatória" value={newPetForm.vaccine1Name} onChange={e => setNewPetForm({...newPetForm, vaccine1Name: e.target.value})} className="p-2 bg-slate-50 border rounded-lg" />
                  <input type="date" value={newPetForm.vaccine1Date} onChange={e => setNewPetForm({...newPetForm, vaccine1Date: e.target.value})} className="p-2 bg-slate-50 border rounded-lg" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setIsAddingPet(false)} className="px-4 py-2 text-xs font-black uppercase text-slate-500">Voltar</button>
              <button type="submit" className="px-5 py-2 bg-teal-600 text-white text-xs font-black uppercase rounded-xl">Salvar Pet</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Schedule New Visit */}
      {isSchedulingVisit && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleCreateSchedule} className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-slate-900 uppercase">Agendar Novo Atendimento</h3>
              <button type="button" onClick={() => setIsSchedulingVisit(false)} className="p-1 hover:bg-slate-50 rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Cliente / Tutor</label>
                <select
                  value={newScheduleForm.clientId}
                  onChange={e => {
                    const selectCId = e.target.value;
                    const cPets = pets.filter(p => p.clientId === selectCId);
                    setNewScheduleForm({
                      ...newScheduleForm,
                      clientId: selectCId,
                      petIds: cPets.length > 0 ? [cPets[0].id] : []
                    });
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Selecione o Pet (Múltiplos permitidos)</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 max-h-24 overflow-y-auto space-y-1">
                  {pets
                    .filter(p => p.clientId === newScheduleForm.clientId)
                    .map(p => (
                      <div key={p.id} className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          id={`p-chk-${p.id}`}
                          checked={newScheduleForm.petIds.includes(p.id)}
                          onChange={e => {
                            const checked = e.target.checked;
                            setNewScheduleForm(prev => ({
                              ...prev,
                              petIds: checked
                                ? [...prev.petIds, p.id]
                                : prev.petIds.filter(id => id !== p.id)
                            }));
                          }}
                          className="rounded text-teal-600 focus:ring-teal-500"
                        />
                        <label htmlFor={`p-chk-${p.id}`} className="font-bold text-slate-700">{p.photo} {p.name}</label>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Serviço Pretendido</label>
                <select value={newScheduleForm.serviceId} onChange={e => setNewScheduleForm({...newScheduleForm, serviceId: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
                  {services.map(s => <option key={s.id} value={s.id}>{s.name} - R${s.price}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Cuidador Escalado</label>
                <select value={newScheduleForm.workerId} onChange={e => setNewScheduleForm({...newScheduleForm, workerId: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
                  {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Data do Atendimento</label>
                <input type="date" value={newScheduleForm.date} onChange={e => setNewScheduleForm({...newScheduleForm, date: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs" />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-500">Horário</label>
                <input type="time" value={newScheduleForm.time} onChange={e => setNewScheduleForm({...newScheduleForm, time: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setIsSchedulingVisit(false)} className="px-4 py-2 text-xs font-black uppercase text-slate-500">Voltar</button>
              <button type="submit" className="px-5 py-2 bg-teal-600 text-white text-xs font-black uppercase rounded-xl">Agendar</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
