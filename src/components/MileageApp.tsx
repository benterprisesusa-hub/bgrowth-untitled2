/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Car, Calendar, Plus, Trash2, ArrowLeft, Info, HelpCircle, DollarSign,
  TrendingUp, Download, PieChart, Database, MapPin, Edit3, CheckCircle, AlertTriangle, Settings, ChevronRight
} from 'lucide-react';
import { User, Trip } from '../types';
import FreeMapTracker from './FreeMapTracker';

interface MileageAppProps {
  user: User;
  onBack: () => void;
}

interface MileageFixedCosts {
  gas: number;
  insurance: number;
  maintenance: number;
  other: number;
}

export default function MileageApp({ user, onBack }: MileageAppProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'history' | 'map' | 'performance' | 'settings'>('dashboard');
  
  // Storage states
  const [trips, setTrips] = useState<Trip[]>([]);
  const [apps, setApps] = useState<string[]>([]);
  const [rate, setRate] = useState<number>(0.725); // Default IRS rate for 2026 representation
  const [monthlyMileGoal, setMonthlyMileGoal] = useState<number>(1000);
  const [fixedCosts, setFixedCosts] = useState<MileageFixedCosts>({
    gas: 150,
    insurance: 120,
    maintenance: 80,
    other: 40
  });

  // Form states
  const [newTrip, setNewTrip] = useState({
    date: new Date().toISOString().slice(0, 10),
    app: 'Uber',
    startMiles: '',
    endMiles: '',
    purpose: ''
  });

  const [newAppInput, setNewAppInput] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<number | null>(null);

  // Filter states
  const [filterFrom, setFilterFrom] = useState(() => {
    const d = new Date();
    d.setDate(1); // first day of month
    return d.toISOString().slice(0, 10);
  });
  const [filterTo, setFilterTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [filterApp, setFilterApp] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    // Trips
    const savedTrips = localStorage.getItem('bgrowth_mileage_trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    } else {
      const initial: Trip[] = [
        { id: 't_1', date: new Date().toISOString().slice(0, 10), app: 'Uber', startMiles: 12050, endMiles: 12085, miles: 35, rate: 0.725, deduction: 25.38, purpose: 'Passenger dropoffs' },
        { id: 't_2', date: new Date().toISOString().slice(0, 10), app: 'DoorDash', startMiles: 12085, endMiles: 12110, miles: 25, rate: 0.725, deduction: 18.13, purpose: 'Lunch deliveries' },
        { id: 't_3', date: '2026-06-25', app: 'Amazon Flex', startMiles: 11950, endMiles: 12020, miles: 70, rate: 0.725, deduction: 50.75, purpose: 'Package distribution route' }
      ];
      setTrips(initial);
      localStorage.setItem('bgrowth_mileage_trips', JSON.stringify(initial));
    }

    // Apps list
    const savedApps = localStorage.getItem('bgrowth_mileage_apps');
    if (savedApps) {
      setApps(JSON.parse(savedApps));
    } else {
      const initialApps = ['Uber', 'Lyft', 'DoorDash', 'Instacart', 'Amazon Flex', 'Cleaning Service', 'Personal / Other'];
      setApps(initialApps);
      localStorage.setItem('bgrowth_mileage_apps', JSON.stringify(initialApps));
    }

    // Settings
    const savedRate = localStorage.getItem('bgrowth_mileage_rate');
    if (savedRate) setRate(Number(savedRate));
    
    const savedGoal = localStorage.getItem('bgrowth_mileage_goal');
    if (savedGoal) setMonthlyMileGoal(Number(savedGoal));

    const savedCosts = localStorage.getItem('bgrowth_mileage_costs');
    if (savedCosts) setFixedCosts(JSON.parse(savedCosts));
  }, []);

  // Helper to sync trips
  const saveTripsList = (list: Trip[]) => {
    setTrips(list);
    localStorage.setItem('bgrowth_mileage_trips', JSON.stringify(list));
  };

  const saveAppsList = (list: string[]) => {
    setApps(list);
    localStorage.setItem('bgrowth_mileage_apps', JSON.stringify(list));
  };

  // KPI Calculations
  const totalMiles = trips.reduce((s, t) => s + t.miles, 0);
  const totalDeduction = trips.reduce((s, t) => s + t.deduction, 0);
  const totalTripsCount = trips.length;
  const avgMilesPerTrip = totalTripsCount > 0 ? (totalMiles / totalTripsCount) : 0;

  // Split calculations
  const currentMonthStr = new Date().toISOString().slice(0, 7);
  const lastMonthStr = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().slice(0, 7);
  })();

  const monthTrips = trips.filter(t => t.date.startsWith(currentMonthStr));
  const monthMiles = monthTrips.reduce((s, t) => s + t.miles, 0);
  const monthDeduction = monthTrips.reduce((s, t) => s + t.deduction, 0);
  const monthTripsCount = monthTrips.length;

  const prevMonthTrips = trips.filter(t => t.date.startsWith(lastMonthStr));
  const prevMonthMiles = prevMonthTrips.reduce((s, t) => s + t.miles, 0);
  const prevMonthDeduction = prevMonthTrips.reduce((s, t) => s + t.deduction, 0);

  // Month-over-month comparison percent
  const percentChange = prevMonthMiles > 0 ? Math.round(((monthMiles - prevMonthMiles) / prevMonthMiles) * 100) : 0;

  // Goals percentage progress
  const goalProgressPct = monthlyMileGoal > 0 ? Math.min(100, Math.round((monthMiles / monthlyMileGoal) * 100)) : 0;

  // Platform leaderboard
  const appStats = trips.reduce((acc, t) => {
    if (!acc[t.app]) acc[t.app] = { miles: 0, count: 0, deduction: 0 };
    acc[t.app].miles += t.miles;
    acc[t.app].count += 1;
    acc[t.app].deduction += t.deduction;
    return acc;
  }, {} as Record<string, { miles: number; count: number; deduction: number }>);

  const leaderboard = (Object.entries(appStats) as [string, { miles: number; count: number; deduction: number }][])
    .map(([app, stats]) => ({ app, miles: stats.miles, count: stats.count, deduction: stats.deduction }))
    .sort((a, b) => b.miles - a.miles)
    .slice(0, 5);

  const maxLeaderboardMiles = leaderboard.length > 0 ? Math.max(...leaderboard.map(l => l.miles)) : 1;

  // Actions
  const handleSaveTrip = () => {
    const start = Number(newTrip.startMiles);
    const end = Number(newTrip.endMiles);
    const diff = end - start;

    if (isNaN(start) || isNaN(end)) {
      alert('Por favor, informe valores válidos para o odômetro inicial e final.');
      return;
    }

    if (diff <= 0) {
      alert('O odômetro final deve ser estritamente maior que o odômetro inicial!');
      return;
    }

    const currentRate = editRate !== null ? editRate : rate;
    const tripData: Trip = {
      id: editId || 't_' + Date.now(),
      date: newTrip.date,
      app: newTrip.app,
      startMiles: start,
      endMiles: end,
      miles: diff,
      rate: currentRate,
      deduction: Number((diff * currentRate).toFixed(2)),
      purpose: newTrip.purpose || 'Business drive'
    };

    if (editId) {
      saveTripsList(trips.map(t => t.id === editId ? tripData : b => b));
      setEditId(null);
      setEditRate(null);
      alert('Registro de milhas atualizado com sucesso!');
    } else {
      saveTripsList([tripData, ...trips]);
      alert(`🎉 Viagem registrada! ${diff} milhas rodadas. Dedução gerada: $${tripData.deduction.toFixed(2)}.`);
    }

    // Reset Form
    const lastEndMiles = end;
    setNewTrip({
      date: new Date().toISOString().slice(0, 10),
      app: apps[0] || 'Uber',
      startMiles: lastEndMiles.toString(),
      endMiles: (lastEndMiles + 20).toString(),
      purpose: ''
    });
    setActiveTab('dashboard');
  };

  const handleStartEdit = (t: Trip) => {
    setEditId(t.id);
    setEditRate(t.rate);
    setNewTrip({
      date: t.date,
      app: t.app,
      startMiles: t.startMiles.toString(),
      endMiles: t.endMiles.toString(),
      purpose: t.purpose
    });
    setActiveTab('add');
  };

  const handleDeleteTrip = (id: string) => {
    if (confirm('Deseja excluir permanentemente este registro de milhas?')) {
      saveTripsList(trips.filter(t => t.id !== id));
    }
  };

  // Add simulated trip from Route Planner map
  const handleAddTripFromMap = (partialTrip: Partial<Trip>) => {
    const lastEndMiles = trips.length > 0 ? Math.max(...trips.map(t => t.endMiles)) : 12110;
    const start = lastEndMiles;
    const miles = partialTrip.miles || 0;
    const end = start + miles;

    const created: Trip = {
      id: 't_map_' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      app: partialTrip.app || 'Cleaning Service',
      startMiles: start,
      endMiles: end,
      miles: miles,
      rate: rate,
      deduction: Number((miles * rate).toFixed(2)),
      purpose: partialTrip.purpose || 'Business drive from route planner'
    };

    saveTripsList([created, ...trips]);
    alert(`🎉 Sucesso! Rota de ${miles} milhas calculada no mapa e registrada no odômetro. Dedução gerada: $${created.deduction.toFixed(2)}`);
    setActiveTab('dashboard');
  };

  // Settings Actions
  const handleAddApp = () => {
    if (!newAppInput.trim()) return;
    if (apps.includes(newAppInput.trim())) {
      alert('Esta plataforma já está cadastrada!');
      return;
    }
    saveAppsList([...apps, newAppInput.trim()]);
    setNewAppInput('');
    alert('Plataforma cadastrada com sucesso!');
  };

  const handleRemoveApp = (name: string) => {
    if (confirm(`Remover "${name}" da lista de plataformas?`)) {
      saveAppsList(apps.filter(a => a !== name));
    }
  };

  const handleSaveRate = () => {
    localStorage.setItem('bgrowth_mileage_rate', rate.toString());
    alert(`Taxa de dedução do IRS atualizada para $${rate.toFixed(3)}/mi!`);
  };

  const handleSaveCosts = () => {
    localStorage.setItem('bgrowth_mileage_costs', JSON.stringify(fixedCosts));
    alert('Despesas fixas do veículo salvas com sucesso!');
  };

  const handleSaveGoal = () => {
    localStorage.setItem('bgrowth_mileage_goal', monthlyMileGoal.toString());
    alert('Meta mensal de milhagem salva!');
  };

  // Filtering for History
  const filteredTrips = trips.filter(t => {
    const isWithinDate = t.date >= filterFrom && t.date <= filterTo;
    const isMatchingApp = !filterApp || t.app === filterApp;
    return isWithinDate && isMatchingApp;
  });

  const filteredMiles = filteredTrips.reduce((s, t) => s + t.miles, 0);
  const filteredDeduction = filteredTrips.reduce((s, t) => s + t.deduction, 0);

  // Excel / CSV Export
  const handleExportCSV = () => {
    const headers = ['Data', 'Plataforma/App', 'Odômetro Inicial', 'Odômetro Final', 'Milhas Rodadas', 'Taxa IRS', 'Dedução Estimada ($)', 'Notas/Objetivo'];
    const rows = filteredTrips.map(t => [
      t.date,
      t.app,
      t.startMiles.toString(),
      t.endMiles.toString(),
      t.miles.toString(),
      t.rate.toFixed(3),
      t.deduction.toFixed(2),
      t.purpose
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BGrowth_Mileage_Report_${filterFrom}_to_${filterTo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export Print Template
  const handleExportPDF = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    const htmlContent = `
      <html>
        <head>
          <title>BGrowth Mileage - Relatório de Odômetro</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #1e293b; }
            h1 { font-size: 20px; font-weight: bold; margin-bottom: 4px; color: #0f172a; }
            p { font-size: 11px; color: #64748b; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
            th, td { border: 1px solid #e2e8f0; padding: 8px 10px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .text-right { text-align: right; }
            .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 15px; }
            .kpi-card { border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; }
            .kpi-lbl { font-size: 9px; font-weight: bold; text-transform: uppercase; color: #94a3b8; }
            .kpi-val { font-size: 16px; font-weight: bold; color: #1d6fa4; margin-top: 2px; }
          </style>
        </head>
        <body>
          <h1>Relatório de Odômetro e Milhas - BGrowth Mileage</h1>
          <p>Período selecionado: de <b>${filterFrom}</b> até <b>${filterTo}</b> &middot; Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-lbl">Milhas Totais</div>
              <div class="kpi-val">${filteredMiles.toFixed(1)} mi</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-lbl">Dedução Fiscal Total</div>
              <div class="kpi-val" style="color: #059669">$${filteredDeduction.toFixed(2)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-lbl">Viagens Registradas</div>
              <div class="kpi-val" style="color: #1e293b">${filteredTrips.length}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Contexto/Plataforma</th>
                <th class="text-right">Odômetro Início</th>
                <th class="text-right">Odômetro Fim</th>
                <th class="text-right">Milhas</th>
                <th class="text-right">Taxa IRS</th>
                <th class="text-right">Dedução</th>
                <th>Notas/Objetivo</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTrips.map(t => `
                <tr>
                  <td>${t.date}</td>
                  <td><b>${t.app}</b></td>
                  <td class="text-right">${t.startMiles} mi</td>
                  <td class="text-right">${t.endMiles} mi</td>
                  <td class="text-right"><b>${t.miles} mi</b></td>
                  <td class="text-right">$${t.rate.toFixed(3)}</td>
                  <td class="text-right" style="color: #059669"><b>$${t.deduction.toFixed(2)}</b></td>
                  <td style="color: #64748b; font-style: italic;">"${t.purpose || ''}"</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    win.document.write(htmlContent);
    win.document.close();
    win.print();
  };

  const themeColor = user.themeColor || 'indigo';

  const themeText = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    sky: 'text-sky-500',
    violet: 'text-violet-600',
    slate: 'text-slate-800'
  }[themeColor];

  const themeBgActive = {
    indigo: 'bg-indigo-600 text-white shadow-md shadow-indigo-100',
    emerald: 'bg-emerald-600 text-white shadow-md shadow-emerald-100',
    rose: 'bg-rose-600 text-white shadow-md shadow-rose-100',
    amber: 'bg-amber-600 text-white shadow-md shadow-amber-100',
    sky: 'bg-sky-500 text-white shadow-md shadow-sky-100',
    violet: 'bg-violet-600 text-white shadow-md shadow-violet-100',
    slate: 'bg-slate-800 text-white shadow-md shadow-slate-200'
  }[themeColor];

  const themeBorderActive = {
    indigo: 'border-indigo-600',
    emerald: 'border-emerald-600',
    rose: 'border-rose-600',
    amber: 'border-amber-600',
    sky: 'border-sky-500',
    violet: 'border-violet-600',
    slate: 'border-slate-800'
  }[themeColor];

  const themeFocus = {
    indigo: 'focus:border-indigo-500 focus:ring-indigo-200',
    emerald: 'focus:border-emerald-500 focus:ring-emerald-200',
    rose: 'focus:border-rose-500 focus:ring-rose-200',
    amber: 'focus:border-amber-500 focus:ring-amber-200',
    sky: 'focus:border-sky-500 focus:ring-sky-200',
    violet: 'focus:border-violet-500 focus:ring-violet-200',
    slate: 'focus:border-slate-500 focus:ring-slate-200'
  }[themeColor];

  return (
    <div className="bg-slate-50 text-slate-900 flex flex-col font-sans h-full overflow-y-auto">
      
      {/* Simulation Info */}
      <div className="bg-amber-500 text-slate-900 text-center text-[10.5px] font-extrabold py-1.5 px-4 flex items-center justify-center gap-2 shadow-xs shrink-0">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>Planilha ativa: <b>"Mileage_Trips"</b> integrada em tempo real.</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Car className={`w-5 h-5 ${themeText}`} />
              <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase">
                {user.companyName ? `${user.companyName} Mileage` : 'BGrowth Mileage'}
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Business Suite Module</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-100">
            Hoje: {(monthTrips.filter(t => t.date === new Date().toISOString().slice(0, 10)).reduce((s,t)=>s+t.miles, 0)).toFixed(1)} mi
          </div>
          <button 
            onClick={() => { setActiveTab('add'); setEditId(null); }}
            className={`${themeBgActive} font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all`}
          >
            <Plus className="w-3.5 h-3.5" /> Registrar Viagem
          </button>
        </div>
      </header>

      {/* Sub-Navigation Tabs */}
      <div className="bg-white border-b border-slate-150 px-6 py-2.5 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
        {(['dashboard', 'add', 'history', 'map', 'performance', 'settings'] as const).map(tab => {
          const labels = {
            dashboard: '📊 Dashboard',
            add: editId ? '✏️ Editar Viagem' : '➕ Registrar Viagem',
            history: '📂 Histórico',
            map: '🗺️ Mapa & Calculadora',
            performance: '📈 Desempenho',
            settings: '⚙️ Ajustes'
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap border ${
                activeTab === tab
                  ? `${themeBgActive} ${themeBorderActive}`
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header Card / Deduction Summary */}
            <div className="bg-gradient-to-br from-blue-800 to-indigo-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 font-bold text-[180px] pointer-events-none select-none translate-y-16 translate-x-4">
                mi
              </div>
              
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[9px] uppercase font-black text-blue-300 tracking-widest bg-blue-700/40 px-2 py-0.5 rounded-full border border-blue-500/20">
                    Dedução Fiscal Acumulada YTD
                  </span>
                  <p className="text-3xl md:text-4xl font-black tracking-tight mt-1">
                    ${totalDeduction.toFixed(2)}
                  </p>
                  <p className="text-[11px] text-blue-200 mt-0.5 font-bold">
                    {totalTripsCount} viagens de odômetro &middot; {totalMiles} mi totais registradas na taxa de ${rate.toFixed(3)}/mi
                  </p>
                </div>

                {/* Progress bar to Monthly Goal */}
                <div className="space-y-1.5 pt-1 border-t border-blue-700/30">
                  <div className="flex justify-between items-center text-[10px] font-bold text-blue-200">
                    <span>Meta Mensal de Milhagem ({monthlyMileGoal} mi)</span>
                    <span>{goalProgressPct}% completo ({monthMiles.toFixed(0)} mi este mês)</span>
                  </div>
                  <div className="h-2.5 bg-blue-900/50 rounded-full overflow-hidden border border-blue-800/20">
                    <div className="bg-blue-300 h-full rounded-full transition-all duration-500" style={{ width: `${goalProgressPct}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">🗺️</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Milhas Registradas</p>
                  <p className="text-sm font-black text-slate-800">{totalMiles.toFixed(1)} mi</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">💰</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Dedução Gerada</p>
                  <p className="text-sm font-black text-emerald-600">${totalDeduction.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg shrink-0">🚘</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total Viagens</p>
                  <p className="text-sm font-black text-slate-800">{totalTripsCount}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0">📊</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Média de Milhas</p>
                  <p className="text-sm font-black text-slate-800">{avgMilesPerTrip.toFixed(1)} mi/v</p>
                </div>
              </div>
            </div>

            {/* MoM Comparison Card */}
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">📈 Comparativo com o Mês Anterior</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Visão analítica de faturamento fiscal em relação ao mês anterior.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">Este Mês ({new Date().toLocaleString('pt-BR', { month: 'short' })})</span>
                  <span className="text-lg font-black text-slate-800">{monthMiles.toFixed(1)} mi</span>
                  <span className="text-emerald-600 font-extrabold text-[10px] block mt-0.5">Dedução: ${monthDeduction.toFixed(2)}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">Mês Passado</span>
                  <span className="text-lg font-black text-slate-500">{prevMonthMiles.toFixed(1)} mi</span>
                  <span className="text-slate-400 font-extrabold text-[10px] block mt-0.5">Dedução: ${prevMonthDeduction.toFixed(2)}</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl text-xs font-bold text-center ${
                percentChange >= 0 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                  : 'bg-rose-50 text-rose-800 border border-rose-100'
              }`}>
                {percentChange >= 0 
                  ? `⬆️ +${percentChange}% mais milhas percorridas do que no mês anterior!` 
                  : `⬇️ -${Math.abs(percentChange)}% menos milhas percorridas em relação ao mês anterior.`
                }
              </div>
            </div>

            {/* Leaderboard and Recent List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Leaderboard */}
              <div className="lg:col-span-5 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🏆 Milhas por Plataforma</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Milhagem e deduções fiscais geradas por aplicativo.</p>
                </div>
                
                {leaderboard.length === 0 ? (
                  <div className="py-6 text-center text-slate-400 text-xs font-bold">Nenhum dado registrado.</div>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.map((item, idx) => {
                      const pct = Math.round((item.miles / maxLeaderboardMiles) * 100);
                      return (
                        <div key={item.app} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black flex items-center justify-center">
                                {idx + 1}
                              </span>
                              {item.app}
                            </span>
                            <span className="font-black text-slate-900">{item.miles.toFixed(1)} mi</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            <span>{item.count} viagens</span>
                            <span className="text-emerald-600">Dedução: ${item.deduction.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recent Entries */}
              <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🚗 Log de Odômetro Recente</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Últimos registros adicionados ao sistema.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`text-[10px] font-black uppercase ${themeText} hover:underline`}
                  >
                    Ver Tudo &rarr;
                  </button>
                </div>

                <div className="space-y-3 max-h-[320px] overflow-y-auto">
                  {trips.slice(0, 4).map(t => (
                    <div key={t.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between gap-3 hover:bg-slate-100/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
                          🚗
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-slate-900 leading-none">{t.app}</h5>
                          <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase tracking-wide">
                            {t.date} &middot; {t.startMiles} - {t.endMiles} mi
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-slate-900 block">{t.miles.toFixed(1)} mi</span>
                        <span className="text-[9px] text-emerald-600 font-extrabold block">Ded: ${t.deduction.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  {trips.length === 0 && (
                    <div className="py-12 text-center text-slate-400 text-xs font-bold">Nenhum registro de milhagem inserido ainda.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LOG TRIP */}
        {activeTab === 'add' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-6 animate-slide-up">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  {editId ? '✏️ Editar Registro de Milhas' : '🚗 Registrar Novo Percurso de Milhas'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Informe as marcações do seu odômetro para controle tributário e financeiro.</p>
              </div>
              {editId && (
                <button 
                  onClick={() => {
                    setEditId(null);
                    setEditRate(null);
                    setNewTrip({
                      date: new Date().toISOString().slice(0, 10),
                      app: apps[0] || 'Uber',
                      startMiles: '',
                      endMiles: '',
                      purpose: ''
                    });
                  }}
                  className="bg-rose-50 border border-rose-100 text-rose-700 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase hover:bg-rose-100 transition-all"
                >
                  Cancelar Edição
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Data da Viagem</label>
                <input 
                  type="date"
                  value={newTrip.date}
                  onChange={e => setNewTrip(prev => ({ ...prev, date: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Plataforma / Aplicativo</label>
                <select 
                  value={newTrip.app}
                  onChange={e => setNewTrip(prev => ({ ...prev, app: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                >
                  {apps.map(app => <option key={app} value={app}>{app}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Odômetro Inicial (Start Miles)</label>
                <input 
                  type="number"
                  placeholder="Ex: 12050"
                  step="0.1"
                  inputMode="decimal"
                  value={newTrip.startMiles}
                  onChange={e => setNewTrip(prev => ({ ...prev, startMiles: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Odômetro Final (End Miles)</label>
                <input 
                  type="number"
                  placeholder="Ex: 12085"
                  step="0.1"
                  inputMode="decimal"
                  value={newTrip.endMiles}
                  onChange={e => setNewTrip(prev => ({ ...prev, endMiles: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Notas / Propósito da Viagem</label>
              <input 
                type="text"
                placeholder="Ex: corridas Uber na Zona Sul, entrega DoorDash almoço, etc..."
                value={newTrip.purpose}
                onChange={e => setNewTrip(prev => ({ ...prev, purpose: e.target.value }))}
                className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
              />
            </div>

            {/* Live Preview */}
            {(() => {
              const startVal = parseFloat(newTrip.startMiles) || 0;
              const endVal = parseFloat(newTrip.endMiles) || 0;
              const diffMiles = Math.max(0, endVal - startVal);
              const activeRate = editRate !== null ? editRate : rate;
              const computedDedVal = diffMiles * activeRate;

              return (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-4 space-y-3">
                  <span className="text-[9px] uppercase font-black tracking-widest text-blue-400">Live Preview</span>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-semibold text-slate-300">Milhas Percorridas:</p>
                    <p className="text-xl font-black text-blue-400">{diffMiles.toFixed(1)} mi</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700 text-[11px] text-slate-300">
                    <div>
                      💰 Dedução Estimada:{' '}
                      <span className="font-bold text-white">${computedDedVal.toFixed(2)}</span>
                    </div>
                    <div>
                      📈 Taxa IRS Utilizada:{' '}
                      <span className="font-bold text-white">${activeRate.toFixed(3)}/mi</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            <button 
              onClick={handleSaveTrip}
              className={`w-full py-3.5 text-xs font-black uppercase tracking-wider rounded-xl ${themeBgActive} transition-transform active:scale-98`}
            >
              {editId ? '💾 Salvar Alterações' : '💾 Registrar Viagem / Odômetro'}
            </button>
          </div>
        )}

        {/* TAB 3: HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filtering controls */}
            <div className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-wrap gap-4 items-end shadow-xs">
              <div className="flex-1 min-w-[140px] space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">De (Início)</label>
                <input 
                  type="date"
                  value={filterFrom}
                  onChange={e => setFilterFrom(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none"
                />
              </div>
              <div className="flex-1 min-w-[140px] space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Até (Fim)</label>
                <input 
                  type="date"
                  value={filterTo}
                  onChange={e => setFilterTo(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none"
                />
              </div>
              <div className="flex-1 min-w-[140px] space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Filtrar Aplicativo</label>
                <select 
                  value={filterApp}
                  onChange={e => setFilterApp(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none"
                >
                  <option value="">Todas as Plataformas</option>
                  {apps.map(app => <option key={app} value={app}>{app}</option>)}
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={handleExportCSV}
                  className="flex-1 sm:flex-none bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Exportar Planilha
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="flex-1 sm:flex-none bg-blue-50 border border-blue-100 text-blue-700 font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Gerar PDF
                </button>
              </div>
            </div>

            {/* Filtered Summary Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Soma das Milhas</p>
                <p className="text-sm font-black text-blue-400">{filteredMiles.toFixed(1)} mi</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Dedução Estimada</p>
                <p className="text-sm font-black text-emerald-400">${filteredDeduction.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total de Viagens</p>
                <p className="text-sm font-black text-slate-200">{filteredTrips.length}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-150 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">📂 Log Completo do Odômetro</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      <th className="p-4">Data</th>
                      <th className="p-4">Plataforma/Contexto</th>
                      <th className="p-4 text-right">Início (mi)</th>
                      <th className="p-4 text-right">Fim (mi)</th>
                      <th className="p-4 text-right">Milhas Driven</th>
                      <th className="p-4 text-right">Taxa IRS</th>
                      <th className="p-4 text-right">Dedução Fiscal</th>
                      <th className="p-4">Finalidade</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                    {filteredTrips.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-black text-slate-800">{t.date}</td>
                        <td className="p-4">
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide border border-blue-100">
                            {t.app}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono">{t.startMiles}</td>
                        <td className="p-4 text-right font-mono">{t.endMiles}</td>
                        <td className="p-4 text-right font-black text-slate-900">{t.miles.toFixed(1)} mi</td>
                        <td className="p-4 text-right text-slate-400 font-mono">${t.rate.toFixed(3)}</td>
                        <td className="p-4 text-right font-black text-emerald-600">${t.deduction.toFixed(2)}</td>
                        <td className="p-4 italic text-slate-400 text-[11px] max-w-[180px] truncate">
                          "{t.purpose}"
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <button 
                              onClick={() => handleStartEdit(t)}
                              className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="Editar"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTrip(t.id)}
                              className="p-1 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTrips.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-12 text-center text-slate-400 font-bold">Nenhuma viagem registrada neste período.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ROUTE CALCULATOR MAP */}
        {activeTab === 'map' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">🗺️ Planejador de Rotas Inteligente</h3>
              <p className="text-xs text-slate-400 mt-0.5">Use o mapa interativo abaixo para simular deslocamentos rápidos e registrar percursos automaticamente no odômetro fiscal do seu aplicativo!</p>
            </div>
            <FreeMapTracker onAddSimulatedTrip={handleAddTripFromMap} />
          </div>
        )}

        {/* TAB 5: PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-6 animate-fade-in">
            {/* Vehicles deduction benefit */}
            {(() => {
              const totalVehicleExpenses = fixedCosts.gas + fixedCosts.insurance + fixedCosts.maintenance + fixedCosts.other;
              const netBenefit = totalDeduction - totalVehicleExpenses;
              const cpmRatio = totalMiles > 0 ? (totalVehicleExpenses / totalMiles) : 0;

              return (
                <div className="space-y-6">
                  {/* Benefit card */}
                  <div className={`border-l-4 p-5 rounded-2xl shadow-xs bg-white ${netBenefit >= 0 ? 'border-emerald-500' : 'border-rose-500'} space-y-4`}>
                    <div>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${netBenefit >= 0 ? 'bg-emerald-50 border border-emerald-100 text-emerald-700' : 'bg-rose-50 border border-rose-100 text-rose-700'}`}>
                        {netBenefit >= 0 ? 'Benefício Líquido Estimado' : 'Custo maior que Deduções'}
                      </span>
                      <p className={`text-3xl font-black mt-2 tracking-tight ${netBenefit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {netBenefit >= 0 ? `+$${netBenefit.toFixed(2)}` : `-$${Math.abs(netBenefit).toFixed(2)}`}
                      </p>
                      <p className="text-[10.5px] text-slate-400 font-semibold block mt-0.5">
                        Dedução acumulada estimada do IRS subtraída das despesas físicas reais cadastradas do veículo.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-xs font-black text-emerald-600">${totalDeduction.toFixed(0)}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Dedução Acumulada</p>
                      </div>
                      <div>
                        <p className="text-xs font-black text-rose-600">-${totalVehicleExpenses.toFixed(0)}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Despesas Veículo</p>
                      </div>
                    </div>
                  </div>

                  {/* Projections Card */}
                  <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-5 shadow-xs space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300">📊 Projeções de Dedução Anual (YTD)</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                        <span className="text-[9px] text-emerald-300 uppercase font-black block">Milhas Anuais Projetadas</span>
                        <span className="text-lg font-black block mt-1">{(totalMiles * 1.5).toFixed(0)} mi</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                        <span className="text-[9px] text-emerald-300 uppercase font-black block">Dedução Anual Projetada</span>
                        <span className="text-lg font-black text-emerald-400 block mt-1">${(totalDeduction * 1.5).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Costs editor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fixed cost list manager */}
                    <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🚗 Despesas Mensais Reais do Veículo</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600">⛽ Combustível (Gas):</span>
                          <input 
                            type="number"
                            className="border border-slate-200 rounded-xl p-1.5 text-xs font-bold w-24 text-right"
                            value={fixedCosts.gas}
                            onChange={e => setFixedCosts(prev => ({ ...prev, gas: Number(e.target.value) || 0 }))}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600">🛡️ Seguro (Insurance):</span>
                          <input 
                            type="number"
                            className="border border-slate-200 rounded-xl p-1.5 text-xs font-bold w-24 text-right"
                            value={fixedCosts.insurance}
                            onChange={e => setFixedCosts(prev => ({ ...prev, insurance: Number(e.target.value) || 0 }))}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600">🔧 Manutenção (Maint):</span>
                          <input 
                            type="number"
                            className="border border-slate-200 rounded-xl p-1.5 text-xs font-bold w-24 text-right"
                            value={fixedCosts.maintenance}
                            onChange={e => setFixedCosts(prev => ({ ...prev, maintenance: Number(e.target.value) || 0 }))}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600">📦 Outros Gastos (Other):</span>
                          <input 
                            type="number"
                            className="border border-slate-200 rounded-xl p-1.5 text-xs font-bold w-24 text-right"
                            value={fixedCosts.other}
                            onChange={e => setFixedCosts(prev => ({ ...prev, other: Number(e.target.value) || 0 }))}
                          />
                        </div>

                        <button 
                          onClick={handleSaveCosts}
                          className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-extrabold uppercase mt-1"
                        >
                          💾 Salvar Custos Reais
                        </button>
                      </div>
                    </div>

                    {/* Cost ratio / Mile Goal */}
                    <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🎯 Custos e Metas de Milhas</h4>
                      
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Custo Real por Milha (CPM)</p>
                            <p className="text-xs text-slate-500 mt-0.5">Seus gastos reais divididos pelas milhas.</p>
                          </div>
                          <span className="text-sm font-black text-slate-800">${cpmRatio.toFixed(3)}/mi</span>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Meta de Milhas Mensal (mi)</label>
                          <input 
                            type="number"
                            placeholder="Ex: 1000"
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                            value={monthlyMileGoal}
                            onChange={e => setMonthlyMileGoal(Number(e.target.value) || 0)}
                          />
                        </div>

                        <button 
                          onClick={handleSaveGoal}
                          className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-extrabold uppercase"
                        >
                          💾 Salvar Meta de Milhas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            {/* IRS Standard Mileage Rate */}
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">📈 Configurar Taxa Fiscal de Dedução</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Atualize a taxa oficial estipulada pela Receita Federal (IRS) para faturamento de deduções fiscais.</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-black text-xs">$</span>
                <input 
                  type="number"
                  step="0.001"
                  className="border border-slate-200 rounded-xl p-2 text-xs font-bold w-24 text-center outline-none"
                  value={rate}
                  onChange={e => setRate(Number(e.target.value) || 0)}
                />
                <span className="text-slate-400 text-[11px] font-bold">por milha (/mi)</span>
                <button 
                  onClick={handleSaveRate}
                  className="bg-slate-900 text-white font-extrabold text-[10.5px] px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Salvar Nova Taxa
                </button>
              </div>
            </div>

            {/* Platform Apps List Manager */}
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🛠️ Plataformas de Trabalho Ativas</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Gerencie os aplicativos e contextos disponíveis para seleção no odômetro.</p>
              </div>

              <div className="flex gap-2 max-w-md">
                <input 
                  type="text"
                  placeholder="Ex: Spark Driver, Shipt..."
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  value={newAppInput}
                  onChange={e => setNewAppInput(e.target.value)}
                />
                <button 
                  onClick={handleAddApp}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  + Adicionar Plataforma
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {apps.map(app => (
                  <div key={app} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex justify-between items-center hover:border-slate-200 transition-colors">
                    <span className="text-xs font-bold text-slate-700">{app}</span>
                    <button 
                      onClick={() => handleRemoveApp(app)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
