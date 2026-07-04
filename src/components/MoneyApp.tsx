import React, { useState, useEffect } from 'react';
import { 
  User as UserType, 
  Coins, TrendingUp, Briefcase, Calendar, Award, BookOpen, Sparkles, 
  Trash2, Plus, ChevronRight, ChevronLeft, Download, Upload, Clock, 
  CreditCard, Wallet, FileText, CheckCircle2, Percent, ShieldAlert, 
  Languages, Building2, User, ArrowLeft, Lightbulb, Play, Pause, RotateCcw,
  Check, CalendarDays, BarChart3, HelpCircle, Eye, EyeOff
} from 'lucide-react';
import { User as AppUser } from '../types';
import { moneyTranslations } from './MoneyTranslations';
import { 
  Account, Transaction, Budget, Goal, Investment, JourneyMilestone, 
  Lesson, Challenge, Achievement, FinancialDocument, CalendarEvent,
  initialAccounts, initialTransactions, initialBudgets, initialGoals, 
  initialInvestments, initialJourneyMilestones, lessons, initialChallenges, 
  initialAchievements, initialDocuments, initialCalendarEvents
} from './MoneyData';

interface MoneyAppProps {
  user: AppUser;
  onBack: () => void;
}

export default function MoneyApp({ user, onBack }: MoneyAppProps) {
  // Localization & System State
  const [lang, setLang] = useState<'pt' | 'en' | 'es'>('pt');
  const [profileMode, setProfileMode] = useState<'pf' | 'pj'>('pf');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'accounts' | 'transactions' | 'budgets' | 'goals' | 'patrimony' | 'investments' | 'education' | 'journey' | 'calendar' | 'documents' | 'reports'>('dashboard');
  
  // Storage States
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('bgmoney_accounts');
    return saved ? JSON.parse(saved) : initialAccounts;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('bgmoney_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('bgmoney_budgets');
    return saved ? JSON.parse(saved) : initialBudgets;
  });
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('bgmoney_goals');
    return saved ? JSON.parse(saved) : initialGoals;
  });
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem('bgmoney_investments');
    return saved ? JSON.parse(saved) : initialInvestments;
  });
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(() => {
    const saved = localStorage.getItem('bgmoney_milestones');
    return saved ? JSON.parse(saved) : initialJourneyMilestones;
  });
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('bgmoney_challenges');
    return saved ? JSON.parse(saved) : initialChallenges;
  });
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('bgmoney_achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });
  const [documents, setDocuments] = useState<FinancialDocument[]>(() => {
    const saved = localStorage.getItem('bgmoney_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('bgmoney_calendar_events');
    return saved ? JSON.parse(saved) : initialCalendarEvents;
  });

  // UI States
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [searchTx, setSearchTx] = useState('');
  const [filterTxType, setFilterTxType] = useState<'all' | 'income' | 'expense'>('all');
  const [hideBalances, setHideBalances] = useState(false);

  // Form States
  const [newAccName, setNewAccName] = useState('');
  const [newAccType, setNewAccType] = useState<'checking' | 'savings' | 'digital' | 'wallet' | 'joint' | 'card'>('checking');
  const [newAccBalance, setNewAccBalance] = useState('');
  const [newAccLimit, setNewAccLimit] = useState('');

  const [newTxDesc, setNewTxDesc] = useState('');
  const [newTxVal, setNewTxVal] = useState('');
  const [newTxDate, setNewTxDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newTxCat, setNewTxCat] = useState('Mercado');
  const [newTxType, setNewTxType] = useState<'income' | 'expense'>('expense');
  const [newTxAccId, setNewTxAccId] = useState('');

  const [newMsTitle, setNewMsTitle] = useState('');
  const [newMsDate, setNewMsDate] = useState('');
  const [newMsDesc, setNewMsDesc] = useState('');

  // Education Quiz State
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [scorePoints, setScorePoints] = useState(87);

  // Simulator State (Compound Interest)
  const [simPrincipal, setSimPrincipal] = useState(5000);
  const [simMonthly, setSimMonthly] = useState(500);
  const [simRate, setSimRate] = useState(12); // % annual
  const [simYears, setSimYears] = useState(10);

  // Audio simulation state (Podcast)
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(35);

  // Document Drag-drop upload simulation
  const [isDragging, setIsDragging] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocTag, setNewDocTag] = useState('Recibos');

  const t = moneyTranslations[lang];

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('bgmoney_accounts', JSON.stringify(accounts));
  }, [accounts]);
  useEffect(() => {
    localStorage.setItem('bgmoney_transactions', JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem('bgmoney_budgets', JSON.stringify(budgets));
  }, [budgets]);
  useEffect(() => {
    localStorage.setItem('bgmoney_goals', JSON.stringify(goals));
  }, [goals]);
  useEffect(() => {
    localStorage.setItem('bgmoney_investments', JSON.stringify(investments));
  }, [investments]);
  useEffect(() => {
    localStorage.setItem('bgmoney_milestones', JSON.stringify(milestones));
  }, [milestones]);
  useEffect(() => {
    localStorage.setItem('bgmoney_challenges', JSON.stringify(challenges));
  }, [challenges]);
  useEffect(() => {
    localStorage.setItem('bgmoney_achievements', JSON.stringify(achievements));
  }, [achievements]);
  useEffect(() => {
    localStorage.setItem('bgmoney_documents', JSON.stringify(documents));
  }, [documents]);
  useEffect(() => {
    localStorage.setItem('bgmoney_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  // Podcast player simulation interval
  useEffect(() => {
    let interval: any = null;
    if (podcastPlaying) {
      interval = setInterval(() => {
        setPodcastProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [podcastPlaying]);

  // Calculations for Active Profile
  const filteredAccounts = accounts.filter(a => a.profile === profileMode);
  const filteredTransactions = transactions.filter(t => t.profile === profileMode);
  const filteredBudgets = budgets.filter(b => b.profile === profileMode);
  const filteredGoals = goals.filter(g => g.profile === profileMode);
  const filteredInvestments = investments.filter(i => i.profile === profileMode);
  const filteredMilestones = milestones.filter(m => m.profile === profileMode);
  const filteredChallenges = challenges.filter(c => c.profile === profileMode);
  const filteredAchievements = achievements.filter(a => a.profile === profileMode);
  const filteredDocs = documents.filter(d => d.profile === profileMode);
  const filteredCalendar = calendarEvents.filter(e => e.profile === profileMode);

  // Financial calculations
  const totalBalance = filteredAccounts.reduce((sum, acc) => sum + (acc.type === 'card' ? 0 : acc.balance), 0);
  const totalIncomesThisMonth = filteredTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.value, 0);
  const totalExpensesThisMonth = filteredTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.value, 0);
  const savingsThisMonth = totalIncomesThisMonth - totalExpensesThisMonth;

  const totalAssets = filteredAccounts.reduce((sum, acc) => sum + (acc.balance > 0 ? acc.balance : 0), 0) + 
                       filteredInvestments.reduce((sum, inv) => sum + inv.currentValue, 0) +
                       (profileMode === 'pf' ? 350000 : 150000); // Simulated Fixed Property / Goods value for rich interface

  const totalLiabilities = Math.abs(filteredAccounts.reduce((sum, acc) => sum + (acc.balance < 0 ? acc.balance : 0), 0)) +
                           (profileMode === 'pf' ? 45000 : 12000); // Simulated other bank financing

  const netWorthValue = totalAssets - totalLiabilities;

  // Emergency Fund Details (First Goal)
  const emergencyGoal = filteredGoals[0] || { target: 10000, current: 4000 };
  const emergencyFundPercent = Math.min(100, Math.round((emergencyGoal.current / emergencyGoal.target) * 100));

  // Dynamically calculate Financial Health classification
  let healthClassification = t.good;
  let healthColor = 'text-emerald-600 bg-emerald-50 border-emerald-100';
  if (savingsThisMonth < 0) {
    healthClassification = t.critical;
    healthColor = 'text-rose-600 bg-rose-50 border-rose-100';
  } else if (savingsThisMonth < totalIncomesThisMonth * 0.1) {
    healthClassification = t.regular;
    healthColor = 'text-amber-600 bg-amber-50 border-amber-100';
  } else if (savingsThisMonth > totalIncomesThisMonth * 0.3) {
    healthClassification = t.excellent;
    healthColor = 'text-indigo-600 bg-indigo-50 border-indigo-100';
  }

  // Format Currency (Real, Dollar or Euro)
  const formatValue = (val: number) => {
    if (hideBalances) return '••••••';
    const formatter = new Intl.NumberFormat(
      lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US',
      {
        style: 'currency',
        currency: lang === 'pt' ? 'BRL' : lang === 'es' ? 'EUR' : 'USD'
      }
    );
    return formatter.format(val);
  };

  // Actions
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccName.trim() || !newAccBalance) return;
    const balanceNum = parseFloat(newAccBalance);
    const limitNum = parseFloat(newAccLimit) || undefined;
    
    const newAccount: Account = {
      id: `acc_${Date.now()}`,
      name: newAccName,
      type: newAccType,
      balance: newAccType === 'card' ? -Math.abs(balanceNum) : balanceNum,
      limit: limitNum,
      profile: profileMode
    };

    setAccounts(prev => [...prev, newAccount]);
    setShowAddAccount(false);
    setNewAccName('');
    setNewAccBalance('');
    setNewAccLimit('');
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxDesc.trim() || !newTxVal) return;
    const valNum = parseFloat(newTxVal);
    
    const newTransaction: Transaction = {
      id: `tx_${Date.now()}`,
      description: newTxDesc,
      value: valNum,
      date: newTxDate,
      category: newTxCat,
      type: newTxType,
      profile: profileMode,
      accountId: newTxAccId || (filteredAccounts[0]?.id || '')
    };

    // Update the linked account balance
    setAccounts(prev => prev.map(acc => {
      if (acc.id === newTransaction.accountId) {
        if (newTransaction.type === 'income') {
          return { ...acc, balance: acc.balance + valNum };
        } else {
          return { ...acc, balance: acc.balance - valNum };
        }
      }
      return acc;
    }));

    setTransactions(prev => [newTransaction, ...prev]);
    setShowAddTransaction(false);
    setNewTxDesc('');
    setNewTxVal('');
  };

  const handleDeleteTransaction = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (!tx) return;
    
    // Revert account balance
    setAccounts(prev => prev.map(acc => {
      if (acc.id === tx.accountId) {
        if (tx.type === 'income') {
          return { ...acc, balance: acc.balance - tx.value };
        } else {
          return { ...acc, balance: acc.balance + tx.value };
        }
      }
      return acc;
    }));

    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsTitle.trim() || !newMsDate.trim() || !newMsDesc.trim()) return;

    const newMilestone: JourneyMilestone = {
      id: `ms_${Date.now()}`,
      title: newMsTitle,
      date: newMsDate,
      description: newMsDesc,
      profile: profileMode
    };

    setMilestones(prev => [newMilestone, ...prev]);
    setShowAddMilestone(false);
    setNewMsTitle('');
    setNewMsDate('');
    setNewMsDesc('');
  };

  const handleAddGoalContribution = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        return { ...g, current: Math.min(g.target, g.current + amount) };
      }
      return g;
    }));
    // Log as transaction from accounts
    const firstAcc = filteredAccounts[0];
    if (firstAcc) {
      const g = goals.find(gl => gl.id === goalId);
      const newTx: Transaction = {
        id: `tx_contrib_${Date.now()}`,
        description: `Aporte: ${g?.name || 'Metas'}`,
        value: amount,
        date: new Date().toISOString().split('T')[0],
        category: 'Investimentos',
        type: 'expense',
        profile: profileMode,
        accountId: firstAcc.id
      };
      setTransactions(prev => [newTx, ...prev]);
      setAccounts(prev => prev.map(acc => {
        if (acc.id === firstAcc.id) {
          return { ...acc, balance: acc.balance - amount };
        }
        return acc;
      }));
    }
  };

  const handleToggleCalendarEvent = (eventId: string) => {
    setCalendarEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const nextState = !evt.completed;
        // If completed, let's auto record transaction
        if (nextState) {
          const firstAcc = filteredAccounts[0];
          const newTx: Transaction = {
            id: `tx_cal_${Date.now()}`,
            description: `${evt.title} (Agenda)`,
            value: evt.amount,
            date: evt.date,
            category: evt.type === 'subscription' ? 'Assinaturas' : 'Contas',
            type: evt.type === 'income' ? 'income' : 'expense',
            profile: profileMode,
            accountId: firstAcc?.id || ''
          };
          setTransactions(prevTrans => [newTx, ...prevTrans]);
          if (firstAcc) {
            setAccounts(prevAcc => prevAcc.map(a => {
              if (a.id === firstAcc.id) {
                return { ...a, balance: evt.type === 'income' ? a.balance + evt.amount : a.balance - evt.amount };
              }
              return a;
            }));
          }
        }
        return { ...evt, completed: nextState };
      }
      return evt;
    }));
  };

  const handleQuizSubmit = (optionIdx: number) => {
    setSelectedQuizOption(optionIdx);
    const activeLesson = lessons[activeLessonIndex];
    if (optionIdx === activeLesson.quiz.answerIndex) {
      setQuizResult('correct');
      setScorePoints(prev => Math.min(100, prev + 2));
      // Unlock related achievements
      if (activeLessonIndex === 0) {
        setAchievements(prev => prev.map(ach => ach.id === 'pf_ac1' ? { ...ach, unlocked: true } : ach));
      }
    } else {
      setQuizResult('wrong');
    }
  };

  const handleNextLesson = () => {
    setSelectedQuizOption(null);
    setQuizResult(null);
    setActiveLessonIndex(prev => (prev + 1) % lessons.length);
  };

  // Drag & drop mock upload handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const newDoc: FinancialDocument = {
        id: `doc_${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        tag: newDocTag,
        date: new Date().toISOString().split('T')[0],
        profile: profileMode
      };
      setDocuments(prev => [...prev, newDoc]);
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newDoc: FinancialDocument = {
        id: `doc_${Date.now()}`,
        name: newDocName || file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        tag: newDocTag,
        date: new Date().toISOString().split('T')[0],
        profile: profileMode
      };
      setDocuments(prev => [...prev, newDoc]);
      setNewDocName('');
    }
  };

  // Compound Interest Calculation
  const calculateCompoundInterest = () => {
    const r = (simRate / 100) / 12; // monthly rate
    const n = simYears * 12; // total months
    let total = simPrincipal;
    let totalInvested = simPrincipal;

    for (let i = 0; i < n; i++) {
      total = total * (1 + r) + simMonthly;
      totalInvested += simMonthly;
    }

    const totalJuros = total - totalInvested;
    return {
      total: Math.round(total),
      invested: Math.round(totalInvested),
      juros: Math.round(totalJuros)
    };
  };

  const simResult = calculateCompoundInterest();

  return (
    <div className="bg-slate-50 min-h-screen rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col">
      {/* Top Header Controls */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2.5 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl transition-all border border-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-900">{t.title}</span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 rounded-full">
                Personal & Corp v2
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{t.subtitle}</p>
          </div>
        </div>

        {/* Global Controls: Language, Persona Selector, Show/Hide Balance */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Hide/Show balances */}
          <button
            onClick={() => setHideBalances(!hideBalances)}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-slate-100"
            title="Ocultar/Mostrar Saldos"
          >
            {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Profile selector PF / PJ */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => {
                setProfileMode('pf');
                setActiveTab('dashboard');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                profileMode === 'pf' 
                  ? 'bg-white text-indigo-600 shadow-xs font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              {t.personalMode.split(' ')[0]}
            </button>
            <button
              onClick={() => {
                setProfileMode('pj');
                setActiveTab('dashboard');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                profileMode === 'pj' 
                  ? 'bg-white text-indigo-600 shadow-xs font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              {t.businessMode.split(' ')[0]}
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white">
            <Languages className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="text-xs font-extrabold text-slate-600 focus:outline-none cursor-pointer bg-transparent"
            >
              <option value="pt">Português (BR)</option>
              <option value="en">English (US)</option>
              <option value="es">Español (ES)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Module Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-4 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible md:overflow-y-auto whitespace-nowrap md:whitespace-normal">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Coins className="w-4 h-4 shrink-0" />
            {t.dashboard}
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'accounts' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Wallet className="w-4 h-4 shrink-0" />
            {t.accounts}
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'transactions' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4 shrink-0" />
            {t.transactions}
          </button>
          <button
            onClick={() => setActiveTab('budgets')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'budgets' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Percent className="w-4 h-4 shrink-0" />
            {t.budgets}
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'goals' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            {t.goals}
          </button>
          <button
            onClick={() => setActiveTab('patrimony')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'patrimony' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            {t.patrimony}
          </button>
          <button
            onClick={() => setActiveTab('investments')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'investments' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            {t.investments}
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'education' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            {t.education}
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'journey' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            {t.journey}
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'calendar' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            {t.calendar}
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'documents' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            {t.documents}
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all w-auto md:w-full text-left ${
              activeTab === 'reports' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            {t.reports}
          </button>
        </aside>

        {/* Work Area Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Profile specific Header Greeting */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 to-slate-900 p-6 rounded-3xl text-white shadow-lg">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-indigo-500 text-white rounded-md">
                    {profileMode === 'pf' ? t.personalMode : t.businessMode}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black">{t.howIsLife}</h2>
                  <p className="text-indigo-200 text-xs">
                    {lang === 'pt' ? 'Mantenha seus lançamentos atualizados para melhorar sua inteligência patrimonial!' :
                     lang === 'es' ? '¡Mantenga sus transacciones actualizadas para mejorar su inteligencia patrimonial!' :
                     'Keep your logs updated to boost your financial intelligence scores!'}
                  </p>
                </div>
                
                {/* Financial Health rating */}
                <div className={`p-4 rounded-2xl border text-center space-y-1 ${healthColor}`}>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide block text-slate-500">{t.healthLevel}</span>
                  <div className="text-lg font-black">{healthClassification}</div>
                </div>
              </div>

              {/* Main Financial Indicators Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase">
                    <span>{profileMode === 'pf' ? t.availableBalance : t.workingCapital}</span>
                    <Wallet className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-lg md:text-2xl font-black text-slate-900">{formatValue(totalBalance)}</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase">
                    <span>{t.monthlyIncome}</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-lg md:text-2xl font-black text-emerald-600">+{formatValue(totalIncomesThisMonth)}</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase">
                    <span>{t.monthlyExpenses}</span>
                    <TrendingUp className="w-4 h-4 text-rose-500 rotate-180" />
                  </div>
                  <div className="text-lg md:text-2xl font-black text-rose-600">-{formatValue(totalExpensesThisMonth)}</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] font-extrabold uppercase">
                    <span>{t.monthlySavings}</span>
                    <Coins className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className={`text-lg md:text-2xl font-black ${savingsThisMonth >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                    {formatValue(savingsThisMonth)}
                  </div>
                </div>
              </div>

              {/* Net Worth and Emergency Reserve Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Net Worth Score Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wide block">{t.netWorth}</span>
                    <div className="text-2xl md:text-3xl font-black text-slate-900">{formatValue(netWorthValue)}</div>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'pt' ? 'Ativos Totais: ' : lang === 'es' ? 'Activos Totales: ' : 'Total Assets: '}
                      <b className="text-slate-700">{formatValue(totalAssets)}</b> | 
                      {lang === 'pt' ? ' Passivos: ' : lang === 'es' ? ' Pasivos: ' : ' Liabilities: '}
                      <b className="text-rose-600">{formatValue(totalLiabilities)}</b>
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold shrink-0">
                    🏆
                  </div>
                </div>

                {/* Emergency Fund Builder Preview */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wide block">
                        {profileMode === 'pf' ? t.emergencyFund : t.businessReserve}
                      </span>
                      <div className="text-xl font-black text-slate-800">
                        {formatValue(emergencyGoal.current)} <span className="text-xs text-slate-400">/ {formatValue(emergencyGoal.target)}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {emergencyFundPercent}%
                    </span>
                  </div>
                  {/* Progress Line */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${emergencyFundPercent}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                      <span>{t.timeToGoal}: ~{emergencyGoal.estimatedMonths} {t.months}</span>
                      <button 
                        onClick={() => handleAddGoalContribution(emergencyGoal.id, 500)}
                        className="text-indigo-600 hover:text-indigo-800 transition-all cursor-pointer"
                      >
                        + Aportar {formatValue(500)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* BGrowth score block */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left space-y-1 md:border-r md:border-slate-100 md:pr-6">
                  <div className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wide">{t.scoreTitle}</div>
                  <div className="text-4xl font-black text-indigo-600">{scorePoints} <span className="text-xs text-slate-400 font-semibold">/100</span></div>
                  <p className="text-[11px] text-slate-400">{t.scoreDescription}</p>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <p>{t.scoreGood}</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <span className="text-rose-500 font-bold">✗</span>
                    <p>{t.scoreBad}</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs bg-indigo-50 border border-indigo-100/50 p-2.5 rounded-xl text-indigo-800 font-bold">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <p>{t.scoreImprove}</p>
                  </div>
                </div>
              </div>

              {/* Grid with recent transactions & instant educational tips */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent transaction activity */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-800">{t.transactions}</h3>
                    <button 
                      onClick={() => setActiveTab('transactions')}
                      className="text-xs text-indigo-600 font-extrabold hover:underline"
                    >
                      {lang === 'pt' ? 'Ver todas' : lang === 'es' ? 'Ver todas' : 'View all'} →
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                    {filteredTransactions.slice(0, 5).map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-all border border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {tx.type === 'income' ? '+' : '-'}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800">{tx.description}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{tx.category} | {tx.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
                            {tx.type === 'income' ? '+' : '-'}{formatValue(tx.value)}
                          </span>
                        </div>
                      </div>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-xs">{t.noTransactions}</div>
                    )}
                  </div>
                </div>

                {/* Educational instant widget of the day */}
                <div className="bg-indigo-600 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-white/20 rounded-md text-sm">💡</span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-100">BG Insight™</span>
                    </div>
                    <h4 className="text-sm font-black leading-tight">
                      {lang === 'pt' ? 'Você economizou mais este mês. Parabéns!' :
                       lang === 'es' ? 'Has ahorrado más este mes. ¡Felicitaciones!' :
                       'You saved more money this month. Perfect job!'}
                    </h4>
                    <p className="text-indigo-100 text-[11px] leading-relaxed">
                      {lang === 'pt' ? 'Isso acelera sua construção patrimonial. Considere alocar essa economia mensal na trilha de investimentos em renda fixa para obter liquidez diária e segurança.' :
                       lang === 'es' ? 'Esto acelera su construcción patrimonial. Considere asignar este ahorro mensual en inversiones de renta fija para obtener liquidez y seguridad.' :
                       'This speeds up your wealth creation. Consider allocating this monthly savings into secure fixed income holdings to secure yield and daily liquidity.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('education')}
                    className="w-full bg-white text-indigo-700 hover:bg-slate-50 text-xs font-extrabold py-2.5 rounded-xl shadow-xs transition-all"
                  >
                    {lang === 'pt' ? 'Acessar Trilhas de Estudo' : lang === 'es' ? 'Acceder a Rutas de Estudio' : 'Go to Study Paths'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACCOUNTS TAB */}
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">{t.accounts}</h2>
                  <p className="text-xs text-slate-400">{lang === 'pt' ? 'Controle seus saldos e faturas ativas em um único painel.' : 'Manage your active checking accounts and credit cards in one place.'}</p>
                </div>
                <button
                  onClick={() => setShowAddAccount(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-100 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" /> {t.addNewAccount}
                </button>
              </div>

              {/* Interactive add form */}
              {showAddAccount && (
                <form onSubmit={handleAddAccount} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs space-y-4 max-w-md">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">{t.addNewAccount}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.accountName}</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Banco Itaú, Nubank PJ"
                        value={newAccName}
                        onChange={(e) => setNewAccName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.accountType}</label>
                        <select
                          value={newAccType}
                          onChange={(e: any) => setNewAccType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs text-slate-800 cursor-pointer"
                        >
                          <option value="checking">{t.checking}</option>
                          <option value="digital">{t.digital}</option>
                          <option value="savings">{t.savingsAcc}</option>
                          <option value="wallet">{t.wallet}</option>
                          <option value="card">{t.creditCard}</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">
                          {newAccType === 'card' ? t.creditLimit : t.balance}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="0.00"
                          value={newAccBalance}
                          onChange={(e) => setNewAccBalance(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAccount(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold px-3 py-2 rounded-xl"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              )}

              {/* Grid representation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAccounts.map(acc => (
                  <div key={acc.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-100 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-sm">
                          {acc.type === 'card' ? t.creditCard : acc.type === 'wallet' ? t.wallet : t.checking}
                        </span>
                        <h4 className="text-xs font-black text-slate-800">{acc.name}</h4>
                      </div>
                      <span className="text-lg">
                        {acc.type === 'card' ? '💳' : acc.type === 'wallet' ? '💵' : '🏦'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] font-extrabold uppercase">
                        {acc.type === 'card' ? 'Fatura Atual' : 'Saldo em Conta'}
                      </span>
                      <div className={`text-xl font-black ${acc.balance < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                        {formatValue(acc.balance)}
                      </div>
                      {acc.type === 'card' && acc.limit && (
                        <div className="text-[10px] text-slate-400 font-semibold">
                          Limite Utilizado: {Math.round((Math.abs(acc.balance) / acc.limit) * 100)}% de {formatValue(acc.limit)}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-2 border-t border-slate-50">
                      <button
                        onClick={() => {
                          if (confirm('Deseja excluir esta conta?')) {
                            setAccounts(prev => prev.filter(a => a.id !== acc.id));
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 text-[10px] font-bold"
                      >
                        Excluir Conta
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">{t.transactions}</h2>
                  <p className="text-xs text-slate-400">{lang === 'pt' ? 'Controle completo e detalhado de suas entradas e saídas.' : 'Full registry of all ledger entries.'}</p>
                </div>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-3.5 py-2.5 rounded-xl shadow-md shadow-indigo-100 flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" /> {t.addTransaction}
                </button>
              </div>

              {/* Log Transaction Form */}
              {showAddTransaction && (
                <form onSubmit={handleAddTransaction} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs space-y-4 max-w-md">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">{t.addTransaction}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.description}</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Mercado CompreBem, Freelance X"
                        value={newTxDesc}
                        onChange={(e) => setNewTxDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.value}</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="0.00"
                          value={newTxVal}
                          onChange={(e) => setNewTxVal(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.date}</label>
                        <input
                          type="date"
                          required
                          value={newTxDate}
                          onChange={(e) => setNewTxDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs text-slate-800 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.type}</label>
                        <select
                          value={newTxType}
                          onChange={(e: any) => setNewTxType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs text-slate-800 cursor-pointer"
                        >
                          <option value="expense">{t.expense}</option>
                          <option value="income">{t.income}</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.category}</label>
                        <select
                          value={newTxCat}
                          onChange={(e) => setNewTxCat(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs text-slate-800 cursor-pointer"
                        >
                          {profileMode === 'pf' ? (
                            <>
                              <option value="Moradia">Moradia</option>
                              <option value="Mercado">Mercado</option>
                              <option value="Restaurantes">Restaurantes</option>
                              <option value="Lazer">Lazer</option>
                              <option value="Combustível">Combustível</option>
                              <option value="Assinaturas">Assinaturas</option>
                              <option value="Salário">Salário</option>
                              <option value="Freelas">Freelas</option>
                              <option value="Dividendos">Dividendos</option>
                            </>
                          ) : (
                            <>
                              <option value="Clientes">Faturamento Clientes</option>
                              <option value="Equipe/Salários">Equipe e Pro-labore</option>
                              <option value="Marketing">Marketing & Anúncios</option>
                              <option value="Infraestrutura">Infraestrutura Nuvem</option>
                              <option value="Imóvel/Espaço">Aluguel / Coworking</option>
                              <option value="Impostos">Impostos e Taxas</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase">Debitar de / Creditar em</label>
                      <select
                        value={newTxAccId}
                        onChange={(e) => setNewTxAccId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs text-slate-800 cursor-pointer"
                      >
                        <option value="">Selecione a conta...</option>
                        {filteredAccounts.map(a => (
                          <option key={a.id} value={a.id}>{a.name} ({formatValue(a.balance)})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTransaction(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold px-3 py-2 rounded-xl"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              )}

              {/* Transactions list with search and filters */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTx}
                    onChange={(e) => setSearchTx(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 w-full md:w-64"
                  />

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
                    <button
                      onClick={() => setFilterTxType('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterTxType === 'all' ? 'bg-white text-indigo-600 font-black' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {t.all}
                    </button>
                    <button
                      onClick={() => setFilterTxType('income')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterTxType === 'income' ? 'bg-white text-emerald-600 font-black' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {t.income}
                    </button>
                    <button
                      onClick={() => setFilterTxType('expense')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterTxType === 'expense' ? 'bg-white text-rose-600 font-black' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {t.expense}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {filteredTransactions
                    .filter(tx => {
                      const matchesSearch = tx.description.toLowerCase().includes(searchTx.toLowerCase()) || 
                                            tx.category.toLowerCase().includes(searchTx.toLowerCase());
                      const matchesType = filterTxType === 'all' || tx.type === filterTxType;
                      return matchesSearch && matchesType;
                    })
                    .map(tx => {
                      const linkedAcc = accounts.find(a => a.id === tx.accountId);
                      return (
                        <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl border border-slate-50 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">
                              {tx.type === 'income' ? '🟢' : '🔴'}
                            </span>
                            <div>
                              <div className="text-xs font-black text-slate-800">{tx.description}</div>
                              <div className="text-[10px] text-slate-400 font-semibold uppercase">
                                {tx.category} | {linkedAcc?.name || 'Manual Log'} | {tx.date}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-black ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
                              {tx.type === 'income' ? '+' : '-'}{formatValue(tx.value)}
                            </span>
                            <button
                              onClick={() => handleDeleteTransaction(tx.id)}
                              className="p-1 text-slate-300 hover:text-rose-600 transition-all"
                              title="Delete Transaction"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* BUDGETS TAB */}
          {activeTab === 'budgets' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.budgetTitle}</h2>
                <p className="text-xs text-slate-400">{t.budgetSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBudgets.map(b => {
                  const percent = Math.min(100, Math.round((b.spent / b.limit) * 100));
                  let progressBarColor = 'bg-emerald-500';
                  let textColor = 'text-emerald-600';
                  if (percent > 90) {
                    progressBarColor = 'bg-rose-500';
                    textColor = 'text-rose-600';
                  } else if (percent > 75) {
                    progressBarColor = 'bg-amber-500';
                    textColor = 'text-amber-600';
                  }

                  return (
                    <div key={b.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-800">{b.category}</h4>
                        <span className={`text-xs font-bold ${textColor}`}>
                          {percent}%
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${progressBarColor}`} style={{ width: `${percent}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                          <span>{t.spent}: {formatValue(b.spent)}</span>
                          <span>{t.limit}: {formatValue(b.limit)}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-semibold">
                          {t.remaining}: <b className={b.limit - b.spent < 0 ? 'text-rose-600' : 'text-slate-700'}>{formatValue(Math.max(0, b.limit - b.spent))}</b>
                        </span>
                        
                        <button
                          onClick={() => {
                            const newLimStr = prompt(`Defina o novo limite para ${b.category}:`, b.limit.toString());
                            if (newLimStr) {
                              const limNum = parseFloat(newLimStr);
                              if (!isNaN(limNum)) {
                                setBudgets(prev => prev.map(item => item.id === b.id ? { ...item, limit: limNum } : item));
                              }
                            }
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
                        >
                          Ajustar Limite
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GOALS TAB */}
          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.goalsTitle}</h2>
                <p className="text-xs text-slate-400">{t.goalsSubtitle}</p>
              </div>

              {/* Goals list with contributors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGoals.map(g => {
                  const percent = Math.min(100, Math.round((g.current / g.target) * 100));
                  return (
                    <div key={g.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-100 transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-black text-slate-800">{g.name}</h4>
                          <span className="text-[10px] text-slate-400 font-bold">{t.timeToGoal}: ~{g.estimatedMonths} {t.months}</span>
                        </div>
                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">{percent}%</span>
                      </div>

                      <div className="space-y-2">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                          <span>{t.emergencyCurrent}: {formatValue(g.current)}</span>
                          <span>{t.emergencyTarget}: {formatValue(g.target)}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-50 flex items-center justify-between gap-4">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleAddGoalContribution(g.id, 100)}
                            className="bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200 hover:border-indigo-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
                          >
                            +100
                          </button>
                          <button
                            onClick={() => handleAddGoalContribution(g.id, 500)}
                            className="bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200 hover:border-indigo-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
                          >
                            +500
                          </button>
                          <button
                            onClick={() => {
                              const amt = parseFloat(prompt('Digite o valor do aporte:') || '0');
                              if (amt > 0) handleAddGoalContribution(g.id, amt);
                            }}
                            className="bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200 hover:border-indigo-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
                          >
                            Outro
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('Deseja remover esta meta?')) {
                              setGoals(prev => prev.filter(item => item.id !== g.id));
                            }
                          }}
                          className="text-[10px] text-slate-400 hover:text-rose-600 transition-all font-bold"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add goal box */}
              <div className="bg-slate-100 border border-slate-200/50 rounded-2xl p-5 max-w-md space-y-4">
                <h4 className="text-xs font-black text-slate-800">Definir Novo Objetivo</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="new_g_name"
                    placeholder="Ex: Comprar Notebook"
                    className="bg-white border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                  <input
                    type="number"
                    id="new_g_target"
                    placeholder="Meta R$"
                    className="bg-white border border-slate-200 focus:outline-none focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
                <button
                  onClick={() => {
                    const elName = document.getElementById('new_g_name') as HTMLInputElement;
                    const elTarget = document.getElementById('new_g_target') as HTMLInputElement;
                    if (elName?.value && elTarget?.value) {
                      const newG: Goal = {
                        id: `goal_${Date.now()}`,
                        name: elName.value,
                        target: parseFloat(elTarget.value),
                        current: 0,
                        estimatedMonths: 12,
                        profile: profileMode
                      };
                      setGoals(prev => [...prev, newG]);
                      elName.value = '';
                      elTarget.value = '';
                    }
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-xl"
                >
                  Adicionar Objetivo
                </button>
              </div>
            </div>
          )}

          {/* PATRIMONY TAB */}
          {activeTab === 'patrimony' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.patrimonyTitle}</h2>
                <p className="text-xs text-slate-400">{t.patrimonySubtitle}</p>
              </div>

              {/* Net worth highlight banner */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white text-center space-y-2 shadow-md">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  {t.patrimonyLiquid}
                </span>
                <div className="text-3xl md:text-4xl font-black text-indigo-100">
                  {formatValue(netWorthValue)}
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {lang === 'pt' ? 'Patrimônio Líquido é o que você realmente possui de patrimônio livre após pagar todas as suas dívidas e financiamentos.' :
                   'Net worth is the true metric of wealth. It calculated all your tangible assets minus current liabilities.'}
                </p>
              </div>

              {/* Asset & Liability items ledger */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assets Column */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <h3 className="text-xs font-black text-slate-800">Ativos & Bens</h3>
                    <span className="text-xs font-black text-emerald-600">+{formatValue(totalAssets)}</span>
                  </div>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">Dinheiro em Contas</span>
                      <b className="text-slate-800">{formatValue(totalBalance > 0 ? totalBalance : 0)}</b>
                    </div>
                    <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">Investimentos Aplicados</span>
                      <b className="text-slate-800">{formatValue(filteredInvestments.reduce((sum, i) => sum + i.currentValue, 0))}</b>
                    </div>
                    <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">
                        {profileMode === 'pf' ? 'Veículos (Estimado)' : 'Equipamentos (Estimado)'}
                      </span>
                      <b className="text-slate-800">{formatValue(profileMode === 'pf' ? 50000 : 30000)}</b>
                    </div>
                    <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">
                        {profileMode === 'pf' ? 'Imóveis (Estimado)' : 'Instalações (Estimado)'}
                      </span>
                      <b className="text-slate-800">{formatValue(profileMode === 'pf' ? 300000 : 120000)}</b>
                    </div>
                  </div>
                </div>

                {/* Liabilities Column */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <h3 className="text-xs font-black text-slate-800">Dívidas & Obrigações</h3>
                    <span className="text-xs font-black text-rose-600">-{formatValue(totalLiabilities)}</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">Cartões de Crédito (A pagar)</span>
                      <b className="text-rose-600">
                        {formatValue(Math.abs(filteredAccounts.reduce((sum, acc) => sum + (acc.type === 'card' ? acc.balance : 0), 0)))}
                      </b>
                    </div>
                    <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-600">
                        {profileMode === 'pf' ? 'Financiamento Imobiliário/Auto' : 'Empréstimos Bancários PJ'}
                      </span>
                      <b className="text-rose-600">{formatValue(profileMode === 'pf' ? 45000 : 12000)}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INVESTMENTS TAB */}
          {activeTab === 'investments' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.investmentsTitle}</h2>
                <p className="text-xs text-slate-400">{t.investmentsSubtitle}</p>
              </div>

              {/* Investments summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Total Aplicado (Custo)</span>
                  <div className="text-lg font-black text-slate-800">
                    {formatValue(filteredInvestments.reduce((sum, i) => sum + i.costBasis, 0))}
                  </div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Valor Atual de Mercado</span>
                  <div className="text-lg font-black text-indigo-600">
                    {formatValue(filteredInvestments.reduce((sum, i) => sum + i.currentValue, 0))}
                  </div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Rentabilidade Média</span>
                  <div className="text-lg font-black text-emerald-600">
                    +{(filteredInvestments.reduce((sum, i) => sum + i.yieldRate, 0) / (filteredInvestments.length || 1)).toFixed(2)}% p.a.
                  </div>
                </div>
              </div>

              {/* Investment asset list */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider text-slate-400">Minha Carteira</h3>
                
                <div className="space-y-2">
                  {filteredInvestments.map(inv => (
                    <div key={inv.id} className="flex items-center justify-between p-3 border border-slate-50 hover:bg-slate-50 rounded-xl transition-all">
                      <div>
                        <div className="text-xs font-black text-slate-800">{inv.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{inv.type} | Rentabilidade: +{inv.yieldRate}% a.a.</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-black text-slate-800">{formatValue(inv.currentValue)}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">Custo: {formatValue(inv.costBasis)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION & CHALLENGES TAB */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.education}</h2>
                <p className="text-xs text-slate-400">{t.eduSubtitle}</p>
              </div>

              {/* Sub-tabs for education modules */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Learning pathways step widget */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs lg:col-span-2 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider text-slate-400">{t.learningPaths}</h3>
                    <span className="text-xs text-slate-400 font-bold">{activeLessonIndex + 1} / {lessons.length}</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-indigo-700">{lessons[activeLessonIndex].title}</h4>
                    <p className="text-slate-400 text-xs font-semibold">{lessons[activeLessonIndex].subtitle}</p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {lessons[activeLessonIndex].content}
                    </div>
                  </div>

                  {/* MINI QUIZ */}
                  <div className="border-t border-slate-50 pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <HelpCircle className="w-4 h-4 text-indigo-500" />
                      <span>{lessons[activeLessonIndex].quiz.question}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {lessons[activeLessonIndex].quiz.options.map((option, idx) => {
                        let btnStyle = 'border-slate-200 text-slate-600 hover:bg-slate-50';
                        if (selectedQuizOption === idx) {
                          if (idx === lessons[activeLessonIndex].quiz.answerIndex) {
                            btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
                          } else {
                            btnStyle = 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
                          }
                        }
                        return (
                          <button
                            key={idx}
                            disabled={selectedQuizOption !== null}
                            onClick={() => handleQuizSubmit(idx)}
                            className={`w-full text-left p-3 border rounded-xl text-xs transition-all cursor-pointer ${btnStyle}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {quizResult === 'correct' && (
                      <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{t.quizCorrect} <b>+2 XP points added to BGrowth Score!</b></span>
                      </div>
                    )}
                    {quizResult === 'wrong' && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{t.quizWrong}</span>
                      </div>
                    )}

                    {selectedQuizOption !== null && (
                      <button
                        onClick={handleNextLesson}
                        className="w-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold py-2.5 rounded-xl transition-all"
                      >
                        {lang === 'pt' ? 'Próxima Trilha' : 'Next Path'}
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Compound Interest interactive Calculator */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider text-slate-400">Simulador de Juros Compostos</h3>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Aporte Inicial (R$)</label>
                      <input
                        type="number"
                        value={simPrincipal}
                        onChange={(e) => setSimPrincipal(parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Aporte Mensal (R$)</label>
                      <input
                        type="number"
                        value={simMonthly}
                        onChange={(e) => setSimMonthly(parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Taxa Anual (%)</label>
                        <input
                          type="number"
                          value={simRate}
                          onChange={(e) => setSimRate(parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Anos</label>
                        <input
                          type="number"
                          value={simYears}
                          onChange={(e) => setSimYears(parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Simulation Results display */}
                    <div className="bg-indigo-50 border border-indigo-100/50 p-4 rounded-xl text-center space-y-1.5">
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-500">Saldo Final Projetado</span>
                      <div className="text-xl font-black text-indigo-900">{formatValue(simResult.total)}</div>
                      <div className="text-[10px] text-slate-400 font-bold">
                        Valor Investido: {formatValue(simResult.invested)} <br />
                        Juros Acumulados: <b className="text-emerald-600">{formatValue(simResult.juros)}</b>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Challenges and Badges section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Active challenges tracker */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-black text-slate-800">{t.challenges}</h3>
                  <div className="space-y-3">
                    {filteredChallenges.map(ch => {
                      const percent = Math.min(100, Math.round((ch.current / ch.target) * 100));
                      return (
                        <div key={ch.id} className="p-3 border border-slate-50 bg-slate-50/50 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-800">{ch.title}</span>
                            <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">+{ch.rewardPoints} pts</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-normal">{ch.description}</p>
                          <div className="space-y-1">
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                              <span>Progresso: {ch.current} / {ch.target}</span>
                              <button
                                onClick={() => {
                                  setChallenges(prev => prev.map(item => {
                                    if (item.id === ch.id) {
                                      const nextVal = Math.min(item.target, item.current + (item.target > 10 ? 5 : 1));
                                      if (nextVal >= item.target) {
                                        setScorePoints(sc => Math.min(100, sc + 5));
                                        alert(`Desafio "${ch.title}" Concluído! Parabéns! +5 BGrowth Score points!`);
                                      }
                                      return { ...item, current: nextVal };
                                    }
                                    return item;
                                  }));
                                }}
                                className="text-indigo-600 hover:text-indigo-800 font-bold"
                              >
                                Registrar Progresso
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Unlocked BadgesAchievements list */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-black text-slate-800">{t.achievements}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredAchievements.map(ac => (
                      <div 
                        key={ac.id} 
                        className={`p-3 border rounded-xl flex items-center gap-3 transition-all ${
                          ac.unlocked 
                            ? 'bg-emerald-50/20 border-emerald-100 text-slate-800' 
                            : 'bg-slate-50/50 border-slate-100 opacity-50 text-slate-400'
                        }`}
                      >
                        <span className="text-2xl">{ac.icon}</span>
                        <div>
                          <div className="text-xs font-black">{ac.title}</div>
                          <div className="text-[10px] text-slate-400 font-semibold leading-tight">{ac.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Podcasts section with audio simulator */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-2 col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded-md">LIVE</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.podcasts}</span>
                  </div>
                  <h3 className="text-base font-black">BGrowth Wealth Cast™ - Ep 14: Sair das dívidas e começar a Investir</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Neste podcast simulado, nossos consultores explicam o passo a passo exato para zerar faturas pendentes de cartão de crédito e fazer a primeira transição para fundos com rendimento líquido estável.
                  </p>
                </div>
                
                {/* Audio interactive simulation console */}
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-300">AUDIO PLAYER</span>
                    <span className="text-[10px] font-bold text-slate-400">02:34 / 15:00</span>
                  </div>
                  <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full transition-all" style={{ width: `${podcastProgress}%` }}></div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button 
                      onClick={() => setPodcastProgress(35)}
                      className="p-1.5 hover:bg-white/10 rounded-full text-slate-300 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPodcastPlaying(!podcastPlaying)}
                      className="w-10 h-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      {podcastPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <button 
                      onClick={() => setPodcastProgress(p => Math.min(100, p + 10))}
                      className="p-1.5 hover:bg-white/10 rounded-full text-slate-300 transition-all text-xs font-bold"
                    >
                      +30s
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* JOURNEY TIMELINE TAB */}
          {activeTab === 'journey' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">{t.journeyTitle}</h2>
                  <p className="text-xs text-slate-400">{t.journeySubtitle}</p>
                </div>
                <button
                  onClick={() => setShowAddMilestone(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-3.5 py-2.5 rounded-xl shadow-md shadow-indigo-100 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> {t.addMilestone}
                </button>
              </div>

              {showAddMilestone && (
                <form onSubmit={handleAddMilestone} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs space-y-4 max-w-md">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">{t.addMilestone}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.milestoneTitle}</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Reserva Concluída!"
                          value={newMsTitle}
                          onChange={(e) => setNewMsTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-slate-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.milestoneDate}</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Julho 2026"
                          value={newMsDate}
                          onChange={(e) => setNewMsDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase">{t.milestoneText}</label>
                      <textarea
                        required
                        placeholder={t.milestonePlaceholder}
                        value={newMsDesc}
                        onChange={(e) => setNewMsDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-slate-800 h-20 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddMilestone(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold px-3 py-2 rounded-xl"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              )}

              {/* Vertical timeline ledger */}
              <div className="relative border-l-2 border-slate-100 pl-6 ml-4 space-y-6">
                {filteredMilestones.map((ms, idx) => (
                  <div key={ms.id} className="relative space-y-1.5 group">
                    {/* Circle icon bullet */}
                    <span className="absolute -left-10 top-0.5 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-all shadow-sm">
                      ✨
                    </span>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-black text-slate-900">{ms.title}</span>
                      <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                        {ms.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                      {ms.description}
                    </p>
                    
                    <button
                      onClick={() => setMilestones(prev => prev.filter(m => m.id !== ms.id))}
                      className="text-[9px] text-slate-300 hover:text-rose-600 transition-all font-bold opacity-0 group-hover:opacity-100"
                    >
                      Remover Marco
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CALENDAR TAB */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{lang === 'pt' ? 'Calendário Financeiro' : 'Financial Calendar'}</h2>
                <p className="text-xs text-slate-400">{lang === 'pt' ? 'Acompanhe datas de vencimento de faturas, depósitos de salário e cobranças recorrentes.' : 'Schedule future transactions and mark them off.'}</p>
              </div>

              {/* Monthly calendar schedule list */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider text-slate-400">Próximas Datas Planejadas</h3>
                  <span className="text-xs text-slate-400 font-bold">Julho 2026</span>
                </div>

                <div className="space-y-3">
                  {filteredCalendar.map(evt => (
                    <div 
                      key={evt.id} 
                      className={`flex items-center justify-between p-3.5 border rounded-xl transition-all ${
                        evt.completed 
                          ? 'bg-slate-50/50 border-slate-100 opacity-60' 
                          : 'bg-white border-slate-100 hover:border-indigo-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Check-box action to log transaction */}
                        <button
                          onClick={() => handleToggleCalendarEvent(evt.id)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                            evt.completed 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-slate-300 hover:border-indigo-500'
                          }`}
                        >
                          {evt.completed && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div>
                          <div className={`text-xs font-black ${evt.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {evt.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">
                            {evt.date} | {evt.type === 'income' ? t.income : t.expense}
                          </div>
                        </div>
                      </div>

                      <span className={`text-xs font-black ${evt.type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
                        {evt.type === 'income' ? '+' : '-'}{formatValue(evt.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.docsTitle}</h2>
                <p className="text-xs text-slate-400">{t.docsSubtitle}</p>
              </div>

              {/* Upload Drop Zone Sim */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center space-y-3 transition-all ${
                  isDragging 
                    ? 'border-indigo-500 bg-indigo-50/25' 
                    : 'border-slate-200 bg-white hover:border-indigo-200'
                }`}
              >
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <div>
                  <p className="text-xs font-black text-slate-800">{t.dragDrop}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Suporta PDF, PNG, JPG de até 5MB</p>
                </div>
                
                {/* Fallback file input */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Nome amigável do recibo (Opcional)"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                  <label className="bg-slate-150 hover:bg-slate-200 text-slate-700 text-[11px] font-black px-3 py-1.5 rounded-lg border border-slate-300 cursor-pointer transition-all">
                    Selecionar Arquivo
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleManualUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Uploaded receipts ledger */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider text-slate-400">Armazenamento Seguro (Criptografado)</h3>
                
                <div className="space-y-2.5">
                  {filteredDocs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-slate-50 hover:bg-slate-50 rounded-xl transition-all">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-indigo-500" />
                        <div>
                          <div className="text-xs font-black text-slate-800">{doc.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">{doc.tag} | {doc.size} | {doc.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Simulando download seguro de: ${doc.name}`)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 transition-all border border-slate-150 rounded-lg hover:bg-white"
                          title="Baixar Documento"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-all"
                          title="Remover Documento"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredDocs.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-xs">{t.noDocs}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.repTitle}</h2>
                <p className="text-xs text-slate-400">{t.repSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Graphic 1: Cash Flow comparison */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider text-slate-400">{t.cashFlow}</h3>
                  
                  {/* Custom SVG Bar Chart */}
                  <div className="h-44 flex items-end justify-center gap-8 pt-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs font-bold text-emerald-600">+{formatValue(totalIncomesThisMonth)}</div>
                      <div className="w-16 bg-emerald-500 rounded-t-lg" style={{ height: `${Math.max(10, Math.min(120, (totalIncomesThisMonth / 20000) * 120))}px` }}></div>
                      <span className="text-[10px] text-slate-400 font-bold">{t.income}</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs font-bold text-rose-600">-{formatValue(totalExpensesThisMonth)}</div>
                      <div className="w-16 bg-rose-500 rounded-t-lg" style={{ height: `${Math.max(10, Math.min(120, (totalExpensesThisMonth / 20000) * 120))}px` }}></div>
                      <span className="text-[10px] text-slate-400 font-bold">{t.expense}</span>
                    </div>
                  </div>
                </div>

                {/* Graphic 2: Category distributions */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider text-slate-400">{t.categoryShare}</h3>

                  <div className="space-y-3.5">
                    {/* Budget progress indicators acts as gorgeous category breakdown bars */}
                    {filteredBudgets.slice(0, 4).map(b => {
                      const sharePct = Math.min(100, Math.round((b.spent / (totalExpensesThisMonth || 1)) * 100));
                      return (
                        <div key={b.id} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-slate-700">
                            <span>{b.category}</span>
                            <span>{sharePct}% ({formatValue(b.spent)})</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${sharePct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
