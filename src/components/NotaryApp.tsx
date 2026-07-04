/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Calendar, Plus, Trash2, ArrowLeft, Info, HelpCircle, DollarSign,
  TrendingUp, Download, Database, MapPin, Edit3, CheckCircle, AlertTriangle, Settings,
  ChevronRight, Award, FileText, Check, Clock, UserCheck, RefreshCw, Layers, Printer,
  Search, Filter, BookOpen, ShieldCheck, Mail, Phone, ShoppingBag
} from 'lucide-react';
import { User as UserType, NotaryProfile, JournalSettings, NotaryCustomer, JournalEntry, GeneratedCertificate, NotaryAppointment, NotaryExpense, CertificateTemplate } from '../types';
import { initialCustomers, initialJournalEntries, initialAppointments, initialExpenses, certificateTemplates } from './NotaryData';

interface NotaryAppProps {
  user: UserType;
  onBack: () => void;
}

export default function NotaryApp({ user, onBack }: NotaryAppProps) {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journal' | 'appointments' | 'certificates' | 'customers' | 'finances' | 'compliance'>('dashboard');
  const [journalSubTab, setJournalSubTab] = useState<'digital' | 'physical'>('digital');
  
  // Storage states with LocalStorage persistence
  const [profile, setProfile] = useState<NotaryProfile>({
    fullName: 'Amanda Johnson',
    commissionNum: 'GG 0123456',
    commissionState: 'Florida',
    commissionCounty: 'Orange',
    expirationDate: '2028-05-14',
    signatureUrl: '',
    sealUrl: '',
    status: 'Complete'
  });

  const [settings, setSettings] = useState<JournalSettings>({
    type: 'Digital',
    book: 1,
    page: 23,
    line: 5,
    maxPage: 50,
    maxLine: 10
  });

  const [customers, setCustomers] = useState<NotaryCustomer[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [appointments, setAppointments] = useState<NotaryAppointment[]>([]);
  const [expenses, setExpenses] = useState<NotaryExpense[]>([]);
  const [certificates, setCertificates] = useState<GeneratedCertificate[]>([]);

  // Filtering & Search
  const [customerSearch, setCustomerSearch] = useState('');
  const [journalSearch, setJournalSearch] = useState('');
  const [journalFilterType, setJournalFilterType] = useState('All');
  const [appointmentFilter, setAppointmentFilter] = useState('All');

  // Form Modals states
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showBuildCertificate, setShowBuildCertificate] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // New forms states
  const [newCust, setNewCust] = useState({
    name: '', email: '', phone: '', address: '', county: 'Orange', state: 'FL',
    idType: 'Driver License', idNum: '', idExpiration: ''
  });

  const [newEntry, setNewEntry] = useState({
    customerId: '', customerName: '', actType: 'Acknowledgment', docType: '',
    docDate: new Date().toISOString().slice(0, 10), fee: 10, location: '', notes: '',
    witnessName: ''
  });

  const [newAppt, setNewAppt] = useState({
    date: new Date().toISOString().slice(0, 10), time: '10:00 AM', clientName: '',
    clientPhone: '', clientEmail: '', address: '', signingType: 'Loan Signing',
    fee: 120, notes: '', documents: [
      { name: 'Loan Package', required: true, uploaded: true },
      { name: 'Deed of Trust', required: true, uploaded: true },
      { name: 'Closing Disclosure', required: true, uploaded: true },
      { name: 'ID Verification', required: true, uploaded: false }
    ]
  });

  const [newExp, setNewExp] = useState({
    date: new Date().toISOString().slice(0, 10), category: 'Supplies' as any,
    description: '', amount: 0, paymentMethod: 'Credit Card'
  });

  const [newCert, setNewCert] = useState({
    templateId: 'tpl_fl_ack', clientName: '', county: 'Orange',
    documentDescription: '', generatedText: ''
  });

  // Canvas ref for signature captures
  const customerSigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const notarySigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('bg_notary_profile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedSettings = localStorage.getItem('bg_notary_settings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));

    const savedCustomers = localStorage.getItem('bg_notary_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      setCustomers(initialCustomers);
      localStorage.setItem('bg_notary_customers', JSON.stringify(initialCustomers));
    }

    const savedEntries = localStorage.getItem('bg_notary_entries');
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    } else {
      setJournalEntries(initialJournalEntries);
      localStorage.setItem('bg_notary_entries', JSON.stringify(initialJournalEntries));
    }

    const savedAppts = localStorage.getItem('bg_notary_appts');
    if (savedAppts) {
      setAppointments(JSON.parse(savedAppts));
    } else {
      setAppointments(initialAppointments);
      localStorage.setItem('bg_notary_appts', JSON.stringify(initialAppointments));
    }

    const savedExps = localStorage.getItem('bg_notary_expenses');
    if (savedExps) {
      setExpenses(JSON.parse(savedExps));
    } else {
      setExpenses(initialExpenses);
      localStorage.setItem('bg_notary_expenses', JSON.stringify(initialExpenses));
    }

    const savedCerts = localStorage.getItem('bg_notary_certs');
    if (savedCerts) {
      setCertificates(JSON.parse(savedCerts));
    } else {
      const initialCerts: GeneratedCertificate[] = [
        {
          id: 'CERT-2026-0012',
          certificateNum: 'CERT-2026-0012',
          clientName: 'John Smith',
          actType: 'Acknowledgment',
          date: '2026-06-25',
          notaryName: 'Amanda Johnson',
          commissionNum: 'GG 0123456',
          commissionExpiration: '2028-05-14',
          state: 'FL',
          county: 'Orange',
          documentDescription: 'Power of Attorney for real estate sale',
          generatedText: 'State of Florida\nCounty of Orange\n\nThe foregoing instrument was acknowledged before me by means of [x] physical presence or [ ] online notarization, this 25th day of June, 2026, by John Smith, who is personally known to me or who has produced FL Driver License as identification.'
        }
      ];
      setCertificates(initialCerts);
      localStorage.setItem('bg_notary_certs', JSON.stringify(initialCerts));
    }
  }, []);

  // Utility state synchronization
  const syncCustomers = (list: NotaryCustomer[]) => {
    setCustomers(list);
    localStorage.setItem('bg_notary_customers', JSON.stringify(list));
  };

  const syncJournalEntries = (list: JournalEntry[]) => {
    setJournalEntries(list);
    localStorage.setItem('bg_notary_entries', JSON.stringify(list));
  };

  const syncAppointments = (list: NotaryAppointment[]) => {
    setAppointments(list);
    localStorage.setItem('bg_notary_appts', JSON.stringify(list));
  };

  const syncExpenses = (list: NotaryExpense[]) => {
    setExpenses(list);
    localStorage.setItem('bg_notary_expenses', JSON.stringify(list));
  };

  const syncCertificates = (list: GeneratedCertificate[]) => {
    setCertificates(list);
    localStorage.setItem('bg_notary_certs', JSON.stringify(list));
  };

  const syncProfile = (prof: NotaryProfile) => {
    setProfile(prof);
    localStorage.setItem('bg_notary_profile', JSON.stringify(prof));
  };

  const syncSettings = (sets: JournalSettings) => {
    setSettings(sets);
    localStorage.setItem('bg_notary_settings', JSON.stringify(sets));
  };

  // Financial and KPI calculations
  const totalSigningIncome = appointments.filter(a => a.status === 'Completed').reduce((acc, a) => acc + a.fee, 0);
  const totalJournalFees = journalEntries.filter(e => e.status === 'Complete').reduce((acc, e) => acc + e.fee, 0);
  const totalRevenue = totalSigningIncome + totalJournalFees;
  const totalExpensesValue = expenses.reduce((acc, e) => acc + e.amount, 0);
  const netProfit = totalRevenue - totalExpensesValue;

  const monthEntriesCount = journalEntries.filter(e => e.date.startsWith('2026-06')).length;
  const monthRevenue = journalEntries.filter(e => e.date.startsWith('2026-06')).reduce((acc, e) => acc + e.fee, 0) + 
                       appointments.filter(a => a.status === 'Completed' && a.date.startsWith('2026-06')).reduce((acc, a) => acc + a.fee, 0);

  // Expiration calculation
  const getDaysLeft = (dateStr: string) => {
    const today = new Date('2026-06-29'); // Consistent with system clock
    const target = new Date(dateStr);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const commissionDaysLeft = getDaysLeft(profile.expirationDate);

  // HTML5 Canvas Drawing functions for Digital signatures
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#0f172a'; // slate-900
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    let x = 0;
    let y = 0;

    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x = 0;
    let y = 0;

    if ('touches' in e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawingAndCapture = () => {
    setIsDrawing(false);
  };

  const clearCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Actions
  const handleAddCustomerSubmit = () => {
    if (!newCust.name.trim() || !newCust.email.trim()) {
      alert('Please fill in the Name and Email fields.');
      return;
    }

    // Capture signature image from canvas
    let customerSig = '';
    if (customerSigCanvasRef.current) {
      customerSig = customerSigCanvasRef.current.toDataURL('image/png');
    }

    const initials = newCust.name.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const lastFour = newCust.phone.replace(/\D/g, '').slice(-4) || '0000';
    const customId = `${initials}-${lastFour}`;

    const created: NotaryCustomer = {
      id: customId,
      name: newCust.name,
      email: newCust.email,
      phone: newCust.phone,
      address: newCust.address,
      county: newCust.county,
      state: newCust.state,
      idType: newCust.idType,
      idNum: newCust.idNum,
      idExpiration: newCust.idExpiration,
      dateAdded: new Date().toISOString().slice(0, 10),
      signatureUrl: customerSig || undefined
    };

    syncCustomers([created, ...customers]);
    setShowAddCustomer(false);
    setNewCust({
      name: '', email: '', phone: '', address: '', county: 'Orange', state: 'FL',
      idType: 'Driver License', idNum: '', idExpiration: ''
    });
    alert(`🎉 Customer ${created.name} registered successfully with ID: ${created.id}`);
  };

  const handleAddEntrySubmit = () => {
    if (!newEntry.customerId) {
      alert('Please select or register a customer first.');
      return;
    }

    const selectedCust = customers.find(c => c.id === newEntry.customerId);
    if (!selectedCust) return;

    const newId = `JRN-2026-${String(journalEntries.length + 1246).padStart(6, '0')}`;
    
    // Position logging increment
    let currentLine = settings.line;
    let currentPage = settings.page;
    let nextLine = currentLine + 1;
    let nextPage = currentPage;

    if (nextLine > settings.maxLine) {
      nextLine = 1;
      nextPage++;
    }

    const created: JournalEntry = {
      id: newId,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      book: settings.book,
      page: currentPage,
      line: currentLine,
      customerId: selectedCust.id,
      customerName: selectedCust.name,
      actType: newEntry.actType,
      docType: newEntry.docType || 'General Document',
      docDate: newEntry.docDate,
      fee: Number(newEntry.fee),
      location: newEntry.location || selectedCust.address,
      notes: newEntry.notes,
      status: 'Complete',
      witnessName: newEntry.witnessName || undefined
    };

    // Increment current positions
    if (nextPage <= settings.maxPage) {
      syncSettings({
        ...settings,
        page: nextPage,
        line: nextLine
      });
    }

    syncJournalEntries([created, ...journalEntries]);
    setShowAddEntry(false);
    setNewEntry({
      customerId: '', customerName: '', actType: 'Acknowledgment', docType: '',
      docDate: new Date().toISOString().slice(0, 10), fee: 10, location: '', notes: '',
      witnessName: ''
    });
    alert(`📝 Notarial service logged successfully on Book ${created.book}, Page ${created.page}, Line ${created.line}!`);
  };

  const handleAddAppointmentSubmit = () => {
    if (!newAppt.clientName.trim()) {
      alert('Please enter a Client Name.');
      return;
    }

    const created: NotaryAppointment = {
      id: `APT-${1000 + appointments.length + 9}`,
      date: newAppt.date,
      time: newAppt.time,
      clientName: newAppt.clientName,
      clientPhone: newAppt.clientPhone,
      clientEmail: newAppt.clientEmail,
      address: newAppt.address,
      signingType: newAppt.signingType,
      fee: Number(newAppt.fee),
      status: 'Unassigned',
      notes: newAppt.notes,
      documents: newAppt.documents
    };

    syncAppointments([created, ...appointments]);
    setShowAddAppointment(false);
    setNewAppt({
      date: new Date().toISOString().slice(0, 10), time: '10:00 AM', clientName: '',
      clientPhone: '', clientEmail: '', address: '', signingType: 'Loan Signing',
      fee: 120, notes: '', documents: [
        { name: 'Loan Package', required: true, uploaded: true },
        { name: 'Deed of Trust', required: true, uploaded: true },
        { name: 'Closing Disclosure', required: true, uploaded: true },
        { name: 'ID Verification', required: true, uploaded: false }
      ]
    });
    alert(`📅 New notary appointment successfully requested!`);
  };

  const handleAddExpenseSubmit = () => {
    if (!newExp.description.trim() || newExp.amount <= 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    const created: NotaryExpense = {
      id: `EXP-${String(expenses.length + 1).padStart(3, '0')}`,
      date: newExp.date,
      category: newExp.category,
      description: newExp.description,
      amount: Number(newExp.amount),
      paymentMethod: newExp.paymentMethod
    };

    syncExpenses([created, ...expenses]);
    setShowAddExpense(false);
    setNewExp({
      date: new Date().toISOString().slice(0, 10), category: 'Supplies',
      description: '', amount: 0, paymentMethod: 'Credit Card'
    });
    alert('💸 Expense successfully logged!');
  };

  const handleGenerateCertificateSubmit = () => {
    if (!newCert.clientName.trim()) {
      alert('Please enter a Client Name.');
      return;
    }

    const template = certificateTemplates.find(t => t.id === newCert.templateId) || certificateTemplates[0];
    const certId = `CERT-2026-${String(certificates.length + 13).padStart(4, '0')}`;

    // Fill the standard certificate placeholder text
    const formattedText = template.text
      .replace(/ County of ______________/g, ` County of ${newCert.county}`)
      .replace(/_____ day of ________________, 20____/g, new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }))
      .replace(/_____________________________________/g, newCert.clientName)
      .replace(/____________________________________/g, 'FL Driver License')
      .replace(/___________________________/g, profile.fullName)
      .replace(/On _____________________ before me, _____________________________________, Notary Public/g, `On ${new Date().toLocaleDateString('en-US')} before me, ${profile.fullName}, Notary Public`);

    const created: GeneratedCertificate = {
      id: certId,
      certificateNum: certId,
      clientName: newCert.clientName,
      actType: template.actType,
      date: new Date().toISOString().slice(0, 10),
      notaryName: profile.fullName,
      commissionNum: profile.commissionNum,
      commissionExpiration: profile.expirationDate,
      state: template.state,
      county: newCert.county,
      documentDescription: newCert.documentDescription || 'Official Notarial Certificate attachment',
      generatedText: formattedText
    };

    syncCertificates([created, ...certificates]);
    setShowBuildCertificate(false);
    setNewCert({
      templateId: 'tpl_fl_ack', clientName: '', county: 'Orange',
      documentDescription: '', generatedText: ''
    });
    alert(`📜 Notary Certificate ${created.certificateNum} generated successfully!`);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this Journal Entry?')) {
      syncJournalEntries(journalEntries.filter(e => e.id !== id));
    }
  };

  const handleUpdateApptStatus = (id: string, nextStatus: NotaryAppointment['status']) => {
    syncAppointments(appointments.map(a => a.id === id ? { ...a, status: nextStatus, notaryName: profile.fullName } : a));
  };

  // Printing & exporting template view
  const triggerCertificatePrint = (cert: GeneratedCertificate) => {
    const win = window.open('', '_blank');
    if (!win) return;
    const printHtml = `
      <html>
        <head>
          <title>${cert.certificateNum} - Notary Certificate</title>
          <style>
            body { font-family: 'Georgia', serif; padding: 40px; color: #1e293b; background: white; line-height: 1.6; }
            .border-wrap { border: 15px double #1e3a8a; padding: 30px; border-radius: 8px; max-width: 750px; margin: 0 auto; position: relative; }
            h1 { text-align: center; font-size: 24px; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            h2 { text-align: center; font-size: 14px; font-weight: normal; font-style: italic; color: #64748b; margin-top: 0; margin-bottom: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;}
            .meta-section { display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 14px; font-weight: bold; }
            .cert-text { font-size: 15px; text-align: justify; white-space: pre-wrap; margin-bottom: 40px; }
            .notary-sign { display: flex; justify-content: space-between; margin-top: 40px; align-items: flex-end; }
            .signature-box { width: 250px; border-top: 1px solid #475569; text-align: center; font-size: 12px; font-weight: bold; padding-top: 5px; color: #475569; }
            .notary-seal {
              width: 130px; height: 130px; border: 3px double #1e3a8a; border-radius: 50%;
              display: flex; flex-direction: column; align-items: center; justify-content: center;
              font-family: 'Arial', sans-serif; text-align: center; padding: 5px;
              color: #1e3a8a; font-size: 8px; font-weight: bold; background: white;
            }
            .notary-seal .title { font-size: 9px; border-bottom: 1px solid #1e3a8a; width: 80%; margin-bottom: 2px; }
            .notary-seal .name { font-size: 10px; margin: 2px 0; }
          </style>
        </head>
        <body>
          <div class="border-wrap">
            <h1>NOTARIAL CERTIFICATE</h1>
            <h2>Standard ${cert.actType} State Form</h2>
            
            <div class="meta-section">
              <div>State of: <b>${cert.state}</b></div>
              <div>County of: <b>${cert.county}</b></div>
            </div>

            <div class="cert-text">${cert.generatedText}</div>

            <div class="notary-sign">
              <div class="notary-seal">
                <div>OFFICIAL SEAL</div>
                <div class="name">${cert.notaryName}</div>
                <div class="title">NOTARY PUBLIC</div>
                <div>STATE OF ${cert.state.toUpperCase()}</div>
                <div>Comm. #: ${cert.commissionNum}</div>
                <div>Exp: ${cert.commissionExpiration}</div>
              </div>

              <div>
                <div class="signature-box" style="margin-bottom: 50px;">
                  <div style="height: 40px; font-family: 'Dancing Script', cursive, serif; font-size: 20px; color: #1d4ed8; font-weight: normal; line-height: 40px;">
                    ${cert.notaryName}
                  </div>
                  Notary Signature
                </div>
                
                <div class="signature-box">
                  <div style="height: 40px;"></div>
                  Signer/Client Signature (${cert.clientName})
                </div>
              </div>
            </div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    win.document.write(printHtml);
    win.document.close();
  };

  // Searching / filtering lists
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.id.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredEntries = journalEntries.filter(e => {
    const matchesSearch = e.customerName.toLowerCase().includes(journalSearch.toLowerCase()) ||
                          e.docType.toLowerCase().includes(journalSearch.toLowerCase()) ||
                          e.id.toLowerCase().includes(journalSearch.toLowerCase());
    const matchesType = journalFilterType === 'All' || e.actType === journalFilterType;
    return matchesSearch && matchesType;
  });

  const filteredAppointments = appointments.filter(a => {
    if (appointmentFilter === 'All') return true;
    return a.status === appointmentFilter;
  });

  return (
    <div className="bg-slate-50 text-slate-900 flex flex-col font-sans h-full overflow-y-auto">
      
      {/* Simulation Info Bar */}
      <div className="bg-amber-500 text-slate-950 text-center text-[11px] font-extrabold py-2 px-4 flex items-center justify-center gap-2 shadow-xs shrink-0">
        <Info className="w-4 h-4 shrink-0" />
        <span>Digital Notary Safe: All transactions are processed through isolated database sheets. Status: <b>● Active Secure</b></span>
      </div>

      {/* Module Title Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-30 shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h1 className="text-base font-black tracking-tight text-slate-900 uppercase">
                {user.companyName ? `${user.companyName} Notary` : 'BGrowth Notary Suite'}
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Independent Digital Journal & Signing Desk</p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setShowAddEntry(true); }}
            className="bg-slate-900 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" /> Log Service Entry
          </button>
          <button 
            onClick={() => { setShowBuildCertificate(true); }}
            className="bg-amber-600 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-amber-700 transition-all shadow-md shadow-amber-100"
          >
            <FileText className="w-3.5 h-3.5" /> Build Certificate
          </button>
        </div>
      </header>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
        {([
          { id: 'dashboard', label: '📊 Dashboard' },
          { id: 'journal', label: '📔 Notary Journal' },
          { id: 'appointments', label: '📅 Signings & Appts' },
          { id: 'certificates', label: '📜 Client Certificates' },
          { id: 'customers', label: '👥 Customers DB' },
          { id: 'finances', label: '💸 Finance & Taxes' },
          { id: 'compliance', label: '⚙️ Profile & Compliance' }
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all whitespace-nowrap border ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-50'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Main Welcome Hero / Quick Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Highlight KPI Box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden lg:col-span-2">
                <div className="absolute right-0 bottom-0 opacity-5 font-black text-[180px] pointer-events-none select-none translate-y-10 translate-x-4">
                  $
                </div>
                <div className="relative z-10 space-y-4">
                  <span className="text-[10px] uppercase font-black text-amber-400 tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    Commission Active
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">Total Bookings Revenue YTD</p>
                    <p className="text-4xl font-black tracking-tight mt-1">
                      ${totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                    <div>
                      <p className="text-slate-400">Signing Desk</p>
                      <p className="font-bold text-slate-200">${totalSigningIncome.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Journal Fees</p>
                      <p className="font-bold text-slate-200">${totalJournalFees.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">June Earnings</p>
                      <p className="font-bold text-amber-400">${monthRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Compliance Widget */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Legal Compliance</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Notary Commission</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-3xl font-black text-slate-800">{commissionDaysLeft}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase leading-tight">Days<br />Remaining</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Expiration Date:</span>
                    <span className="font-bold text-slate-800">{profile.expirationDate}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Commission No:</span>
                    <span className="font-bold text-slate-800">{profile.commissionNum}</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mt-1 border border-slate-200/50">
                    <div 
                      className={`h-full rounded-full ${commissionDaysLeft < 100 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${Math.min(100, (commissionDaysLeft / 1460) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0">📔</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Journal Entries</p>
                  <p className="text-sm font-black text-slate-800">{journalEntries.length}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">📅</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Scheduled Signings</p>
                  <p className="text-sm font-black text-slate-800">{appointments.filter(a => a.status !== 'Completed' && a.status !== 'Canceled').length}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">👥</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Clients Logged</p>
                  <p className="text-sm font-black text-slate-800">{customers.length}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg shrink-0">💸</div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Expenses Tracked</p>
                  <p className="text-sm font-black text-rose-600">${totalExpensesValue.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Signing package pipeline & alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Signing Pipeline */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">🚀 Signing Package Tracker</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Track closing package workflows and physical/digital scanbacks.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('appointments')}
                    className="text-[10px] font-black text-amber-600 uppercase hover:underline"
                  >
                    Manage Signings &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
                  {[
                    { label: 'Unassigned', count: appointments.filter(a => a.status === 'Unassigned').length, color: 'bg-slate-100 text-slate-700' },
                    { label: 'Assigned', count: appointments.filter(a => a.status === 'Assigned').length, color: 'bg-blue-100 text-blue-700' },
                    { label: 'En Route', count: appointments.filter(a => a.status === 'En Route').length, color: 'bg-amber-100 text-amber-700' },
                    { label: 'Completed', count: appointments.filter(a => a.status === 'Completed').length, color: 'bg-emerald-100 text-emerald-700' }
                  ].map(step => (
                    <div key={step.label} className={`p-2.5 rounded-xl ${step.color} border border-transparent flex flex-col justify-between h-16 shadow-xs`}>
                      <span className="text-[9px] uppercase font-black tracking-wide opacity-80">{step.label}</span>
                      <span className="text-lg font-black">{step.count}</span>
                    </div>
                  ))}
                </div>

                {/* Quick list of urgent appointments */}
                <div className="space-y-2 pt-2">
                  {appointments.slice(0, 3).map(appt => (
                    <div key={appt.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <div>
                          <p className="font-extrabold text-slate-800">{appt.clientName} &middot; <span className="text-slate-400 font-semibold">{appt.signingType}</span></p>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">{appt.date} @ {appt.time} &middot; {appt.address.split(',')[0]}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 block">${appt.fee}</span>
                        <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">{appt.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Action Checklist & Compliance Alerts */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">⚠️ Action Desk Alerts</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Required compliance tasks & notary alerts.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                    <span className="text-rose-600 font-bold text-base mt-0.5">⚠️</span>
                    <div className="text-[11px] font-semibold text-rose-800">
                      <p className="font-black uppercase text-[9px] tracking-wider text-rose-700">Commission Renewal</p>
                      <p className="mt-0.5">Your commission expires in {commissionDaysLeft} days. Submit renewal form and bond checklist to state office by December.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                    <span className="text-amber-600 font-bold text-base mt-0.5">📔</span>
                    <div className="text-[11px] font-semibold text-amber-800">
                      <p className="font-black uppercase text-[9px] tracking-wider text-amber-700">Manual Book Mirror</p>
                      <p className="mt-0.5">Current position: Book <b>{settings.book}</b>, Page <b>{settings.page}</b>, Line <b>{settings.line}</b>. Keep physical logbook mirrored to remain compliant.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-base mt-0.5">👑</span>
                    <div className="text-[11px] font-semibold text-blue-800">
                      <p className="font-black uppercase text-[9px] tracking-wider text-blue-700">Client Certificates</p>
                      <p className="mt-0.5">You have generated <b>{certificates.length}</b> standardized certificates this month. Stored securely on secure storage bucket.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: JOURNAL (DIGITAL & PHYSICAL MIRRORS) */}
        {activeTab === 'journal' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header controls & Sub-tabs toggle */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xs">
              
              {/* Mirror Subtab selectors */}
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setJournalSubTab('digital')}
                  className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-all ${
                    journalSubTab === 'digital'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  💻 Digital Log View
                </button>
                <button
                  onClick={() => setJournalSubTab('physical')}
                  className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-all ${
                    journalSubTab === 'physical'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  📖 Physical Book Mirror (Compliant)
                </button>
              </div>

              {/* Action and Positioning stats */}
              <div className="flex items-center gap-3">
                <div className="text-xs font-bold text-slate-500 text-center md:text-right">
                  <p className="uppercase text-[9px] text-slate-400 font-black">Manual Book Position</p>
                  <p className="text-slate-800 font-black mt-0.5">Book {settings.book} &middot; Page {settings.page} &middot; Line {settings.line}</p>
                </div>
                <button 
                  onClick={() => { setShowAddEntry(true); }}
                  className="bg-amber-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1 hover:bg-amber-700 transition-all shadow-md shadow-amber-100"
                >
                  <Plus className="w-4 h-4" /> Log Service
                </button>
              </div>
            </div>

            {/* SUB-TAB A: DIGITAL SEARCHABLE LOG */}
            {journalSubTab === 'digital' && (
              <div className="space-y-4">
                
                {/* Search & filtering row */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search entries by customer name, document type or entry ID..."
                      value={journalSearch}
                      onChange={e => setJournalSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
                    />
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <select
                      value={journalFilterType}
                      onChange={e => setJournalFilterType(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                    >
                      <option value="All">All Notarial Acts</option>
                      <option value="Acknowledgment">Acknowledgment</option>
                      <option value="Jurat">Jurat</option>
                      <option value="Oath / Affirmation">Oath / Affirmation</option>
                      <option value="Copy Certification">Copy Certification</option>
                      <option value="Signature Witnessing">Signature Witnessing</option>
                    </select>
                  </div>
                </div>

                {/* Digital logs Table */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          <th className="p-4">Entry ID</th>
                          <th className="p-4">Date/Time</th>
                          <th className="p-4">Book/Pg/Ln</th>
                          <th className="p-4">Signer / Client</th>
                          <th className="p-4">Act Type</th>
                          <th className="p-4">Document Type</th>
                          <th className="p-4 text-right">Fee ($)</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                        {filteredEntries.map(entry => (
                          <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-black text-slate-900">{entry.id}</td>
                            <td className="p-4 text-[11px]">
                              <p className="font-extrabold text-slate-800">{entry.date}</p>
                              <p className="text-slate-400 text-[9px]">{entry.time}</p>
                            </td>
                            <td className="p-4 font-mono font-bold text-[11px] text-slate-500">
                              BK {entry.book} &middot; PG {entry.page} &middot; LN {entry.line}
                            </td>
                            <td className="p-4">
                              <p className="font-black text-slate-900">{entry.customerName}</p>
                              <p className="text-[9px] text-slate-400 uppercase tracking-wide">ID Stored: {entry.customerId}</p>
                            </td>
                            <td className="p-4">
                              <span className="bg-amber-50 text-amber-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-100">
                                {entry.actType}
                              </span>
                            </td>
                            <td className="p-4 text-slate-800 font-bold max-w-[150px] truncate" title={entry.docType}>
                              {entry.docType}
                            </td>
                            <td className="p-4 text-right font-black text-slate-900">
                              ${entry.fee.toFixed(2)}
                            </td>
                            <td className="p-4 text-center">
                              <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide">
                                {entry.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2 justify-end">
                                <button 
                                  onClick={() => setSelectedEntry(entry)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                                  title="Inspect Entry"
                                >
                                  <Info className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteEntry(entry.id)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredEntries.length === 0 && (
                          <tr>
                            <td colSpan={9} className="p-12 text-center text-slate-400 font-bold">No entries matching search criteria found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB B: PHYSICAL BOOK MIRROR */}
            {journalSubTab === 'physical' && (
              <div className="bg-[#fdfbf7] border-4 border-[#5c4033] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden font-serif text-[#332211]">
                <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#f5f1e5]/40 pointer-events-none"></div>
                <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#f5f1e5]/40 pointer-events-none"></div>

                {/* Notebook Header */}
                <div className="border-b-4 border-[#332211] pb-4 mb-6 text-center space-y-1 relative">
                  <div className="absolute left-0 top-0 font-bold text-xs uppercase tracking-wider text-slate-500">
                    Book Page Ref: <b>#{settings.page}</b>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase">Notary Public Manual Logbook</h2>
                  <p className="text-xs font-sans font-bold uppercase tracking-widest text-[#665544]">Mirror Copy &middot; State Certified Record Book</p>
                </div>

                {/* Photorealistic grid layout */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs border-2 border-[#332211]">
                    <thead>
                      <tr className="bg-[#f5f0e1] border-b-2 border-[#332211] text-[9px] font-bold text-[#443322] uppercase tracking-wide">
                        <th className="border-r border-[#332211] p-3 text-center w-8">LN</th>
                        <th className="border-r border-[#332211] p-3 w-28">Date & Time</th>
                        <th className="border-r border-[#332211] p-3 w-40">Signer Full Name & Address</th>
                        <th className="border-r border-[#332211] p-3 w-28">Type of Notarial Act</th>
                        <th className="border-r border-[#332211] p-3 w-32">Document Title & Date</th>
                        <th className="border-r border-[#332211] p-3 w-36">ID Method & Serial #</th>
                        <th className="border-r border-[#332211] p-3 w-16 text-right">Fee</th>
                        <th className="p-3 text-center">Signer Digital Signature</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#332211]">
                      {journalEntries.filter(e => e.page === settings.page).map(row => (
                        <tr key={row.id} className="bg-transparent h-24 align-middle">
                          <td className="border-r border-[#332211] p-2 text-center font-bold text-base bg-[#f5f0e1]/30">{row.line}</td>
                          <td className="border-r border-[#332211] p-2 font-mono leading-tight">
                            <b>{row.date}</b>
                            <p className="text-[10px] text-slate-500 font-sans">{row.time}</p>
                          </td>
                          <td className="border-r border-[#332211] p-2">
                            <p className="font-bold text-sm text-slate-900 font-sans">{row.customerName}</p>
                            <p className="text-[10px] text-[#665544] font-sans italic mt-1 leading-none">
                              {customers.find(c => c.id === row.customerId)?.address || row.location}
                            </p>
                          </td>
                          <td className="border-r border-[#332211] p-2">
                            <span className="font-bold font-sans text-[10px] bg-[#f0e7d5] px-2 py-0.5 rounded-md border border-[#332211]/20">
                              {row.actType}
                            </span>
                          </td>
                          <td className="border-r border-[#332211] p-2">
                            <p className="font-bold text-slate-800">{row.docType}</p>
                            <p className="text-[10px] text-slate-400 font-sans mt-0.5">Dated: {row.docDate}</p>
                          </td>
                          <td className="border-r border-[#332211] p-2 font-mono text-[10.5px]">
                            {(() => {
                              const c = customers.find(cust => cust.id === row.customerId);
                              return c ? (
                                <div>
                                  <span className="font-sans font-bold text-[#665544]">{c.idType}</span>
                                  <p className="text-slate-500 text-[10px] mt-0.5">{c.idNum}</p>
                                </div>
                              ) : <span className="text-slate-400 italic">No credentials</span>;
                            })()}
                          </td>
                          <td className="border-r border-[#332211] p-2 text-right font-bold text-sm">
                            ${row.fee.toFixed(2)}
                          </td>
                          <td className="p-2 text-center">
                            {(() => {
                              const c = customers.find(cust => cust.id === row.customerId);
                              return c?.signatureUrl ? (
                                <img src={c.signatureUrl} alt="Signer Sig" className="h-12 object-contain mx-auto mix-blend-multiply opacity-80" />
                              ) : (
                                <span className="text-[10px] font-sans text-slate-400 italic">Captured in Person</span>
                              );
                            })()}
                          </td>
                        </tr>
                      ))}
                      
                      {/* Empty lines up to MaxLine to perfect the notebook look */}
                      {Array.from({ length: Math.max(0, settings.maxLine - journalEntries.filter(e => e.page === settings.page).length) }).map((_, idx) => {
                        const lineNum = journalEntries.filter(e => e.page === settings.page).length + idx + 1;
                        return (
                          <tr key={`empty-${lineNum}`} className="bg-transparent h-24 align-middle opacity-30 select-none">
                            <td className="border-r border-[#332211] p-2 text-center font-bold text-base bg-[#f5f0e1]/30">{lineNum}</td>
                            <td className="border-r border-[#332211] p-2 font-mono"></td>
                            <td className="border-r border-[#332211] p-2"></td>
                            <td className="border-r border-[#332211] p-2"></td>
                            <td className="border-r border-[#332211] p-2"></td>
                            <td className="border-r border-[#332211] p-2 font-mono"></td>
                            <td className="border-r border-[#332211] p-2 text-right"></td>
                            <td className="p-2 text-center italic text-xs text-slate-300">Mirrored row</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Signer certification footer */}
                <div className="mt-6 border-t-2 border-[#332211] pt-4 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-[#443322] gap-4">
                  <p className="italic">"I certify this journal to be a true and correct record of all notarial acts performed."</p>
                  <div className="flex items-center gap-6">
                    <div>
                      Notary Signature: <b className="font-sans text-sm text-blue-800 ml-1 underline">{profile.fullName}</b>
                    </div>
                    <div>
                      Date: <b className="font-mono ml-1">2026-06-29</b>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: APPOINTMENTS PIPELINE */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                {(['All', 'Unassigned', 'Assigned', 'En Route', 'Completed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setAppointmentFilter(status)}
                    className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${
                      appointmentFilter === status
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowAddAppointment(true)}
                className="bg-slate-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" /> Book Appointment
              </button>
            </div>

            {/* List of Signing Appointments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAppointments.map(appt => (
                <div key={appt.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                  
                  {/* Title and ID */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">{appt.id}</span>
                      <h4 className="text-base font-black text-slate-900 mt-1">{appt.clientName}</h4>
                      <p className="text-xs text-slate-400 font-extrabold uppercase mt-0.5">{appt.signingType}</p>
                    </div>
                    <span className="text-lg font-black text-slate-900">${appt.fee}</span>
                  </div>

                  {/* Date/Time and Location details */}
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{appt.date} @ <b className="text-slate-800">{appt.time}</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate" title={appt.address}>{appt.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Signing Agent: <b className="text-slate-800">{appt.notaryName || 'Not Assigned'}</b></span>
                    </div>
                  </div>

                  {/* Required Documents checklist */}
                  {appt.documents && appt.documents.length > 0 && (
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl space-y-2">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Required Document Packages</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                        {appt.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                            <span className={`w-2 h-2 rounded-full ${doc.uploaded ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                            <span className="truncate" title={doc.name}>{doc.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions depending on Status */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      appt.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : appt.status === 'En Route'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {appt.status}
                    </span>

                    <div className="flex gap-1.5">
                      {appt.status === 'Unassigned' && (
                        <button 
                          onClick={() => handleUpdateApptStatus(appt.id, 'Assigned')}
                          className="bg-slate-900 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg hover:bg-slate-800"
                        >
                          Accept & Assign
                        </button>
                      )}
                      {appt.status === 'Assigned' && (
                        <button 
                          onClick={() => handleUpdateApptStatus(appt.id, 'En Route')}
                          className="bg-amber-600 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg hover:bg-amber-700 shadow-md shadow-amber-100"
                        >
                          Go En Route
                        </button>
                      )}
                      {appt.status === 'En Route' && (
                        <button 
                          onClick={() => {
                            handleUpdateApptStatus(appt.id, 'Completed');
                            // Proactively seed associated client / entry
                            const exists = customers.find(c => c.name.toLowerCase() === appt.clientName.toLowerCase());
                            if (!exists) {
                              const cid = appt.clientName.slice(0, 2).toUpperCase() + '-' + appt.clientPhone.replace(/\D/g, '').slice(-4);
                              syncCustomers([{
                                id: cid,
                                name: appt.clientName,
                                email: appt.clientEmail,
                                phone: appt.clientPhone,
                                address: appt.address,
                                county: 'Orange',
                                state: 'FL',
                                idType: 'Driver License',
                                idNum: 'A-2005-0056',
                                dateAdded: appt.date
                              }, ...customers]);
                            }
                          }}
                          className="bg-emerald-600 text-white font-extrabold text-[11px] px-3 py-1.5 rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-100"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredAppointments.length === 0 && (
                <div className="col-span-2 py-12 text-center text-slate-400 font-bold">No signing packages registered for this category.</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES BUILDER */}
        {activeTab === 'certificates' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">📜 Certified State Forms & Seals</h3>
                <p className="text-xs text-slate-400 mt-0.5">Build and generate printable, legally binding certificate templates integrated with your digital signature & notary seals.</p>
              </div>
              <button 
                onClick={() => setShowBuildCertificate(true)}
                className="bg-amber-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-amber-700 transition-all shadow-md shadow-amber-100"
              >
                Create Certificate
              </button>
            </div>

            {/* List of generated certificates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map(cert => (
                <div key={cert.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Tiny vintage border overlay */}
                  <div className="absolute inset-2 border border-amber-600/15 pointer-events-none rounded-2xl"></div>

                  <div className="relative z-10 space-y-3">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-150 px-2 py-0.5 rounded-full">{cert.certificateNum}</span>
                        <h4 className="text-sm font-black text-slate-900 mt-1.5">{cert.clientName}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Act Type: {cert.actType}</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{cert.date}</span>
                    </div>

                    <p className="text-slate-500 text-xs italic line-clamp-3">
                      "{cert.generatedText}"
                    </p>

                    <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-[10px] text-slate-500 leading-relaxed font-mono">
                      <b>Document Attachment Notes:</b>
                      <p className="truncate italic mt-0.5">"{cert.documentDescription}"</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-extrabold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Seal Stamped
                    </div>

                    <button 
                      onClick={() => triggerCertificatePrint(cert)}
                      className="bg-slate-100 text-slate-700 font-extrabold text-[11px] px-3.5 py-1.5 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print / PDF View
                    </button>
                  </div>
                </div>
              ))}
              {certificates.length === 0 && (
                <div className="col-span-2 py-12 text-center text-slate-400 font-bold">No generated client certificates found.</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS MANAGER */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Search controls */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search customers by name, unique ID, email..."
                  value={customerSearch}
                  onChange={e => setCustomerSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
                />
              </div>

              <button 
                onClick={() => setShowAddCustomer(true)}
                className="bg-slate-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Customer Profile
              </button>
            </div>

            {/* Customers grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map(cust => (
                <div key={cust.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{cust.id}</span>
                        <h4 className="text-base font-black text-slate-900 mt-1">{cust.name}</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">{cust.dateAdded}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{cust.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{cust.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate" title={cust.address}>{cust.address}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-[10px] text-slate-500 font-mono">
                      <span className="font-sans font-bold text-slate-600 block mb-0.5">Credential Verification</span>
                      <p>{cust.idType}: <b className="text-slate-800">{cust.idNum}</b></p>
                      {cust.idExpiration && <p className="mt-0.5">Expires: <b className="text-slate-800">{cust.idExpiration}</b></p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <div className="text-slate-400">
                      Entries Logged: <b className="text-slate-700">{journalEntries.filter(e => e.customerId === cust.id).length}</b>
                    </div>
                    {cust.signatureUrl ? (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-extrabold">
                        <CheckCircle className="w-3.5 h-3.5" /> Signature Captured
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">Signature Pending</span>
                    )}
                  </div>
                </div>
              ))}
              {filteredCustomers.length === 0 && (
                <div className="col-span-3 py-12 text-center text-slate-400 font-bold">No customers found in database.</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: FINANCES & TAX CENTER */}
        {activeTab === 'finances' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Balance Card row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Gross Business Revenue</span>
                <p className="text-2xl font-black text-slate-800 mt-1">${totalRevenue.toFixed(2)}</p>
                <span className="text-[10px] text-slate-400 block mt-1">From notary acts & signing travel fees</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Operating Expenses</span>
                <p className="text-2xl font-black text-rose-600 mt-1">-${totalExpensesValue.toFixed(2)}</p>
                <span className="text-[10px] text-slate-400 block mt-1">Supplies, gas, E&O premium</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Net Taxable Profit</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">${netProfit.toFixed(2)}</p>
                <span className="text-[10px] text-slate-400 block mt-1">Net profit after deductible writeoffs</span>
              </div>
            </div>

            {/* Tax projection and Expenses table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Expenses table */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">💸 Notary Operating Expenses</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Log operating overhead and mileage deductions.</p>
                  </div>
                  <button 
                    onClick={() => setShowAddExpense(true)}
                    className="bg-slate-900 text-white font-extrabold text-[11px] px-3.5 py-2 rounded-xl"
                  >
                    Add Expense
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        <th className="p-3">Date</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Description</th>
                        <th className="p-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                      {expenses.map(exp => (
                        <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-3 font-mono">{exp.date}</td>
                          <td className="p-3">
                            <span className="bg-rose-50 text-rose-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-100">
                              {exp.category}
                            </span>
                          </td>
                          <td className="p-3 text-slate-800">{exp.description}</td>
                          <td className="p-3 text-right font-black text-rose-600">-${exp.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tax Center Estimator */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">📈 Estimated Tax Center</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Self-employment quarterly tax projection calculations.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-semibold">Estimated SE Tax (15.3%):</span>
                      <span className="font-black text-slate-800">${(netProfit * 0.153).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-semibold">Estimated Federal Income Tax (10%):</span>
                      <span className="font-black text-slate-800">${(netProfit * 0.10).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-xs font-bold text-slate-950">
                      <span>Total Estimated Liability:</span>
                      <span className="text-rose-600 font-black">${(netProfit * 0.253).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-[11px] text-amber-800 space-y-1">
                    <span className="font-black text-xs block">💡 Notary Tax Tip</span>
                    <p>Fees charged specifically for notarial acts (signatures) are completely exempt from self-employment tax in the US! Log your acts precisely to minimize tax liability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: COMPLIANCE & SETTINGS */}
        {activeTab === 'compliance' && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            
            {/* Notary Profile form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">👑 Official Commission & Profile Credentials</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage your legal commission metadata to bind into certificates & logs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Full Name (Legal)</label>
                  <input 
                    type="text" 
                    value={profile.fullName}
                    onChange={e => syncProfile({ ...profile, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Commission Number</label>
                  <input 
                    type="text" 
                    value={profile.commissionNum}
                    onChange={e => syncProfile({ ...profile, commissionNum: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">State of Commission</label>
                  <input 
                    type="text" 
                    value={profile.commissionState}
                    onChange={e => syncProfile({ ...profile, commissionState: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">County of Commission</label>
                  <input 
                    type="text" 
                    value={profile.commissionCounty}
                    onChange={e => syncProfile({ ...profile, commissionCounty: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Expiration Date</label>
                  <input 
                    type="date" 
                    value={profile.expirationDate}
                    onChange={e => syncProfile({ ...profile, expirationDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-500">
                ⚠️ Modifying commission information will automatically apply to new standardized certificate builders.
              </div>
            </div>

            {/* Book Page Limits */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">📔 Physical Mirror Page Bounds</h3>
                <p className="text-xs text-slate-400 mt-0.5">Set up physical book margins and row layout bounds.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Max Lines per Page</label>
                  <input 
                    type="number" 
                    value={settings.maxLine}
                    onChange={e => syncSettings({ ...settings, maxLine: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Max Pages in Book</label>
                  <input 
                    type="number" 
                    value={settings.maxPage}
                    onChange={e => syncSettings({ ...settings, maxPage: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER DIALOGS & MODALS */}

      {/* MODAL 1: ADD CUSTOMER */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-5 animate-slide-up">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">👥 Add New Customer Profile</h4>
              <button onClick={() => setShowAddCustomer(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>

            <div className="space-y-3 text-xs max-h-[380px] overflow-y-auto pr-1">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={newCust.name}
                  onChange={e => setNewCust({ ...newCust, name: e.target.value })}
                  placeholder="Ex: John Smith"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    value={newCust.email}
                    onChange={e => setNewCust({ ...newCust, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Phone Number</label>
                  <input 
                    type="text" 
                    value={newCust.phone}
                    onChange={e => setNewCust({ ...newCust, phone: e.target.value })}
                    placeholder="(407) 555-1234"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Address</label>
                <input 
                  type="text" 
                  value={newCust.address}
                  onChange={e => setNewCust({ ...newCust, address: e.target.value })}
                  placeholder="123 Main St, Orlando, FL 32801"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Identification Type</label>
                  <select 
                    value={newCust.idType}
                    onChange={e => setNewCust({ ...newCust, idType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  >
                    <option value="Driver License">Driver License</option>
                    <option value="Passport">Passport</option>
                    <option value="State ID">State ID</option>
                    <option value="Military ID">Military ID</option>
                    <option value="Other ID">Other Credential</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">ID Serial Number</label>
                  <input 
                    type="text" 
                    value={newCust.idNum}
                    onChange={e => setNewCust({ ...newCust, idNum: e.target.value })}
                    placeholder="DL-123-456"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              {/* Signature Capture Canvas */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase">In-Person Signature Pad</label>
                  <button 
                    type="button" 
                    onClick={() => clearCanvas(customerSigCanvasRef)}
                    className="text-[10px] font-bold text-rose-600 hover:underline"
                  >
                    Clear Drawing
                  </button>
                </div>
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden relative">
                  <canvas
                    ref={customerSigCanvasRef}
                    width={380}
                    height={110}
                    onMouseDown={e => startDrawing(e, customerSigCanvasRef)}
                    onMouseMove={e => draw(e, customerSigCanvasRef)}
                    onMouseUp={stopDrawingAndCapture}
                    onMouseLeave={stopDrawingAndCapture}
                    onTouchStart={e => startDrawing(e, customerSigCanvasRef)}
                    onTouchMove={e => draw(e, customerSigCanvasRef)}
                    onTouchEnd={stopDrawingAndCapture}
                    className="w-full h-[110px] cursor-crosshair"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddCustomerSubmit}
              className="w-full bg-slate-900 text-white font-extrabold text-xs py-3 rounded-xl hover:bg-slate-800 transition-all uppercase tracking-wider"
            >
              💾 Save Customer Database Profile
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: LOG SERVICE ENTRY */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-5 animate-slide-up">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">📔 Log Notarial Journal Entry</h4>
              <button onClick={() => setShowAddEntry(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>

            <div className="space-y-3 text-xs max-h-[380px] overflow-y-auto pr-1">
              
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Select Registered Customer</label>
                <select 
                  value={newEntry.customerId}
                  onChange={e => setNewEntry({ ...newEntry, customerId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                >
                  <option value="">-- Choose Signer Customer --</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                  ))}
                </select>
                <p className="text-[9.5px] text-slate-400 mt-0.5">Signer not listed? <button onClick={() => { setShowAddEntry(false); setShowAddCustomer(true); }} className="text-amber-600 font-bold underline">Add new customer profile first</button></p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Notarial Act Type</label>
                  <select 
                    value={newEntry.actType}
                    onChange={e => setNewEntry({ ...newEntry, actType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  >
                    <option value="Acknowledgment">Acknowledgment</option>
                    <option value="Jurat">Jurat</option>
                    <option value="Oath / Affirmation">Oath / Affirmation</option>
                    <option value="Copy Certification">Copy Certification</option>
                    <option value="Signature Witnessing">Signature Witnessing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Notarization Fee Charged ($)</label>
                  <input 
                    type="number" 
                    value={newEntry.fee}
                    onChange={e => setNewEntry({ ...newEntry, fee: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Document Title / Type</label>
                  <input 
                    type="text" 
                    value={newEntry.docType}
                    onChange={e => setNewEntry({ ...newEntry, docType: e.target.value })}
                    placeholder="Ex: Warranty Deed"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Document Execution Date</label>
                  <input 
                    type="date" 
                    value={newEntry.docDate}
                    onChange={e => setNewEntry({ ...newEntry, docDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Notarization Location (Address)</label>
                <input 
                  type="text" 
                  value={newEntry.location}
                  onChange={e => setNewEntry({ ...newEntry, location: e.target.value })}
                  placeholder="Leave empty to use client's registered address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Special Notes / Witness Details</label>
                <textarea 
                  value={newEntry.notes}
                  onChange={e => setNewEntry({ ...newEntry, notes: e.target.value })}
                  placeholder="Ex: John appeared in good spirits, understood the document perfectly..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none h-16 resize-none"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-400 text-center font-bold">
              Position Stamped: Book #{settings.book} &middot; Page #{settings.page} &middot; Line #{settings.line}
            </div>

            <button 
              onClick={handleAddEntrySubmit}
              className="w-full bg-amber-600 text-white font-extrabold text-xs py-3 rounded-xl hover:bg-amber-700 transition-all uppercase tracking-wider shadow-md shadow-amber-100"
            >
              📝 Save Service to Digital & Physical Mirror Journal
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: BOOK APPOINTMENT */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-5 animate-slide-up">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">📅 Book Signing Appointment</h4>
              <button onClick={() => setShowAddAppointment(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>

            <div className="space-y-3 text-xs max-h-[380px] overflow-y-auto pr-1">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Client / Borrower Full Name</label>
                <input 
                  type="text" 
                  value={newAppt.clientName}
                  onChange={e => setNewAppt({ ...newAppt, clientName: e.target.value })}
                  placeholder="Ex: Susan Miller"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Client Phone</label>
                  <input 
                    type="text" 
                    value={newAppt.clientPhone}
                    onChange={e => setNewAppt({ ...newAppt, clientPhone: e.target.value })}
                    placeholder="(407) 555-4411"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Client Email</label>
                  <input 
                    type="email" 
                    value={newAppt.clientEmail}
                    onChange={e => setNewAppt({ ...newAppt, clientEmail: e.target.value })}
                    placeholder="susan@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Signing Type</label>
                  <select 
                    value={newAppt.signingType}
                    onChange={e => setNewAppt({ ...newAppt, signingType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  >
                    <option value="Loan Signing">Loan Signing</option>
                    <option value="Refinance">Refinance</option>
                    <option value="Seller Only">Seller Only</option>
                    <option value="Jurat">Jurat Package</option>
                    <option value="Acknowledgment">Acknowledgment Form</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Quoted Flat Fee ($)</label>
                  <input 
                    type="number" 
                    value={newAppt.fee}
                    onChange={e => setNewAppt({ ...newAppt, fee: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Signing Location Address</label>
                <input 
                  type="text" 
                  value={newAppt.address}
                  onChange={e => setNewAppt({ ...newAppt, address: e.target.value })}
                  placeholder="101 Lake Dr, St. Cloud, FL 34769"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Scheduling Notes & Travel Details</label>
                <textarea 
                  value={newAppt.notes}
                  onChange={e => setNewAppt({ ...newAppt, notes: e.target.value })}
                  placeholder="Ex: FedEx return label pre-packaged. Signer needs dual-tray documents printed."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none h-16 resize-none"
                />
              </div>
            </div>

            <button 
              onClick={handleAddAppointmentSubmit}
              className="w-full bg-slate-900 text-white font-extrabold text-xs py-3 rounded-xl hover:bg-slate-800 transition-all uppercase tracking-wider"
            >
              📅 Schedule Appointment & Launch Workflow
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: EXPENSE OVERHEAD LOG */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4 animate-slide-up">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">💸 Log Operating Expense</h4>
              <button onClick={() => setShowAddExpense(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Expense Date</label>
                <input 
                  type="date" 
                  value={newExp.date}
                  onChange={e => setNewExp({ ...newExp, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Category</label>
                  <select 
                    value={newExp.category}
                    onChange={e => setNewExp({ ...newExp, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  >
                    <option value="Gas">Gas & Transit</option>
                    <option value="Supplies">Supplies & Ink</option>
                    <option value="Printing">Printing Bound</option>
                    <option value="Tolls">Tolls Charge</option>
                    <option value="Insurance">E&O Insurance</option>
                    <option value="Other">Other Expenses</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Amount ($)</label>
                  <input 
                    type="number" 
                    value={newExp.amount || ''}
                    onChange={e => setNewExp({ ...newExp, amount: Number(e.target.value) })}
                    placeholder="0.00"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Overhead Description</label>
                <input 
                  type="text" 
                  value={newExp.description}
                  onChange={e => setNewExp({ ...newExp, description: e.target.value })}
                  placeholder="Ex: Laser printer dual-tray toner cartridge"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Payment Method</label>
                <input 
                  type="text" 
                  value={newExp.paymentMethod}
                  onChange={e => setNewExp({ ...newExp, paymentMethod: e.target.value })}
                  placeholder="Ex: Credit Card (Chase)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>
            </div>

            <button 
              onClick={handleAddExpenseSubmit}
              className="w-full bg-rose-600 text-white font-extrabold text-xs py-3 rounded-xl hover:bg-rose-700 transition-all uppercase tracking-wider"
            >
              💸 Log Overhead Expense
            </button>
          </div>
        </div>
      )}

      {/* MODAL 5: BUILD NOTARY CERTIFICATE */}
      {showBuildCertificate && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 w-full max-w-xl shadow-2xl space-y-5 animate-slide-up">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">📜 Generate Official Notary Certificate Attachment</h4>
              <button onClick={() => setShowBuildCertificate(false)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Build settings form */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">State Certificate Template</label>
                  <select 
                    value={newCert.templateId}
                    onChange={e => setNewCert({ ...newCert, templateId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  >
                    {certificateTemplates.map(tpl => (
                      <option key={tpl.id} value={tpl.id}>{tpl.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Client / Signer Name</label>
                  <input 
                    type="text" 
                    value={newCert.clientName}
                    onChange={e => setNewCert({ ...newCert, clientName: e.target.value })}
                    placeholder="Ex: John Smith"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Execution County</label>
                  <input 
                    type="text" 
                    value={newCert.county}
                    onChange={e => setNewCert({ ...newCert, county: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Main Document Description</label>
                  <input 
                    type="text" 
                    value={newCert.documentDescription}
                    onChange={e => setNewCert({ ...newCert, documentDescription: e.target.value })}
                    placeholder="Ex: Real estate sale Power of Attorney attachment"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              {/* Dynamic preview block */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-[#fcf9f0] space-y-3 relative font-serif text-[#321] text-[11px] leading-relaxed max-h-[280px] overflow-y-auto">
                <div className="absolute inset-1 border border-amber-600/10 pointer-events-none rounded-xl"></div>
                <p className="text-center font-sans font-black text-[9px] uppercase text-amber-700 tracking-widest bg-amber-50 rounded-md border border-amber-200 py-0.5">Live Live Seal Preview</p>
                
                <p className="font-bold border-b border-slate-300 pb-1 font-sans text-[10px] uppercase">
                  State of {certificateTemplates.find(t => t.id === newCert.templateId)?.state || 'FL'} &middot; County of {newCert.county}
                </p>

                <p className="italic text-slate-600">
                  {(() => {
                    const template = certificateTemplates.find(t => t.id === newCert.templateId) || certificateTemplates[0];
                    return template.text
                      .replace(/ County of ______________/g, ` County of ${newCert.county}`)
                      .replace(/_____ day of ________________, 20____/g, new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }))
                      .replace(/_____________________________________/g, newCert.clientName || '[Client Name]')
                      .replace(/____________________________________/g, 'FL Driver License')
                      .replace(/___________________________/g, profile.fullName)
                      .replace(/On _____________________ before me, _____________________________________, Notary Public/g, `On ${new Date().toLocaleDateString('en-US')} before me, ${profile.fullName}, Notary Public`);
                  })()}
                </p>

                {/* Micro visual stamp seal representation */}
                <div className="pt-2 border-t border-dashed border-slate-300 flex justify-between items-center text-[8px] font-sans font-bold text-blue-800">
                  <div className="border-2 border-blue-800 rounded-full w-14 h-14 flex flex-col items-center justify-center text-center leading-none">
                    <span>SEAL</span>
                    <span className="text-[6px]">{profile.fullName.slice(0, 10)}</span>
                    <span className="text-[5px]">FL GG 0123456</span>
                  </div>
                  <div className="text-right">
                    <p className="italic text-slate-500 font-serif">Signed digitally</p>
                    <p className="font-black underline">{profile.fullName}</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerateCertificateSubmit}
              className="w-full bg-amber-600 text-white font-extrabold text-xs py-3 rounded-xl hover:bg-amber-700 transition-all uppercase tracking-wider shadow-md shadow-amber-100"
            >
              📜 Generate Official Certified Form & Stamp Seal
            </button>
          </div>
        </div>
      )}

      {/* INSPECT ENTRY DIALOG POPUP */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4 animate-slide-up">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{selectedEntry.id}</span>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mt-1">Journal Entry Inspection</h4>
              </div>
              <button onClick={() => setSelectedEntry(null)} className="text-slate-400 hover:text-slate-600 text-lg">&times;</button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-500">
                <div>
                  Position: <b className="text-slate-800">BK {selectedEntry.book}, PG {selectedEntry.page}, LN {selectedEntry.line}</b>
                </div>
                <div>
                  Fee: <b className="text-emerald-600">${selectedEntry.fee.toFixed(2)}</b>
                </div>
                <div>
                  Date: <b className="text-slate-800">{selectedEntry.date}</b>
                </div>
                <div>
                  Time: <b className="text-slate-800">{selectedEntry.time}</b>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2.5 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400">Signer / Client</span>
                <p className="font-extrabold text-slate-800">{selectedEntry.customerName}</p>
                <p className="text-[10px] text-slate-500">{customers.find(c => c.id === selectedEntry.customerId)?.address || selectedEntry.location}</p>
              </div>

              <div className="border-t border-slate-100 pt-2.5 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400">Notarized Document</span>
                <p className="font-extrabold text-slate-800">{selectedEntry.docType}</p>
                <p className="text-[10px] text-slate-500">Document Execution Date: {selectedEntry.docDate}</p>
              </div>

              {selectedEntry.notes && (
                <div className="bg-slate-50 p-2.5 border border-slate-100 rounded-xl text-[11px] italic text-slate-600">
                  "{selectedEntry.notes}"
                </div>
              )}

              {/* Digital Signature visualization */}
              {customers.find(c => c.id === selectedEntry.customerId)?.signatureUrl && (
                <div className="border-t border-slate-100 pt-2.5">
                  <span className="text-[10px] font-black uppercase text-slate-400">In-Person Digital Signature</span>
                  <img 
                    src={customers.find(c => c.id === selectedEntry.customerId)?.signatureUrl} 
                    alt="Digital Sig" 
                    className="h-10 object-contain mt-1 mix-blend-multiply" 
                  />
                </div>
              )}
            </div>

            <button 
              onClick={() => setSelectedEntry(null)}
              className="w-full bg-slate-900 text-white font-extrabold text-xs py-2.5 rounded-xl hover:bg-slate-800"
            >
              Done Inspecting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
