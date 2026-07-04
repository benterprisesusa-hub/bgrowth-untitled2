/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Database, Users, Key, CreditCard, Mail, Check, Trash2, Plus, 
  Clock, Shield, Eye, Lock, FileText, LayoutGrid, CheckCircle2, 
  HelpCircle, ExternalLink, RefreshCw, Layers, AlertCircle, Sparkles
} from 'lucide-react';
import { User } from '../types';

interface SubscriptionTeamManagerProps {
  user: User;
  onPlanChange: (plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise') => void;
  onUpdateUser?: (updatedUser: User) => void;
  onBack: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'cleaner' | 'driver';
  joinedAt: string;
}

interface FreelancerAccess {
  id: string;
  name: string;
  expiresAt: Date;
  status: 'Active' | 'Expired';
  code: string;
}

export default function SubscriptionTeamManager({ user, onPlanChange, onUpdateUser, onBack }: SubscriptionTeamManagerProps) {
  const [activeTab, setActiveTab] = useState<'sheets' | 'plans' | 'team' | 'freelancer' | 'payments' | 'appscript' | 'brand'>('sheets');

  // 1. Spreadsheet states
  const [spreadsheetId, setSpreadsheetId] = useState('1BgrowthClub_SingleSpreadsheet_Owner_46282');
  const [spreadsheetName, setSpreadsheetName] = useState('BGrowth_Ecosystem_Edite_Gomes');
  const [ownerPermission, setOwnerPermission] = useState<'read' | 'write'>('read');
  const [createdTabs, setCreatedTabs] = useState<string[]>(['Dashboard_Overview', 'Cleaning_Leads', 'Mileage_Logs']);
  const [newTabName, setNewTabName] = useState('');
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);

  // 2. Team states
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Ana Silva', email: 'ana.clean@bgrowth.club', role: 'cleaner', joinedAt: '2026-06-15' },
    { id: '2', name: 'Lucas Souza', email: 'lucas.ops@bgrowth.club', role: 'manager', joinedAt: '2026-06-20' },
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'owner' | 'manager' | 'cleaner' | 'driver'>('cleaner');

  // 3. Freelancer states
  const [freelancerInvites, setFreelancerInvites] = useState<FreelancerAccess[]>([
    { id: 'f_1', name: 'Carlos Santos (Diarista Temp)', expiresAt: new Date(Date.now() + 10 * 60 * 1000), status: 'Active', code: 'BG-TEMP-8831' }, // 10 mins from now
    { id: 'f_2', name: 'Juliana Lima (Motorista Backup)', expiresAt: new Date(Date.now() - 2 * 60 * 60 * 1000), status: 'Expired', code: 'BG-TEMP-2210' }, // Expired
  ]);
  const [newFreelancerName, setNewFreelancerName] = useState('');
  const [freelancerDuration, setFreelancerDuration] = useState<number>(4); // default 4 hours

  // 4. Payment simulator
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'pix'>('stripe');
  const [pixPayload, setPixPayload] = useState<string | null>(null);
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(true);

  // 5. Apps Script Integration workspace states
  const [selectedScriptTemplate, setSelectedScriptTemplate] = useState<'sheetSync' | 'whatsappWeb' | 'leadWebhook'>('sheetSync');
  const [userScript, setUserScript] = useState(`// Cole aqui seu código do Apps Script para revisar e otimizar!
function enviarMensagens() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = 2; // exemplo simples
  var nome = sheet.getRange(row, 1).getValue();
  var telefone = sheet.getRange(row, 2).getValue();
  
  // Envia mensagem básica sem verificação
  var url = "https://api.whatsapp.com/send?phone=" + telefone + "&text=Ola " + nome;
  MailApp.sendEmail("exemplo@email.com", "Link de Envio", url);
}`);
  const [optimizedScript, setOptimizedScript] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationLogs, setOptimizationLogs] = useState<string[]>([]);
  const [copiedScriptText, setCopiedScriptText] = useState(false);

  // Timer refresh for freelancer countdowns
  const [, setTimeTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync Google Sheets simulation
  const handleSyncSheets = () => {
    setIsSyncingSheets(true);
    setTimeout(() => {
      setIsSyncingSheets(false);
    }, 1500);
  };

  const handleOptimizeScript = () => {
    setIsOptimizing(true);
    setOptimizationLogs([]);
    setOptimizedScript(null);

    const steps = [
      "🔍 [1/5] Lendo código colado e identificando funções principais...",
      "⚡ [2/5] Analisando limites de cota da Google (evitando erros de execução limite de 6min)...",
      "🧹 [3/5] Aplicando otimizações de gravação em Batch (reduzindo chamadas repetidas a getRange/getValue)...",
      "🛡️ [4/5] Adicionando tratamento robusto com blocos Try-Catch e Logs automáticos para auditoria...",
      "✨ [5/5] Injetando guarda de integridade para a arquitetura de Planilha Única e abas dinâmicas!"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setOptimizationLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Formulate highly polished, optimized Apps Script code output!
        const result = `/**
 * @title BGrowth Apps Script - Otimizado por Inteligência Artificial
 * @description Código otimizado para evitar estouro de cotas, com tratamento de erros,
 *              execução em lote (batch processing) e compatibilidade com Planilha Única.
 */
function enviarMensagensOtimizado() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Otimização: Buscamos todos os dados de uma única vez (Batch Get) para economizar chamadas de API
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      Logger.log("Nenhum dado encontrado para processamento.");
      return;
    }
    
    var dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
    var data = dataRange.getValues();
    
    Logger.log("Iniciando processamento em lote de " + data.length + " linhas de forma segura.");
    
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var nome = row[0];       // Coluna A
      var telefone = row[1];   // Coluna B
      var status = row[9] || ""; // Coluna J (Status de envio)
      
      // Proteção de segurança: Evita reenvio duplo se já enviado
      if (status === "ENVIADO_OK") {
        continue;
      }
      
      if (nome && telefone) {
        // Limpa telefone removendo caracteres não numéricos de forma robusta
        var telefoneLimpo = String(telefone).replace(/\\D/g, '');
        if (!telefoneLimpo.startsWith('55') && telefoneLimpo.length <= 11) {
          telefoneLimpo = '55' + telefoneLimpo;
        }
        
        // Geração segura de link do WhatsApp Web com mensagem personalizada
        var mensagem = "Olá " + nome + "! Seu agendamento com a BGrowth está confirmado.";
        var url = "https://api.whatsapp.com/send?phone=" + telefoneLimpo + "&text=" + encodeURIComponent(mensagem);
        
        // Log de simulação de envio
        Logger.log("Link gerado com sucesso para " + nome + ": " + url);
        
        // Registra o status de processamento de volta na planilha para auditar
        sheet.getRange(2 + i, 10).setValue("ENVIADO_OK"); // Coluna J
      }
    }
    
    Logger.log("Processamento seguro finalizado com sucesso!");
    
  } catch (error) {
    Logger.log("FALHA CRÍTICA NO SCRIPT: " + error.toString());
    // Envia alerta de e-mail ao proprietário da planilha para correção rápida
    var ownerEmail = Session.getActiveUser().getEmail();
    if (ownerEmail) {
      MailApp.sendEmail(ownerEmail, "⚠️ Alerta de Falha - Apps Script BGrowth", 
        "Ocorreu uma falha na execução do seu script de agendamentos. Detalhes: " + error.toString());
    }
  }
}`;
        setOptimizedScript(result);
        setIsOptimizing(false);
      }
    }, 600);
  };

  // Add sheet/tab
  const handleAddTab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTabName.trim()) return;
    const cleanName = newTabName.trim().replace(/\s+/g, '_');
    if (!createdTabs.includes(cleanName)) {
      setCreatedTabs([...createdTabs, cleanName]);
    }
    setNewTabName('');
  };

  // Delete tab
  const handleDeleteTab = (tab: string) => {
    if (tab === 'Dashboard_Overview') return; // protect default
    setCreatedTabs(createdTabs.filter(t => t !== tab));
  };

  // Add team member (max 5)
  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    if (teamMembers.length >= 5) {
      alert('Seu plano atual permite até 5 pessoas adicionais!');
      return;
    }
    const newMember: TeamMember = {
      id: 'm_' + Date.now(),
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      joinedAt: new Date().toISOString().split('T')[0]
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName('');
    setNewMemberEmail('');
  };

  // Generate Freelancer link
  const handleGenerateFreelancerLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFreelancerName.trim()) return;
    const randomCode = 'BG-TEMP-' + Math.floor(1000 + Math.random() * 9000);
    const expires = new Date(Date.now() + freelancerDuration * 60 * 60 * 1000);
    
    const newAccess: FreelancerAccess = {
      id: 'f_' + Date.now(),
      name: newFreelancerName,
      expiresAt: expires,
      status: 'Active',
      code: randomCode
    };
    setFreelancerInvites([newAccess, ...freelancerInvites]);
    setNewFreelancerName('');
  };

  // Generate simulated PIX payload
  const handleGeneratePix = () => {
    setIsGeneratingPix(true);
    setTimeout(() => {
      setPixPayload('00020101021226850014br.gov.bcb.pix2563pix.bgrowth.club/qr/prod_9921_bgrowth_enterprise_subscription_550_recurrent');
      setIsGeneratingPix(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Painel de Integração & Infraestrutura
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">Configurações Avançadas de Sistema</h2>
          <p className="text-xs text-slate-500">Veja como funcionam pagamentos, permissões de planilhas de forma segura, múltiplos acessos e convites temporários.</p>
        </div>
        <button 
          onClick={onBack}
          className="text-xs font-black bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
        >
          &larr; Voltar ao BGrowth Hub
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex gap-1 bg-white border border-slate-100 p-1.5 rounded-xl overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('sheets')}
          className={`px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === 'sheets'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4" /> Google Sheets Isolado
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === 'plans'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Lock className="w-4 h-4" /> Planos & Controle de Acesso
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === 'team'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" /> Equipe (Suporta até 5 pessoas)
        </button>
        <button
          onClick={() => setActiveTab('freelancer')}
          className={`px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === 'freelancer'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4" /> Acesso de Freelancers (Expira)
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === 'payments'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4" /> Gateways de Pagamento
        </button>
        <button
          onClick={() => setActiveTab('appscript')}
          className={`px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === 'appscript'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" /> Workspace Google Apps Script
        </button>
        <button
          onClick={() => setActiveTab('brand')}
          className={`px-4 py-2.5 rounded-lg text-xs font-black whitespace-nowrap flex items-center gap-2 transition-all ${
            activeTab === 'brand'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span className="text-sm">🎨</span> Aparência & Customização da Marca
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs min-h-[400px]">
        
        {/* TAB 1: GOOGLE SHEETS */}
        {activeTab === 'sheets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left explanation column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Planilha Única por Dono (Single Spreadsheet Architecture)</h3>
                  <p className="text-xs text-slate-500">
                    Sua preocupação é extremamente válida! Em vez de gerar arquivos separados gerando caos, a infraestrutura da BGrowth vincula <b>uma única Planilha do Google por Owner</b>.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded-xl">
                  <p className="flex gap-2 items-start">
                    <span className="text-indigo-600 font-extrabold">📌</span>
                    <span>
                      <b>Organização em Abas (Tabs):</b> Sempre que você abrir ou ativar um novo sistema/módulo do BGrowth, nosso sistema server-side busca a sua planilha ativa. Se a aba correspondente (Ex: <code>Cleaning_Leads</code>) não existir lá dentro, o app cria uma nova aba dinamicamente sem apagar o restante.
                    </span>
                  </p>
                  <p className="flex gap-2 items-start">
                    <span className="text-indigo-600 font-extrabold">🔒</span>
                    <span>
                      <b>Permissão como Leitor (Read-Only):</b> Sim, conseguimos configurar isso! O arquivo é de propriedade da Service Account (API do sistema) que possui controle total de Escrita/Leitura. Ela compartilha o link com o seu e-mail como <b>"Leitor"</b> (Viewer). Assim, você consegue olhar seus dados em tempo real no Google Sheets, mas o sistema impede que você ou outra pessoa altere colunas manualmente, mantendo a integridade dos dados!
                    </span>
                  </p>
                </div>

                {/* Google Sheet Link simulator */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Configurações de Conexão da API</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Spreadsheet ID Ativo</label>
                      <input 
                        type="text" 
                        value={spreadsheetId}
                        onChange={(e) => setSpreadsheetId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:bg-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Nome do Arquivo Principal</label>
                      <input 
                        type="text" 
                        value={spreadsheetName}
                        onChange={(e) => setSpreadsheetName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:bg-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-black text-amber-900">Modo de Segurança do Proprietário</span>
                    </div>
                    <div className="flex gap-4 text-xs font-bold text-slate-700">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="radio" 
                          name="permissionMode" 
                          checked={ownerPermission === 'read'} 
                          onChange={() => setOwnerPermission('read')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        Leitor / Apenas Visualização (Recomendado)
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="radio" 
                          name="permissionMode" 
                          checked={ownerPermission === 'write'} 
                          onChange={() => setOwnerPermission('write')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        Editor Completo (Alterações Diretas)
                      </label>
                    </div>
                    <p className="text-[10px] text-amber-800 font-medium">
                      {ownerPermission === 'read' 
                        ? '✔️ Apenas nosso servidor edita as linhas. Você fica protegido contra quebras de formatação acidentais!' 
                        : '⚠️ Atenção: Se você mudar cabeçalhos ou a ordem das colunas diretamente no Planilhas, o sistema poderá falhar.'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right interactive preview column */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-4 text-white font-mono text-[11px] flex flex-col justify-between shadow-xl min-h-[380px]">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span className="font-extrabold text-xs text-slate-200">Simulador: Google Sheets API</span>
                    </div>
                    <span className="bg-indigo-900 text-indigo-200 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Connected</span>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-slate-400"># Verificando arquivo associado ao Owner...</p>
                    <p className="text-slate-200 font-bold">📂 Planilha: {spreadsheetName}.xlsx</p>
                    <p className="text-indigo-400 font-bold">🛡️ Acesso do Usuário: {ownerPermission === 'read' ? '👁️ READER (Apenas Leitura)' : '✏️ WRITER (Escrita)'}</p>
                    
                    <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
                      <p className="text-slate-500 text-[10px] uppercase font-black">Abas / Tabs Mapeadas Ativas:</p>
                      
                      <div className="space-y-1.5">
                        {createdTabs.map((tab, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <span className="text-emerald-500">📊</span> {tab}
                            </span>
                            {tab !== 'Dashboard_Overview' && (
                              <button 
                                onClick={() => handleDeleteTab(tab)}
                                className="text-rose-500 hover:text-rose-400 font-bold px-1"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form to simulate new tab creation */}
                    <form onSubmit={handleAddTab} className="flex gap-1.5 mt-2">
                      <input 
                        type="text" 
                        placeholder="Nome_Do_Novo_Modulo" 
                        value={newTabName}
                        onChange={e => setNewTabName(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white outline-none focus:border-indigo-600"
                      />
                      <button 
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 rounded-lg transition-colors"
                      >
                        Criar Aba
                      </button>
                    </form>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <button 
                    onClick={handleSyncSheets}
                    disabled={isSyncingSheets}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {isSyncingSheets ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Sincronizando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" /> Sincronizar Abas agora
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PLANS & ACCESS */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Divisão de Planos & Liberação de Recursos (Feature Gating)</h3>
              <p className="text-xs text-slate-500">
                Sim! Em React conseguimos configurar facilmente travas de segurança por plano. Cada plano ativa ou bloqueia partes específicas do painel de controle.
              </p>
            </div>

            {/* Plan Cards comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              
              {/* Plan 1 */}
              <div className={`border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all ${
                user.plan === 'Starter' ? 'border-blue-500 bg-blue-50/10 ring-1 ring-blue-500/20' : 'border-slate-100 bg-slate-50/50'
              }`}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded-full uppercase">Starter</span>
                    {user.plan === 'Starter' && <span className="text-[10px] text-emerald-600 font-black">● Seu Plano Ativo</span>}
                  </div>
                  <h4 className="text-lg font-black text-slate-900">$49<span className="text-slate-400 text-xs font-normal">/mês</span></h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">Ideal para quem trabalha sozinho em aplicativos de entrega, motoristas ou limpeza de início.</p>
                  
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Acesso ao Mileage Tracker</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Acesso ao Delivery Tracker</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Acesso ao Cleaning Manager</p>
                    <p className="flex items-center gap-1.5 text-slate-400"><span className="text-rose-400">✕</span> Convites de Equipe bloqueados</p>
                    <p className="flex items-center gap-1.5 text-slate-400"><span className="text-rose-400">✕</span> Integração automatizada de Planilhas</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onPlanChange('Starter')}
                  className={`w-full py-2 text-xs font-black rounded-xl transition-all ${
                    user.plan === 'Starter' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {user.plan === 'Starter' ? 'Ativo' : 'Simular Starter'}
                </button>
              </div>

              {/* Plan 2 */}
              <div className={`border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all ${
                user.plan === 'Pro' ? 'border-amber-500 bg-amber-50/10 ring-1 ring-amber-500/20' : 'border-slate-100 bg-slate-50/50'
              }`}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-amber-100 text-amber-700 font-extrabold px-2 py-0.5 rounded-full uppercase">Pro Business</span>
                    {user.plan === 'Pro' && <span className="text-[10px] text-emerald-600 font-black">● Seu Plano Ativo</span>}
                  </div>
                  <h4 className="text-lg font-black text-slate-900">$99<span className="text-slate-400 text-xs font-normal">/mês</span></h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">Perfeito para agências em crescimento que buscam automatização e assistente de inteligência artificial.</p>
                  
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Tudo do plano Starter</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> BGrowth CRM completo</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> BGrowth AI Assistant integrado</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> <b>Acesso a mais 2 Membros</b></p>
                    <p className="flex items-center gap-1.5 text-slate-400"><span className="text-rose-400">✕</span> Acesso a 5 pessoas adicionais</p>
                  </div>
                </div>

                <button
                  onClick={() => onPlanChange('Pro')}
                  className={`w-full py-2 text-xs font-black rounded-xl transition-all ${
                    user.plan === 'Pro' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {user.plan === 'Pro' ? 'Ativo' : 'Simular Pro'}
                </button>
              </div>

              {/* Plan 3 */}
              <div className={`border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all ${
                user.plan === 'Enterprise' ? 'border-purple-500 bg-purple-50/10 ring-1 ring-purple-500/20' : 'border-slate-100 bg-slate-50/50'
              }`}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-purple-100 text-purple-700 font-extrabold px-2 py-0.5 rounded-full uppercase">Enterprise</span>
                    {user.plan === 'Enterprise' && <span className="text-[10px] text-emerald-600 font-black">● Seu Plano Ativo</span>}
                  </div>
                  <h4 className="text-lg font-black text-slate-900">$199<span className="text-slate-400 text-xs font-normal">/mês</span></h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">Infraestrutura robusta de TI, segurança corporativa, múltiplos acessos e relatórios contábeis.</p>
                  
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Todo o Ecosystem desbloqueado</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Financial Hub & Payroll Engine</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> <b>Acesso a mais 5 Membros (Seats)</b></p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Links de Diaristas/Freelancers Temp</p>
                    <p className="flex items-center gap-1.5 text-slate-600"><span className="text-emerald-500">✔</span> Planilha Única em Modo Leitor</p>
                  </div>
                </div>

                <button
                  onClick={() => onPlanChange('Enterprise')}
                  className={`w-full py-2 text-xs font-black rounded-xl transition-all ${
                    user.plan === 'Enterprise' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {user.plan === 'Enterprise' ? 'Ativo' : 'Simular Enterprise'}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: TEAM MEMBERS */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Gestão de Equipe (Planos de 5 Assentos Adicionais)</h3>
                <p className="text-xs text-slate-500">
                  Gerencie quem tem acesso ao sistema do proprietário. O plano <b>Enterprise</b> dá direito a 5 pessoas adicionais.
                </p>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 text-xs font-black text-indigo-700">
                Assentos Utilizados: {teamMembers.length} de 5 disponíveis
              </div>
            </div>

            {user.plan !== 'Enterprise' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-amber-900">
                  <p className="font-extrabold">Seu plano atual simulado ({user.plan}) possui restrições de equipe!</p>
                  <p className="font-semibold text-amber-800">
                    Membros adicionais requerem o plano <b>Enterprise</b> (até 5 pessoas) ou <b>Pro</b> (até 2 pessoas). Altere o simulador no topo ou na aba "Planos" para gerenciar.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form column */}
              <div className="lg:col-span-4 bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Convidar Novo Membro</h4>
                
                <form onSubmit={handleAddTeamMember} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Nome Completo</label>
                    <input 
                      type="text" 
                      placeholder="Ex: João Silva" 
                      value={newMemberName}
                      onChange={e => setNewMemberName(e.target.value)}
                      disabled={user.plan !== 'Enterprise' && user.plan !== 'Pro'}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-white focus:border-indigo-600 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Endereço de E-mail</label>
                    <input 
                      type="email" 
                      placeholder="Ex: joao@email.com" 
                      value={newMemberEmail}
                      onChange={e => setNewMemberEmail(e.target.value)}
                      disabled={user.plan !== 'Enterprise' && user.plan !== 'Pro'}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-white focus:border-indigo-600 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Cargo / Regra de Acesso</label>
                    <select
                      value={newMemberRole}
                      onChange={e => setNewMemberRole(e.target.value as any)}
                      disabled={user.plan !== 'Enterprise' && user.plan !== 'Pro'}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-white focus:border-indigo-600 outline-none"
                    >
                      <option value="manager">Gerente de Operações (Manager)</option>
                      <option value="cleaner">Diarista / Cleaner (Acesso restrito)</option>
                      <option value="driver">Motorista / Driver (Acesso restrito)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={user.plan !== 'Enterprise' && user.plan !== 'Pro'}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Enviar Convite por E-mail
                  </button>
                </form>
              </div>

              {/* Members table column */}
              <div className="lg:col-span-8 space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Membros Ativos da Equipe</h4>
                
                <div className="space-y-2">
                  
                  {/* Default Owner */}
                  <div className="bg-white border border-slate-200/60 p-4 rounded-xl flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">{user.name} (Você)</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{user.email}</p>
                      </div>
                    </div>
                    <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      PROPRIETÁRIO (OWNER)
                    </span>
                  </div>

                  {/* Other members */}
                  {teamMembers.map(m => (
                    <div key={m.id} className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xs">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">{m.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{m.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {m.role}
                        </span>
                        <button
                          onClick={() => setTeamMembers(teamMembers.filter(member => member.id !== m.id))}
                          className="text-slate-300 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {teamMembers.length === 0 && (
                    <p className="text-center text-xs text-slate-400 font-bold py-6">Nenhum membro convidado ainda.</p>
                  )}

                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: FREELANCER TEMPORARY ACCESS */}
        {activeTab === 'freelancer' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Acesso Temporário p/ Freelancers & Terceirizados</h3>
              <p className="text-xs text-slate-500">
                Precisa passar uma agenda do dia para um freelancer sem que ele precise criar conta, senha ou ver dados financeiros do seu negócio? Use chaves temporárias!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Explanatory notes */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-indigo-50/50 p-4 border border-indigo-100/50 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-black text-indigo-900">Como funciona a Chave Temporária?</span>
                  </div>
                  <ul className="space-y-2 text-xs text-indigo-950 leading-relaxed list-disc list-inside">
                    <li>O proprietário gera um <b>Link Mágico com Código Único</b>.</li>
                    <li>Define a duração em horas (Ex: 4h, 8h, 24h, 7 dias).</li>
                    <li>O freelancer acessa o link direto no WhatsApp pelo celular.</li>
                    <li>Eles conseguem preencher o Checklist de Limpeza ou registrar a milhagem do dia diretamente.</li>
                    <li>Passado o tempo estipulado, o link expira imediatamente no banco de dados e o acesso é cancelado.</li>
                  </ul>
                </div>

                {/* Generator Form */}
                <form onSubmit={handleGenerateFreelancerLink} className="bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Gerador de Link de Freelancer</h4>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Nome do Freelancer</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Carlos Santos (Diarista)" 
                      value={newFreelancerName}
                      onChange={e => setNewFreelancerName(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-white focus:border-indigo-600 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Tempo de Validade do Acesso</label>
                    <select
                      value={freelancerDuration}
                      onChange={e => setFreelancerDuration(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-white focus:border-indigo-600 outline-none"
                    >
                      <option value={1}>1 Hora (Limpezas Curtas)</option>
                      <option value={4}>4 Horas (Meio Período)</option>
                      <option value={8}>8 Horas (Período Integral)</option>
                      <option value={24}>24 Horas (Dia Completo)</option>
                      <option value={168}>7 Dias (Temporário Semanal)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Key className="w-4 h-4" /> Criar Chave Temporária
                  </button>
                </form>
              </div>

              {/* Active links list */}
              <div className="lg:col-span-7 space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Links Temporários Criados</h4>
                
                <div className="space-y-3">
                  {freelancerInvites.map(f => {
                    const now = new Date();
                    const timeLeftMs = f.expiresAt.getTime() - now.getTime();
                    const isExpired = timeLeftMs <= 0;
                    
                    let timeString = '';
                    if (!isExpired) {
                      const mins = Math.floor(timeLeftMs / 1000 / 60);
                      const hrs = Math.floor(mins / 60);
                      timeString = hrs > 0 ? `${hrs}h e ${mins % 60}m restantes` : `${mins}m restantes`;
                    }

                    return (
                      <div key={f.id} className={`border p-4 rounded-xl space-y-2.5 transition-all bg-white ${
                        isExpired ? 'border-slate-100 opacity-60' : 'border-indigo-100 shadow-xs'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-black text-slate-900">{f.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Token de Acesso: {f.code}</p>
                          </div>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isExpired ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700 animate-pulse'
                          }`}>
                            {isExpired ? 'Expirado' : 'ATIVO'}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-bold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {isExpired ? `Expirou em: ${f.expiresAt.toLocaleTimeString('pt-BR')}` : `Expira em: ${f.expiresAt.toLocaleTimeString('pt-BR')} (${timeString})`}
                          </span>
                          
                          {!isExpired && (
                            <button
                              onClick={() => {
                                const dummyLink = `https://bgrowth.club/access?token=${f.code}`;
                                navigator.clipboard.writeText(dummyLink);
                                alert('Link copiado para o WhatsApp do Freelancer!');
                              }}
                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                            >
                              Copiar Link WhatsApp &rarr;
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: PAYMENT GATEWAYS (STRIPE & PIX) */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Recebimento de Pagamentos no Sistema (Stripe & PIX)</h3>
              <p className="text-xs text-slate-500">
                Seu ecossistema pode receber pagamentos automáticos de clientes de duas formas principais: Stripe (Cartão de Crédito recorrente ou à vista) e PIX Oficial Dinâmico com QR Code.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Gateways Settings Left */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Gateway Toggles */}
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setSelectedGateway('stripe')}
                    className={`flex-1 py-2 text-xs font-black rounded-lg transition-colors ${
                      selectedGateway === 'stripe' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Stripe (Cartão Internacional)
                  </button>
                  <button
                    onClick={() => setSelectedGateway('pix')}
                    className={`flex-1 py-2 text-xs font-black rounded-lg transition-colors ${
                      selectedGateway === 'pix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    PIX Dinâmico (Brasil)
                  </button>
                </div>

                {/* Stripe Details */}
                {selectedGateway === 'stripe' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-150 rounded-xl">
                      <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Stripe Integration active
                      </p>
                      <p>
                        A API do Stripe permite gerar links de checkout hospedados super seguros para seu site Wix ou aplicativo React. Os pagamentos são creditados diretamente na sua conta bancária.
                      </p>
                      <p className="text-[11px] font-bold text-indigo-600">
                        🔗 Webhooks Automáticos: Quando o cliente paga no Stripe, nosso servidor recebe uma notificação instantânea e atualiza o status do pedido na planilha automaticamente.
                      </p>
                    </div>

                    <div className="border border-slate-100 rounded-xl p-4 space-y-3 bg-white shadow-xs">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Status da Chave do API</h4>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Modo de Produção Stripe:</span>
                        <span className="text-emerald-600 font-extrabold">● ATIVO (Live Mode)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">ID da Conta Conectada:</span>
                        <span className="text-slate-700 font-mono font-bold">acct_1H7B9sK0829</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PIX Details */}
                {selectedGateway === 'pix' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-150 rounded-xl">
                      <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> PIX API Integrado (Banco do Brasil / Efí)
                      </p>
                      <p>
                        O PIX dinâmico gera um QR Code único para cada orçamento ou pedido de cliente. Nosso servidor consulta o banco a cada 5 segundos para aprovar o agendamento automaticamente assim que o PIX for pago.
                      </p>
                    </div>

                    <div className="border border-slate-100 rounded-xl p-4 space-y-3 bg-white shadow-xs">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Configuração de Chave PIX</h4>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Chave PIX Principal (CNPJ, E-mail ou Aleatória)</label>
                        <input 
                          type="text" 
                          defaultValue="pix@bgrowth.club"
                          disabled
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Gateway Interactive Simulator Right */}
              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 text-white font-mono text-[11px] flex flex-col justify-between shadow-xl min-h-[350px]">
                
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-slate-400 font-extrabold uppercase">Webhook Payments Simulator</span>
                    <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[9px] font-black uppercase">Live</span>
                  </div>

                  {selectedGateway === 'stripe' ? (
                    <div className="space-y-3">
                      <p className="text-slate-400"># Simulando Webhook recebido de Checkout do Stripe...</p>
                      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
                        <p className="text-indigo-400 font-extrabold">stripe_webhook.event_received</p>
                        <p className="text-slate-300">"type": "checkout.session.completed"</p>
                        <p className="text-slate-300">"amount_total": 18000 (R$ 180,00)</p>
                        <p className="text-slate-300">"customer_email": "paula@example.com"</p>
                        <p className="text-emerald-400 font-black">"payment_status": "paid"</p>
                      </div>
                      
                      <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-300 p-3 rounded-xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Ação automatizada: O status da planilha "Cleaning_Leads" foi atualizado para "PAGO"!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-center py-2">
                      <p className="text-slate-400 text-left"># Gerador de PIX estático com QR Code dinâmico...</p>
                      
                      {pixPayload ? (
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-xl w-32 h-32 mx-auto flex items-center justify-center">
                            {/* Visual QR Simulator */}
                            <div className="grid grid-cols-6 gap-0.5 w-24 h-24 bg-slate-100 p-1">
                              {Array.from({ length: 36 }).map((_, i) => (
                                <div key={i} className={`w-3.5 h-3.5 ${
                                  (i % 3 === 0 && i % 2 === 0) || i < 6 || i % 7 === 0 || i > 30 ? 'bg-slate-900' : 'bg-transparent'
                                }`}></div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-slate-950 p-2 rounded-xl text-left font-mono text-[9px] text-slate-300 border border-slate-800 select-all overflow-x-auto whitespace-nowrap">
                            {pixPayload}
                          </div>
                          <p className="text-emerald-400 font-bold">✨ Copie o código PIX acima para testar o pagamento simulado!</p>
                        </div>
                      ) : (
                        <div className="py-6 space-y-3">
                          <p className="text-slate-500">Nenhum QR Code gerado para a cobrança.</p>
                          <button
                            onClick={handleGeneratePix}
                            disabled={isGeneratingPix}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold font-sans text-xs flex items-center gap-1.5 mx-auto transition-colors"
                          >
                            {isGeneratingPix ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Gerando Pix...
                              </>
                            ) : (
                              'Gerar PIX Simulado de Teste'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-bold flex justify-between">
                  <span>SSL SECURE ENCRYPTION (AES-256)</span>
                  <span className="text-emerald-500">PCI-DSS COMPLIANT</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: GOOGLE APPS SCRIPT WORKSPACE */}
        {activeTab === 'appscript' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-amber-50 border border-amber-100 text-amber-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  100% Gratuito & Integrado
                </span>
                <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Compatível com Wix & Google Sheets
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Workspace Avançado Google Apps Script</h3>
              <p className="text-xs text-slate-500">
                Você perguntou se conseguimos utilizar seus códigos atuais e sugerir melhorias. <b>Sim, com certeza!</b> Abaixo, disponibilizamos nossos templates otimizados de melhor prática e uma ferramenta inteligente para você analisar, corrigir e otimizar os seus códigos de script atuais.
              </p>
            </div>

            {/* Quick alert on how we optimize */}
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl space-y-1.5 text-xs text-indigo-950">
              <p className="font-extrabold flex items-center gap-1.5">
                💡 Quais são as melhorias recomendadas pela BGrowth?
              </p>
              <ul className="list-disc list-inside space-y-1 text-indigo-900 font-medium pl-1">
                <li><b>Evitar estouro de cotas diárias da Google:</b> Chamadas repetitivas de leitura/escrita a células individuais gastam a cota do plano em segundos. Usamos leitura e gravação em lote (Batch Execution).</li>
                <li><b>Criação de Abas Dinâmicas:</b> Seus códigos antigos podem quebrar se tentarem gravar em uma aba inexistente. Nosso código verifica a existência da aba e a cria com cabeçalhos padronizados em tempo real!</li>
                <li><b>Tratamento robusto de Erros (Try/Catch):</b> Evita que o script pare sem avisar e envia e-mails de alerta automáticos se algo quebrar.</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Select and Copy Optimized Templates */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      1. Escolha um Template Otimizado da BGrowth
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">Copie códigos prontos de alta performance desenvolvidos especificamente para a sua estrutura de planilha única.</p>
                  </div>

                  {/* Switch buttons for templates */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedScriptTemplate('sheetSync')}
                      className={`px-2 py-2 rounded-xl text-[10px] font-black border text-center transition-all ${
                        selectedScriptTemplate === 'sheetSync'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Sincronizar Abas
                    </button>
                    <button
                      onClick={() => setSelectedScriptTemplate('whatsappWeb')}
                      className={`px-2 py-2 rounded-xl text-[10px] font-black border text-center transition-all ${
                        selectedScriptTemplate === 'whatsappWeb'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      WhatsApp Web Link
                    </button>
                    <button
                      onClick={() => setSelectedScriptTemplate('leadWebhook')}
                      className={`px-2 py-2 rounded-xl text-[10px] font-black border text-center transition-all ${
                        selectedScriptTemplate === 'leadWebhook'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Webhook Receiver
                    </button>
                  </div>

                  {/* Code Block rendering */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Código Apps Script do Google (JS)</span>
                      <button
                        onClick={() => {
                          const codeText = selectedScriptTemplate === 'sheetSync' 
                            ? `/**
 * BGrowth - Sincronizador Inteligente do Google Sheets
 * Este script garante que os dados vindos do app sejam gravados na aba correta.
 * Se a aba não existir, ele a cria automaticamente para evitar erros de integridade.
 */
function syncAppToSpreadsheet(moduleName, rowData) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(moduleName);
    
    // Se a aba correspondente não existir no arquivo principal, criamos ela dinamicamente!
    if (!sheet) {
      sheet = ss.insertSheet(moduleName);
      var headers = getHeadersForTab(moduleName);
      sheet.appendRow(headers);
      
      // Estilização bonita para o cabeçalho
      sheet.getRange(1, 1, 1, headers.length)
           .setBackground("#4f46e5")
           .setFontColor("#ffffff")
           .setFontWeight("bold");
    }
    
    // Insere nova linha de dados de forma segura (batch execution)
    sheet.appendRow(rowData);
    Logger.log("Sucesso: Dados adicionados na aba: " + moduleName);
    return { success: true };
    
  } catch (error) {
    Logger.log("Erro ao gravar dados: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

function getHeadersForTab(tabName) {
  if (tabName.indexOf("Cleaning") !== -1) {
    return ["ID", "Data", "Nome do Cliente", "Telefone", "Endereço", "Serviço", "Quartos", "Banheiros", "Valor Estimado", "Status"];
  } else if (tabName.indexOf("Mileage") !== -1) {
    return ["ID", "Data", "Plataforma", "Odômetro Inicial", "Odômetro Final", "Milhas Rodadas", "Dedução", "Notas"];
  }
  return ["ID", "Data", "Dado 1", "Dado 2", "Dado 3", "Status"];
}`
                            : selectedScriptTemplate === 'whatsappWeb'
                            ? `/**
 * BGrowth - Disparador de Alertas WhatsApp Web (Click-To-Chat)
 * Varre as linhas da sua planilha ativa e gera links automáticos de contato,
 * evitando limite de cotas de envio da Google!
 */
function triggerWhatsAppWebAlerts() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    
    Logger.log("Iniciando varredura na planilha de agendamentos...");
    
    for (var i = 2; i <= lastRow; i++) {
      var status = sheet.getRange(i, 10).getValue(); // Coluna J (Status)
      if (status !== "Enviado") {
        var nome = sheet.getRange(i, 3).getValue();  // Coluna C (Nome)
        var fone = String(sheet.getRange(i, 4).getValue()).replace(/\\D/g, ''); // Coluna D (Telefone)
        
        // Garante DDI do Brasil se necessário
        if (fone && !fone.startsWith("55") && fone.length <= 11) {
          fone = "55" + fone;
        }
        
        if (fone) {
          // Link encurtado para envio manual seguro e gratuito
          var msg = "Olá " + nome + "! Confirmamos seu agendamento de limpeza com a BGrowth.";
          var link = "https://api.whatsapp.com/send?phone=" + fone + "&text=" + encodeURIComponent(msg);
          
          sheet.getRange(i, 11).setValue(link); // Salva o Link na Coluna K
          sheet.getRange(i, 10).setValue("Enviado"); // Atualiza Status
          Logger.log("Link gerado com sucesso para " + nome);
        }
      }
    }
  } catch (error) {
    Logger.log("Erro no WhatsApp Trigger: " + error.toString());
  }
}`
                            : `/**
 * BGrowth - Webhook Express com doPost()
 * Permite que seu formulário do Wix ou site de vendas externo envie dados diretamente
 * para a sua planilha Google Sheets de forma instantânea e 100% gratuita!
 */
function doPost(e) {
  try {
    var json = JSON.parse(e.postData.contents);
    var tabName = json.tabName || "Cleaning_Leads";
    
    // Sincroniza dinamicamente usando nossa função de criação de abas
    var rowData = [
      json.id || Utilities.getUuid(),
      new Date(),
      json.name || "Cliente Sem Nome",
      json.phone || "",
      json.address || "",
      json.service || "Limpeza Padrão",
      json.bedrooms || 0,
      json.bathrooms || 0,
      json.value || "180.00",
      "Novo Lead via Webhook"
    ];
    
    syncAppToSpreadsheet(tabName, rowData);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Lead gravado com sucesso"}))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": err.toString()}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}`;
                          navigator.clipboard.writeText(codeText);
                          setCopiedScriptText(true);
                          setTimeout(() => setCopiedScriptText(false), 2000);
                        }}
                        className="bg-white hover:bg-slate-100 text-indigo-600 border border-indigo-100 text-[10px] px-2.5 py-1 rounded-lg font-black transition-colors"
                      >
                        {copiedScriptText ? '✓ Copiado!' : 'Copiar Código'}
                      </button>
                    </div>

                    <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[9.5px] overflow-x-auto max-h-[220px] border border-slate-800">
                      <code>
                        {selectedScriptTemplate === 'sheetSync' && (
                          `// Sincronizador Inteligente de Abas (Google Sheets)\nfunction syncAppToSpreadsheet(moduleName, rowData) {\n  try {\n    var ss = SpreadsheetApp.getActiveSpreadsheet();\n    var sheet = ss.getSheetByName(moduleName);\n    if (!sheet) {\n      sheet = ss.insertSheet(moduleName);\n      var headers = getHeadersForTab(moduleName);\n      sheet.appendRow(headers);\n    }\n    sheet.appendRow(rowData);\n    return { success: true };\n  } catch (error) {\n    return { success: false, error: error.toString() };\n  }\n}`
                        )}
                        {selectedScriptTemplate === 'whatsappWeb' && (
                          `// Disparador de Alertas WhatsApp (Click-To-Chat)\nfunction triggerWhatsAppWebAlerts() {\n  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();\n  var lastRow = sheet.getLastRow();\n  for (var i = 2; i <= lastRow; i++) {\n    var status = sheet.getRange(i, 10).getValue();\n    if (status !== "Enviado") {\n      var nome = sheet.getRange(i, 3).getValue();\n      var fone = String(sheet.getRange(i, 4).getValue()).replace(/\\D/g, '');\n      var msg = "Olá " + nome + "! Confirmamos seu agendamento.";\n      var link = "https://api.whatsapp.com/send?phone=" + fone + "&text=" + encodeURIComponent(msg);\n      sheet.getRange(i, 11).setValue(link);\n      sheet.getRange(i, 10).setValue("Enviado");\n    }\n  }\n}`
                        )}
                        {selectedScriptTemplate === 'leadWebhook' && (
                          `// Webhook Express com doPost() para Wix\nfunction doPost(e) {\n  try {\n    var json = JSON.parse(e.postData.contents);\n    var tabName = json.tabName || "Cleaning_Leads";\n    var rowData = [json.id || Utilities.getUuid(), new Date(), json.name, json.phone, json.address, json.service, json.bedrooms, json.bathrooms, json.value, "Novo Lead"];\n    syncAppToSpreadsheet(tabName, rowData);\n    return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);\n  } catch (err) {\n    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": err.toString()})).setMimeType(ContentService.MimeType.JSON);\n  }\n}`
                        )}
                      </code>
                    </pre>
                  </div>

                  {/* Integration Tutorial steps */}
                  <div className="space-y-2 text-xs border-t border-slate-200/50 pt-3">
                    <h5 className="font-extrabold text-slate-800">Como aplicar esse script na sua planilha:</h5>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-0.5">
                      <li>Abra a sua planilha do Google Sheets vinculada.</li>
                      <li>No menu superior, clique em <b>Extensões &gt; Apps Script</b>.</li>
                      <li>Apague qualquer código de exemplo existente no editor da Google.</li>
                      <li>Cole o código acima e clique em <b>Salvar</b> (ícone de disquete).</li>
                      <li>Execute a função principal ou crie um gatilho para rodar de hora em hora.</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Script Reviewer and Optimizer */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-500 animate-pulse"></span>
                        <span className="text-xs font-black text-slate-200 uppercase tracking-wider">AI Code Reviewer & Optimizer</span>
                      </div>
                      <span className="bg-indigo-950 text-indigo-300 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Connected</span>
                    </div>

                    <p className="text-[11px] text-slate-400">Cole seu código atual do Apps Script abaixo para que nossa inteligência artificial analise e reescreva com as melhores práticas de performance, segurança e abas dinâmicas.</p>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase">Seu Código Atual do Apps Script:</label>
                      <textarea
                        value={userScript}
                        onChange={(e) => setUserScript(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[10px] text-slate-200 focus:border-indigo-500 outline-none h-32 resize-none"
                        placeholder="Cole seu código aqui..."
                      ></textarea>
                    </div>

                    {/* Action buttons */}
                    <button
                      onClick={handleOptimizeScript}
                      disabled={isOptimizing}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      {isOptimizing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analisando e Otimizando Código...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Analisar e Sugerir Melhorias com IA
                        </>
                      )}
                    </button>

                    {/* Progress terminal simulator */}
                    {isOptimizing && (
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[9px] text-amber-400 space-y-1 animate-pulse">
                        <p className="font-extrabold text-slate-400"># Simulador BGrowth Optimizer em execução...</p>
                        {optimizationLogs.map((log, index) => (
                          <p key={index}>{log}</p>
                        ))}
                      </div>
                    )}

                    {/* Results side-by-side or copy block */}
                    {optimizedScript && !isOptimizing && (
                      <div className="space-y-2 animate-fade-in">
                        <div className="bg-emerald-950/50 border border-emerald-800/60 rounded-xl p-3 text-emerald-400 text-[10.5px]">
                          <p className="font-extrabold">🚀 Melhorias sugeridas e aplicadas com sucesso!</p>
                          <ul className="list-disc list-inside space-y-1 text-slate-300 text-[9.5px] mt-1.5 pl-1">
                            <li>Otimizado para gravações em <b>Batch (getValues/setValues)</b>.</li>
                            <li>Adicionado <b>Tratamento de erros robusto (try-catch)</b> com logger.</li>
                            <li>Defesa contra estouro de limite de cota diária de requisições Google.</li>
                            <li>Compatível com a estrutura de Planilha Única e <b>criação automática de abas</b>.</li>
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] text-slate-500">
                            <span>Código Otimizado & Pronto para Uso:</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(optimizedScript);
                                alert("Código otimizado copiado para sua área de transferência!");
                              }}
                              className="bg-slate-800 hover:bg-slate-700 text-white px-2 py-0.5 rounded font-bold border border-slate-700"
                            >
                              Copiar Código Otimizado
                            </button>
                          </div>
                          <pre className="bg-slate-950 border border-slate-800 p-3 rounded-xl font-mono text-[9px] text-slate-300 overflow-x-auto max-h-[220px]">
                            <code>{optimizedScript}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-bold flex justify-between mt-auto">
                    <span>CÓDIGO COMPATÍVEL COM APPS SCRIPT V8</span>
                    <span className="text-emerald-500">CONEXÃO SECURA E CRIPTOGRAFADA</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: APARÊNCIA & CUSTOMIZAÇÃO DA MARCA */}
        {activeTab === 'brand' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  White-label Ativo
                </span>
                <span className="text-[9px] bg-purple-50 border border-purple-100 text-purple-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Personalização em Tempo Real
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Customização da Marca (White-Label)</h3>
              <p className="text-xs text-slate-500">
                Configure a identidade visual do seu sistema. Modifique o logotipo, o nome de exibição e a paleta de cores dominante do painel e de todos os orçamentos/PDFs gerados para seus clientes!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Form Settings */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-5">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    🛠️ Definições de Identidade
                  </h4>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Nome Comercial da Empresa</label>
                    <input
                      type="text"
                      defaultValue={user.companyName || 'BGrowth Cleaning Services'}
                      id="brand_company_name"
                      placeholder="Ex: Prime Cleaning SP, Brilho Extremo..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-indigo-500 outline-none"
                    />
                  </div>

                  {/* Logo URL / Preset Picker */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase block">Logotipo da Empresa (URL ou Emoji)</label>
                    <input
                      type="text"
                      defaultValue={user.logoUrl || ''}
                      id="brand_logo_url"
                      placeholder="Cole o link HTTPS da sua imagem de logo ou use um emoji..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-indigo-500 outline-none"
                    />
                    
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Ou selecione um de nossos Presets Rápidos:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById('brand_logo_url') as HTMLInputElement;
                            if (el) el.value = '⚡';
                          }}
                          className="bg-white border border-slate-150 p-2 rounded-xl text-center hover:bg-slate-50 transition-all"
                        >
                          <span className="text-lg">⚡</span>
                          <p className="text-[9px] font-extrabold text-slate-500 mt-1 uppercase">Relâmpago/Ágil</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById('brand_logo_url') as HTMLInputElement;
                            if (el) el.value = '🍃';
                          }}
                          className="bg-white border border-slate-150 p-2 rounded-xl text-center hover:bg-slate-50 transition-all"
                        >
                          <span className="text-lg">🍃</span>
                          <p className="text-[9px] font-extrabold text-slate-500 mt-1 uppercase">Eco Clean</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById('brand_logo_url') as HTMLInputElement;
                            if (el) el.value = '✨';
                          }}
                          className="bg-white border border-slate-150 p-2 rounded-xl text-center hover:bg-slate-50 transition-all"
                        >
                          <span className="text-lg">✨</span>
                          <p className="text-[9px] font-extrabold text-slate-500 mt-1 uppercase">Brilho/Fácil</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById('brand_logo_url') as HTMLInputElement;
                            if (el) el.value = '👑';
                          }}
                          className="bg-white border border-slate-150 p-2 rounded-xl text-center hover:bg-slate-50 transition-all"
                        >
                          <span className="text-lg">👑</span>
                          <p className="text-[9px] font-extrabold text-slate-500 mt-1 uppercase">Premium Care</p>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Accent Color Picker */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase block">Paleta de Cores Dominante (Tema)</label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {(['indigo', 'emerald', 'rose', 'amber', 'sky', 'violet', 'slate'] as const).map((color) => {
                        const colorMap: Record<string, string> = {
                          indigo: 'bg-indigo-600',
                          emerald: 'bg-emerald-600',
                          rose: 'bg-rose-600',
                          amber: 'bg-amber-600',
                          sky: 'bg-sky-600',
                          violet: 'bg-violet-600',
                          slate: 'bg-slate-800'
                        };
                        return (
                          <button
                            type="button"
                            key={color}
                            onClick={() => {
                              (window as any)._tempThemeColor = color;
                              const btns = document.querySelectorAll('.theme-btn-selector');
                              btns.forEach(b => b.classList.remove('ring-4', 'ring-offset-2', 'ring-indigo-500'));
                              const activeBtn = document.getElementById(`theme_btn_${color}`);
                              if (activeBtn) activeBtn.classList.add('ring-4', 'ring-offset-2', 'ring-indigo-500');
                            }}
                            id={`theme_btn_${color}`}
                            className={`theme-btn-selector w-8 h-8 rounded-full ${colorMap[color]} transition-all flex items-center justify-center text-white ${
                              (user.themeColor || 'indigo') === color ? 'ring-4 ring-offset-2 ring-indigo-500' : ''
                            }`}
                            title={color}
                          >
                            <span className="text-[10px] font-black uppercase">{color[0]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Trigger button */}
                  <button
                    onClick={() => {
                      const nameEl = document.getElementById('brand_company_name') as HTMLInputElement;
                      const logoEl = document.getElementById('brand_logo_url') as HTMLInputElement;
                      const selectedTheme = (window as any)._tempThemeColor || user.themeColor || 'indigo';

                      if (onUpdateUser && nameEl) {
                        onUpdateUser({
                          ...user,
                          companyName: nameEl.value,
                          logoUrl: logoEl ? logoEl.value : '',
                          themeColor: selectedTheme
                        });
                        alert("🎉 Identidade Visual e Customização salvas com sucesso! O tema e nome foram aplicados em todo o ecossistema.");
                      }
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    💾 Salvar Customização & Aplicar na Plataforma
                  </button>

                </div>
              </div>

              {/* Right Column: Interactive Real-time Live Preview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs bg-white">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      👁️ Visualização do Cliente (White-Label)
                    </h4>
                    <p className="text-[11px] text-slate-500">Veja como os orçamentos, propostas de WhatsApp e cabeçalhos serão vistos pelo seu cliente final.</p>
                  </div>

                  {/* Mock Phone Preview Card */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-150 p-4 space-y-4 relative overflow-hidden">
                    
                    {/* Header simulating client view with current customization */}
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                      <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        {user.logoUrl ? (
                          <span>{user.logoUrl.length <= 3 ? user.logoUrl : '🏢'}</span>
                        ) : (
                          <span>🏢</span>
                        )}
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 leading-none">
                          {user.companyName || 'BGrowth Cleaning Services'}
                        </h5>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Orçamento Confirmado</span>
                      </div>
                    </div>

                    {/* Proposal Body */}
                    <div className="space-y-2">
                      <div className="bg-white border border-slate-150 p-3 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-slate-400 uppercase">Proposta de Serviço</span>
                          <span className="text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Ativo</span>
                        </div>
                        <h6 className="text-[11px] font-black text-slate-800">Serviço: Limpeza Residencial Padrão</h6>
                        <div className="grid grid-cols-2 gap-2 text-[9.5px] text-slate-500 font-semibold">
                          <div>📍 Imóvel: Av. Paulista, 1000</div>
                          <div>📅 Data: Quinta-feira</div>
                          <div>🛌 Quartos: 3 bds</div>
                          <div>🚿 Banheiros: 2 bas</div>
                        </div>
                      </div>

                      {/* PDF Preview Button simulating customized color */}
                      <div className="space-y-1.5 pt-1">
                        <button className={`w-full py-2 text-[10px] font-black text-white rounded-xl shadow-xs text-center transition-opacity hover:opacity-90 ${
                          user.themeColor === 'emerald' ? 'bg-emerald-600' :
                          user.themeColor === 'rose' ? 'bg-rose-600' :
                          user.themeColor === 'amber' ? 'bg-amber-600' :
                          user.themeColor === 'sky' ? 'bg-sky-500' :
                          user.themeColor === 'violet' ? 'bg-violet-600' :
                          user.themeColor === 'slate' ? 'bg-slate-800' : 'bg-indigo-600'
                        }`}>
                          📥 Gerar PDF de {user.companyName || 'BGrowth Cleaning Services'}
                        </button>
                        <p className="text-[9px] text-slate-400 text-center font-bold">Botões e links herdarão sua cor tema automaticamente!</p>
                      </div>

                    </div>
                  </div>

                  {/* Trust warning */}
                  <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl text-amber-900 text-xs font-medium space-y-1">
                    <p className="font-extrabold flex items-center gap-1.5">
                      ⚠️ Nota de Arquitetura Planilha Única:
                    </p>
                    <p className="text-amber-800 leading-relaxed text-[10.5px]">
                      Ao alterar o nome ou logo aqui, todos os novos registros enviados para a planilha do Google Sheets através dos Webhooks ou Apps Script incluirão os dados atualizados para manter sua auditoria e inteligência unificada!
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Wix Link Warning Card */}
      <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-xs font-black text-indigo-900 uppercase">🔗 Integração e Link direto no Wix</h4>
          <p className="text-[11px] text-indigo-700 leading-relaxed max-w-2xl">
            Sim! O aplicativo React que estamos construindo é uma **Single Page Application (SPA)** hospedada em container próprio. Você consegue incorporá-lo inteiramente dentro do seu site do Wix de duas formas:
            <br />
            1. **Através de um Botão ou Link de Redirecionamento** no menu do Wix que direciona diretamente para o link seguro do seu app.
            <br />
            2. **Através de um iFrame / Elemento Incorporado (Embed)** no painel do Wix. O app se ajusta perfeitamente de forma responsiva dentro da largura e altura que você definir!
          </p>
        </div>
        <div className="bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl text-center text-xs font-black shadow-sm shrink-0 whitespace-nowrap">
          Wix Integration Ready 🚀
        </div>
      </div>

    </div>
  );
}
