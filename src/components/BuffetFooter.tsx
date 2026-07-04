/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { translations } from './BuffetTranslations';

interface BuffetFooterProps {
  lang: 'pt' | 'en' | 'es' | 'fr';
}

export default function BuffetFooter({ lang }: BuffetFooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-6 md:px-12 border-t border-slate-800" id="buffet-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
        {/* Brand & Tagline */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm">
              B
            </div>
            <div>
              <h4 className="text-sm font-black text-white tracking-tight leading-none">BGrowth</h4>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Buffet & Eventos</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-medium">
            {t.footerTagline}
          </p>
        </div>

        {/* Contacts */}
        <div className="space-y-3 font-semibold">
          <h5 className="text-white text-xs font-black uppercase tracking-wider">Contato</h5>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" />
              <span>(11) 99999-0000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span className="hover:text-indigo-400 transition-colors">contato@bgrowth.com.br</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Rua das Flores, 456 - São Paulo, SP</span>
            </div>
          </div>
        </div>

        {/* Social Follow */}
        <div className="space-y-3 md:text-right md:flex md:flex-col md:items-end">
          <div className="w-full">
            <h5 className="text-white text-xs font-black uppercase tracking-wider mb-3 md:text-right">{t.footerFollow}</h5>
            <div className="flex gap-2 justify-start md:justify-end">
              <a 
                href="#instagram" 
                className="w-8 h-8 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-full flex items-center justify-center text-slate-300 transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#facebook" 
                className="w-8 h-8 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-full flex items-center justify-center text-slate-300 transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#whatsapp" 
                className="w-8 h-8 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full flex items-center justify-center text-slate-300 transition-all"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold pt-4">
            &copy; {new Date().getFullYear()} BGrowth Buffet & Eventos. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
