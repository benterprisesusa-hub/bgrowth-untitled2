/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Check, Briefcase, ChefHat, Users, UploadCloud, File, 
  Trash, Sparkles, ShieldCheck, Heart, Gift, Smile, GraduationCap, Cross, List, CheckCircle, Info
} from 'lucide-react';
import { translations } from './BuffetTranslations';
import { BASE_MENU_PRICES, OPTIONAL_SERVICES_PRICES } from './BuffetData';

interface BuffetClientFormProps {
  lang: 'pt' | 'en' | 'es' | 'fr';
  eventType: string;
  setEventType: (val: any) => void;
  eventDate: string;
  setEventDate: (val: string) => void;
  startTime: string;
  setStartTime: (val: string) => void;
  endTime: string;
  setEndTime: (val: string) => void;
  guests: number;
  setGuests: (val: number) => void;
  address: string;
  setAddress: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  zip: string;
  setZip: (val: string) => void;
  venueDefined: boolean;
  setVenueDefined: (val: boolean) => void;
  services: string[];
  setServices: (val: string[]) => void;
  menuPreference: string;
  setMenuPreference: (val: any) => void;
  clientName: string;
  setClientName: (val: string) => void;
  clientPhone: string;
  setClientPhone: (val: string) => void;
  clientEmail: string;
  setClientEmail: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  liveEstimate: number;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BuffetClientForm({
  lang, eventType, setEventType, eventDate, setEventDate, startTime, setStartTime,
  endTime, setEndTime, guests, setGuests, address, setAddress, city, setCity,
  state, setState, zip, setZip, venueDefined, setVenueDefined, services, setServices,
  menuPreference, setMenuPreference, clientName, setClientName, clientPhone, setClientPhone,
  clientEmail, setClientEmail, notes, setNotes, liveEstimate, onSubmit
}: BuffetClientFormProps) {
  const t = translations[lang];

  // Default seeded files to recreate the beautiful thumbnail uploads from Mockup Screen 7!
  const [mockFiles, setMockFiles] = useState([
    { name: 'garden_venue_sketch.jpg', size: '2.4 MB', type: 'image/jpeg', thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=80&h=80&fit=crop' },
    { name: 'invitation_layout.png', size: '1.1 MB', type: 'image/png', thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=80&h=80&fit=crop' },
    { name: 'buffet_inspo_premium.jpg', size: '3.8 MB', type: 'image/jpeg', thumbnail: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=80&h=80&fit=crop' }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleServiceToggle = (srv: string) => {
    if (services.includes(srv)) {
      setServices(services.filter(s => s !== srv));
    } else {
      setServices([...services, srv]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setMockFiles(prev => [...prev, {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        type: file.type,
        thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop'
      }]);
    }
  };

  const simulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMockFiles(prev => [...prev, {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        type: file.type,
        thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop'
      }]);
    }
  };

  const deleteFile = (index: number) => {
    setMockFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Event type details with icons & PT/EN descriptions matching Screen 1 in Image 2
  const eventTypesList = [
    { id: 'Wedding', namePt: 'Casamento', nameEn: 'Wedding', icon: Heart },
    { id: 'Birthday', namePt: 'Aniversário', nameEn: 'Birthday', icon: Gift },
    { id: 'Corporate', namePt: 'Corporativo', nameEn: 'Corporate', icon: Briefcase },
    { id: 'Baby Shower', namePt: 'Chá de Bebê', nameEn: 'Baby Shower', icon: Smile },
    { id: 'Graduation', namePt: 'Formatura', nameEn: 'Graduation', icon: GraduationCap },
    { id: 'Religious', namePt: 'Evento Religioso', nameEn: 'Religious', icon: CheckCircle },
    { id: 'Other', namePt: 'Outro', nameEn: 'Other', icon: List }
  ];

  // Desired services map with icons & PT/EN descriptions matching Screen 3 in Image 2
  const desiredServicesList = [
    { id: 'Full Buffet', labelPt: 'Buffet Completo', labelEn: 'Full Buffet' },
    { id: 'Drinks', labelPt: 'Bebidas', labelEn: 'Drinks' },
    { id: 'Dessert Table', labelPt: 'Mesa de Doces', labelEn: 'Dessert Table' },
    { id: 'Cake', labelPt: 'Bolo', labelEn: 'Cake' },
    { id: 'Decoration', labelPt: 'Decoração', labelEn: 'Decoration' },
    { id: 'DJ', labelPt: 'DJ', labelEn: 'DJ' },
    { id: 'Photography', labelPt: 'Fotografia', labelEn: 'Photography' },
    { id: 'Ceremonial', labelPt: 'Cerimonial', labelEn: 'Cerimonial' },
    { id: 'Venue Space', labelPt: 'Espaço para Evento', labelEn: 'Venue Space' },
    { id: 'Waitstaff', labelPt: 'Garçons', labelEn: 'Waitstaff' },
    { id: 'Bartender', labelPt: 'Bartender', labelEn: 'Bartender' },
    { id: 'Security', labelPt: 'Segurança', labelEn: 'Security' }
  ];

  // Menu Preferences with details matching Screen 4 in Image 2
  const menuPrefsList = [
    { 
      id: 'Traditional', 
      titlePt: 'Buffet Tradicional', 
      titleEn: 'Traditional Buffet', 
      descPt: 'Pratos clássicos e saborosos', 
      descEn: 'Classic and savory hot dishes',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=120&h=100&fit=crop'
    },
    { 
      id: 'Cocktail', 
      titlePt: 'Coquetel', 
      titleEn: 'Cocktail Selection', 
      descPt: 'Variedade de finger foods', 
      descEn: 'Assorted finger snacks & drinks',
      img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=120&h=100&fit=crop'
    },
    { 
      id: 'Premium', 
      titlePt: 'Buffet Premium', 
      titleEn: 'Premium Buffet', 
      descPt: 'Mais opções e requinte', 
      descEn: 'Elevated plates & culinary elegance',
      img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=120&h=100&fit=crop'
    },
    { 
      id: 'Finger Foods', 
      titlePt: 'Finger Foods', 
      titleEn: 'Finger Foods', 
      descPt: 'Porções individuais', 
      descEn: 'Bite-sized gourmet delicacies',
      img: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=120&h=100&fit=crop'
    },
    { 
      id: 'Gourmet', 
      titlePt: 'Buffet Gourmet', 
      titleEn: 'Gourmet Buffet', 
      descPt: 'Experiência gastronômica única', 
      descEn: 'Fine dining culinary creations',
      img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=120&h=100&fit=crop'
    },
    { 
      id: 'Custom', 
      titlePt: 'Personalizado', 
      titleEn: 'Customized Menu', 
      descPt: 'Montamos para você', 
      descEn: 'Bespoke menu styled for you',
      img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=120&h=100&fit=crop'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left" id="buffet-client-portal">
      
      {/* Form Area - Left 8 columns */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Solicit Title block */}
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            {t.title}
          </h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            {t.subtitle}
          </p>
          <div className="bg-emerald-50 text-emerald-800 text-[11px] font-black py-1.5 px-3 rounded-xl mt-3 flex items-center gap-1.5 border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            {t.secureBadge}
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* Card 1: Informações do Evento */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
              <Calendar className="w-4.5 h-4.5 text-indigo-600" /> {t.eventInfo}
            </h3>

            {/* Event type custom icon card list */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                {t.eventType} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {eventTypesList.map(type => {
                  const IconComponent = type.icon;
                  const isSelected = eventType === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setEventType(type.id)}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center text-center gap-2 min-h-[90px] ${
                        isSelected 
                          ? 'bg-indigo-50/50 border-indigo-600 ring-1 ring-indigo-600 text-indigo-700' 
                          : 'bg-slate-50/30 border-slate-200/60 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black tracking-tight leading-none">
                        {lang === 'pt' ? type.namePt : type.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date, Time and Guest Slider Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              {/* Event Date */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.eventDate} *</label>
                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Hours Inputs */}
              <div className="sm:col-span-2 grid grid-cols-2 gap-3 space-y-0">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.hours} ({t.start}) *</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.hours} ({t.end}) *</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Guest Slider */}
              <div className="sm:col-span-3 space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.guests} *</label>
                  <span className="text-xs font-black text-indigo-600 font-mono bg-indigo-50/80 px-2.5 py-1 rounded-full border border-indigo-100">
                    {guests} {t.guestsLabel}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="5"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="flex-1 accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-20 text-xs font-black text-center px-2 py-1.5 bg-slate-50/50 border border-slate-200/70 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Local do Evento */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-indigo-600" /> {t.eventLocation}
              </h3>
              <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200/40 text-[10px] font-bold">
                <span className="px-2 text-slate-400 uppercase font-black">{t.venueDefined}</span>
                <button
                  type="button"
                  onClick={() => setVenueDefined(true)}
                  className={`px-2 py-0.5 rounded-md ${venueDefined ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-500'}`}
                >
                  {t.yes}
                </button>
                <button
                  type="button"
                  onClick={() => setVenueDefined(false)}
                  className={`px-2 py-0.5 rounded-md ${!venueDefined ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-500'}`}
                >
                  {t.no}
                </button>
              </div>
            </div>

            {venueDefined ? (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.address} *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Espaço Villa Eventos, Rua das Flores, 123"
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.city} *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="São Paulo"
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.state} *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none"
                  >
                    <option value="SP">SP</option>
                    <option value="RJ">RJ</option>
                    <option value="MG">MG</option>
                    <option value="SC">SC</option>
                    <option value="PR">PR</option>
                    <option value="FL">FL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.zip} *</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="01234-567"
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-center space-y-1">
                <p className="text-xs text-indigo-700 font-extrabold">{lang === 'pt' ? 'Precisa de sugestões de espaço?' : 'Need venue suggestions?'}</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {lang === 'pt' 
                    ? 'Deixe o endereço em branco! Nossa equipe tem parcerias com os melhores salões da região.' 
                    : 'Leave the address blank! Our specialized team has agreements with the finest regional spaces.'}
                </p>
              </div>
            )}
          </div>

          {/* Card 3: Serviços Desejados */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
              <Briefcase className="w-4.5 h-4.5 text-indigo-600" /> {t.desiredServices}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {desiredServicesList.map(srv => {
                const isChecked = services.includes(srv.id);
                const srvPriceConfig = OPTIONAL_SERVICES_PRICES[srv.id];
                return (
                  <button
                    type="button"
                    key={srv.id}
                    onClick={() => handleServiceToggle(srv.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                      isChecked
                        ? 'bg-indigo-50/30 border-indigo-400 text-slate-900'
                        : 'bg-slate-50/30 border-slate-200/60 text-slate-500 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center mt-0.5 transition-all ${
                      isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-[11px] font-black block leading-tight">
                        {lang === 'pt' ? srv.labelPt : srv.labelEn}
                      </span>
                      {srvPriceConfig && (
                        <span className="text-[9px] text-slate-400 font-mono font-bold">
                          {srvPriceConfig.type === 'perGuest' ? `+$${srvPriceConfig.price}/${lang === 'pt' ? 'conv' : 'pax'}` : `+$${srvPriceConfig.price.toLocaleString()}`}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 4: Preferência de Cardápio */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
              <ChefHat className="w-4.5 h-4.5 text-indigo-600" /> {t.menuPreference}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {menuPrefsList.map(pref => {
                const isSelected = menuPreference === pref.id;
                const rate = BASE_MENU_PRICES[pref.id];
                return (
                  <button
                    type="button"
                    key={pref.id}
                    onClick={() => setMenuPreference(pref.id)}
                    className={`text-left p-3 rounded-2xl border transition-all flex items-center gap-3.5 relative overflow-hidden ${
                      isSelected
                        ? 'bg-indigo-50/50 border-indigo-600 ring-1 ring-indigo-600'
                        : 'bg-slate-50/30 border-slate-200/60 hover:bg-slate-50'
                    }`}
                  >
                    {/* Tiny visual image representative */}
                    <img 
                      src={pref.img} 
                      alt={pref.id} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200/50"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 space-y-0.5 pr-2">
                      <span className="text-xs font-black text-slate-900 block leading-tight">
                        {lang === 'pt' ? pref.titlePt : pref.titleEn}
                      </span>
                      <p className="text-[10px] text-slate-400 font-semibold leading-normal line-clamp-2">
                        {lang === 'pt' ? pref.descPt : pref.descEn}
                      </p>
                      <div className="text-[9px] text-indigo-600 font-bold font-mono">
                        ${rate} / {lang === 'pt' ? 'pessoa' : 'guest'}
                      </div>
                    </div>

                    {/* Check indicator */}
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[8px] font-black">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 5: Informações do Cliente */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
              <Users className="w-4.5 h-4.5 text-indigo-600" /> {t.clientInfo}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.clientName} *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.clientPhone} *</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(11) 98888-7777"
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.clientEmail} *</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="rachel.adams@example.com"
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-xl focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Card 6: Detalhes Adicionais */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600" /> {t.additionalDetails}
            </h3>
            <div>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.additionalPlaceholder}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50/50 border border-slate-200/70 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          {/* Card 7: Uploads (opcional) */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
              <UploadCloud className="w-4.5 h-4.5 text-indigo-600" /> {t.uploads}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold leading-normal">
              {t.uploadsDesc}
            </p>

            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50/40' 
                  : 'border-slate-200 bg-slate-50/30 hover:bg-slate-50'
              }`}
            >
              <input 
                type="file" 
                multiple 
                onChange={simulateUpload}
                className="hidden" 
                id="file-upload-form"
              />
              <label htmlFor="file-upload-form" className="cursor-pointer space-y-2 block">
                <UploadCloud className="w-8 h-8 text-indigo-500/80 mx-auto" />
                <div className="text-xs font-bold text-slate-700">{t.dragDropText}</div>
                <p className="text-[9px] text-slate-400">{t.dragDropFormats}</p>
              </label>
            </div>

            {/* Displaying mock uploaded files with pictures as thumbnails, matching Screen 7 in Image 2! */}
            {mockFiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
                {mockFiles.map((file, idx) => (
                  <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-2.5 flex items-center gap-3 relative hover:border-indigo-300 transition-all">
                    <img 
                      src={file.thumbnail} 
                      alt={file.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200/60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-slate-800 block truncate">{file.name}</span>
                      <span className="text-[8px] text-slate-400 font-bold block">{file.size}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteFile(idx)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full flex items-center justify-center font-black text-[10px]"
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => alert(lang === 'pt' ? 'Progresso do rascunho salvo com sucesso no seu navegador!' : 'Progress saved successfully in your local session!')}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-2xl transition-all"
            >
              💾 {t.saveLater}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-100 transition-all"
            >
              ✈️ {t.requestProposal}
            </button>
          </div>

        </form>
      </div>

      {/* Sidebar Summary Area - Right 4 columns */}
      <div className="lg:col-span-4" id="buffet-client-sidebar">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 sticky top-28">
          
          {/* Header summary */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">{t.requestSummary}</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">BGrowth Buffet & Events Projections</p>
          </div>

          {/* Summary Grid details */}
          <div className="space-y-3.5 text-xs font-bold text-slate-500 border-b border-slate-100 pb-5">
            <div className="flex justify-between items-center">
              <span>{t.eventType}:</span>
              <span className="text-slate-800 font-extrabold">{eventType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t.eventDate}:</span>
              <span className="text-slate-800 font-extrabold font-mono">{eventDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t.hours}:</span>
              <span className="text-slate-800 font-extrabold font-mono">{startTime} - {endTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t.guests}:</span>
              <span className="text-slate-800 font-extrabold font-mono">{guests} pax</span>
            </div>
            {venueDefined && address && (
              <div className="flex justify-between items-start gap-1">
                <span>{t.eventLocation}:</span>
                <span className="text-slate-800 font-extrabold truncate max-w-[150px] text-right">{address}, {city}</span>
              </div>
            )}
          </div>

          {/* Selected Services Checklist */}
          {services.length > 0 && (
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{t.selectedServices}</h4>
              <div className="space-y-2 max-h-[140px] overflow-y-auto">
                {services.map(srvId => {
                  const srvInfo = desiredServicesList.find(s => s.id === srvId);
                  return (
                    <div key={srvId} className="flex items-center gap-2 text-[11px] font-black text-indigo-700">
                      <span className="w-4 h-4 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-[9px]">✓</span>
                      <span>{lang === 'pt' ? srvInfo?.labelPt : srvInfo?.labelEn}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Menu Preference selection representation */}
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{t.menuPreference}</h4>
            {(() => {
              const prefObj = menuPrefsList.find(p => p.id === menuPreference);
              if (!prefObj) return null;
              return (
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <img src={prefObj.img} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <span className="text-[11px] font-black text-slate-800 block leading-tight">{lang === 'pt' ? prefObj.titlePt : prefObj.titleEn}</span>
                    <span className="text-[9px] text-slate-400 font-semibold">{lang === 'pt' ? prefObj.descPt : prefObj.descEn}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Large Estimative layout box */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 text-center space-y-1.5">
            <span className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-wide flex items-center justify-center gap-1">
              <Info className="w-3.5 h-3.5" /> {t.initialEstimate}
            </span>
            <div className="text-2xl font-black text-indigo-700 font-mono">
              ${liveEstimate.toLocaleString()}
            </div>
            <p className="text-[9px] text-slate-400 leading-normal italic">
              {t.estimateNotice}
            </p>
          </div>

          {/* How does it work vertical progress list */}
          <div className="space-y-3 pt-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{t.howItWorks}</h4>
            <div className="space-y-4 relative pl-3.5 border-l border-slate-100 text-[11px] font-semibold text-slate-500">
              
              <div className="relative">
                <span className="absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-indigo-600 border border-white"></span>
                <span className="font-bold text-slate-800 block leading-none">{t.step1Title}</span>
                <p className="text-[9px] text-slate-400 leading-normal mt-0.5">{t.step1Desc}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-slate-300 border border-white"></span>
                <span className="font-bold text-slate-800 block leading-none">{t.step2Title}</span>
                <p className="text-[9px] text-slate-400 leading-normal mt-0.5">{t.step2Desc}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-slate-300 border border-white"></span>
                <span className="font-bold text-slate-800 block leading-none">{t.step3Title}</span>
                <p className="text-[9px] text-slate-400 leading-normal mt-0.5">{t.step3Desc}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-slate-300 border border-white"></span>
                <span className="font-bold text-slate-800 block leading-none">{t.step4Title}</span>
                <p className="text-[9px] text-slate-400 leading-normal mt-0.5">{t.step4Desc}</p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
