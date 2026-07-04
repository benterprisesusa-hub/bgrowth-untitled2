/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, Car, Truck, Briefcase, GraduationCap, Users, ShieldCheck, 
  Settings, Database, HelpCircle, UserCheck, Layers, CreditCard, Utensils, Heart, PawPrint, Coins
} from 'lucide-react';
import { User } from './types';
import Dashboard from './components/Dashboard';
import CleaningApp from './components/CleaningApp';
import MileageApp from './components/MileageApp';
import DeliveryApp from './components/DeliveryApp';
import NotaryApp from './components/NotaryApp';
import BuffetApp from './components/BuffetApp';
import BabysitterApp from './components/BabysitterApp';
import CustomerExperienceApp from './components/CustomerExperienceApp';
import PetCareApp from './components/PetCareApp';
import MoneyApp from './components/MoneyApp';
import SubscriptionTeamManager from './components/SubscriptionTeamManager';

export default function App() {
  // Simulated Logged in user with changeable plans to test features!
  const [currentUser, setCurrentUser] = useState<User>({
    email: 'agmosp46@gmail.com',
    name: 'Edite Gomes',
    plan: 'Enterprise',
    role: 'owner',
    isAdmin: false,
    companyName: 'BGrowth Cleaning Services',
    logoUrl: '✨',
    themeColor: 'indigo'
  });

  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState<any | null>(null);

  const handleLaunchModule = (moduleId: string) => {
    // Check if plan supports it (simulation)
    if (moduleId === 'cleaning' || moduleId === 'mileage' || moduleId === 'delivery' || moduleId === 'notary' || moduleId === 'buffet' || moduleId === 'babysitter' || moduleId === 'cx' || moduleId === 'petcare' || moduleId === 'bgmoney') {
      setActiveModule(moduleId);
    } else {
      // Find module plan
      const modName = moduleId === 'crm' ? 'BGrowth CRM' : moduleId === 'financial' ? 'Financial Hub' : moduleId === 'ai_assistant' ? 'AI Assistant' : 'BGrowth Academy';
      const required = moduleId === 'crm' || moduleId === 'ai_assistant' || moduleId === 'academy' ? 'Pro' : 'Enterprise';
      
      setShowUpgradeModal({ name: modName, plan: required });
    }
  };

  const changeSimulatedPlan = (plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise') => {
    setCurrentUser(prev => ({
      ...prev,
      plan: plan
    }));
  };

  const theme = currentUser.themeColor || 'indigo';
  const themeBg = {
    indigo: 'bg-indigo-600 shadow-indigo-100',
    emerald: 'bg-emerald-600 shadow-emerald-100',
    rose: 'bg-rose-600 shadow-rose-100',
    amber: 'bg-amber-600 shadow-amber-100',
    sky: 'bg-sky-500 shadow-sky-100',
    violet: 'bg-violet-600 shadow-violet-100',
    slate: 'bg-slate-800 shadow-slate-200'
  }[theme];

  const themeTextActive = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    sky: 'text-sky-500',
    violet: 'text-violet-600',
    slate: 'text-slate-800'
  }[theme];

  const themeBgBtnActive = {
    indigo: 'bg-indigo-600 text-white shadow-md shadow-indigo-100',
    emerald: 'bg-emerald-600 text-white shadow-md shadow-emerald-100',
    rose: 'bg-rose-600 text-white shadow-md shadow-rose-100',
    amber: 'bg-amber-600 text-white shadow-md shadow-amber-100',
    sky: 'bg-sky-500 text-white shadow-md shadow-sky-100',
    violet: 'bg-violet-600 text-white shadow-md shadow-violet-100',
    slate: 'bg-slate-800 text-white shadow-md shadow-slate-200'
  }[theme];

  const themeBgBtnInactive = {
    indigo: 'bg-indigo-50/50 text-indigo-700 hover:bg-indigo-50 border border-indigo-100/40',
    emerald: 'bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100/40',
    rose: 'bg-rose-50/50 text-rose-700 hover:bg-rose-50 border border-rose-100/40',
    amber: 'bg-amber-50/50 text-amber-700 hover:bg-amber-50 border border-amber-100/40',
    sky: 'bg-sky-50/50 text-sky-700 hover:bg-sky-50 border border-sky-100/40',
    violet: 'bg-violet-50/50 text-violet-700 hover:bg-violet-50 border border-violet-100/40',
    slate: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/40'
  }[theme];

  return (
    <div className="bg-slate-50 h-screen text-slate-900 flex flex-col font-sans overflow-hidden">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 ${themeBg} rounded-xl flex items-center justify-center text-white shadow-md`}>
            {currentUser.logoUrl ? (
              <span className="text-base font-extrabold">{currentUser.logoUrl}</span>
            ) : (
              <Layers className="w-5 h-5" />
            )}
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase">
              {currentUser.companyName || 'BGrowth Club'}
            </h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider">BUSINESS SUITE PLATFORM</p>
          </div>
        </div>

        {/* User profile & Plan selector */}
        <div className="flex items-center gap-4">
          
          {/* Simulated Plan Changer */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200/50 p-1 rounded-xl">
            <span className="text-[9px] font-black text-slate-400 uppercase px-2">PLAN TESTER:</span>
            {(['Starter', 'Pro', 'Enterprise'] as const).map(p => (
              <button
                key={p}
                onClick={() => changeSimulatedPlan(p)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-colors ${
                  currentUser.plan === p
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900">{currentUser.name}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Owner Account</p>
            </div>
            <div className={`text-xs font-black px-3 py-1.5 rounded-xl ${
              currentUser.plan === 'Enterprise' 
                ? 'bg-purple-100 text-purple-700' 
                : currentUser.plan === 'Pro' 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'bg-blue-100 text-blue-700'
            }`}>
              👑 {currentUser.plan}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Compact Workspace Sidebar */}
        <aside className="w-full md:w-56 bg-white border-r border-slate-100 p-4 md:py-6 space-y-6 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">ACTIVE MODULES</div>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveModule(null)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === null 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4" /> BGrowth Hub (Launcher)
              </button>
              <button 
                onClick={() => handleLaunchModule('cleaning')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'cleaning' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Cleaning Management
              </button>
              <button 
                onClick={() => handleLaunchModule('mileage')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'mileage' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Car className="w-4 h-4" /> Mileage Tracker
              </button>
              <button 
                onClick={() => handleLaunchModule('delivery')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'delivery' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Truck className="w-4 h-4" /> Delivery Tracker
              </button>
              <button 
                onClick={() => handleLaunchModule('notary')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'notary' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Notary Manager
              </button>
              <button 
                onClick={() => handleLaunchModule('buffet')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'buffet' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Utensils className="w-4 h-4" /> Buffet Planner
              </button>
              <button 
                onClick={() => handleLaunchModule('babysitter')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'babysitter' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Babysitter Manager
              </button>
              <button 
                onClick={() => handleLaunchModule('cx')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'cx' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Heart className="w-4 h-4" /> Client Experience
              </button>
              <button 
                onClick={() => handleLaunchModule('petcare')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'petcare' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <PawPrint className="w-4 h-4" /> BGrowth Pet Care™
              </button>
              <button 
                onClick={() => handleLaunchModule('bgmoney')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  activeModule === 'bgmoney' 
                    ? `bg-slate-100 ${themeTextActive}` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Coins className="w-4 h-4 text-emerald-600" /> BGrowth Money™
              </button>
              
              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setActiveModule('settings_admin')}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-2.5 transition-all ${
                    activeModule === 'settings_admin' 
                      ? themeBgBtnActive 
                      : themeBgBtnInactive
                  }`}
                >
                  <Settings className="w-4 h-4" /> Planos & Infraestrutura
                </button>
              </div>
            </nav>
          </div>

          {/* Quick instructions & developer notes */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2.5 hidden md:block">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-[11px]">
              <Database className="w-4 h-4 text-slate-500" /> Isolated Data Pools
            </div>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Every owner account has an isolated Google Spreadsheets ID securely processed server-side.
            </p>
          </div>
        </aside>

        {/* Dynamic App Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeModule === null && (
            <Dashboard user={currentUser} onLaunchModule={handleLaunchModule} />
          )}
          {activeModule === 'cleaning' && (
            <CleaningApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'mileage' && (
            <MileageApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'delivery' && (
            <DeliveryApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'notary' && (
            <NotaryApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'buffet' && (
            <BuffetApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'babysitter' && (
            <BabysitterApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'cx' && (
            <CustomerExperienceApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'petcare' && (
            <PetCareApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'bgmoney' && (
            <MoneyApp user={currentUser} onBack={() => setActiveModule(null)} />
          )}
          {activeModule === 'settings_admin' && (
            <SubscriptionTeamManager 
              user={currentUser} 
              onPlanChange={(newPlan) => setCurrentUser(prev => ({ ...prev, plan: newPlan }))}
              onUpdateUser={(updatedUser) => setCurrentUser(updatedUser)}
              onBack={() => setActiveModule(null)} 
            />
          )}
        </main>

      </div>

      {/* Upgrade Modal Simulation */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              👑
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900">Unlock {showUpgradeModal.name}</h3>
              <p className="text-slate-500 text-xs">
                This module is part of the 30+ BGrowth Suite requiring a <b>{showUpgradeModal.plan}</b> or higher plan.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-400">
              Your active simulated plan: <b className="text-slate-700">{currentUser.plan}</b>. Turn on "Enterprise" or "Pro" in the top bar to simulate access!
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => setShowUpgradeModal(null)}
                className="border border-slate-200 text-slate-500 font-extrabold text-xs py-2.5 rounded-xl"
              >
                Maybe Later
              </button>
              <button 
                onClick={() => {
                  changeSimulatedPlan(showUpgradeModal.plan);
                  setShowUpgradeModal(null);
                }}
                className="bg-indigo-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-lg shadow-indigo-100"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-3 px-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span>© 2026 BGrowth Club. MIT licensed.</span>
        <span>Secure server-side database sandbox</span>
      </footer>

    </div>
  );
}
