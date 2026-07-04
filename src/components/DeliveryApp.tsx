/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Truck, Calendar, Plus, Trash2, ArrowLeft, Info, HelpCircle, DollarSign,
  TrendingUp, Download, PieChart, Database, MapPin, Edit3, CheckCircle, AlertTriangle, Clock, Settings, Briefcase, PlusCircle
} from 'lucide-react';
import { User, Batch, Trip } from '../types';

interface DeliveryAppProps {
  user: User;
  onBack: () => void;
}

interface DeliveryExpense {
  id: string;
  date: string;
  category: 'Fuel' | 'Insurance' | 'Maintenance' | 'Phone' | 'Other';
  amount: number;
  notes: string;
}

export default function DeliveryApp({ user, onBack }: DeliveryAppProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'history' | 'expenses' | 'performance' | 'settings'>('dashboard');
  
  // Storage states
  const [batches, setBatches] = useState<Batch[]>([]);
  const [expenses, setExpenses] = useState<DeliveryExpense[]>([]);
  const [stores, setStores] = useState<string[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1000);
  const [monthlyGoal, setMonthlyGoal] = useState<number>(4000);
  const [mileageCostRate, setMileageCostRate] = useState<number>(0.67);

  // Form states
  const [newBatch, setNewBatch] = useState({
    date: new Date().toISOString().slice(0, 10),
    store: 'DoorDash',
    basePay: '',
    tips: '',
    miles: '',
    orders: '',
    timeStart: '',
    timeEnd: '',
    notes: ''
  });

  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: 'Fuel' as const,
    amount: '',
    notes: ''
  });

  const [newStoreInput, setNewStoreInput] = useState('');
  
  // Editing state
  const [editId, setEditId] = useState<string | null>(null);

  // Filter states
  const [filterFrom, setFilterFrom] = useState(() => {
    const d = new Date();
    d.setDate(1); // first day of month
    return d.toISOString().slice(0, 10);
  });
  const [filterTo, setFilterTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [filterStore, setFilterStore] = useState('');

  // Cross-module Mileage Prompt State
  const [pendingMileageLog, setPendingMileageLog] = useState<{
    date: string;
    store: string;
    miles: number;
  } | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    // Batches
    const savedBatches = localStorage.getItem('bgrowth_delivery_batches');
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches));
    } else {
      const initial: Batch[] = [
        { id: 'b_1', date: new Date().toISOString().slice(0, 10), store: 'DoorDash', basePay: 22.50, tips: 18.00, miles: 12, orders: 3, notes: 'Quick dinner rush deliveries' },
        { id: 'b_2', date: new Date().toISOString().slice(0, 10), store: 'Instacart', basePay: 35.00, tips: 24.50, miles: 18, orders: 2, notes: 'Double batch grocery run' },
        { id: 'b_3', date: '2026-06-26', store: 'Amazon Flex', basePay: 74.00, tips: 0.00, miles: 45, orders: 1, notes: 'Midday delivery block' }
      ];
      setBatches(initial);
      localStorage.setItem('bgrowth_delivery_batches', JSON.stringify(initial));
    }

    // Expenses
    const savedExpenses = localStorage.getItem('bgrowth_delivery_expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      const initialExp: DeliveryExpense[] = [
        { id: 'e_1', date: new Date().toISOString().slice(0, 10), category: 'Fuel', amount: 25.00, notes: 'Gas filling' },
        { id: 'e_2', date: '2026-06-25', category: 'Maintenance', amount: 45.00, notes: 'Oil change share' }
      ];
      setExpenses(initialExp);
      localStorage.setItem('bgrowth_delivery_expenses', JSON.stringify(initialExp));
    }

    // Stores
    const savedStores = localStorage.getItem('bgrowth_delivery_stores');
    if (savedStores) {
      setStores(JSON.parse(savedStores));
    } else {
      const initialStores = ['DoorDash', 'Instacart', 'Amazon Flex', 'Uber Eats', 'Grubhub', 'Cleaning Service', 'Other'];
      setStores(initialStores);
      localStorage.setItem('bgrowth_delivery_stores', JSON.stringify(initialStores));
    }

    // Settings
    const savedWGoal = localStorage.getItem('bgrowth_delivery_weekly_goal');
    if (savedWGoal) setWeeklyGoal(Number(savedWGoal));
    const savedMGoal = localStorage.getItem('bgrowth_delivery_monthly_goal');
    if (savedMGoal) setMonthlyGoal(Number(savedMGoal));
    const savedRate = localStorage.getItem('bgrowth_delivery_mileage_cost');
    if (savedRate) setMileageCostRate(Number(savedRate));
  }, []);

  // Helper to persist state updates
  const saveBatchesList = (list: Batch[]) => {
    setBatches(list);
    localStorage.setItem('bgrowth_delivery_batches', JSON.stringify(list));
  };

  const saveExpensesList = (list: DeliveryExpense[]) => {
    setExpenses(list);
    localStorage.setItem('bgrowth_delivery_expenses', JSON.stringify(list));
  };

  const saveStoresList = (list: string[]) => {
    setStores(list);
    localStorage.setItem('bgrowth_delivery_stores', JSON.stringify(list));
  };

  // Live preview helpers
  const basePayNum = parseFloat(newBatch.basePay) || 0;
  const tipsNum = parseFloat(newBatch.tips) || 0;
  const milesNum = parseFloat(newBatch.miles) || 0;
  const totalPayNum = basePayNum + tipsNum;

  const getHourlyRate = () => {
    if (newBatch.timeStart && newBatch.timeEnd && totalPayNum > 0) {
      const [sh, sm] = newBatch.timeStart.split(':').map(Number);
      const [eh, em] = newBatch.timeEnd.split(':').map(Number);
      let mins = (eh * 60 + em) - (sh * 60 + sm);
      if (mins < 0) mins += 1440; // overnight split
      if (mins > 0) return (totalPayNum / (mins / 60));
    }
    return 0;
  };

  // Calculations for KPI
  const currentMonthStr = new Date().toISOString().slice(0, 7); // YYYY-MM
  const currentWeekNum = getWeekNumber(new Date());

  const totalEarned = batches.reduce((s, b) => s + b.basePay + b.tips, 0);
  const totalBasePay = batches.reduce((s, b) => s + b.basePay, 0);
  const totalTips = batches.reduce((s, b) => s + b.tips, 0);
  const totalMiles = batches.reduce((s, b) => s + b.miles, 0);
  const totalBatchesCount = batches.length;

  const monthBatches = batches.filter(b => b.date.startsWith(currentMonthStr));
  const monthEarned = monthBatches.reduce((s, b) => s + b.basePay + b.tips, 0);
  const monthTips = monthBatches.reduce((s, b) => s + b.tips, 0);
  const monthBatchesCount = monthBatches.length;

  const weekBatches = batches.filter(b => getWeekNumber(new Date(b.date)) === currentWeekNum);
  const weekEarned = weekBatches.reduce((s, b) => s + b.basePay + b.tips, 0);
  const weekTips = weekBatches.reduce((s, b) => s + b.tips, 0);
  const weekBatchesCount = weekBatches.length;

  // Monthly Goal Completion percentage
  const goalPercent = monthlyGoal > 0 ? Math.min(100, Math.round((monthEarned / monthlyGoal) * 100)) : 0;

  // Store Leaderboard
  const storeStats = batches.reduce((acc, b) => {
    if (!acc[b.store]) acc[b.store] = { earned: 0, count: 0 };
    acc[b.store].earned += b.basePay + b.tips;
    acc[b.store].count += 1;
    return acc;
  }, {} as Record<string, { earned: number; count: number }>);

  const leaderboard = (Object.entries(storeStats) as [string, { earned: number; count: number }][])
    .map(([store, stats]) => ({ store, earned: stats.earned, count: stats.count }))
    .sort((a, b) => b.earned - a.earned)
    .slice(0, 5);

  const maxLeaderboardEarned = leaderboard.length > 0 ? Math.max(...leaderboard.map(l => l.earned)) : 1;

  // Actions
  const handleSaveBatch = () => {
    if (!newBatch.basePay && !newBatch.tips) {
      alert('Por favor, informe o Pagamento Base (Base Pay) ou a Gorjeta (Tips).');
      return;
    }

    const batchData: Batch = {
      id: editId || 'b_' + Date.now(),
      date: newBatch.date,
      store: newBatch.store,
      basePay: Number(newBatch.basePay) || 0,
      tips: Number(newBatch.tips) || 0,
      miles: Number(newBatch.miles) || 0,
      orders: Number(newBatch.orders) || 1,
      notes: newBatch.notes || 'Batch de Delivery'
    };

    if (editId) {
      saveBatchesList(batches.map(b => b.id === editId ? batchData : b));
      setEditId(null);
      alert('Lote de delivery atualizado com sucesso!');
    } else {
      saveBatchesList([batchData, ...batches]);
      
      // Trigger Mileage Cross-Module Synchronization Prompt if miles > 0
      if (batchData.miles > 0) {
        setPendingMileageLog({
          date: batchData.date,
          store: batchData.store,
          miles: batchData.miles
        });
      } else {
        alert('Lote de delivery registrado com sucesso!');
      }
    }

    // Reset Form
    setNewBatch({
      date: new Date().toISOString().slice(0, 10),
      store: stores[0] || 'DoorDash',
      basePay: '',
      tips: '',
      miles: '',
      orders: '',
      timeStart: '',
      timeEnd: '',
      notes: ''
    });
    setActiveTab('dashboard');
  };

  const handleStartEdit = (b: Batch) => {
    setEditId(b.id);
    setNewBatch({
      date: b.date,
      store: b.store,
      basePay: b.basePay.toString(),
      tips: b.tips.toString(),
      miles: b.miles.toString(),
      orders: b.orders.toString(),
      timeStart: '',
      timeEnd: '',
      notes: b.notes
    });
    setActiveTab('add');
  };

  const handleDeleteBatch = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir este lote de delivery?')) {
      saveBatchesList(batches.filter(b => b.id !== id));
    }
  };

  // Cross-Module mileage sync trigger
  const handleSyncMileage = () => {
    if (!pendingMileageLog) return;

    // Get current mileage trips from localStorage
    const savedTrips = localStorage.getItem('bgrowth_mileage_trips');
    let tripsList: Trip[] = [];
    if (savedTrips) {
      tripsList = JSON.parse(savedTrips);
    } else {
      tripsList = [
        { id: 't_1', date: new Date().toISOString().slice(0, 10), app: 'Uber', startMiles: 12050, endMiles: 12085, miles: 35, rate: 0.725, deduction: 25.38, purpose: 'Passenger dropoffs' }
      ];
    }

    const lastEndMiles = tripsList.length > 0 ? Math.max(...tripsList.map(t => t.endMiles)) : 12110;
    const irsRate = 0.725;
    const syncTrip: Trip = {
      id: 't_sync_' + Date.now(),
      date: pendingMileageLog.date,
      app: pendingMileageLog.store,
      startMiles: lastEndMiles,
      endMiles: lastEndMiles + pendingMileageLog.miles,
      miles: pendingMileageLog.miles,
      rate: irsRate,
      deduction: Number((pendingMileageLog.miles * irsRate).toFixed(2)),
      purpose: `Sincronizado: Delivery - ${pendingMileageLog.store}`
    };

    const updatedTrips = [syncTrip, ...tripsList];
    localStorage.setItem('bgrowth_mileage_trips', JSON.stringify(updatedTrips));
    
    // Alert the user
    alert(`🎉 Sucesso! Registramos ${pendingMileageLog.miles} milhas no seu Rastreador de Milhas para o dia ${pendingMileageLog.date} (${pendingMileageLog.store}). Dedução fiscal estimada: $${syncTrip.deduction.toFixed(2)}.`);
    
    // Clear pending trigger
    setPendingMileageLog(null);
  };

  // Expense addition
  const handleAddExpense = () => {
    if (!newExpense.amount) {
      alert('Por favor, informe o valor da despespa.');
      return;
    }

    const expenseData: DeliveryExpense = {
      id: 'e_' + Date.now(),
      date: newExpense.date,
      category: newExpense.category,
      amount: Number(newExpense.amount) || 0,
      notes: newExpense.notes || ''
    };

    saveExpensesList([expenseData, ...expenses]);
    setNewExpense({
      date: new Date().toISOString().slice(0, 10),
      category: 'Fuel',
      amount: '',
      notes: ''
    });
    alert('Despesa de delivery adicionada!');
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Deseja excluir esta despesa?')) {
      saveExpensesList(expenses.filter(e => e.id !== id));
    }
  };

  // Custom Stores
  const handleAddStore = () => {
    if (!newStoreInput.trim()) return;
    if (stores.includes(newStoreInput.trim())) {
      alert('Este aplicativo já está cadastrado!');
      return;
    }
    saveStoresList([...stores, newStoreInput.trim()]);
    setNewStoreInput('');
    alert('Aplicativo adicionado com sucesso!');
  };

  const handleRemoveStore = (name: string) => {
    if (confirm(`Remover "${name}" da lista?`)) {
      saveStoresList(stores.filter(s => s !== name));
    }
  };

  const handleSaveGoals = () => {
    localStorage.setItem('bgrowth_delivery_weekly_goal', weeklyGoal.toString());
    localStorage.setItem('bgrowth_delivery_monthly_goal', monthlyGoal.toString());
    alert('Metas de faturamento salvas com sucesso!');
  };

  const handleSaveMileageCostRate = () => {
    localStorage.setItem('bgrowth_delivery_mileage_cost', mileageCostRate.toString());
    alert('Taxa de custo de quilometragem salva!');
  };

  // Filtering list
  const filteredBatches = batches.filter(b => {
    const isWithinDate = b.date >= filterFrom && b.date <= filterTo;
    const isMatchingStore = !filterStore || b.store === filterStore;
    return isWithinDate && isMatchingStore;
  });

  const filteredEarned = filteredBatches.reduce((s, b) => s + b.basePay + b.tips, 0);
  const filteredTips = filteredBatches.reduce((s, b) => s + b.tips, 0);

  // Excel/CSV download helper
  const handleExportCSV = () => {
    const headers = ['Data', 'Plataforma/Store', 'Pagamento Base ($)', 'Gorjeta/Tips ($)', 'Total Ganho ($)', 'Milhas Rodadas', 'Entregas', 'Notas'];
    const rows = filteredBatches.map(b => [
      b.date,
      b.store,
      b.basePay.toFixed(2),
      b.tips.toFixed(2),
      (b.basePay + b.tips).toFixed(2),
      b.miles.toString(),
      b.orders.toString(),
      b.notes
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BGrowth_Delivery_Report_${filterFrom}_to_${filterTo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF / Print Report Helper
  const handleExportPDF = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    const htmlContent = `
      <html>
        <head>
          <title>BGrowth Delivery - Relatório Financeiro</title>
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
            .kpi-val { font-size: 16px; font-weight: bold; color: #059669; margin-top: 2px; }
          </style>
        </head>
        <body>
          <h1>Relatório de Ganhos - BGrowth Delivery</h1>
          <p>Período selecionado: de <b>${filterFrom}</b> até <b>${filterTo}</b> &middot; Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-lbl">Total Ganho no Período</div>
              <div class="kpi-val">$${filteredEarned.toFixed(2)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-lbl">Total de Gorjetas (Tips)</div>
              <div class="kpi-val" style="color: #2563eb">$${filteredTips.toFixed(2)}</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-lbl">Lotes Completados</div>
              <div class="kpi-val" style="color: #1e293b">${filteredBatches.length}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Plataforma/App</th>
                <th class="text-right">Pagamento Base</th>
                <th class="text-right">Gorjeta (Tips)</th>
                <th class="text-right">Total</th>
                <th class="text-right">Milhas</th>
                <th class="text-right">Pedidos</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              ${filteredBatches.map(b => `
                <tr>
                  <td>${b.date}</td>
                  <td><b>${b.store}</b></td>
                  <td class="text-right">$${b.basePay.toFixed(2)}</td>
                  <td class="text-right" style="color: #2563eb">$${b.tips.toFixed(2)}</td>
                  <td class="text-right"><b>$${(b.basePay + b.tips).toFixed(2)}</b></td>
                  <td class="text-right">${b.miles} mi</td>
                  <td class="text-right">${b.orders}</td>
                  <td style="color: #64748b; font-style: italic;">"${b.notes || ''}"</td>
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
      
      {/* Simulation Info Banner */}
      <div className="bg-amber-500 text-slate-900 text-center text-[10.5px] font-extrabold py-1.5 px-4 flex items-center justify-center gap-2 shadow-xs">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>Planilha ativa: <b>"Delivery_Batches"</b> integrada em tempo real.</span>
      </div>

      {/* Floating Cross-Module Mileage Log Prompt */}
      {pendingMileageLog && (
        <div className="mx-4 mt-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 rounded-2xl shadow-xl space-y-3 animate-slide-up border border-indigo-600">
          <div className="flex items-start gap-3">
            <div className="text-xl bg-white/10 p-2 rounded-xl">🚗</div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider">Registrar no Rastreador de Milhas (Mileage Tracker)?</h4>
              <p className="text-[11px] text-indigo-100 mt-1 leading-relaxed">
                Você acabou de salvar um lote de delivery com <b>{pendingMileageLog.miles} milhas</b> rodadas. Deseja adicionar esta viagem automaticamente no aplicativo Mileage Tracker para garantir sua dedução fiscal de <b>${(pendingMileageLog.miles * 0.725).toFixed(2)}</b>?
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button 
              onClick={() => setPendingMileageLog(null)}
              className="text-[10px] uppercase font-black text-white/70 hover:text-white px-3 py-1.5 rounded-lg border border-white/20"
            >
              Não, obrigado
            </button>
            <button 
              onClick={handleSyncMileage}
              className="text-[10px] uppercase font-black bg-white text-indigo-800 hover:bg-indigo-50 px-3.5 py-1.5 rounded-lg shadow-md"
            >
              Sim, registrar milhas!
            </button>
          </div>
        </div>
      )}

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
              <Truck className={`w-5 h-5 ${themeText}`} />
              <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase">
                {user.companyName ? `${user.companyName} Delivery` : 'BGrowth Delivery'}
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Business Suite Module</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
            Hoje: ${monthBatches.filter(b => b.date === new Date().toISOString().slice(0, 10)).reduce((s,b)=>s+b.basePay+b.tips, 0).toFixed(2)}
          </div>
          <button 
            onClick={() => { setActiveTab('add'); setEditId(null); }}
            className={`${themeBgActive} font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all`}
          >
            <Plus className="w-3.5 h-3.5" /> Novo Lote
          </button>
        </div>
      </header>

      {/* Sub-Navigation Tabs */}
      <div className="bg-white border-b border-slate-150 px-6 py-2.5 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
        {(['dashboard', 'add', 'history', 'expenses', 'performance', 'settings'] as const).map(tab => {
          const labels = {
            dashboard: '📊 Dashboard',
            add: editId ? '✏️ Editar Lote' : '➕ Novo Lote',
            history: '📂 Histórico',
            expenses: '💳 Despesas',
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
            {/* Header Card / Earned Summary */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 font-bold text-[180px] pointer-events-none select-none translate-y-16 translate-x-4">
                $
              </div>
              
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[9px] uppercase font-black text-emerald-300 tracking-widest bg-emerald-700/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Faturamento Consolidado
                  </span>
                  <p className="text-3xl md:text-4xl font-black tracking-tight mt-1">
                    ${totalEarned.toFixed(2)}
                  </p>
                  <p className="text-[11px] text-emerald-200 mt-0.5 font-bold">
                    {totalBatchesCount} lotes de entrega &middot; ${totalTips.toFixed(2)} em gorjetas recebidas
                  </p>
                </div>

                {/* Progress bar to Monthly Goal */}
                <div className="space-y-1.5 pt-1 border-t border-emerald-700/30">
                  <div className="flex justify-between items-center text-[10px] font-bold text-emerald-200">
                    <span>Meta Mensal de Delivery (${monthlyGoal})</span>
                    <span>{goalPercent}% completo (${monthEarned.toFixed(0)} este mês)</span>
                  </div>
                  <div className="h-2.5 bg-emerald-900/50 rounded-full overflow-hidden border border-emerald-800/20">
                    <div className="bg-emerald-300 h-full rounded-full transition-all duration-500" style={{ width: `${goalPercent}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">💵</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Base Pay</p>
                  <p className="text-sm font-black text-slate-800">${totalBasePay.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">🎁</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Gorjetas</p>
                  <p className="text-sm font-black text-emerald-600">${totalTips.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0">🛣️</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Milhas Rodadas</p>
                  <p className="text-sm font-black text-slate-800">{totalMiles} mi</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">📦</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total Lotes</p>
                  <p className="text-sm font-black text-slate-800">{totalBatchesCount}</p>
                </div>
              </div>
            </div>

            {/* Quick stats for Week & Month split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">📅 Ganhos Desta Semana</h4>
                  <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full uppercase">Week #{currentWeekNum}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm font-black text-slate-800">${weekEarned.toFixed(2)}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Faturamento</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-600">${weekTips.toFixed(2)}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Tips</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-indigo-600">{weekBatchesCount}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Lotes</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-150 rounded-2xl p-4 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">🗓️ Ganhos Deste Mês</h4>
                  <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full uppercase">{new Date().toLocaleString('pt-BR', { month: 'long' })}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm font-black text-slate-800">${monthEarned.toFixed(2)}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Faturamento</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-600">${monthTips.toFixed(2)}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Tips</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-indigo-600">{monthBatchesCount}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Lotes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* App/Store Leaderboard & Recent entries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Leaderboard */}
              <div className="lg:col-span-5 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🏆 Ranking por Aplicativo</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Sua performance dividida por plataforma de entrega.</p>
                </div>
                
                {leaderboard.length === 0 ? (
                  <div className="py-6 text-center text-slate-400 text-xs font-bold">Nenhum dado registrado.</div>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.map((item, idx) => {
                      const pct = Math.round((item.earned / maxLeaderboardEarned) * 100);
                      return (
                        <div key={item.store} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black flex items-center justify-center">
                                {idx + 1}
                              </span>
                              {item.store}
                            </span>
                            <span className="font-black text-slate-900">${item.earned.toFixed(2)}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{item.count} entregas efetuadas</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recent entries */}
              <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🚚 Lotes Recentes</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Últimos registros enviados ao ecossistema.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`text-[10px] font-black uppercase ${themeText} hover:underline`}
                  >
                    Ver Tudo &rarr;
                  </button>
                </div>

                <div className="space-y-3 max-h-[320px] overflow-y-auto">
                  {batches.slice(0, 4).map(b => (
                    <div key={b.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between gap-3 hover:bg-slate-100/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 font-bold text-sm flex items-center justify-center shrink-0">
                          📦
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-slate-900 leading-none">{b.store}</h5>
                          <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase tracking-wide">
                            {b.date} &middot; {b.orders} entregas {b.miles > 0 ? `&middot; ${b.miles} mi` : ''}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-slate-900 block">${(b.basePay + b.tips).toFixed(2)}</span>
                        {b.tips > 0 && (
                          <span className="text-[9px] text-emerald-600 font-extrabold block">Tip: ${b.tips.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {batches.length === 0 && (
                    <div className="py-12 text-center text-slate-400 text-xs font-bold">Nenhum lote registrado. Clique em "Novo Lote" acima para começar!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ADD / EDIT BATCH */}
        {activeTab === 'add' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-6 animate-slide-up">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  {editId ? '✏️ Editar Lote de Delivery' : '📦 Registrar Novo Lote de Delivery'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Informe as finanças, milhas e detalhes do seu turno de trabalho.</p>
              </div>
              {editId && (
                <button 
                  onClick={() => {
                    setEditId(null);
                    setNewBatch({
                      date: new Date().toISOString().slice(0, 10),
                      store: stores[0] || 'DoorDash',
                      basePay: '',
                      tips: '',
                      miles: '',
                      orders: '',
                      timeStart: '',
                      timeEnd: '',
                      notes: ''
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Data do Turno</label>
                <input 
                  type="date"
                  value={newBatch.date}
                  onChange={e => setNewBatch(prev => ({ ...prev, date: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Plataforma / Aplicativo</label>
                <select 
                  value={newBatch.store}
                  onChange={e => setNewBatch(prev => ({ ...prev, store: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                >
                  {stores.map(store => <option key={store} value={store}>{store}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Pagamento Base ($ Base Pay)</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  inputMode="decimal"
                  value={newBatch.basePay}
                  onChange={e => setNewBatch(prev => ({ ...prev, basePay: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Gorjeta Recebida ($ Tips)</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  inputMode="decimal"
                  value={newBatch.tips}
                  onChange={e => setNewBatch(prev => ({ ...prev, tips: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Milhas Rodadas (Miles Driven)</label>
                <input 
                  type="number"
                  placeholder="0.0"
                  step="0.1"
                  inputMode="decimal"
                  value={newBatch.miles}
                  onChange={e => setNewBatch(prev => ({ ...prev, miles: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Quantidade de Pedidos/Deliveries</label>
                <input 
                  type="number"
                  placeholder="Ex: 3"
                  step="1"
                  inputMode="numeric"
                  value={newBatch.orders}
                  onChange={e => setNewBatch(prev => ({ ...prev, orders: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Horário de Início (Opcional)</label>
                <input 
                  type="time"
                  value={newBatch.timeStart}
                  onChange={e => setNewBatch(prev => ({ ...prev, timeStart: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Horário de Fim (Opcional)</label>
                <input 
                  type="time"
                  value={newBatch.timeEnd}
                  onChange={e => setNewBatch(prev => ({ ...prev, timeEnd: e.target.value }))}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Notas / Observações</label>
              <input 
                type="text"
                placeholder="Ex: chuva intensa, trânsito pesado, rota de supermercado..."
                value={newBatch.notes}
                onChange={e => setNewBatch(prev => ({ ...prev, notes: e.target.value }))}
                className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none ${themeFocus}`}
              />
            </div>

            {/* Batch Live Interactive Preview */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-4 space-y-3">
              <span className="text-[9px] uppercase font-black tracking-widest text-emerald-400">Live Preview</span>
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-semibold text-slate-300">Total do Lote Estimado:</p>
                <p className="text-xl font-black text-emerald-400">${totalPayNum.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700 text-[11px] text-slate-300">
                <div>
                  💡 Proporção de Gorjeta:{' '}
                  <span className="font-bold text-white">
                    {totalPayNum > 0 ? `${Math.round((tipsNum / totalPayNum) * 100)}%` : '0%'}
                  </span>
                </div>
                <div>
                  ⏱️ Ganho/Hora Estimado:{' '}
                  <span className="font-bold text-white">
                    {getHourlyRate() > 0 ? `$${getHourlyRate().toFixed(2)}/h` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSaveBatch}
              className={`w-full py-3.5 text-xs font-black uppercase tracking-wider rounded-xl ${themeBgActive} transition-transform active:scale-98`}
            >
              {editId ? '💾 Salvar Alterações' : '💾 Registrar Lote de Delivery'}
            </button>
          </div>
        )}

        {/* TAB 3: HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter controls */}
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
                  value={filterStore}
                  onChange={e => setFilterStore(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none"
                >
                  <option value="">Todos os Aplicativos</option>
                  {stores.map(store => <option key={store} value={store}>{store}</option>)}
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
                  <PlusCircle className="w-4 h-4" /> Gerar PDF
                </button>
              </div>
            </div>

            {/* Filtered stats summary card */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Soma dos Ganhos</p>
                <p className="text-sm font-black text-emerald-400">${filteredEarned.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Soma das Gorjetas</p>
                <p className="text-sm font-black text-blue-400">${filteredTips.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total de Lotes</p>
                <p className="text-sm font-black text-slate-200">{filteredBatches.length}</p>
              </div>
            </div>

            {/* List Table Card */}
            <div className="bg-white border border-slate-150 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">📂 Log Completo de Atividade</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      <th className="p-4">Data</th>
                      <th className="p-4">Aplicativo</th>
                      <th className="p-4 text-right">Base Pay</th>
                      <th className="p-4 text-right">Tips</th>
                      <th className="p-4 text-right">Faturamento Total</th>
                      <th className="p-4 text-right">Milhas</th>
                      <th className="p-4 text-right">Entregas</th>
                      <th className="p-4">Notas</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                    {filteredBatches.map(b => {
                      const total = b.basePay + b.tips;
                      return (
                        <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-black text-slate-800">{b.date}</td>
                          <td className="p-4">
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide border border-emerald-100">
                              {b.store}
                            </span>
                          </td>
                          <td className="p-4 text-right font-mono">${b.basePay.toFixed(2)}</td>
                          <td className="p-4 text-right font-mono text-blue-600">${b.tips.toFixed(2)}</td>
                          <td className="p-4 text-right font-black text-slate-900">${total.toFixed(2)}</td>
                          <td className="p-4 text-right text-slate-500 font-mono">{b.miles} mi</td>
                          <td className="p-4 text-right text-slate-800 font-black">{b.orders}</td>
                          <td className="p-4 italic text-slate-400 text-[11px] max-w-[180px] truncate">
                            "{b.notes}"
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button 
                                onClick={() => handleStartEdit(b)}
                                className="p-1 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                title="Editar"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteBatch(b.id)}
                                className="p-1 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredBatches.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-12 text-center text-slate-400 font-bold">Nenhum lote corresponde aos filtros definidos.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPENSES */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Form Column */}
            <div className="lg:col-span-5 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4 h-fit">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">💳 Registrar Despesa</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Monitore os custos com combustível, manutenção, chip e outros.</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Data da Despesa</label>
                  <input 
                    type="date"
                    value={newExpense.date}
                    onChange={e => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Categoria</label>
                  <select 
                    value={newExpense.category}
                    onChange={e => setNewExpense(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  >
                    <option value="Fuel">⛽ Combustível / Gasolina</option>
                    <option value="Maintenance">🔧 Manutenção do Veículo</option>
                    <option value="Insurance">🛡️ Seguro Automotivo</option>
                    <option value="Phone">📱 Plano de Celular / Internet</option>
                    <option value="Other">📦 Outros Gastos</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Valor Despendido ($)</label>
                  <input 
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    inputMode="decimal"
                    value={newExpense.amount}
                    onChange={e => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Notas / Observação</label>
                  <input 
                    type="text"
                    placeholder="Opcional"
                    value={newExpense.notes}
                    onChange={e => setNewExpense(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>

                <button 
                  onClick={handleAddExpense}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-extrabold text-xs uppercase shadow-sm hover:bg-emerald-700 transition-colors mt-2"
                >
                  💰 Adicionar Gasto / Despesa
                </button>
              </div>
            </div>

            {/* Expenses List Column */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">📋 Histórico de Despesas</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Lista consolidada de investimentos e custos fixos.</p>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto">
                {expenses.map(e => (
                  <div key={e.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between gap-3 hover:bg-slate-100/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">
                        {e.category === 'Fuel' ? '⛽' : e.category === 'Maintenance' ? '🔧' : e.category === 'Insurance' ? '🛡️' : e.category === 'Phone' ? '📱' : '📦'}
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 leading-none">
                          {e.category === 'Fuel' ? 'Combustível' : e.category === 'Maintenance' ? 'Manutenção' : e.category === 'Insurance' ? 'Seguro' : e.category === 'Phone' ? 'Celular/Net' : 'Outros'}
                        </h5>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                          {e.date} {e.notes ? `&middot; ${e.notes}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-black text-rose-600">-${e.amount.toFixed(2)}</span>
                      <button 
                        onClick={() => handleDeleteExpense(e.id)}
                        className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors border border-transparent"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {expenses.length === 0 && (
                  <div className="py-12 text-center text-slate-400 text-xs font-bold">Nenhuma despesa adicionada ainda.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-6 animate-fade-in">
            {/* Net profit card */}
            {(() => {
              const totalExpensesAmount = expenses.reduce((s, e) => s + e.amount, 0);
              const computedMileageExp = totalMiles * mileageCostRate;
              const netProfit = totalEarned - totalExpensesAmount - computedMileageExp;

              return (
                <div className={`border-l-4 p-5 rounded-2xl shadow-xs bg-white ${netProfit >= 0 ? 'border-emerald-500' : 'border-rose-500'} space-y-4`}>
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${netProfit >= 0 ? 'bg-emerald-50 border border-emerald-100 text-emerald-700' : 'bg-rose-50 border border-rose-100 text-rose-700'}`}>
                      {netProfit >= 0 ? 'Lucro Líquido YTD Estimado' : 'Aviso: Prejuízo Líquido'}
                    </span>
                    <p className={`text-3xl font-black mt-2 tracking-tight ${netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {netProfit >= 0 ? `+$${netProfit.toFixed(2)}` : `-$${Math.abs(netProfit).toFixed(2)}`}
                    </p>
                    <p className="text-[10.5px] text-slate-400 font-semibold block mt-0.5">
                      Faturamento total minus despesas fixas registradas e depreciação/combustível de milhas (${mileageCostRate.toFixed(2)}/mi).
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-xs font-black text-slate-800">${totalEarned.toFixed(0)}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Faturamento Bruto</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-rose-600">-${totalExpensesAmount.toFixed(0)}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Despesas Diretas</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-amber-600">-${computedMileageExp.toFixed(0)}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Custo de Milhas</p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Quick calculations details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stats benchmarks */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">📊 Indicadores de Faturamento</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Média por Lote (Avg/Batch):</span>
                    <span className="font-black text-slate-800">
                      ${totalBatchesCount > 0 ? (totalEarned / totalBatchesCount).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Taxa de Gorjetas (Tip Rate):</span>
                    <span className="font-black text-emerald-600">
                      {totalEarned > 0 ? `${((totalTips / totalEarned) * 100).toFixed(0)}%` : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Faturamento por Milha (Earned/Mile):</span>
                    <span className="font-black text-slate-800">
                      ${totalMiles > 0 ? (totalEarned / totalMiles).toFixed(2) : '0.00'}/mi
                    </span>
                  </div>
                </div>
              </div>

              {/* Mileage Rate configuration */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🚗 Configurar Custo do Odômetro</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Defina o custo estimado por milha para rodar seu carro. A Receita Federal (IRS) estipula o padrão fiscal de <b>$0.67/mi</b>.
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-black text-xs">$</span>
                  <input 
                    type="number"
                    step="0.01"
                    className="border border-slate-200 rounded-xl p-2 text-xs font-bold w-20 text-center outline-none"
                    value={mileageCostRate}
                    onChange={e => setMileageCostRate(Number(e.target.value) || 0)}
                  />
                  <span className="text-slate-400 text-[11px] font-bold">por milha (/mi)</span>
                  <button 
                    onClick={handleSaveMileageCostRate}
                    className="bg-slate-800 text-white font-extrabold text-[10.5px] px-3.5 py-2 rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    Salvar Taxa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            {/* Apps Store List Manager */}
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🛠️ Aplicativos / Plataformas Ativos</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Gerencie os aplicativos disponíveis para seleção nos turnos de trabalho.</p>
              </div>

              <div className="flex gap-2 max-w-md">
                <input 
                  type="text"
                  placeholder="Ex: Spark Driver, Shipt..."
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  value={newStoreInput}
                  onChange={e => setNewStoreInput(e.target.value)}
                />
                <button 
                  onClick={handleAddStore}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  + Adicionar App
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {stores.map(store => (
                  <div key={store} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex justify-between items-center hover:border-slate-200 transition-colors">
                    <span className="text-xs font-bold text-slate-700">{store}</span>
                    <button 
                      onClick={() => handleRemoveStore(store)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Faturamento Targets Goals */}
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🎯 Definir Metas Financeiras</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Suas metas de faturamento semanal e mensal para visualização no dashboard.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Meta de Ganhos Semanal ($)</label>
                  <input 
                    type="number"
                    value={weeklyGoal}
                    onChange={e => setWeeklyGoal(Number(e.target.value) || 0)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Meta de Ganhos Mensal ($)</label>
                  <input 
                    type="number"
                    value={monthlyGoal}
                    onChange={e => setMonthlyGoal(Number(e.target.value) || 0)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleSaveGoals}
                className="bg-slate-900 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all mt-2"
              >
                💾 Salvar Metas de Faturamento
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Help tool to calculate Week numbers
function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}
