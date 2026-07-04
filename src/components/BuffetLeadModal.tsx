/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trash, Printer, Mail, ShieldAlert, Check } from 'lucide-react';
import { BuffetLead } from '../types';

interface BuffetLeadModalProps {
  lang: 'pt' | 'en' | 'es' | 'fr';
  lead: BuffetLead;
  onClose: () => void;
  onUpdateStatus: (leadId: string, status: BuffetLead['status']) => void;
  onDeleteLead: (leadId: string) => void;
}

export default function BuffetLeadModal({
  lang, lead, onClose, onUpdateStatus, onDeleteLead
}: BuffetLeadModalProps) {
  const isPt = lang === 'pt';

  const statusOptions: BuffetLead['status'][] = [
    'New Lead', 'In Analysis', 'Proposal Sent', 'Event Confirmed', 'Closed'
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-3xs overflow-y-auto" id="lead-administrative-modal">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 w-full max-w-2xl shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto animate-fade-in">
        
        {/* Header Title Bar */}
        <div className="flex justify-between items-start pb-3.5 border-b border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase font-mono tracking-wider">
              {isPt ? `SOLICITAÇÃO DE ORÇAMENTO #${lead.id}` : `QUOTE REQUEST #${lead.id}`}
            </span>
            <h3 className="text-lg font-black text-slate-900 leading-tight">{lead.clientName}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 font-black text-xs p-1.5 hover:bg-slate-50 rounded-xl"
          >
            {isPt ? 'FECHAR' : 'CLOSE'}
          </button>
        </div>

        {/* Sales Pipeline Controls */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">
            {isPt ? 'Atualizar Status do Funil de Leads' : 'Update Sales Funnel Status'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {statusOptions.map(st => {
              const isActive = lead.status === st;
              return (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(lead.id, st)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-500 border border-slate-200/60 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Data grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-semibold text-slate-600">
          
          {/* Event Specs Column */}
          <div className="space-y-3.5">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block border-b border-slate-100 pb-1.5">
              {isPt ? 'Especificações do Evento' : 'Event Specifications'}
            </span>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{isPt ? 'Tipo de Evento:' : 'Event Type:'}</span>
                <span className="font-extrabold text-slate-900">{lead.eventType}</span>
              </div>
              <div className="flex justify-between">
                <span>{isPt ? 'Data Agendada:' : 'Scheduled Date:'}</span>
                <span className="font-extrabold text-slate-900 font-mono">{lead.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span>{isPt ? 'Horário de Serviço:' : 'Service Shift:'}</span>
                <span className="font-extrabold text-slate-900 font-mono">{lead.startTime} - {lead.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span>{isPt ? 'Total de Convidados:' : 'Total Guests:'}</span>
                <span className="font-extrabold text-slate-900 font-mono">{lead.guests} pax</span>
              </div>
              <div className="flex justify-between">
                <span>{isPt ? 'Preferência Menu:' : 'Menu Preference:'}</span>
                <span className="font-extrabold text-slate-900">{lead.menuPreference}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <span>{isPt ? 'Estimativa Orçamento:' : 'Orçamento Estimado:'}</span>
                <span className="text-sm font-black text-emerald-600 font-mono">${lead.estimatedPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Customer Specs Column */}
          <div className="space-y-3.5">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block border-b border-slate-100 pb-1.5">
              {isPt ? 'Contato & Logística' : 'Contact & Logistics'}
            </span>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{isPt ? 'Telefone/WhatsApp:' : 'Phone/WhatsApp:'}</span>
                <span className="font-extrabold text-slate-900 font-mono">{lead.clientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span>{isPt ? 'E-mail:' : 'E-mail Address:'}</span>
                <span className="font-extrabold text-slate-900 truncate max-w-[150px]">{lead.clientEmail}</span>
              </div>
              <div className="flex justify-between">
                <span>{isPt ? 'Local já Definido?' : 'Venue Defined?'}:</span>
                <span className="font-extrabold text-slate-900">{lead.venueDefined ? (isPt ? 'Sim' : 'Yes') : (isPt ? 'Não' : 'No')}</span>
              </div>
              {lead.venueDefined && (
                <>
                  <div className="flex justify-between">
                    <span>{isPt ? 'Endereço:' : 'Address:'}</span>
                    <span className="font-extrabold text-slate-900 truncate max-w-[150px]">{lead.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isPt ? 'Cidade/CEP:' : 'City/ZIP:'}</span>
                    <span className="font-extrabold text-slate-900">{lead.city} {lead.zip}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Theme & Dietary restriction box */}
          <div className="sm:col-span-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">
              {isPt ? 'Diretrizes Estéticas e Restrições' : 'Aesthetics & Dietary Requirements'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
              <div>
                <span className="font-extrabold text-slate-700 block">{isPt ? 'Tema Visual:' : 'Visual Theme:'}</span>
                <span className="text-slate-500">{lead.theme || (isPt ? 'Não informado' : 'Not specified')}</span>
              </div>
              <div>
                <span className="font-extrabold text-slate-700 block">{isPt ? 'Paleta de Cores:' : 'Color Palette:'}</span>
                <span className="text-slate-500">{lead.colors || (isPt ? 'Não informada' : 'Not specified')}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-extrabold text-red-700 block flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> 
                  {isPt ? 'Restrições Alimentares / Alérgenos:' : 'Dietary Restrictions / Allergens:'}
                </span>
                <span className="text-slate-700 font-bold bg-red-50/50 px-2 py-1 rounded-lg border border-red-100/50 block mt-1">
                  {lead.dietaryRestrictions || (isPt ? 'Nenhuma relatada' : 'None reported')}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-extrabold text-slate-700 block">{isPt ? 'Observações Gerais:' : 'General Notes:'}</span>
                <span className="text-slate-500 block">{lead.notes || (isPt ? 'Nenhuma observação adicional.' : 'No additional notes.')}</span>
              </div>
            </div>
          </div>

          {/* Active selected services */}
          {lead.services && lead.services.length > 0 && (
            <div className="sm:col-span-2 space-y-2">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">
                {isPt ? `Serviços Inclusos (${lead.services.length})` : `Services Included (${lead.services.length})`}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {lead.services.map(srv => (
                  <span key={srv} className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-indigo-100/30">
                    ✓ {srv}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action Controls Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => {
              if (confirm(isPt ? 'Tem certeza que deseja excluir esta solicitação?' : 'Are you sure you want to delete this event request?')) {
                onDeleteLead(lead.id);
              }
            }}
            className="text-red-500 hover:text-red-700 flex items-center gap-1.5"
          >
            <Trash className="w-4 h-4" /> {isPt ? 'Excluir Lead' : 'Delete Lead'}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => alert(isPt ? 'Enviando rascunho de contrato PDF para impressão...' : 'Generating contract PDF draft for review...')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> {isPt ? 'Contrato PDF' : 'Print Contract'}
            </button>
            <button
              onClick={() => alert(isPt ? `Proposta comercial enviada para o e-mail: ${lead.clientEmail}` : `Proposal proposal dispatched to: ${lead.clientEmail}`)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1.5 shadow-xs shadow-indigo-100"
            >
              <Mail className="w-4 h-4" /> {isPt ? 'Enviar Proposta' : 'Email Proposal'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
