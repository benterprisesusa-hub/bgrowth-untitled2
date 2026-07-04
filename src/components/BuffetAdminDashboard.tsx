/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, DollarSign, FileText, CheckCircle, ArrowUpRight, TrendingUp, Users, 
  Sparkles, ChevronRight, MessageSquare, Briefcase, Activity, ShoppingBag
} from 'lucide-react';
import { BuffetLead } from '../types';

interface BuffetAdminDashboardProps {
  lang: 'pt' | 'en' | 'es' | 'fr';
  leads: BuffetLead[];
  onSelectLead: (lead: BuffetLead) => void;
}

export default function BuffetAdminDashboard({ lang, leads, onSelectLead }: BuffetAdminDashboardProps) {
  const isPt = lang === 'pt';

  // Metrics configurations matching Screen 1 from Image 3
  const activeEventsCount = leads.length;
  const confirmedEventsCount = leads.filter(l => l.status === 'Event Confirmed').length;
  const proposalSentCount = leads.filter(l => l.status === 'Proposal Sent').length;
  const newLeadsCount = leads.filter(l => l.status === 'New Lead').length;

  const totalBilling = leads.reduce((acc, lead) => acc + lead.estimatedPrice, 0);
  const receivedPayments = leads
    .filter(l => l.status === 'Event Confirmed')
    .reduce((acc, lead) => acc + (lead.estimatedPrice * 0.5), 0); // Simulate 50% deposit received on confirmed events

  // Custom interactive state for the line chart tooltip
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Custom interactive state for the donut slice
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Line Chart Data Points (Simulating billing trends over months)
  const billingTrendData = [
    { month: isPt ? 'Jan' : 'Jan', value: 12000 },
    { month: isPt ? 'Fev' : 'Feb', value: 18500 },
    { month: isPt ? 'Mar' : 'Mar', value: 24000 },
    { month: isPt ? 'Abr' : 'Apr', value: 19000 },
    { month: isPt ? 'Mai' : 'May', value: 38200 },
    { month: isPt ? 'Jun' : 'Jun', value: totalBilling }
  ];

  // SVG Chart sizing parameters
  const chartWidth = 500;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate pixel coordinates for the SVG path
  const points = billingTrendData.map((d, idx) => {
    const x = paddingX + (idx * (chartWidth - (paddingX * 2))) / (billingTrendData.length - 1);
    const maxVal = Math.max(...billingTrendData.map(item => item.value)) * 1.1;
    const y = chartHeight - paddingY - (d.value / maxVal) * (chartHeight - (paddingY * 2));
    return { x, y, value: d.value, label: d.month };
  });

  // Build curved SVG path using Bezier Cubic curves for premium look!
  const pathD = points.reduce((acc, p, idx, arr) => {
    if (idx === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[idx - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (p.x - prev.x) / 2;
    const cpY2 = p.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, '');

  // Gradient area fill path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  // Status Donut calculation values
  const totalEventsCount = activeEventsCount;
  const statusDivision = [
    { name: isPt ? 'Confirmados' : 'Confirmed', count: confirmedEventsCount, color: '#4f46e5', percent: Math.round((confirmedEventsCount / totalEventsCount) * 100) || 0 },
    { name: isPt ? 'Novos Leads' : 'New Leads', count: newLeadsCount, color: '#f59e0b', percent: Math.round((newLeadsCount / totalEventsCount) * 100) || 0 },
    { name: isPt ? 'Proposta Enviada' : 'Proposals Sent', count: proposalSentCount, color: '#10b981', percent: Math.round((proposalSentCount / totalEventsCount) * 100) || 0 },
    { name: isPt ? 'Em Análise' : 'In Analysis', count: leads.filter(l => l.status === 'In Analysis').length, color: '#06b6d4', percent: Math.round((leads.filter(l => l.status === 'In Analysis').length / totalEventsCount) * 100) || 0 }
  ];

  return (
    <div className="space-y-6 text-left" id="buffet-owner-dashboard-tab">
      
      {/* 4 Stats Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Events */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{isPt ? 'Eventos Ativos' : 'Active Events'}</span>
            <div className="text-2xl font-black text-slate-900 font-mono">{activeEventsCount}</div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold font-mono">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12% {isPt ? 'vs mês ant.' : 'vs last month'}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Projected billing */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{isPt ? 'Faturamento Estimado' : 'Estimated Billing'}</span>
            <div className="text-2xl font-black text-slate-900 font-mono">${totalBilling.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold font-mono">
              <ArrowUpRight className="w-3 h-3" />
              <span>+8% {isPt ? 'vs mês ant.' : 'vs last month'}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Proposals count */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{isPt ? 'Propostas Enviadas' : 'Proposals Sent'}</span>
            <div className="text-2xl font-black text-slate-900 font-mono">{proposalSentCount}</div>
            <div className="flex items-center gap-1 text-[9px] text-amber-600 font-bold font-mono">
              <ArrowUpRight className="w-3 h-3" />
              <span>+5% {isPt ? 'vs sem ant.' : 'vs last week'}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Payments received */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{isPt ? 'Sinal Recebido (50%)' : 'Received Deposit (50%)'}</span>
            <div className="text-2xl font-black text-emerald-700 font-mono">${receivedPayments.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold font-mono">
              <ArrowUpRight className="w-3 h-3" />
              <span>+15% {isPt ? 'vs mês ant.' : 'vs last month'}</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Charts & Schedule Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Upcoming schedule */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-2">
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{isPt ? 'Agenda de Próximos Eventos' : 'Upcoming Event Schedule'}</h4>
              <p className="text-[9px] text-slate-400 font-semibold">{isPt ? 'Leads ativos no pipeline' : 'Active leads in the planner pipeline'}</p>
            </div>
            <span className="text-[9px] font-bold text-indigo-600 font-mono bg-indigo-50 px-2.5 py-1 rounded-full">{leads.length} total</span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {leads.map(lead => {
              const badgeColors = {
                'New Lead': 'bg-amber-50 text-amber-700 border-amber-100/50',
                'In Analysis': 'bg-cyan-50 text-cyan-700 border-cyan-100/50',
                'Proposal Sent': 'bg-indigo-50 text-indigo-700 border-indigo-100/50',
                'Closed': 'bg-slate-100 text-slate-500 border-slate-200/50',
                'Event Confirmed': 'bg-emerald-50 text-emerald-700 border-emerald-100/50'
              }[lead.status] || 'bg-slate-50 text-slate-600 border-slate-100';

              return (
                <button
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-slate-50/50 transition-all flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-black text-slate-800 block truncate max-w-[170px]">{lead.clientName}</span>
                    <span className="text-[9px] text-slate-400 font-bold block">{lead.eventType} | {lead.eventDate}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${badgeColors}`}>
                      {lead.status}
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-700 font-mono">${lead.estimatedPrice.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Charts layout */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Revenue Monthly line Chart */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs space-y-3 text-center">
            <div className="flex justify-between items-center text-left">
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{isPt ? 'Faturamento Mensal' : 'Monthly Revenue Billing'}</h4>
                <p className="text-[9px] text-slate-400 font-semibold">{isPt ? 'Demonstrativo anual acumulado em $' : 'Annual cumulative statistics in $'}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-indigo-600 font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14.8% vs {isPt ? 'ano ant.' : 'last year'}</span>
              </div>
            </div>

            {/* Responsive custom SVG Line Chart */}
            <div className="relative pt-2">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                {/* Defs for curves gradients */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = paddingY + ratio * (chartHeight - (paddingY * 2));
                  return (
                    <line
                      key={i}
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Gradient area underneath line curve */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Main Curve Line path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Hover highlights & markers */}
                {points.map((p, idx) => {
                  const isHovered = hoveredMonth === idx;
                  return (
                    <g key={idx}>
                      {/* Anchor Circle */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 7 : 4.5}
                        fill={isHovered ? '#4f46e5' : '#ffffff'}
                        stroke="#4f46e5"
                        strokeWidth={isHovered ? 3.5 : 2.5}
                        className="cursor-pointer transition-all duration-150"
                        onMouseEnter={() => setHoveredMonth(idx)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      />
                      {/* Month Text Label */}
                      <text
                        x={p.x}
                        y={chartHeight - 10}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic tooltip box when hovering coordinates */}
              {hoveredMonth !== null && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl font-mono flex items-center gap-1.5 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>{billingTrendData[hoveredMonth].month}:</span>
                  <span className="text-indigo-200">${billingTrendData[hoveredMonth].value.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Events by Status Donut Chart */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs space-y-4">
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{isPt ? 'Divisão por Status' : 'Event Status Division'}</h4>
              <p className="text-[9px] text-slate-400 font-semibold">{isPt ? 'Filtro proporcional do funil de vendas' : 'Funnel conversion proportionality'}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Donut SVG */}
              <div className="relative flex justify-center">
                <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                  {/* Base Circle */}
                  <circle
                    cx="90"
                    cy="90"
                    r="60"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="16"
                  />
                  {/* Iterating circles with calculations for stroke-dasharray/dashoffset */}
                  {(() => {
                    let accumulatedPercent = 0;
                    return statusDivision.map((slice, i) => {
                      if (slice.count === 0) return null;
                      const circumference = 2 * Math.PI * 60; // ~377
                      const strokeDash = (slice.percent / 100) * circumference;
                      const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
                      accumulatedPercent += slice.percent;

                      const isHovered = hoveredSlice === slice.name;

                      return (
                        <circle
                          key={i}
                          cx="90"
                          cy="90"
                          r="60"
                          fill="none"
                          stroke={slice.color}
                          strokeWidth={isHovered ? 21 : 16}
                          strokeDasharray={`${strokeDash} ${circumference}`}
                          strokeDashoffset={strokeOffset}
                          strokeLinecap="round"
                          className="cursor-pointer transition-all duration-200"
                          onMouseEnter={() => setHoveredSlice(slice.name)}
                          onMouseLeave={() => setHoveredSlice(null)}
                        />
                      );
                    });
                  })()}
                </svg>

                {/* Central Labels inside donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-2xl font-black text-slate-800 font-mono leading-none">{totalEventsCount}</span>
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide mt-0.5">{isPt ? 'Eventos' : 'Events'}</span>
                </div>
              </div>

              {/* Right Side list ledger legend */}
              <div className="space-y-2 text-xs">
                {statusDivision.map((slice, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center p-2 rounded-xl border transition-all ${
                      hoveredSlice === slice.name ? 'bg-slate-50 border-slate-200' : 'border-transparent'
                    }`}
                    onMouseEnter={() => setHoveredSlice(slice.name)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-md shrink-0" style={{ backgroundColor: slice.color }}></span>
                      <span className="font-extrabold text-slate-700">{slice.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-slate-500 font-black">
                      <span>{slice.count}</span>
                      <span className="text-[10px] text-slate-400">({slice.percent}%)</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
