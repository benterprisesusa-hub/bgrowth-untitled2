/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Mail, Phone, MessageSquare, ArrowRight, UserCheck, Sparkles, Filter } from 'lucide-react';

interface BuffetClientsListProps {
  lang: 'pt' | 'en' | 'es' | 'fr';
}

export default function BuffetClientsList({ lang }: BuffetClientsListProps) {
  const isPt = lang === 'pt';

  const [clients, setClients] = useState([
    { id: 'cli_001', name: 'Sarah Jenkins', phone: '(11) 98765-4321', email: 'sarah.jenkins@gmail.com', city: 'São Paulo', state: 'SP', eventsCount: 3, spent: 45200 },
    { id: 'cli_002', name: 'Michael Chang', phone: '(11) 97654-3210', email: 'michael.chang@yahoo.com', city: 'Campinas', state: 'SP', eventsCount: 1, spent: 18500 },
    { id: 'cli_003', name: 'Rachel Adams', phone: '(21) 96543-2109', email: 'rachel.adams@outlook.com', city: 'Rio de Janeiro', state: 'RJ', eventsCount: 2, spent: 28000 },
    { id: 'cli_004', name: 'TechCorp Group (Mark R.)', phone: '(11) 95432-1098', email: 'mark@techcorp.com', city: 'São Paulo', state: 'SP', eventsCount: 4, spent: 92400 },
    { id: 'cli_005', name: 'Julia Medeiros', phone: '(31) 94321-0987', email: 'julia.med@hotmail.com', city: 'Belo Horizonte', state: 'MG', eventsCount: 1, spent: 12500 },
    { id: 'cli_006', name: 'Arthur Pendelton', phone: '(48) 93210-9876', email: 'arthur.p@gmail.com', city: 'Florianópolis', state: 'SC', eventsCount: 2, spent: 34000 }
  ]);

  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 text-left" id="buffet-client-database">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            {isPt ? 'Banco de Clientes BGrowth' : 'BGrowth Client Database'}
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold">
            {isPt ? 'Gerenciamento de faturamento acumulado e histórico de eventos por cliente.' : 'Manage lifetime values, event counters, and contact channels for client directory.'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-slate-500">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>{clients.length} {isPt ? 'Clientes Ativos' : 'Active Clients'}</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative text-xs">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder={isPt ? 'Filtrar por nome, email ou cidade...' : 'Filter by name, email, or city...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full font-semibold pl-9.5 pr-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:bg-white animate-fade-in"
        />
      </div>

      {/* Clients Table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-3xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-5 py-3.5">{isPt ? 'Cliente' : 'Customer'}</th>
              <th className="px-5 py-3.5">{isPt ? 'Contato' : 'Contacts'}</th>
              <th className="px-5 py-3.5">{isPt ? 'Localidade' : 'Location'}</th>
              <th className="px-5 py-3.5 text-center">{isPt ? 'Eventos' : 'Events'}</th>
              <th className="px-5 py-3.5 text-right">{isPt ? 'Faturamento Total' : 'Total Spent'}</th>
              <th className="px-5 py-3.5 text-center">{isPt ? 'Canais' : 'Channels'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
            {filteredClients.map(cli => (
              <tr key={cli.id} className="hover:bg-slate-50/40 transition-colors">
                <td className="px-5 py-4">
                  <span className="font-black text-slate-800 block">{cli.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">{cli.id}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="space-y-0.5">
                    <span className="block font-mono text-slate-700">{cli.phone}</span>
                    <span className="block text-slate-400 text-[11px] font-medium">{cli.email}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span>{cli.city}, {cli.state}</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-extrabold text-[10px] rounded-lg border border-indigo-100/30">
                    {cli.eventsCount}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="font-mono font-black text-slate-800">${cli.spent.toLocaleString()}</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => alert(`Email interface triggered for ${cli.email}`)}
                      className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert(`WhatsApp chat dispatched for ${cli.phone}`)}
                      className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                      title="WhatsApp Chat"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-slate-400 font-semibold leading-normal">
            {isPt ? 'Nenhum cliente cadastrado com esses termos.' : 'No customer found in directory.'}
          </div>
        )}
      </div>

    </div>
  );
}
