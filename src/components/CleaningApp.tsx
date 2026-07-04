/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Calendar, ClipboardList, Users, ArrowLeft, Plus, Trash2, 
  MapPin, CheckCircle, Calculator, Clock, CheckSquare, Settings, DollarSign,
  AlertTriangle, Play, CheckCircle2, Sliders, Map, RefreshCw, Eye, MessageSquare, Info,
  Database, Mail, Send, Upload, Download, Image, FileText, ExternalLink, Check
} from 'lucide-react';
import { User, Client, Job } from '../types';

interface CleaningAppProps {
  user: User;
  onBack: () => void;
}

// Initial Mock Clients
const initialClients: Client[] = [
  { id: 'cli_1', name: 'Juliana Silva', phone: '(11) 98765-4321', address: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', zipcode: '01310-100', email: 'juliana@email.com', prefs: 'Has a small friendly dog, no bleach, key under mat' },
  { id: 'cli_2', name: 'Marcos Oliveira', phone: '(11) 99123-4567', address: 'Rua Augusta, 500', city: 'São Paulo', state: 'SP', zipcode: '01305-000', email: 'marcos@email.com', prefs: 'Use green products only' },
  { id: 'cli_3', name: 'Ana Costa', phone: '(11) 97777-8888', address: 'Al. Lorena, 1200', city: 'São Paulo', state: 'SP', zipcode: '01424-000', email: 'ana.costa@email.com', prefs: 'Do not clean the balcony, watch out for porcelain vase' }
];

// Initial Mock Team Members
const teamMembers = [
  { email: 'agmosp46@gmail.com', name: 'Me (Owner)', role: 'owner', zipcode: '01310-100', transport: true, rating: 5.0 },
  { email: 'maria.clean@bgrowth.com', name: 'Maria Souza', role: 'member', zipcode: '01305-000', transport: true, rating: 4.8 },
  { email: 'carlos.job@bgrowth.com', name: 'Carlos Santos', role: 'member', zipcode: '01424-000', transport: false, rating: 4.6 }
];

// Initial Mock Jobs
const initialJobs: Job[] = [
  { id: 'job_1', date: new Date().toISOString().slice(0, 10), time: '08:00', client: 'Juliana Silva', clientId: 'cli_1', serviceType: 'house', pricingMethod: 'hour', duration: 3, value: 150, discount: 0, extraFee: 0, expense: 0, notes: 'Regular cleaning, focus on kitchen', status: 'Scheduled', assignedTo: 'agmosp46@gmail.com', assignedName: 'Me (Owner)' },
  { id: 'job_2', date: new Date().toISOString().slice(0, 10), time: '13:00', client: 'Marcos Oliveira', clientId: 'cli_2', serviceType: 'commercial', pricingMethod: 'hour', duration: 4, value: 240, discount: 0, extraFee: 20, expense: 15, notes: 'Deep office cleaning', status: 'Done', assignedTo: 'maria.clean@bgrowth.com', assignedName: 'Maria Souza' }
];

// Initial Mock Request Tickets (For Kanban)
interface ReqTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  date: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Booked' | 'Lost';
  bedrooms: number;
  bathrooms: number;
  notes: string;
  chatHistory: { sender: 'agent' | 'customer'; text: string; time: string }[];
  photos: string[];
}

const initialReqTickets: ReqTicket[] = [
  { 
    id: 'req_1', 
    name: 'Paula Mendes', 
    email: 'paula@example.com', 
    phone: '(11) 98888-2222', 
    address: 'Rua Bela Cintra, 1400', 
    serviceType: 'house', 
    date: '2026-06-30', 
    status: 'New', 
    bedrooms: 2, 
    bathrooms: 2, 
    notes: 'First time deep cleaning. Need focus on kitchen cabinets and sink.',
    chatHistory: [
      { sender: 'customer', text: 'Olá! Gostaria de saber o valor para uma limpeza completa em meu apartamento de 2 quartos.', time: '14:22' },
      { sender: 'agent', text: 'Olá Paula! Claro, vamos te ajudar. Você tem algum pet ou necessidade especial de limpeza?', time: '14:25' },
      { sender: 'customer', text: 'Tenho um gato sim, mas ele é super tranquilo. Gostaria que focassem bastante na cozinha.', time: '14:30' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80'
    ]
  },
  { 
    id: 'req_2', 
    name: 'Roberto Lima', 
    email: 'roberto@example.com', 
    phone: '(11) 99999-3333', 
    address: 'Av. Rebouças, 2200', 
    serviceType: 'commercial', 
    date: '2026-07-02', 
    status: 'Contacted', 
    bedrooms: 0, 
    bathrooms: 4, 
    notes: 'Needs standard commercial office quote weekly on Wednesdays.',
    chatHistory: [
      { sender: 'customer', text: 'Preciso de um orçamento corporativo para nosso escritório semanalmente.', time: '09:05' },
      { sender: 'agent', text: 'Bom dia Roberto, obrigado pelo contato. Nosso especialista entrará em contato para agendar uma vistoria técnica rápida.', time: '09:12' }
    ],
    photos: []
  },
  { 
    id: 'req_3', 
    name: 'Camila Fernandes', 
    email: 'camila@example.com', 
    phone: '(11) 91111-5555', 
    address: 'Rua Pamplona, 900', 
    serviceType: 'moveinout', 
    date: '2026-07-05', 
    status: 'Quoted', 
    bedrooms: 3, 
    bathrooms: 3, 
    notes: 'Leaving apartment fully clean for new tenant. Needs window cleaning.',
    chatHistory: [
      { sender: 'customer', text: 'Preciso de uma limpeza pós-mudança super caprichada.', time: '18:00' },
      { sender: 'agent', text: 'Olá Camila! Limpezas Move In/Out incluem a limpeza interna de armários e geladeira. Tudo bem?', time: '18:15' },
      { sender: 'customer', text: 'Perfeito, exatamente o que eu preciso!', time: '18:20' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80'
    ]
  },
];

export default function CleaningApp({ user, onBack }: CleaningAppProps) {
  const [activeTab, setActiveTab] = useState<'dash' | 'schedule' | 'jobs' | 'clients' | 'kanban' | 'settings'>('dash');
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [tickets, setTickets] = useState<ReqTicket[]>(initialReqTickets);

  // New Job State / Step-by-step
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [step, setStep] = useState(1);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    date: new Date().toISOString().slice(0,10),
    time: '08:00',
    serviceType: 'house',
    pricingMethod: 'hour',
    duration: 2,
    discount: 0,
    extraFee: 0,
    expense: 0,
    notes: '',
    status: 'Scheduled',
    assignedTo: user.email
  });

  // Client dropdown lookup
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Smart assignment simulation
  const [smartAssignCandidates, setSmartAssignCandidates] = useState<any[]>([]);
  const [bestCandidate, setBestCandidate] = useState<any | null>(null);
  const [showSmartAssign, setShowSmartAssign] = useState(false);

  // New Client Form
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({});

  // Request Ticket workspace states
  const [selectedTicketForChat, setSelectedTicketForChat] = useState<ReqTicket | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [emailSendingStatus, setEmailSendingStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [photoUploadingStatus, setPhotoUploadingStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  // Pricing setup
  const [rates, setRates] = useState({
    house: { hour: 45, sqft: 0.15 },
    commercial: { hour: 60, sqft: 0.20 },
    moveinout: { hour: 70, sqft: 0.25 }
  });

  // Checklist categories
  const [categories, setCategories] = useState([
    { id: 'cat_1', name: 'Kitchen', icon: '🧴', items: ['Clean inside microwave', 'Wipe cabinet exteriors', 'Sanitize sink', 'Mop floor'] },
    { id: 'cat_2', name: 'Bathrooms', icon: '🚿', items: ['Scrub toilet & tub', 'Clean mirrors', 'Wipe sink fixtures', 'Empty trash'] },
    { id: 'cat_3', name: 'Bedrooms', icon: '🛏', items: ['Dust all surfaces', 'Make bed (change sheets)', 'Vacuum floor', 'Empty bins'] },
  ]);

  // Google Sheets file simulation URL
  const simulatedSheetId = '1L-GIyN6uIz6UAaWsWMbV9zJt0elKdDbVdZ4H1vW8j5U';
  const simulatedDriveFolder = `BGrowth Club > ${user.email} > Cleaning > Document_Storage`;

  // Haversine-based distance calculation mock
  const calcTravelMinutes = (zip1: string, zip2: string) => {
    // Simple pseudo-calc for demonstration based on zipcode differences
    const val1 = parseInt(zip1.replace('-', '')) || 10000;
    const val2 = parseInt(zip2.replace('-', '')) || 10000;
    const diff = Math.abs(val1 - val2) % 30;
    return diff === 0 ? 12 : diff * 2 + 10;
  };

  // Run Smart Assign simulator
  const handleSmartAssign = () => {
    if (!selectedClient) {
      alert("Please select or add a client first to read location coordinates.");
      return;
    }
    
    // Process distance for each candidate
    const candidates = teamMembers.map((worker) => {
      const travelMins = calcTravelMinutes(selectedClient.zipcode, worker.zipcode);
      const dist = (travelMins / 3).toFixed(1);
      
      return {
        ...worker,
        travelMins,
        distance: dist,
        hasService: true, // Mock specialty
        score: worker.rating - (travelMins / 50) // High score = higher rating & shorter travel
      };
    }).sort((a, b) => b.score - a.score);

    setSmartAssignCandidates(candidates);
    setBestCandidate(candidates[0]);
    setShowSmartAssign(true);
  };

  // Quick select best candidate
  const applySmartAssign = (email: string) => {
    const selected = teamMembers.find(t => t.email === email);
    if (selected) {
      setNewJob(prev => ({ ...prev, assignedTo: selected.email, assignedName: selected.name }));
    }
    setShowSmartAssign(false);
  };

  // Save new job
  const handleSaveJob = () => {
    if (!selectedClient) return;
    
    const finalJob: Job = {
      id: 'job_' + Date.now(),
      date: newJob.date || new Date().toISOString().slice(0, 10),
      time: newJob.time || '08:00',
      client: selectedClient.name,
      clientId: selectedClient.id,
      serviceType: newJob.serviceType || 'house',
      pricingMethod: newJob.pricingMethod || 'hour',
      duration: Number(newJob.duration) || 2,
      value: (Number(newJob.duration) || 2) * (rates[newJob.serviceType as keyof typeof rates]?.hour || 45),
      discount: Number(newJob.discount) || 0,
      extraFee: Number(newJob.extraFee) || 0,
      expense: Number(newJob.expense) || 0,
      notes: newJob.notes || '',
      status: 'Scheduled',
      assignedTo: newJob.assignedTo,
      assignedName: teamMembers.find(t => t.email === newJob.assignedTo)?.name
    };

    setJobs(prev => [finalJob, ...prev]);
    setShowNewJobModal(false);
    setStep(1);
    setSelectedClient(null);
    setClientSearch('');
  };

  // Save new client
  const handleSaveClient = () => {
    if (!newClient.name || !newClient.zipcode) {
      alert("Name and Zipcode are required!");
      return;
    }
    const created: Client = {
      id: 'cli_' + Date.now(),
      name: newClient.name,
      phone: newClient.phone || '',
      address: newClient.address || '',
      city: newClient.city || 'São Paulo',
      state: newClient.state || 'SP',
      zipcode: newClient.zipcode,
      email: newClient.email || '',
      prefs: newClient.prefs || ''
    };
    setClients(prev => [...prev, created]);
    setSelectedClient(created);
    setClientSearch(created.name);
    setShowNewClientForm(false);
  };

  // Send message in request chat
  const handleSendChatMessage = () => {
    if (!chatInput.trim() || !selectedTicketForChat) return;

    const newMessage = {
      sender: 'agent' as const,
      text: chatInput,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...selectedTicketForChat.chatHistory, newMessage];
    const updatedTicket = { ...selectedTicketForChat, chatHistory: updatedHistory };

    setTickets(prev => prev.map(t => t.id === selectedTicketForChat.id ? updatedTicket : t));
    setSelectedTicketForChat(updatedTicket);
    setChatInput('');

    // Simulate standard user reply after 1.5 seconds
    setTimeout(() => {
      const responses = [
        "Perfeito! Fico no aguardo do orçamento oficial.",
        "Tudo bem, a data agendada está ótima para mim.",
        "Vocês trazem os produtos de limpeza ou eu preciso fornecer?",
        "Consigo pagar via PIX ou cartão de crédito?",
        "Muito obrigado pelo atendimento rápido!"
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      const clientReply = {
        sender: 'customer' as const,
        text: randomReply,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      const finalHistory = [...updatedHistory, clientReply];
      const finalTicket = { ...updatedTicket, chatHistory: finalHistory };
      
      setTickets(prev => prev.map(t => t.id === selectedTicketForChat.id ? finalTicket : t));
      // Only update if the user still has this specific chat modal open
      setSelectedTicketForChat(prev => prev && prev.id === selectedTicketForChat.id ? finalTicket : prev);
    }, 1500);
  };

  // Simulate Automatic Email Quote dispatch
  const handleSendEmailQuote = () => {
    if (!selectedTicketForChat) return;
    setEmailSendingStatus('sending');
    setTimeout(() => {
      setEmailSendingStatus('success');
      // Add a system notification or email sent message in the chat!
      const emailSystemMessage = {
        sender: 'agent' as const,
        text: `📬 [SISTEMA] E-mail de proposta enviado automaticamente para: ${selectedTicketForChat.email}`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      const finalHistory = [...selectedTicketForChat.chatHistory, emailSystemMessage];
      const finalTicket = { ...selectedTicketForChat, chatHistory: finalHistory };
      setTickets(prev => prev.map(t => t.id === selectedTicketForChat.id ? finalTicket : t));
      setSelectedTicketForChat(finalTicket);
    }, 1800);
  };

  // Simulate Photo Upload drag-and-drop
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTicketForChat || !e.target.files || e.target.files.length === 0) return;
    
    setPhotoUploadingStatus('uploading');
    
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        const photoUrl = reader.result as string;
        const updatedPhotos = [...(selectedTicketForChat.photos || []), photoUrl];
        const updatedTicket = { ...selectedTicketForChat, photos: updatedPhotos };
        
        setTickets(prev => prev.map(t => t.id === selectedTicketForChat.id ? updatedTicket : t));
        setSelectedTicketForChat(updatedTicket);
        setPhotoUploadingStatus('success');
        
        // Add message in chat
        const photoMsg = {
          sender: 'customer' as const,
          text: `📸 Enviei uma foto nova do local em anexo.`,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        const finalHistory = [...updatedTicket.chatHistory, photoMsg];
        const finalTicket = { ...updatedTicket, chatHistory: finalHistory };
        setTickets(prev => prev.map(t => t.id === selectedTicketForChat.id ? finalTicket : t));
        setSelectedTicketForChat(finalTicket);
        
        setTimeout(() => setPhotoUploadingStatus('idle'), 2000);
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  // Generate and Download Client-side PDF quote
  const handleDownloadPDFQuote = () => {
    if (!selectedTicketForChat) return;
    
    const cleaningRate = rates[selectedTicketForChat.serviceType as keyof typeof rates]?.hour || 50;
    const estimatedValue = (selectedTicketForChat.bedrooms * 45 + selectedTicketForChat.bathrooms * 35 + 100);
    
    const docContent = `
=========================================
      BGROWTH ECOSYSTEM - PROPOSTA
=========================================
Cliente: ${selectedTicketForChat.name}
E-mail: ${selectedTicketForChat.email}
Telefone: ${selectedTicketForChat.phone}
Data Solicitada: ${selectedTicketForChat.date}
Endereço: ${selectedTicketForChat.address}

DETALHES DO SERVIÇO:
-----------------------------------------
Tipo de Serviço: Limpeza Residencial (${selectedTicketForChat.serviceType.toUpperCase()})
Quartos: ${selectedTicketForChat.bedrooms}
Banheiros: ${selectedTicketForChat.bathrooms}
Observações: ${selectedTicketForChat.notes}

ESTIMATIVA DE CUSTO:
-----------------------------------------
Taxa Base / Hora: $${cleaningRate}
Valor Estimado Total: $${estimatedValue}.00

Obrigado por escolher a BGrowth Cleaning!
=========================================
Gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')}
    `;
    
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Orcamento_BGrowth_${selectedTicketForChat.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Simulation Banner */}
      <div className="bg-amber-500 text-slate-900 text-center text-xs font-black py-1.5 px-4 flex items-center justify-center gap-2 shadow-sm">
        <Info className="w-4 h-4 shrink-0" />
        <span>Fully Interactive Simulator linked to <b>Sheets File ID: {simulatedSheetId}</b></span>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h1 className="text-base font-black tracking-tight text-slate-900">BGrowth Cleaning</h1>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">ECOSYSTEM APP</p>
          </div>
        </div>

        <button 
          onClick={() => setShowNewJobModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-100 transition-all duration-150"
        >
          <Plus className="w-3.5 h-3.5" /> New Job
        </button>
      </header>

      {/* Internal Navigation Tabs */}
      <div className="bg-white border-b border-slate-100 px-4 flex gap-1 overflow-x-auto scrollbar-none">
        {(['dash', 'schedule', 'jobs', 'clients', 'kanban', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-3 font-extrabold text-xs uppercase tracking-wide border-b-2 transition-all duration-150 whitespace-nowrap ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* App Tab Content */}
      <main className="flex-1 p-4 max-w-5xl mx-auto w-full space-y-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dash' && (
          <div className="space-y-6">
            
            {/* Realtime KPI widgets */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">💰</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Today Revenue</p>
                  <p className="text-lg font-black text-slate-800">$390.00</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">📅</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Today Jobs</p>
                  <p className="text-lg font-black text-slate-800">{jobs.filter(j => j.date === new Date().toISOString().slice(0, 10)).length}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">👥</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Active Cleaners</p>
                  <p className="text-lg font-black text-slate-800">2 / {teamMembers.length}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">⏱️</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Booked Hours</p>
                  <p className="text-lg font-black text-slate-800">7.0h</p>
                </div>
              </div>
            </div>

            {/* Split layout for Map / List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Daily Schedule List */}
              <div className="lg:col-span-2 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-xs font-black uppercase text-slate-800 tracking-wide">📋 Today's Schedule</h2>
                  <span className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer" onClick={() => setActiveTab('schedule')}>See detailed schedule &rarr;</span>
                </div>
                <div className="divide-y divide-slate-50 flex-1">
                  {jobs.filter(j => j.date === new Date().toISOString().slice(0, 10)).map(job => (
                    <div key={job.id} className="p-4 hover:bg-slate-50 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="text-right shrink-0">
                          <p className="text-xs font-black text-slate-800">{job.time}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{job.duration}h</p>
                        </div>
                        <div className="w-1 h-8 rounded-full bg-indigo-600"></div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800">{job.client}</h4>
                          <p className="text-[10px] text-slate-400 font-bold">{job.serviceType.toUpperCase()} CLEANING · 👤 {job.assignedName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">{job.status}</span>
                        <p className="text-xs font-black text-indigo-600 mt-1">${job.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Workspace simulated credentials panel */}
              <div className="space-y-4">
                <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wide">📂 Google Sheets & Drive</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-start gap-2.5">
                      <Database className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-[11px] font-black text-indigo-900">Spreadsheet DB</h4>
                        <p className="text-[10px] font-bold text-indigo-700">Linked File ID:</p>
                        <p className="text-[9px] font-mono text-slate-400 break-all select-all mt-0.5 bg-white border border-indigo-100 rounded px-1 py-0.5">{simulatedSheetId}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-[11px] font-black text-emerald-900">Google Drive Storage</h4>
                        <p className="text-[10px] font-bold text-emerald-700">Current Folder Root:</p>
                        <p className="text-[9px] font-mono text-slate-400 break-all select-all mt-0.5 bg-white border border-emerald-100 rounded px-1 py-0.5">{simulatedDriveFolder}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={() => alert("Simulation: Redirecting to Google Spreadsheet...")}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-[11px] py-2 rounded-xl text-center transition-colors"
                    >
                      🔗 Open Google Sheets
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm relative overflow-hidden space-y-3">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-indigo-400">🤖 AI Recommendation</h3>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    "Based on historical data, Fridays between 08:00 AM and 12:00 PM are your most requested periods. Adjust on-demand worker incentives to meet current demand."
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-sm font-black text-slate-900">📅 Schedule Calendar</h2>
                <p className="text-slate-500 text-xs mt-0.5">Filter team schedules and book directly into open slots.</p>
              </div>
              <div className="flex gap-2">
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Simulated Grid of schedule */}
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 flex items-center justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <span>Timeline Slot</span>
                <span>Assigned Cleaner</span>
                <span>Job / Block Details</span>
                <span>Value</span>
              </div>
              
              {/* 08:00 AM */}
              <div className="px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-slate-50">
                <span className="text-xs font-black text-slate-700">08:00 AM - 11:00 AM</span>
                <span className="text-xs font-bold text-indigo-600">Me (Owner)</span>
                <span className="text-xs text-slate-500 font-semibold">Juliana Silva - Av. Paulista</span>
                <span className="text-xs font-black text-slate-900">$150.00</span>
              </div>

              {/* 11:00 AM - Slot open */}
              <div className="px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 bg-emerald-50/30">
                <span className="text-xs font-black text-emerald-800">11:00 AM - 01:00 PM</span>
                <span className="text-xs font-bold text-emerald-600">Free / Available</span>
                <span className="text-xs text-slate-400 font-bold italic">No jobs booked</span>
                <button 
                  onClick={() => {
                    setNewJob(prev => ({ ...prev, time: '11:00', duration: 2 }));
                    setShowNewJobModal(true);
                  }}
                  className="bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shadow-sm"
                >
                  Quick Book
                </button>
              </div>

              {/* 01:00 PM */}
              <div className="px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-slate-50">
                <span className="text-xs font-black text-slate-700">01:00 PM - 05:00 PM</span>
                <span className="text-xs font-bold text-indigo-600">Maria Souza</span>
                <span className="text-xs text-slate-500 font-semibold">Marcos Oliveira - Rua Augusta</span>
                <span className="text-xs font-black text-slate-900">$240.00</span>
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            
            {/* Filter Card */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
                <span className="text-xs font-black text-slate-400 uppercase mr-2">Filter</span>
                <select className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold outline-none">
                  <option value="">All Services</option>
                  <option value="house">House</option>
                  <option value="commercial">Commercial</option>
                  <option value="moveinout">Move In/Out</option>
                </select>
                <select className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold outline-none">
                  <option value="">All Cleaners</option>
                  {teamMembers.map(t => <option key={t.email} value={t.email}>{t.name}</option>)}
                </select>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1.5 text-center text-xs font-black text-slate-700">
                Total Revenue: $390.00
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-3">
              {jobs.map(job => (
                <div key={job.id} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">
                      {job.serviceType === 'house' ? '🏠' : job.serviceType === 'commercial' ? '🏢' : '🚛'}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">{job.client}</h4>
                      <p className="text-slate-500 text-xs font-semibold">{job.date} at {job.time} · {job.duration}h · Assigned to: <b>{job.assignedName}</b></p>
                      {job.notes && <p className="text-slate-400 text-xs italic mt-1">"{job.notes}"</p>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <p className="text-xs font-black text-indigo-600">${job.value}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{job.pricingMethod} rate</p>
                    </div>
                    <span className={`font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      job.status === 'Done' ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
                    }`}>{job.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            
            {/* Search and Add Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <input 
                type="text" 
                placeholder="🔍 Search clients by name..." 
                className="bg-white border border-slate-100 rounded-xl p-3 text-xs font-bold outline-none focus:border-indigo-600 w-full sm:max-w-xs shadow-sm"
              />
              <button 
                onClick={() => setShowNewClientForm(true)}
                className="bg-indigo-600 text-white font-extrabold text-xs px-4 py-3 rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-100 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Add Client
              </button>
            </div>

            {/* New Client Form (Simulated toggle inline) */}
            {showNewClientForm && (
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase text-indigo-600 tracking-wide">👤 Add New Customer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Name *</label>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      onChange={e => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Phone</label>
                    <input 
                      type="text" 
                      placeholder="Phone" 
                      onChange={e => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Address</label>
                    <input 
                      type="text" 
                      placeholder="Address" 
                      onChange={e => setNewClient(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Zipcode *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 01310-100" 
                      onChange={e => setNewClient(prev => ({ ...prev, zipcode: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-3">
                  <button 
                    onClick={() => setShowNewClientForm(false)}
                    className="border border-slate-200 text-slate-500 font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveClient}
                    className="bg-indigo-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl"
                  >
                    Save Customer
                  </button>
                </div>
              </div>
            )}

            {/* Clients Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map(cli => (
                <div key={cli.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-bold text-xs text-indigo-600">{cli.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800">{cli.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold">{cli.phone}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      {cli.address} (ZIP: {cli.zipcode})
                    </p>
                    {cli.prefs && (
                      <p className="text-slate-400 text-[11px] italic bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                        "{cli.prefs}"
                      </p>
                    )}
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex justify-end">
                    <button className="text-[11px] font-extrabold text-indigo-600 hover:underline">
                      Edit Profile &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KANBAN BOARD TAB */}
        {activeTab === 'kanban' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-black text-slate-900">📩 Lead Request Kanban</h2>
                <p className="text-slate-500 text-xs mt-0.5">Drag, manage and qualify incoming public cleaning requests.</p>
              </div>
            </div>

            {/* Kanban columns */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
              {(['New', 'Contacted', 'Quoted', 'Booked', 'Lost'] as const).map(status => {
                const filtered = tickets.filter(t => t.status === status);
                
                return (
                  <div key={status} className="bg-slate-100 border border-slate-200/50 rounded-2xl p-3 w-64 shrink-0 space-y-3 flex flex-col min-h-[350px]">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wide">{status}</span>
                      <span className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full">{filtered.length}</span>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto">
                      {filtered.map(t => (
                        <div 
                          key={t.id} 
                          onClick={() => setSelectedTicketForChat(t)}
                          className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm space-y-2 relative group hover:border-slate-300 cursor-pointer transition-all duration-150"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-black text-slate-800">{t.name}</h4>
                            {t.chatHistory && t.chatHistory.length > 0 && (
                              <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                <MessageSquare className="w-2.5 h-2.5" />
                                {t.chatHistory.length}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold">{t.serviceType.toUpperCase()} · 📅 {t.date}</p>
                          
                          {/* Photo preview status */}
                          {t.photos && t.photos.length > 0 && (
                            <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-black bg-emerald-50 px-1.5 py-0.5 rounded-lg w-max">
                              <Image className="w-3 h-3" />
                              <span>{t.photos.length} Foto(s)</span>
                            </div>
                          )}

                          <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-lg">{t.bedrooms}bd / {t.bathrooms}ba</span>
                            <div className="flex gap-1">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // qualify request into real client & job offer
                                  const potentialClient: Client = {
                                    id: 'cli_' + Date.now(),
                                    name: t.name,
                                    phone: t.phone,
                                    address: t.address,
                                    city: 'São Paulo',
                                    state: 'SP',
                                    zipcode: '01310-100',
                                    email: t.email,
                                    prefs: t.notes
                                  };
                                  setClients(prev => [...prev, potentialClient]);
                                  setSelectedClient(potentialClient);
                                  setClientSearch(potentialClient.name);
                                  setNewJob(prev => ({
                                    ...prev,
                                    serviceType: t.serviceType,
                                    notes: t.notes,
                                    date: t.date
                                  }));
                                  setTickets(prev => prev.filter(tick => tick.id !== t.id));
                                  setShowNewJobModal(true);
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] px-2 py-1 rounded transition-colors"
                              >
                                Qualify
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Global Pricing Config */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wide">💰 Category Base Pricing</h3>
              <p className="text-slate-500 text-xs">Set fallback global rates utilized by calculation estimators.</p>
              
              <div className="space-y-3">
                {Object.keys(rates).map(key => {
                  const label = key === 'house' ? 'House Cleaning' : key === 'commercial' ? 'Commercial' : 'Move In/Out';
                  return (
                    <div key={key} className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-black text-slate-700">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-bold text-xs">$</span>
                        <input 
                          type="number" 
                          defaultValue={rates[key as keyof typeof rates].hour}
                          onChange={e => {
                            const val = Number(e.target.value) || 0;
                            setRates(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof typeof rates], hour: val }
                            }));
                          }}
                          className="w-16 border border-slate-200 rounded-lg p-1.5 text-xs text-center font-bold outline-none"
                        />
                        <span className="text-slate-400 font-bold text-xs">/hr</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checklist categories config */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wide">✅ Custom Checklists</h3>
              <p className="text-slate-500 text-xs">Configure default tasks team members must tick off in real time.</p>
              
              <div className="space-y-3">
                {categories.map(cat => (
                  <div key={cat.id} className="p-3 border border-slate-100 rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <h4 className="text-xs font-black text-slate-800">{cat.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((it, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 font-bold text-[9px] px-2 py-0.5 rounded-md border border-slate-200/50">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* NEW JOB MULTI-STEP MODAL */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Steps Progress Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900">✨ Create Cleaning Job</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Step {step} of 3</p>
              </div>
              <button 
                onClick={() => {
                  setShowNewJobModal(false);
                  setStep(1);
                  setSelectedClient(null);
                  setClientSearch('');
                }}
                className="text-slate-400 hover:text-slate-600 text-xs font-extrabold"
              >
                ✕ Cancel
              </button>
            </div>

            {/* STEP 1: CLIENT SELECT / LOOKUP */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">🔍 Search Client</label>
                  <input 
                    type="text" 
                    placeholder="Type to search clients..." 
                    value={clientSearch}
                    onChange={e => {
                      setClientSearch(e.target.value);
                      const matched = clients.find(c => c.name.toLowerCase().includes(e.target.value.toLowerCase()));
                      if (matched) {
                        setSelectedClient(matched);
                      } else {
                        setSelectedClient(null);
                      }
                    }}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                  
                  {/* Matching results */}
                  {clientSearch && !selectedClient && (
                    <div className="border border-slate-100 rounded-xl p-2 bg-slate-50 space-y-1">
                      <p className="text-slate-400 text-[11px] font-bold text-center">No matching clients found.</p>
                      <button 
                        onClick={() => {
                          setNewClient({ name: clientSearch });
                          setShowNewClientForm(true);
                        }}
                        className="w-full text-center text-xs font-black text-indigo-600 py-1 hover:underline"
                      >
                        ➕ Add as a New Client
                      </button>
                    </div>
                  )}

                  {selectedClient && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-emerald-900">{selectedClient.name}</p>
                        <p className="text-[10px] text-emerald-600 font-bold">{selectedClient.address} (ZIP: {selectedClient.zipcode})</p>
                      </div>
                      <span className="text-[10px] font-black text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full">✓ Confirmed</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-3">
                  <button 
                    disabled={!selectedClient}
                    onClick={() => setStep(2)}
                    className="bg-indigo-600 disabled:opacity-50 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1"
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: JOB PRICING AND SETUPS */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Category</label>
                    <select 
                      value={newJob.serviceType}
                      onChange={e => setNewJob(prev => ({ ...prev, serviceType: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    >
                      <option value="house">House Cleaning</option>
                      <option value="commercial">Commercial</option>
                      <option value="moveinout">Move In/Out</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Estimated Hours</label>
                    <input 
                      type="number" 
                      value={newJob.duration}
                      onChange={e => setNewJob(prev => ({ ...prev, duration: Number(e.target.value) || 2 }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Date</label>
                    <input 
                      type="date" 
                      value={newJob.date}
                      onChange={e => setNewJob(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Time</label>
                    <input 
                      type="time" 
                      value={newJob.time}
                      onChange={e => setNewJob(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Notes</label>
                  <input 
                    type="text" 
                    placeholder="Specific rooms or instructions..." 
                    value={newJob.notes}
                    onChange={e => setNewJob(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="flex justify-between pt-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="border border-slate-200 text-slate-500 font-extrabold text-xs px-4 py-2.5 rounded-xl"
                  >
                    &larr; Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="bg-indigo-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl"
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ASSIGNMENT & REVIEW */}
            {step === 3 && (
              <div className="space-y-4">
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">🤖 Smart Assignment Algorithm</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Compute distances and locate travel times for all active team members from their locations.
                  </p>
                  <button 
                    onClick={handleSmartAssign}
                    className="bg-slate-900 text-white font-extrabold text-xs px-3 py-2 rounded-xl"
                  >
                    ⚡ Compute Smart Assignment
                  </button>
                </div>

                {/* Smart Assign candidates output */}
                {showSmartAssign && (
                  <div className="border border-slate-100 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between border-b pb-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Recommended Cleaners</span>
                      <span className="text-[10px] font-black text-emerald-600">Best Pick Highlighted</span>
                    </div>
                    
                    <div className="space-y-2 max-h-[160px] overflow-y-auto">
                      {smartAssignCandidates.map((c, i) => (
                        <div 
                          key={c.email}
                          onClick={() => applySmartAssign(c.email)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                            i === 0 
                              ? 'bg-emerald-50 border-emerald-300' 
                              : 'bg-white hover:bg-slate-50 border-slate-100'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-black text-slate-800">{c.name} {i === 0 && '🌟'}</p>
                            <p className="text-[10px] text-slate-400 font-bold">ZIP: {c.zipcode} · Dist: {c.distance} mi · Travel time: {c.travelMins}m</p>
                          </div>
                          <span className="text-[9px] font-black text-indigo-600">Assign</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Normal select field */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Cleaner Assigned</label>
                  <select 
                    value={newJob.assignedTo}
                    onChange={e => {
                      const matched = teamMembers.find(t => t.email === e.target.value);
                      setNewJob(prev => ({ 
                        ...prev, 
                        assignedTo: e.target.value,
                        assignedName: matched ? matched.name : ''
                      }));
                    }}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none"
                  >
                    {teamMembers.map(t => <option key={t.email} value={t.email}>{t.name}</option>)}
                  </select>
                </div>

                {/* Summary metrics */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-800">
                  <span>Job Estimated Total Value</span>
                  <span className="text-indigo-600 text-sm">
                    ${(Number(newJob.duration) || 2) * (rates[newJob.serviceType as keyof typeof rates]?.hour || 45)}
                  </span>
                </div>

                <div className="flex justify-between pt-3">
                  <button 
                    onClick={() => setStep(2)}
                    className="border border-slate-200 text-slate-500 font-extrabold text-xs px-4 py-2.5 rounded-xl"
                  >
                    &larr; Back
                  </button>
                  <button 
                    onClick={handleSaveJob}
                    className="bg-indigo-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-100"
                  >
                    💾 Save & Book Job
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* REQUEST TICKET WORKSPACE MODAL (CHAT, AUTO EMAILS, PHOTOS & PDFS) */}
      {selectedTicketForChat && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base">
                  {selectedTicketForChat.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Workspace de Lead: {selectedTicketForChat.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Formulário de Request & Chat Integrado</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTicketForChat(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-black p-1.5 hover:bg-slate-50 rounded-lg"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Content body */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-1 min-h-0 mt-4">
              
              {/* Left Column (Details, photos & PDFs) - span 5 */}
              <div className="lg:col-span-5 space-y-5 overflow-y-auto pr-1">
                
                {/* Contact and Service Stats */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Informações de Contato</span>
                    <span className="bg-indigo-100 text-indigo-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                      {selectedTicketForChat.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-700">📧 E-mail: <span className="font-semibold text-slate-600 select-all">{selectedTicketForChat.email}</span></p>
                    <p className="font-bold text-slate-700">📞 WhatsApp/Tel: <span className="font-semibold text-slate-600">{selectedTicketForChat.phone}</span></p>
                    <p className="font-bold text-slate-700">📍 Endereço: <span className="font-semibold text-slate-600">{selectedTicketForChat.address}</span></p>
                    <p className="font-bold text-slate-700">🧹 Categoria: <span className="font-semibold text-slate-600 uppercase">{selectedTicketForChat.serviceType}</span></p>
                    <p className="font-bold text-slate-700">🛌 Quartos: <span className="font-semibold text-slate-600">{selectedTicketForChat.bedrooms} bd</span> | Banheiros: <span className="font-semibold text-slate-600">{selectedTicketForChat.bathrooms} ba</span></p>
                    <p className="font-bold text-slate-700">📝 Observação original: <span className="font-semibold text-slate-500 italic">"{selectedTicketForChat.notes}"</span></p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/50">
                    <button
                      onClick={() => {
                        const cleanPhone = selectedTicketForChat.phone.replace(/\D/g, '');
                        const targetPhone = cleanPhone.startsWith('55') || cleanPhone.length > 11 ? cleanPhone : '55' + cleanPhone;
                        const msg = `Olá ${selectedTicketForChat.name}! Tudo bem?\n\nSou da BGrowth Cleaning Services. Recebemos sua solicitação de orçamento de limpeza para o imóvel em: \n📍 *${selectedTicketForChat.address}*.\n\nPara o serviço de *${selectedTicketForChat.serviceType}* (${selectedTicketForChat.bedrooms} quartos e ${selectedTicketForChat.bathrooms} banheiros), o orçamento inicial fica em *$${selectedTicketForChat.value || '180.00'}*.\n\nGostaria de confirmar o agendamento do serviço para esta semana?`;
                        window.open(`https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.388 2.01 13.916.996 11.29.996 5.858.996 1.43 5.365 1.427 10.793c-.001 1.745.472 3.447 1.368 4.966l-.946 3.454 3.554-.916c1.479.803 3.036 1.221 4.646 1.221l.016-.013zM17.61 14.39c-.295-.148-1.746-.862-2.014-.959-.268-.099-.463-.148-.658.148-.195.297-.756.959-.926 1.156-.17.196-.341.222-.636.074-.295-.148-1.246-.459-2.375-1.464-.877-.781-1.47-1.747-1.642-2.044-.173-.297-.018-.458.13-.606.134-.133.295-.347.444-.52.149-.174.198-.298.298-.497.1-.198.05-.371-.025-.52-.075-.149-.658-1.587-.902-2.174-.237-.573-.48-.494-.658-.503-.17-.008-.366-.01-.56-.01-.196 0-.513.073-.781.371-.268.297-1.025 1.002-1.025 2.446 0 1.444 1.049 2.839 1.196 3.037.147.197 2.064 3.15 4.999 4.413.698.301 1.244.481 1.67.617.702.223 1.341.191 1.847.115.564-.085 1.747-.714 1.992-1.402.244-.687.244-1.277.171-1.402-.073-.125-.268-.198-.563-.346z"/>
                      </svg>
                      Iniciar Proposta no WhatsApp
                    </button>
                  </div>
                </div>

                {/* PDF generation Section */}
                <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Documentos & Propostas PDF</h4>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Gere na hora uma proposta de orçamento formatada baseada nas especificações do formulário do cliente para enviar pelo chat ou e-mail.
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownloadPDFQuote}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Baixar Orçamento PDF
                    </button>
                  </div>
                </div>

                {/* Automated Emails panel */}
                <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Envio de E-mail Automático</h4>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Dispare e-mails automáticos usando o Wix Mail, Google Apps Script Gmail API ou provedores SMTP como Resend diretamente por aqui.
                  </p>
                  
                  {emailSendingStatus === 'idle' && (
                    <button
                      onClick={handleSendEmailQuote}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-150"
                    >
                      📬 Disparar Proposta p/ E-mail
                    </button>
                  )}

                  {emailSendingStatus === 'sending' && (
                    <div className="w-full bg-indigo-100 text-indigo-800 font-extrabold text-[11px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Enviando proposta via SMTP / API...
                    </div>
                  )}

                  {emailSendingStatus === 'success' && (
                    <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-[11px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      E-mail automático enviado com sucesso!
                    </div>
                  )}
                </div>

                {/* Photo Upload area */}
                <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Fotos do Local (Upload)</h4>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Anexe fotos enviadas pelo cliente para avaliação técnica. As fotos são salvas em tempo real em nossa pasta simulada do Google Drive.
                  </p>

                  {/* Photo List Previews */}
                  {selectedTicketForChat.photos && selectedTicketForChat.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {selectedTicketForChat.photos.map((ph, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50">
                          <img src={ph} alt="Upload preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload button */}
                  <div>
                    <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-[11px] font-extrabold text-slate-600">Arraste ou clique para enviar foto</span>
                      <span className="text-[9px] text-slate-400 font-bold">Suporta JPG, PNG</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {photoUploadingStatus === 'uploading' && (
                    <p className="text-xs font-black text-indigo-600 animate-pulse text-center">⏳ Carregando foto para o Google Drive...</p>
                  )}
                </div>

              </div>

              {/* Right Column (Live Chat Form) - span 7 */}
              <div className="lg:col-span-7 flex flex-col border border-slate-150 rounded-2xl overflow-hidden bg-slate-50 h-[480px]">
                
                {/* Chat Top Banner */}
                <div className="bg-white border-b border-slate-200 px-4 py-3 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-black text-slate-700">Chat com o Cliente (Simulado)</span>
                  </div>
                  <span className="text-[9px] font-black text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">WhatsApp Direct</span>
                </div>

                {/* Messages Box */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end min-h-0">
                  <div className="text-center text-[10px] text-slate-400 font-bold uppercase my-2">Conversa Iniciada via Formulário</div>
                  
                  {selectedTicketForChat.chatHistory && selectedTicketForChat.chatHistory.map((msg, i) => {
                    const isAgent = msg.sender === 'agent';
                    const isSystem = msg.text.startsWith('📬') || msg.text.startsWith('📸');
                    
                    return (
                      <div 
                        key={i} 
                        className={`max-w-[85%] flex flex-col ${
                          isAgent ? 'self-end items-end' : 'self-start items-start'
                        }`}
                      >
                        <div 
                          className={`rounded-2xl p-3 text-xs leading-relaxed ${
                            isSystem
                              ? 'bg-amber-50 border border-amber-200 text-amber-900 font-semibold rounded-lg'
                              : isAgent
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold mt-1 px-1">{msg.time}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Chat input box */}
                <div className="bg-white border-t border-slate-200 p-3 shrink-0">
                  
                  {/* Quick-reply templates */}
                  <div className="flex gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none">
                    <button 
                      onClick={() => setChatInput("Olá! Recebemos suas fotos e estamos analisando.")}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] py-1 px-2.5 rounded-full whitespace-nowrap"
                    >
                      💬 Olá! Recebemos as fotos
                    </button>
                    <button 
                      onClick={() => setChatInput("Sua proposta em PDF está pronta para download.")}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] py-1 px-2.5 rounded-full whitespace-nowrap"
                    >
                      💬 Proposta pronta!
                    </button>
                    <button 
                      onClick={() => setChatInput("Gostaria de agendar para qual dia da semana?")}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] py-1 px-2.5 rounded-full whitespace-nowrap"
                    >
                      💬 Agendamento?
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Digite uma mensagem para o cliente..." 
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSendChatMessage();
                      }}
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-indigo-600"
                    />
                    <button 
                      onClick={handleSendChatMessage}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-colors shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
