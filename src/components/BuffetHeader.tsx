/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Globe, ChevronRight } from 'lucide-react';
import { translations } from './BuffetTranslations';

interface BuffetHeaderProps {
  lang: 'pt' | 'en' | 'es' | 'fr';
  setLang: (lang: 'pt' | 'en' | 'es' | 'fr') => void;
  viewMode: 'client' | 'admin';
  setViewMode: (mode: 'client' | 'admin') => void;
  onBack: () => void;
}

export default function BuffetHeader({ lang, setLang, viewMode, setViewMode, onBack }: BuffetHeaderProps) {
  const t = translations[lang];

  return (
    <header className="bg-white border-b border-slate-100 px-4 md:px-8 py-4 sticky top-0 z-40 shadow-xs flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" id="buffet-header">
      {/* Brand Logo & Back to Suite Button */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all text-xs font-bold"
          title={t.backLauncher}
        >
          ← {t.backLauncher}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-sm shadow-indigo-100">
            B
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tight leading-none">
              BGrowth
            </h1>
            <p className="text-[10px] text-indigo-600 font-extrabold tracking-wider uppercase">
              Buffet & Eventos
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu Links (Client View) */}
      {viewMode === 'client' && (
        <nav className="hidden lg:flex items-center gap-6 text-xs font-black text-slate-500">
          <a href="#home" className="hover:text-indigo-600 transition-colors text-indigo-600">{t.headerHome}</a>
          <a href="#about" className="hover:text-indigo-600 transition-colors">{t.headerAbout}</a>
          <a href="#services" className="hover:text-indigo-600 transition-colors">{t.headerServices}</a>
          <a href="#menus" className="hover:text-indigo-600 transition-colors">{t.headerMenus}</a>
          <a href="#gallery" className="hover:text-indigo-600 transition-colors">{t.headerGallery}</a>
          <a href="#testimonials" className="hover:text-indigo-600 transition-colors">{t.headerTestimonials}</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">{t.headerContact}</a>
        </nav>
      )}

      {/* Control Buttons & Indicators */}
      <div className="flex items-center flex-wrap gap-2.5 justify-end">
        {/* Language selector */}
        <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/40 text-[10px] font-black gap-0.5">
          <button
            onClick={() => setLang('pt')}
            className={`px-1.5 py-1 rounded-lg transition-all flex items-center gap-0.5 ${
              lang === 'pt' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🇧🇷 PT
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-1.5 py-1 rounded-lg transition-all flex items-center gap-0.5 ${
              lang === 'en' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🇺🇸 EN
          </button>
          <button
            onClick={() => setLang('es')}
            className={`px-1.5 py-1 rounded-lg transition-all flex items-center gap-0.5 ${
              lang === 'es' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🇪🇸 ES
          </button>
          <button
            onClick={() => setLang('fr')}
            className={`px-1.5 py-1 rounded-lg transition-all flex items-center gap-0.5 ${
              lang === 'fr' ? 'bg-white text-indigo-700 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🇫🇷 FR
          </button>
        </div>

        {/* Support Phone */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-600 text-xs font-black border-r border-slate-100 pr-3.5">
          <Phone className="w-3.5 h-3.5 text-indigo-600" />
          <span>(11) 99999-0000</span>
        </div>

        {/* View mode toggle (Client vs Admin) */}
        <button
          onClick={() => setViewMode(viewMode === 'client' ? 'admin' : 'client')}
          className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-tight transition-all flex items-center gap-1 ${
            viewMode === 'admin'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-100'
          }`}
        >
          {viewMode === 'client' ? (
            <>
              {t.ownerAdmin} <ChevronRight className="w-3.5 h-3.5" />
            </>
          ) : (
            t.clientQuoteForm
          )}
        </button>
      </div>
    </header>
  );
}
