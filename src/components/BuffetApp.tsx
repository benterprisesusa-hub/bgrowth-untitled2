/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Clock, DollarSign, Plus, Settings, Sparkles, CheckCircle2, 
  ChevronRight, FileText, ArrowLeft, PlusCircle, Trash, Edit2, ShoppingBag, 
  ChefHat, Eye, Check, ArrowRight, Printer, Mail, MapPin, UploadCloud, File, AlertCircle,
  Briefcase, Shield, BarChart3, ListTodo, Activity, Package
} from 'lucide-react';
import { BuffetLead, BuffetRecipe, User } from '../types';
import { 
  initialBuffetLeads, 
  initialRecipes, 
  BASE_MENU_PRICES, 
  OPTIONAL_SERVICES_PRICES, 
  calculateEstimatedPrice, 
  getRecommendedStaff 
} from './BuffetData';

import BuffetHeader from './BuffetHeader';
import BuffetFooter from './BuffetFooter';
import BuffetClientForm from './BuffetClientForm';
import BuffetAdminDashboard from './BuffetAdminDashboard';
import BuffetInventory from './BuffetInventory';
import BuffetClientsList from './BuffetClientsList';
import BuffetLeadModal from './BuffetLeadModal';
import { translations, getLangText } from './BuffetTranslations';

interface BuffetAppProps {
  user: User;
  onBack: () => void;
}

type AdminTab = 'dashboard' | 'pipeline' | 'clients' | 'recipes' | 'staff' | 'scheduler' | 'inventory' | 'settings';

export default function BuffetApp({ user, onBack }: BuffetAppProps) {
  // Lang state: 'pt' | 'en' | 'es' | 'fr'
  const [lang, setLang] = useState<'pt' | 'en' | 'es' | 'fr'>('pt');
  const t = translations[lang];

  // Persistence state
  const [leads, setLeads] = useState<BuffetLead[]>(() => {
    const saved = localStorage.getItem('bgrowth_buffet_leads');
    return saved ? JSON.parse(saved) : initialBuffetLeads;
  });

  const [recipes, setRecipes] = useState<BuffetRecipe[]>(() => {
    const saved = localStorage.getItem('bgrowth_buffet_recipes');
    return saved ? JSON.parse(saved) : initialRecipes;
  });

  useEffect(() => {
    localStorage.setItem('bgrowth_buffet_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('bgrowth_buffet_recipes', JSON.stringify(recipes));
  }, [recipes]);

  // UI state: 'client' (Public quote solicitor) vs 'admin' (Owner dashboard)
  const [viewMode, setViewMode] = useState<'client' | 'admin'>('client');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  
  // Public Form state
  const [formEventType, setFormEventType] = useState<BuffetLead['eventType']>('Wedding');
  const [formDate, setFormDate] = useState('2026-08-22');
  const [formStartTime, setFormStartTime] = useState('18:00');
  const [formEndTime, setFormEndTime] = useState('23:00');
  const [formGuests, setFormGuests] = useState<number>(100);
  const [formAddress, setFormAddress] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formState, setFormState] = useState('SP');
  const [formZip, setFormZip] = useState('');
  const [formVenueDefined, setFormVenueDefined] = useState(true);
  const [formServices, setFormServices] = useState<string[]>(['Full Buffet', 'Drinks', 'Waitstaff']);
  const [formMenuPreference, setFormMenuPreference] = useState<BuffetLead['menuPreference']>('Premium');
  const [formClientName, setFormClientName] = useState('');
  const [formClientPhone, setFormClientPhone] = useState('');
  const [formClientEmail, setFormClientEmail] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formTheme, setFormTheme] = useState('');
  const [formColors, setFormColors] = useState('');
  const [formDietary, setFormDietary] = useState('');
  const [formSpecialNeeds, setFormSpecialNeeds] = useState('');

  // Quote Success state
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Admin Active Lead detail Modal
  const [selectedLead, setSelectedLead] = useState<BuffetLead | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<BuffetRecipe | null>(null);

  // Dynamic values helper for the active public form
  const liveEstimate = calculateEstimatedPrice(formGuests, formMenuPreference, formServices);

  // Submit quote Solicitor
  const handleRequestQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClientName || !formClientEmail || !formClientPhone) {
      alert(lang === 'pt' ? 'Por favor, preencha seus dados de contato.' : 'Please fill in your contact details.');
      return;
    }

    const newLeadId = `ORC-2026-00${453 + leads.length}`;
    
    // Auto map recipes corresponding to preferred category
    let defaultDishes: string[] = [];
    if (formMenuPreference === 'Premium') {
      defaultDishes = ['Mini Beef Sliders', 'Slow-Roasted Prime Rib', 'Garlic Mashed Potatoes', 'Mini New York Cheesecakes'];
    } else if (formMenuPreference === 'Gourmet') {
      defaultDishes = ['Gourmet Crostini with Brie and Fig', 'Grilled Salmon with Lemon Dill Cream', 'Wild Mushroom Risotto (V)', 'Classic Caesar Salad', 'Mini New York Cheesecakes'];
    } else {
      defaultDishes = ['Caprese Skewers', 'Classic Caesar Salad', 'Signature Citrus Punch (Non-Alcoholic)'];
    }

    const newLead: BuffetLead = {
      id: newLeadId,
      eventType: formEventType,
      eventDate: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      guests: formGuests,
      address: formAddress || 'Rua Principal, TBD',
      city: formCity || 'São Paulo',
      state: formState || 'SP',
      zip: formZip || '01001-000',
      venueDefined: formVenueDefined,
      services: formServices,
      menuPreference: formMenuPreference,
      clientName: formClientName,
      clientPhone: formClientPhone,
      clientEmail: formClientEmail,
      notes: formNotes,
      theme: formTheme,
      colors: formColors,
      dietaryRestrictions: formDietary,
      specialNeeds: formSpecialNeeds,
      estimatedPrice: liveEstimate,
      status: 'New Lead',
      createdAt: new Date().toISOString().split('T')[0],
      menuItems: defaultDishes
    };

    setLeads(prev => [newLead, ...prev]);
    setSubmittedLeadId(newLeadId);
  };

  // Reset public form
  const resetForm = () => {
    setFormClientName('');
    setFormClientPhone('');
    setFormClientEmail('');
    setFormNotes('');
    setFormTheme('');
    setFormColors('');
    setFormDietary('');
    setFormSpecialNeeds('');
    setFormGuests(100);
    setFormServices(['Full Buffet', 'Drinks', 'Waitstaff']);
    setFormMenuPreference('Premium');
    setSubmittedLeadId(null);
  };

  // Pipeline moving action
  const updateLeadStatus = (leadId: string, newStatus: BuffetLead['status']) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    }));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Delete lead
  const deleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    setSelectedLead(null);
  };

  // Dynamic grocery calculation for confirmed events or selected guest counts
  const [selectedRecipeEvent, setSelectedRecipeEvent] = useState<string>('custom');
  const [customScalerGuests, setCustomScalerGuests] = useState<number>(100);
  const [selectedDishesToScale, setSelectedDishesToScale] = useState<string[]>(
    recipes.slice(0, 4).map(r => r.name)
  );

  const activeScalerGuests = selectedRecipeEvent === 'custom' 
    ? customScalerGuests 
    : (leads.find(l => l.id === selectedRecipeEvent)?.guests || 100);

  // Auto-set the active event dishes if user switches events
  useEffect(() => {
    if (selectedRecipeEvent !== 'custom') {
      const matchedLead = leads.find(l => l.id === selectedRecipeEvent);
      if (matchedLead && matchedLead.menuItems && matchedLead.menuItems.length > 0) {
        setSelectedDishesToScale(matchedLead.menuItems);
      }
    }
  }, [selectedRecipeEvent, leads]);

  // Aggregate ingredients shopping list
  const getAggregatedShoppingList = () => {
    const list: Record<string, { quantity: number; unit: string }> = {};

    selectedDishesToScale.forEach(dishName => {
      const recipe = recipes.find(r => r.name === dishName);
      if (recipe) {
        recipe.ingredients.forEach(ing => {
          // Standard recipe yields are based on 100 guests base
          const scaledQty = (ing.quantity / 100) * activeScalerGuests;
          if (list[ing.name]) {
            list[ing.name].quantity += scaledQty;
          } else {
            list[ing.name] = { quantity: scaledQty, unit: ing.unit };
          }
        });
      }
    });

    return Object.entries(list).map(([name, data]) => ({
      name,
      quantity: parseFloat(data.quantity.toFixed(2)),
      unit: data.unit
    }));
  };

  const shoppingList = getAggregatedShoppingList();

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-140px)] flex flex-col font-sans text-slate-800 rounded-3xl border border-slate-100 overflow-hidden shadow-xs animate-fade-in" id="buffet-app-root">
      
      {/* Dynamic White Elegant Header */}
      <BuffetHeader
        lang={lang}
        setLang={setLang}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onBack={onBack}
      />

      {/* PUBLIC CLIENT QUOTE FORM VIEW */}
      {viewMode === 'client' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-8">
          
          {/* Main solicitation success banner or interactive form */}
          {submittedLeadId ? (
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm text-center max-w-xl mx-auto space-y-6 animate-fade-in py-12">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-100 shadow-xs">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {getLangText(lang, 'Pedido Enviado com Sucesso!', 'Proposal Request Submitted!', '¡Pedido Enviado con Éxito!', 'Demande Envoyée avec Succès !')}
                </h3>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  {getLangText(
                    lang,
                    `Sua solicitação foi registrada sob o código ${submittedLeadId}. Nossa coordenação de eventos enviará uma proposta personalizada em até 2 horas por e-mail.`,
                    `Your quote request is registered as ${submittedLeadId}. Our coordination staff will email a personalized proposal deck to you shortly.`,
                    `Su solicitud ha sido registrada bajo el código ${submittedLeadId}. Nuestra coordinación de eventos le enviará una propuesta personalizada por correo electrónico en un plazo de 2 horas.`,
                    `Votre demande a été enregistrée sous le code ${submittedLeadId}. Notre équipe de coordination d'événements vous enverra une proposition personnalisée par e-mail dans un délai de 2 heures.`
                  )}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 space-y-2 max-w-md mx-auto text-left">
                <div className="flex justify-between">
                  <span>{getLangText(lang, 'Código:', 'Request ID:', 'Código:', 'Identifiant :')}</span>
                  <span className="text-slate-800 font-mono font-black">{submittedLeadId}</span>
                </div>
                <div className="flex justify-between">
                  <span>{getLangText(lang, 'Estimativa:', 'Estimate:', 'Estimación:', 'Estimation :')}</span>
                  <span className="text-indigo-700 font-mono font-black">${liveEstimate.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
                >
                  ↩ {getLangText(lang, 'Solicitar Outro', 'Request Another', 'Solicitar Otro', 'Demander un Autre')}
                </button>
                <button
                  onClick={() => setViewMode('admin')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-indigo-100"
                >
                  ⚙️ {getLangText(lang, 'Ir para o Painel', 'Go to Admin Dashboard', 'Ir al Panel', 'Aller au Tableau de Bord')}
                </button>
              </div>
            </div>
          ) : (
            <BuffetClientForm
              lang={lang}
              eventType={formEventType}
              setEventType={setFormEventType}
              eventDate={formDate}
              setEventDate={setFormDate}
              startTime={formStartTime}
              setStartTime={setFormStartTime}
              endTime={formEndTime}
              setEndTime={setFormEndTime}
              guests={formGuests}
              setGuests={setFormGuests}
              address={formAddress}
              setAddress={setFormAddress}
              city={formCity}
              setCity={setFormCity}
              state={formState}
              setState={setFormState}
              zip={formZip}
              setZip={setFormZip}
              venueDefined={formVenueDefined}
              setVenueDefined={setFormVenueDefined}
              services={formServices}
              setServices={setFormServices}
              menuPreference={formMenuPreference}
              setMenuPreference={setFormMenuPreference}
              clientName={formClientName}
              setClientName={setFormClientName}
              clientPhone={formClientPhone}
              setClientPhone={setFormClientPhone}
              clientEmail={formClientEmail}
              setClientEmail={setFormClientEmail}
              notes={formNotes}
              setNotes={setFormNotes}
              liveEstimate={liveEstimate}
              onSubmit={handleRequestQuoteSubmit}
            />
          )}

        </main>
      )}

      {/* ADMIN PANEL WORKSPACE */}
      {viewMode === 'admin' && (
        <div className="flex-1 flex flex-col md:flex-row border-t border-slate-100">
          
          {/* Owner Left Navigation Sidebar matching Image 3 Screen 1 perfectly */}
          <aside className="w-full md:w-60 bg-white border-r border-slate-100 p-4 space-y-6 shrink-0 text-left">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                {getLangText(lang, 'ÁREA DO PROPRIETÁRIO', 'OWNER HUB', 'ÁREA DEL PROPIETARIO', 'ESPACE PROPRIÉTAIRE')}
              </span>
              <h3 className="text-sm font-black text-slate-900 leading-none mt-1">BGrowth Admin</h3>
            </div>

            <nav className="space-y-1.5 text-xs font-black">
              {/* Tab 1: Dashboard Overview */}
              <button
                onClick={() => setAdminTab('dashboard')}
                className={`w-full px-3 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                  adminTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-md font-mono bg-indigo-500 text-white font-extrabold">LIVE</span>
              </button>

              {/* Tab 2: Sales Pipeline Kanban */}
              <button
                onClick={() => setAdminTab('pipeline')}
                className={`w-full px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  adminTab === 'pipeline' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <ListTodo className="w-4 h-4" />
                <span>{t.pipelineTab}</span>
              </button>

              {/* Tab 3: Clients List */}
              <button
                onClick={() => setAdminTab('clients')}
                className={`w-full px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  adminTab === 'clients' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t.clientsTab}</span>
              </button>

              {/* Tab 4: Recipe Scaler */}
              <button
                onClick={() => setAdminTab('recipes')}
                className={`w-full px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  adminTab === 'recipes' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <ChefHat className="w-4 h-4" />
                <span>{t.recipesTab}</span>
              </button>

              {/* Tab 5: Staff Planner */}
              <button
                onClick={() => setAdminTab('staff')}
                className={`w-full px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  adminTab === 'staff' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t.staffTab}</span>
              </button>

              {/* Tab 6: Day-of Timeline */}
              <button
                onClick={() => setAdminTab('scheduler')}
                className={`w-full px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  adminTab === 'scheduler' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{t.schedulerTab}</span>
              </button>

              {/* Tab 7: Inventory */}
              <button
                onClick={() => setAdminTab('inventory')}
                className={`w-full px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  adminTab === 'inventory' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{t.inventoryTab}</span>
              </button>
            </nav>
          </aside>

          {/* Owner Main Workspace panel details */}
          <main className="flex-1 p-6 md:p-8 bg-slate-50/50 space-y-6">
            
            {/* SUB-PANEL: DASHBOARD */}
            {adminTab === 'dashboard' && (
              <BuffetAdminDashboard
                lang={lang}
                leads={leads}
                onSelectLead={(l) => setSelectedLead(l)}
              />
            )}

            {/* SUB-PANEL: PIPELINE KANBAN BOARD */}
            {adminTab === 'pipeline' && (
              <div className="space-y-5 text-left animate-fade-in">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">{lang === 'pt' ? 'Funil de Vendas de Casamentos & Eventos' : 'Catering & Weddings Sales Funnel'}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">{lang === 'pt' ? 'Arraste ou clique nos leads para gerenciar contratos, faturamento e andamento.' : 'Coordinate active sales pipeline steps and custom contract templates.'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {(['New Lead', 'In Analysis', 'Proposal Sent', 'Event Confirmed', 'Closed'] as BuffetLead['status'][]).map(status => {
                    const statusLeads = leads.filter(l => l.status === status);
                    const statusValue = statusLeads.reduce((acc, l) => acc + l.estimatedPrice, 0);

                    return (
                      <div key={status} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 min-h-[350px]">
                        {/* Header step */}
                        <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                          <div>
                            <span className="text-[10px] font-black text-slate-800 uppercase block">{status}</span>
                            <span className="text-[9px] font-bold text-slate-400 block">${statusValue.toLocaleString()}</span>
                          </div>
                          <span className="w-5 h-5 rounded-full bg-slate-50 text-slate-600 border border-slate-100 font-extrabold text-[10px] flex items-center justify-center">
                            {statusLeads.length}
                          </span>
                        </div>

                        {/* List cards */}
                        <div className="flex-1 space-y-2 overflow-y-auto max-h-[380px] pr-1">
                          {statusLeads.map(lead => (
                            <button
                              key={lead.id}
                              onClick={() => setSelectedLead(lead)}
                              className="w-full text-left p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-indigo-400 hover:bg-white transition-all space-y-2 block"
                            >
                              <div className="flex justify-between items-start gap-1">
                                <span className="text-xs font-black text-slate-800 line-clamp-1 flex-1">{lead.clientName}</span>
                                <span className="text-[8px] font-black font-mono bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded">
                                  {lead.id.split('-').pop()}
                                </span>
                              </div>
                              <p className="text-[9px] text-slate-400 font-semibold">{lead.eventType} | {lead.guests} pax</p>
                              <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-slate-200/50 font-bold">
                                <span className="text-slate-400">{lead.eventDate}</span>
                                <span className="text-slate-800 font-mono">${lead.estimatedPrice.toLocaleString()}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-PANEL: CLIENTS LIST */}
            {adminTab === 'clients' && (
              <BuffetClientsList lang={lang} />
            )}

            {/* SUB-PANEL: RECIPE SCALER */}
            {adminTab === 'recipes' && (
              <div className="space-y-6 text-left animate-fade-in">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {getLangText(lang, 'Calculadora e Escala de Ingredientes', 'Automated Culinary Recipe Volume Scaler', 'Calculadora y Escala de Ingredientes', 'Calculateur et Échelle des Ingrédients')}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    {getLangText(
                      lang,
                      'Gere automaticamente a lista de compras baseada no número de convidados.',
                      'Calculates the aggregate shopping list dynamically matching client guest requirements.',
                      'Genera automáticamente la lista de compras según el número de invitados.',
                      'Générez automatiquement la liste de courses en fonction du nombre d\'invités.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Select parameters */}
                  <div className="md:col-span-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs space-y-4 text-xs font-bold text-slate-600">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">
                      1. {getLangText(lang, 'Selecionar Evento ou Base', 'Select Target Event or Guest Base', 'Seleccionar Evento o Base', 'Sélectionner l\'Événement ou la Base')}
                    </span>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-slate-400 font-black">
                        {getLangText(lang, 'Vincular com Evento do Funil', 'Link with Pipeline Lead', 'Vincular con Evento del Embudo', 'Lier à un Prospect du Tunnel')}
                      </label>
                      <select
                        value={selectedRecipeEvent}
                        onChange={(e) => setSelectedRecipeEvent(e.target.value)}
                        className="w-full font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      >
                        <option value="custom">
                          {getLangText(lang, 'Quantidade Avulsa (Customizada)', 'Custom Guests (Standalone)', 'Cantidad Individual (Personalizada)', 'Quantité Individuelle (Personnalisée)')}
                        </option>
                        {leads.map(l => (
                          <option key={l.id} value={l.id}>{l.clientName} ({l.guests} pax - {l.eventType})</option>
                        ))}
                      </select>
                    </div>

                    {selectedRecipeEvent === 'custom' && (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase text-slate-400 font-black">
                          {getLangText(lang, 'Quantidade de Convidados', 'Standalone Guest Volume', 'Cantidad de Invitados', 'Nombre d\'Invités')}
                        </label>
                        <input
                          type="number"
                          value={customScalerGuests}
                          onChange={(e) => setCustomScalerGuests(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Discovered Active dishes checklists */}
                    <div className="space-y-2 border-t border-slate-50 pt-3">
                      <span className="text-[10px] uppercase text-slate-400 font-black tracking-wide block">
                        {getLangText(lang, 'Pratos do Cardápio Selecionados', 'Dishes to scale', 'Platos Seleccionados', 'Plats Sélectionnés')}
                      </span>
                      <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                        {recipes.map(recipe => {
                          const isSelected = selectedDishesToScale.includes(recipe.name);
                          return (
                            <button
                              key={recipe.id}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedDishesToScale(selectedDishesToScale.filter(name => name !== recipe.name));
                                } else {
                                  setSelectedDishesToScale([...selectedDishesToScale, recipe.name]);
                                }
                              }}
                              className={`w-full p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                                isSelected ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50/50 border-slate-100 text-slate-500'
                              }`}
                            >
                              <span className="text-[9px]">{isSelected ? '✓' : '○'}</span>
                              <span className="text-[10px] font-bold truncate">{recipe.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Aggregated grocery list outputs */}
                  <div className="md:col-span-8 bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          {getLangText(lang, 'Lista de Compras Consolidada', 'Consolidated Shopping Ingredients List', 'Lista de Compras Consolidada', 'Liste de Courses Consolidée')}
                        </h4>
                        <p className="text-[9px] text-slate-400 font-semibold">
                          {getLangText(
                            lang,
                            `Insumos calculados para atender ${activeScalerGuests} convidados.`,
                            `Ingredients compiled to accommodate exactly ${activeScalerGuests} pax.`,
                            `Ingredientes calculados para atender a ${activeScalerGuests} invitados.`,
                            `Ingrédients calculés pour répondre aux besoins de ${activeScalerGuests} invités.`
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => alert(getLangText(lang, 'Lista de compras exportada com sucesso!', 'Shopping list exported successfully!', '¡Lista de compras exportada con éxito!', 'Liste de courses exportée avec succès !'))}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] uppercase rounded-lg"
                      >
                        📥 Export
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                      {shoppingList.map((ing, idx) => (
                        <div key={idx} className="bg-slate-50/40 p-3 rounded-xl border border-slate-100/50 flex justify-between items-center text-xs font-semibold">
                          <span className="text-slate-700">{ing.name}</span>
                          <span className="font-mono text-indigo-700 font-black bg-indigo-50 px-2.5 py-1 rounded-lg">
                            {ing.quantity} {ing.unit}
                          </span>
                        </div>
                      ))}
                      {shoppingList.length === 0 && (
                        <div className="sm:col-span-2 text-center text-slate-400 p-8 font-semibold">
                          {getLangText(lang, 'Selecione pratos para gerar a lista.', 'Select dishes to build scaled volume lists.', 'Seleccione platos para generar la lista.', 'Sélectionnez des plats pour générer la liste.')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-PANEL: STAFF PLANNER */}
            {adminTab === 'staff' && (
              <div className="space-y-6 text-left animate-fade-in">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {getLangText(lang, 'Calculadora e Escala de Garçons & Staff', 'Automated Waitstaff Planning & Dispatches', 'Calculadora y Escala de Mozos y Personal', 'Planificateur Automatique d\'Équipe')}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    {getLangText(
                      lang,
                      'Gere escalas ideais de equipe com base no número de convidados.',
                      'Calculates safe waiter-to-guest ratios and coordinates dispatch shifts.',
                      'Genere escalas de personal ideales basadas en el número de invitados.',
                      'Générez des affectations d\'équipe idéales en fonction du nombre d\'invités.'
                    )}
                  </p>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs space-y-4">
                  <h4 className="text-xs font-black text-slate-800 uppercase">
                    {getLangText(lang, 'Escalas Calculadas para Próximos Eventos', 'Safe Ratios & Dispatch Shifts', 'Escalas Calculadas para Próximos Eventos', 'Affectations Calculées pour les Prochains Événements')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {leads.filter(l => l.status === 'Event Confirmed' || l.status === 'Proposal Sent').map(lead => {
                      const staffing = getRecommendedStaff(lead.guests, lead.menuPreference, lead.services);
                      return (
                        <div key={lead.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-3 font-semibold text-slate-600">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-xs font-black text-slate-900 block truncate max-w-[130px]">{lead.clientName}</span>
                              <span className="text-[9px] text-slate-400 font-bold block">{lead.eventType} | {lead.guests} pax</span>
                            </div>
                            <span className="text-[10px] font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                              {lead.id}
                            </span>
                          </div>

                          <div className="space-y-1.5 border-t border-b border-slate-200/50 py-2">
                            <div className="flex justify-between">
                              <span>{getLangText(lang, 'Garçons Recomendados:', 'Recommended Waiters:', 'Mozos Recomendados:', 'Serveurs Recommandés :')}</span>
                              <span className="font-extrabold text-slate-800">{staffing.waiters}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{getLangText(lang, 'Bartenders Recomendados:', 'Recommended Bartenders:', 'Bartenders Recomendados:', 'Barmans Recommandés :')}</span>
                              <span className="font-extrabold text-slate-800">{staffing.bartenders}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{getLangText(lang, 'Seguranças Recomendados:', 'Recommended Security:', 'Seguridad Recomendada:', 'Agents de Sécurité Recommandés :')}</span>
                              <span className="font-extrabold text-slate-800">{staffing.security}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => alert(getLangText(
                              lang,
                              `Escala gerada e notificações enviadas para a equipe do Evento ${lead.id}!`,
                              `Roster compiled and SMS notifications triggered for Event ${lead.id}!`,
                              `¡Escala generada y notificaciones enviadas al equipo del Evento ${lead.id}!`,
                              `Planning généré et notifications envoyées à l'équipe de l'Événement ${lead.id} !`
                            ))}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] uppercase rounded-xl transition-all"
                          >
                            {getLangText(lang, 'Disparar Escala (Notificar)', 'Dispatch Shift (Notify)', 'Enviar Escala (Notificar)', 'Envoyer le Planning (Notifier)')}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-PANEL: DAY-OF SCHEDULER TIMELINE */}
            {adminTab === 'scheduler' && (
              <div className="space-y-6 text-left animate-fade-in">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {getLangText(lang, 'Cronograma do Dia do Evento', 'Day-of Event Timeline Tracker', 'Cronograma del Día del Evento', 'Planning du Jour J de l\'Événement')}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    {getLangText(
                      lang,
                      'Planeje as etapas logísticas relativas ao horário de início do buffet.',
                      'Tracks departures, layouts setup, safety briefings, doors open, and teardowns.',
                      'Planifique los pasos logísticos en relación con la hora de inicio del buffet.',
                      'Planifiez les étapes logistiques relatives à l\'heure de début du buffet.'
                    )}
                  </p>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs space-y-4">
                  {leads.filter(l => l.status === 'Event Confirmed' || l.status === 'Proposal Sent').map(lead => {
                    const startHour = parseInt(lead.startTime.split(':')[0]) || 18;
                    const timeline = [
                      {
                        time: `${startHour - 3}:00`,
                        label: getLangText(lang, 'Saída da Cozinha & Logística', 'Kitchen & Prep Departure', 'Salida de Cocina y Logística', 'Départ Cuisine & Logistique'),
                        desc: getLangText(
                          lang,
                          'Carregamento dos veículos refrigerados e partida das vans.',
                          'Vehicles loaded. Refrigerated items locked. Culinary crew departures.',
                          'Carga de vehículos refrigerados y salida de camionetas.',
                          'Chargement des véhicules réfrigérés et départ des fourgons.'
                        )
                      },
                      {
                        time: `${startHour - 2}:00`,
                        label: getLangText(lang, 'Montagem de Mesas e Layout', 'Venue Site Arrival & Layout Set', 'Montaje de Mesas y Diseño', 'Installation des Tables & Disposition'),
                        desc: getLangText(
                          lang,
                          'Montagem de toalhas, talheres, flores e acendimento das estufas.',
                          'Table dressings, glassware, cutlery applied. Kitchen setups fired up.',
                          'Colocación de manteles, vajilla, flores y encendido de estufas.',
                          'Installation des nappes, de la vaisselle, des fleurs et mise en marche des réchauds.'
                        )
                      },
                      {
                        time: `${startHour - 1}:00`,
                        label: getLangText(lang, 'Briefing de Equipe & Segurança', 'Staff Briefing & Safety Check', 'Briefing de Personal y Seguridad', 'Briefing d\'Équipe & Contrôle Sécurité'),
                        desc: getLangText(
                          lang,
                          'Coordenador repassa restrições de alergia e posições dos garçons.',
                          'Coordinator reviews dietary allergen list and assigns waiter sectors.',
                          'El coordinador revisa las restricciones por alergias y asigna sectores a los mozos.',
                          'Le coordinateur passe en revue les allergies alimentaires et assigne les secteurs des serveurs.'
                        )
                      },
                      {
                        time: `${lead.startTime}`,
                        label: getLangText(lang, 'Abertura das Portas (Recepção)', 'Doors Open (Guest Arrival)', 'Apertura de Puertas (Recepción)', 'Ouverture des Portes (Arrivée des Invités)'),
                        desc: getLangText(
                          lang,
                          'Início do serviço de coquetel, canapés e bartenders ativos.',
                          'Passed cocktails served. Background music active.',
                          'Inicio del servicio de cócteles, canapés y barra de bebidas activa.',
                          'Début du service de cocktails, canapés et bars actifs.'
                        )
                      },
                      {
                        time: `${startHour + 1}:30`,
                        label: getLangText(lang, 'Serviço de Buffet / Jantar Aberto', 'Main Buffet / Plated Dinner Open', 'Servicio de Buffet / Cena Abierta', 'Buffet Principal / Dîner Ouvert'),
                        desc: getLangText(
                          lang,
                          'Disposição das saladas, carnes quentes e reposição.',
                          'Main course carving active. Sides replenished.',
                          'Disposición de ensaladas, carnes calientes y reposición continua.',
                          'Mise en place des salades, viandes chaudes et réapprovisionnement.'
                        )
                      },
                      {
                        time: `${lead.endTime}`,
                        label: getLangText(lang, 'Desmontagem & Limpeza', 'Teardown & Cleaning Departure', 'Desmontaje y Limpieza', 'Démontage & Nettoyage'),
                        desc: getLangText(
                          lang,
                          'Recolhimento das louças e devolução do salão limpo.',
                          'Dishes boxed. Layout sanitized for venue release.',
                          'Recogida de vajilla y entrega del salón limpio.',
                          'Rangement de la vaisselle et restitution de la salle propre.'
                        )
                      }
                    ];

                    return (
                      <div key={lead.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                          <div>
                            <span className="text-xs font-black text-slate-800 block">{lead.clientName} - {lead.eventType}</span>
                            <p className="text-[9px] text-slate-400 font-bold">{lead.eventDate} | {lead.startTime} - {lead.endTime}</p>
                          </div>
                          <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl">
                            {lead.id}
                          </span>
                        </div>

                        <div className="relative border-l border-slate-200 ml-2 pl-4 space-y-4 text-xs font-semibold text-slate-600">
                          {timeline.map((step, idx) => (
                            <div key={idx} className="relative">
                              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white"></span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-black text-indigo-700">{step.time}</span>
                                <span className="font-black text-slate-800">{step.label}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-PANEL: INVENTORY STOCK */}
            {adminTab === 'inventory' && (
              <BuffetInventory lang={lang} />
            )}

            {/* SUB-PANEL: COMPANY SETTINGS */}
            {adminTab === 'settings' && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm text-left space-y-6 animate-fade-in text-xs font-bold text-slate-600">
                <div className="border-b border-slate-50 pb-3">
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {getLangText(lang, 'Configurações de Negócio BGrowth', 'BGrowth Company Preferences', 'Configuración de Negocios BGrowth', 'Paramètres de l\'Entreprise BGrowth')}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    {getLangText(
                      lang,
                      'Configure a identidade corporativa do seu buffet, CNPJ e logo.',
                      'Configure currency scales, corporate branding parameters, and business cards.',
                      'Configure la identidad corporativa de su buffet, número de impuesto fiscal y logotipo.',
                      'Configurez l\'identité d\'entreprise de votre buffet, le numéro de taxe d\'activité et le logo.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-black">
                      {getLangText(lang, 'Razão Social', 'Company Name', 'Razón Social', 'Raison Sociale')}
                    </label>
                    <input
                      type="text"
                      defaultValue="BGrowth Buffet & Catering Ltda"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-black">
                      {getLangText(lang, 'Documento (CNPJ)', 'Tax ID (EIN)', 'Documento Tributario', 'Numéro de Taxe (SIRET)')}
                    </label>
                    <input
                      type="text"
                      defaultValue="12.345.678/0001-99"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-black">
                      {getLangText(lang, 'E-mail Comercial', 'Business Email', 'Correo Comercial', 'E-mail Commercial')}
                    </label>
                    <input
                      type="text"
                      defaultValue="contato@bgrowth.com.br"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-black">
                      {getLangText(lang, 'Telefone de Suporte', 'Hotline Phone', 'Teléfono de Soporte', 'Téléphone d\'Assistance')}
                    </label>
                    <input
                      type="text"
                      defaultValue="(11) 99999-0000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={() => alert(getLangText(
                    lang,
                    'Configurações salvas com sucesso!',
                    'Company settings updated!',
                    '¡Configuración guardada con éxito!',
                    'Paramètres sauvegardés avec succès !'
                  ))}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition-all"
                >
                  {getLangText(lang, 'Salvar Alterações', 'Save Company Details', 'Guardar Cambios', 'Sauvegarder les Paramètres')}
                </button>
              </div>
            )}

          </main>
        </div>
      )}

      {/* LEAD SPECIFIC ADMINISTRATIVE DETAIL DIALOG */}
      {selectedLead && (
        <BuffetLeadModal
          lang={lang}
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateStatus={updateLeadStatus}
          onDeleteLead={deleteLead}
        />
      )}

      {/* Dynamic White Elegant Footer */}
      <BuffetFooter lang={lang} />

    </div>
  );
}
