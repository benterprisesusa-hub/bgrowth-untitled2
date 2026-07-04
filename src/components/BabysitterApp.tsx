import React, { useState, useEffect } from 'react';
import {
  Heart, ShieldAlert, Calendar, DollarSign, MessageSquare, FileText,
  CheckCircle2, Clock, MapPin, Sparkles, Trash2, Plus, Search, LogOut,
  Globe, Activity, Shield, Star, User, Users, Camera, Mic, Video, Phone,
  AlertTriangle, ChevronRight, X, Send, Lock, RefreshCw, Eye, BookOpen,
  Check, ArrowRight, UserCheck, ShieldCheck, Download, Award
} from 'lucide-react';

// Language translation utility helper
type Lang = 'pt' | 'en' | 'es' | 'fr';

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  pt: {
    title: 'BGrowth Babysitter™',
    subtitle: 'Gestão Completa de Babás & Cuidados Infantis',
    families: 'Famílias',
    nannies: 'Babás/Nannies',
    agencies: 'Agências',
    switchRole: 'Selecione o Perfil de Usuário:',
    activeProfile: 'Perfil Ativo',
    dashboard: 'Dashboard',
    scheduling: 'Agenda Inteligente',
    familiesMgmt: 'Gestão de Famílias',
    nanniesMgmt: 'Gestão de Babás',
    chat: 'Comunicação',
    library: 'Biblioteca & Contratos',
    finances: 'Financeiro',
    reviews: 'Avaliações',
    sosButton: '🚨 SOS EMERGÊNCIA',
    nextAppt: 'Próximo Agendamento',
    arrival: 'Horário de Chegada',
    pendingPay: 'Pagamentos Pendentes',
    latestMsgs: 'Últimas Mensagens',
    alerts: 'Alertas Importantes',
    dayActivities: 'Atividades do Dia',
    weeklySum: 'Resumo Semanal',
    hoursWorked: 'Horas Trabalhadas',
    weeklyEarn: 'Ganhos da Semana',
    distance: 'Distância Percorrida',
    favClients: 'Clientes Favoritos',
    avgRating: 'Avaliação Média',
    nanniesAvail: 'Babás Disponíveis',
    activeClients: 'Clientes Ativos',
    revenue: 'Receita Total',
    cancellations: 'Cancelamentos',
    newSignups: 'Novos Cadastros',
    nannyRanking: 'Ranking de Babás',
    addChild: 'Adicionar Criança',
    registerFamily: 'Cadastrar Família',
    healthRoutine: 'Saúde e Rotina',
    allergies: 'Alergias',
    medications: 'Medicamentos',
    bloodType: 'Tipo Sanguíneo',
    diet: 'Restrição Alimentar',
    sleepTime: 'Horário de Dormir',
    pickupAuth: 'Pessoas Autorizadas',
    checkinout: 'Check-in & Check-out',
    dailyReport: 'Relatório Diário',
    timeline: 'Linha do Tempo',
    iaAssistant: 'Assistente Inteligente IA BGrowth',
    askIaPlaceholder: 'Pergunte sobre primeiros socorros, atividades educativas ou peça para resumir o dia...',
    generateDailyReport: 'Gerar Relatório com IA',
    suggestActivities: 'Sugerir Atividades',
    firstAidHelp: 'Primeiros Socorros',
    medicalDisclaimer: 'Nota: A IA fornece diretrizes educativas e de primeiros socorros. Nunca substitui atendimento médico profissional.',
    checkinSuccess: 'Check-in realizado com sucesso!',
    checkoutSuccess: 'Check-out realizado com sucesso!',
    sosTriggered: 'Alerta SOS disparado! Coordenadas, informações de saúde e contatos de emergência foram compartilhados imediatamente.',
    noConflicts: 'Nenhum conflito de horários detectado.',
    scheduleSuccess: 'Agendamento cadastrado com sucesso!',
    newNanny: 'Cadastrar Nova Babá',
    emergencyContacts: 'Contatos de Emergência',
    addDocument: 'Adicionar Documento',
    vaccine: 'Carteira de Vacinação',
    contract: 'Contrato Digital',
    signContract: 'Assinar Contrato',
    overtime: 'Hora Extra',
    midnight: 'Madrugada',
    holiday: 'Feriado',
    weekend: 'Fim de Semana',
    rate: 'Valor Hora',
    receiveHome: 'Receber Criança em Casa',
    takeDoctor: 'Levar Criança ao Médico',
  },
  en: {
    title: 'BGrowth Babysitter™',
    subtitle: 'Complete Childcare Business Management Platform',
    families: 'Families',
    nannies: 'Babysitters/Nannies',
    agencies: 'Agencies',
    switchRole: 'Select User Profile:',
    activeProfile: 'Active Profile',
    dashboard: 'Dashboard',
    scheduling: 'Smart Scheduling',
    familiesMgmt: 'Manage Families',
    nanniesMgmt: 'Manage Babysitters',
    chat: 'Communication',
    library: 'Library & Contracts',
    finances: 'Financials',
    reviews: 'Reviews',
    sosButton: '🚨 SOS EMERGENCY',
    nextAppt: 'Next Appointment',
    arrival: 'Arrival Time',
    pendingPay: 'Pending Payments',
    latestMsgs: 'Latest Messages',
    alerts: 'Important Alerts',
    dayActivities: 'Daily Activities',
    weeklySum: 'Weekly Summary',
    hoursWorked: 'Hours Worked',
    weeklyEarn: 'Weekly Earnings',
    distance: 'Distance Traveled',
    favClients: 'Favorite Clients',
    avgRating: 'Average Rating',
    nanniesAvail: 'Available Nannies',
    activeClients: 'Active Clients',
    revenue: 'Total Revenue',
    cancellations: 'Cancellations',
    newSignups: 'New Signups',
    nannyRanking: 'Nannies Ranking',
    addChild: 'Add Child',
    registerFamily: 'Register Family',
    healthRoutine: 'Health & Routine',
    allergies: 'Allergies',
    medications: 'Medications',
    bloodType: 'Blood Type',
    diet: 'Dietary Restrictions',
    sleepTime: 'Sleep Schedule',
    pickupAuth: 'Authorized Pickups',
    checkinout: 'Check-In & Check-Out',
    dailyReport: 'Daily Report',
    timeline: 'Activity Timeline',
    iaAssistant: 'BGrowth Intelligent IA Assistant',
    askIaPlaceholder: 'Ask about first aid, educational activities or request a summary of the day...',
    generateDailyReport: 'Generate AI Report',
    suggestActivities: 'Suggest Activities',
    firstAidHelp: 'First Aid Guide',
    medicalDisclaimer: 'Note: AI provides educational guidelines and first aid. Never replaces professional medical care.',
    checkinSuccess: 'Check-in registered successfully!',
    checkoutSuccess: 'Check-out registered successfully!',
    sosTriggered: 'SOS Alert Dispatched! Current location, health files, and emergency contacts shared immediately.',
    noConflicts: 'No schedule conflicts detected.',
    scheduleSuccess: 'Appointment booked successfully!',
    newNanny: 'Register New Babysitter',
    emergencyContacts: 'Emergency Contacts',
    addDocument: 'Add Document',
    vaccine: 'Vaccination Record',
    contract: 'Digital Contract',
    signContract: 'Sign Contract',
    overtime: 'Overtime',
    midnight: 'Midnight Shift',
    holiday: 'Holiday Rate',
    weekend: 'Weekend Rate',
    rate: 'Hourly Rate',
    receiveHome: 'Receive Child at Home',
    takeDoctor: 'Take Child to Doctor',
  },
  es: {
    title: 'BGrowth Babysitter™',
    subtitle: 'Gestión Completa de Niñeras y Cuidado Infantil',
    families: 'Familias',
    nannies: 'Niñeras/Nannies',
    agencies: 'Agencias',
    switchRole: 'Seleccione el Perfil de Usuario:',
    activeProfile: 'Perfil Activo',
    dashboard: 'Tablero',
    scheduling: 'Agenda Inteligente',
    familiesMgmt: 'Gestión de Familias',
    nanniesMgmt: 'Gestión de Niñeras',
    chat: 'Comunicación',
    library: 'Biblioteca y Contratos',
    finances: 'Finanzas',
    reviews: 'Evaluaciones',
    sosButton: '🚨 SOS EMERGENCIA',
    nextAppt: 'Próxima Cita',
    arrival: 'Hora de Llegada',
    pendingPay: 'Pagos Pendientes',
    latestMsgs: 'Últimos Mensajes',
    alerts: 'Alertas Importantes',
    dayActivities: 'Actividades del Día',
    weeklySum: 'Resumen Semanal',
    hoursWorked: 'Horas Trabajadas',
    weeklyEarn: 'Ganancias de la Semana',
    distance: 'Distancia Recorrida',
    favClients: 'Clientes Favoritos',
    avgRating: 'Calificación Promedio',
    nanniesAvail: 'Niñeras Disponibles',
    activeClients: 'Clientes Activos',
    revenue: 'Ingresos Totales',
    cancellations: 'Cancelaciones',
    newSignups: 'Nuevos Registros',
    nannyRanking: 'Ranking de Niñeras',
    addChild: 'Agregar Niño',
    registerFamily: 'Registrar Familia',
    healthRoutine: 'Salud y Rutina',
    allergies: 'Alergias',
    medications: 'Medicamentos',
    bloodType: 'Tipo de Sangre',
    diet: 'Restricciones Alimenticias',
    sleepTime: 'Horario de Dormir',
    pickupAuth: 'Personas Autorizadas',
    checkinout: 'Check-in y Check-out',
    dailyReport: 'Reporte Diario',
    timeline: 'Línea de Tiempo',
    iaAssistant: 'Asistente Inteligente IA BGrowth',
    askIaPlaceholder: 'Pregunte sobre primeros auxilios, actividades educativas o pida un resumen...',
    generateDailyReport: 'Generar Reporte con IA',
    suggestActivities: 'Sugerir Actividades',
    firstAidHelp: 'Primeros Auxilios',
    medicalDisclaimer: 'Nota: La IA proporciona guías educativas. Nunca sustituye el diagnóstico médico profesional.',
    checkinSuccess: '¡Check-in realizado con éxito!',
    checkoutSuccess: '¡Check-out realizado con éxito!',
    sosTriggered: '¡Alerta SOS enviada! Ubicación actual, ficha de salud y contactos compartidos de inmediato.',
    noConflicts: 'No se detectaron conflictos de agenda.',
    scheduleSuccess: '¡Cita programada con éxito!',
    newNanny: 'Registrar Nueva Niñera',
    emergencyContacts: 'Contactos de Emergencia',
    addDocument: 'Agregar Documento',
    vaccine: 'Carnet de Vacunación',
    contract: 'Contrato Digital',
    signContract: 'Firmar Contrato',
    overtime: 'Hora Extra',
    midnight: 'Horario Nocturno',
    holiday: 'Día Feriado',
    weekend: 'Fin de Semana',
    rate: 'Precio Hora',
    receiveHome: 'Recibir Niño en Casa',
    takeDoctor: 'Llevar Niño al Médico',
  },
  fr: {
    title: 'BGrowth Babysitter™',
    subtitle: 'Gestion Complète de Baby-sitting & Garde d\'Enfants',
    families: 'Familles',
    nannies: 'Nounous/Nannies',
    agencies: 'Agences',
    switchRole: 'Sélectionnez le Profil Utilisateur:',
    activeProfile: 'Profil Actif',
    dashboard: 'Tableau de Bord',
    scheduling: 'Planning Intelligent',
    familiesMgmt: 'Gestion des Familles',
    nanniesMgmt: 'Gestion des Nounous',
    chat: 'Communication',
    library: 'Bibliothèque & Contrats',
    finances: 'Finances',
    reviews: 'Évaluations',
    sosButton: '🚨 SOS URGENCE',
    nextAppt: 'Prochain Rendez-vous',
    arrival: 'Heure d\'Arrivée',
    pendingPay: 'Paiements en Attente',
    latestMsgs: 'Derniers Messages',
    alerts: 'Alertes Importantes',
    dayActivities: 'Activités du Jour',
    weeklySum: 'Résumé Hebdomadaire',
    hoursWorked: 'Heures Travaillées',
    weeklyEarn: 'Gains de la Semaine',
    distance: 'Distance Parcourue',
    favClients: 'Clients Favoris',
    avgRating: 'Note Moyenne',
    nanniesAvail: 'Nounous Disponibles',
    activeClients: 'Clients Actifs',
    revenue: 'Revenu Total',
    cancellations: 'Annulations',
    newSignups: 'Nouveaux Inscrits',
    nannyRanking: 'Classement des Nounous',
    addChild: 'Ajouter Enfant',
    registerFamily: 'Inscrire une Famille',
    healthRoutine: 'Santé & Routine',
    allergies: 'Allergies',
    medications: 'Médicaments',
    bloodType: 'Groupe Sanguin',
    diet: 'Restrictions Alimentaires',
    sleepTime: 'Heure du Coucher',
    pickupAuth: 'Personnes Autorisées',
    checkinout: 'Enregistrement (Check-in/out)',
    dailyReport: 'Rapport Journalier',
    timeline: 'Fil d\'Activité',
    iaAssistant: 'Assistant IA Intelligent BGrowth',
    askIaPlaceholder: 'Posez une question sur les premiers secours, des activités ou demandez un résumé...',
    generateDailyReport: 'Générer le Rapport par IA',
    suggestActivities: 'Suggérer des Activités',
    firstAidHelp: 'Premiers Secours',
    medicalDisclaimer: 'Note: L\'IA fournit des conseils éducatifs. Elle ne remplace en aucun cas un avis médical professionnel.',
    checkinSuccess: 'Enregistrement d\'arrivée validé !',
    checkoutSuccess: 'Enregistrement de départ validé !',
    sosTriggered: 'Alerte SOS Déclenchée ! Localisation, fiches de santé et contacts partagés immédiatement.',
    noConflicts: 'Aucun conflit d\'emploi du temps détecté.',
    scheduleSuccess: 'Rendez-vous planifié avec succès !',
    newNanny: 'Inscrire une Nouvelle Nounou',
    emergencyContacts: 'Contacts d\'Urgence',
    addDocument: 'Ajouter un Document',
    vaccine: 'Carnet de Vaccination',
    contract: 'Contrat Numérique',
    signContract: 'Signer le Contrat',
    overtime: 'Heures Sup',
    midnight: 'Nuit',
    holiday: 'Jour Férié',
    weekend: 'Week-end',
    rate: 'Tarif Horaire',
    receiveHome: 'Accueillir l\'Enfant à la Maison',
    takeDoctor: 'Emmener l\'Enfant chez le Médecin',
  }
};

interface BabysitterAppProps {
  user: {
    email: string;
    name: string;
    plan: string;
  };
  onBack: () => void;
}

export default function BabysitterApp({ user, onBack }: BabysitterAppProps) {
  const [lang, setLang] = useState<Lang>('pt');
  const [currentRole, setCurrentRole] = useState<'family' | 'nanny' | 'agency'>('family');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Multi-state management representing a full Childcare ecosystem
  const [families, setFamilies] = useState([
    {
      id: 'fam-1',
      parents: 'Mariana & Rodrigo Silva',
      phones: '(11) 98888-1234',
      emails: 'mariana.silva@email.com',
      address: 'Alameda Lorena, 1500 - Jardins, São Paulo',
      latLng: 'Jardins, SP',
      emergency: 'Dr. Paulo (Pediatra): (11) 97777-5555',
      children: [
        {
          id: 'child-1',
          name: 'Beatriz Silva',
          age: 4,
          dob: '2022-03-12',
          photo: '👧',
          school: 'Colégio Maple Bear',
          grade: 'Infantil 3',
          teacher: 'Miss Amanda',
          bloodType: 'A+',
          allergies: 'Amendoim, Neosaldina',
          medications: 'Nenhum de uso contínuo',
          diet: 'Lactose free (preferencialmente)',
          illnesses: 'Nenhuma',
          medicalPlan: 'Bradesco Saúde TNU2',
          doctor: 'Dr. Paulo de Tarso',
          hospital: 'Hospital Sabará Infantil',
          sleep: '13:00 - 14:30 (soneca tarde), 21:00 (noite)',
          meals: '08:20 Café, 11:40 Almoço, 15:20 Lanche',
          bath: '17:30',
          study: 'Desenho livre, leitura de livrinhos em inglês',
          activities: 'Parquinho ao ar livre, massinha de modelar',
          preferences: 'Histórias sobre animais, música clássica de ninar',
          authorizedPickup: [
            { name: 'Vovó Clara', doc: 'RG 12.345.678-9', photo: '👵', relation: 'Avó Materna' },
            { name: 'Tio Carlos', doc: 'RG 98.765.432-1', photo: '👨', relation: 'Tio Paterno' }
          ]
        },
        {
          id: 'child-2',
          name: 'Leo Silva',
          age: 1,
          dob: '2025-05-20',
          photo: '👶',
          school: 'Berçário Maple Bear',
          grade: 'Berçário 2',
          teacher: 'Pró Camila',
          bloodType: 'A+',
          allergies: 'Nenhuma detectada',
          medications: 'Suplemento de Ferro (6 gotas no almoço)',
          diet: 'Introdução alimentar iniciada, frutas amassadas',
          illnesses: 'Nenhuma',
          medicalPlan: 'Bradesco Saúde TNU2',
          doctor: 'Dr. Paulo de Tarso',
          hospital: 'Hospital Sabará Infantil',
          sleep: '10:00 - 11:30, 14:00 - 15:30',
          meals: '08:00 Mamadeira, 11:30 Papinha, 15:00 Frutinha',
          bath: '17:00',
          study: 'Estímulo sensorial de toque',
          activities: 'Engatinhar no tapete de EVA, brinquedos musicais',
          preferences: 'Músicas ritmadas, móbile colorido',
          authorizedPickup: [
            { name: 'Vovó Clara', doc: 'RG 12.345.678-9', photo: '👵', relation: 'Avó Materna' }
          ]
        }
      ]
    },
    {
      id: 'fam-2',
      parents: 'Camila & Gustavo Nobre',
      phones: '(11) 99999-5678',
      emails: 'camila.nobre@email.com',
      address: 'Rua Bela Cintra, 800 - Consolação, São Paulo',
      latLng: 'Consolação, SP',
      emergency: 'Tia Helena: (11) 96666-4444',
      children: [
        {
          id: 'child-3',
          name: 'Enzo Nobre',
          age: 6,
          dob: '2020-01-15',
          photo: '👦',
          school: 'Escola Dante Alighieri',
          grade: '1º Ano Fundamental',
          teacher: 'Professora Márcia',
          bloodType: 'O-',
          allergies: 'Pólen, Corante Amarelo',
          medications: 'Antialérgico Loratadina se apresentar coriza',
          diet: 'Equilibrada comum',
          illnesses: 'Rinite sazonal',
          medicalPlan: 'SulAmérica Exato',
          doctor: 'Dra. Sandra Regina',
          hospital: 'Hospital Albert Einstein',
          sleep: '21:30 (noite)',
          meals: '07:30 Café, 12:00 Almoço, 16:00 Lanche',
          bath: '18:00',
          study: 'Dever de casa de alfabetização',
          activities: 'Futebol no quintal, jogos educativos no tablet (max 30min)',
          preferences: 'Lego, super-heróis, dinossauros',
          authorizedPickup: [
            { name: 'Motorista Júlio', doc: 'RG 45.123.654-2', photo: '👨', relation: 'Motorista Particular' }
          ]
        }
      ]
    }
  ]);

  const [nannies, setNannies] = useState([
    {
      id: 'nan-1',
      name: 'Ana Silva',
      photo: '👩🍼',
      skills: ['Recém-nascidos', 'Primeiros socorros', 'Educação infantil', 'Línguas', 'Cozinha infantil'],
      docs: { cpf: '123.456.789-00', passport: 'BR123456', bgCheck: 'Verificado ✓ (Aprovado)' },
      certifications: 'Curso de Primeiros Socorros Cruz Vermelha, Pedagogia (Cursando)',
      availability: { days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], hours: '08:00 - 18:00', status: 'Disponível' },
      rates: { normal: 35, overtime: 45, midnight: 60, holiday: 70, weekend: 50 },
      history: { clients: 12, hours: 450, ratings: 28, cancellations: 0 },
      avgRating: 4.9,
      reviews: [
        { parent: 'Mariana Silva', text: 'Maravilhosa, muito atenciosa e educada!', date: '2026-06-25', rating: 5 },
        { parent: 'Camila Nobre', text: 'Muito pontual e prestativa com o Enzo.', date: '2026-06-18', rating: 5 }
      ]
    },
    {
      id: 'nan-2',
      name: 'Catarina Lima',
      photo: '👩',
      skills: ['Crianças especiais', 'Primeiros socorros', 'Transporte habilitado', 'Educação infantil'],
      docs: { cpf: '987.654.321-11', passport: 'BR987654', bgCheck: 'Verificado ✓ (Aprovado)' },
      certifications: 'Curso Técnico em Enfermagem Pediátrica',
      availability: { days: ['Seg', 'Qua', 'Qui', 'Sáb'], hours: '09:00 - 20:00', status: 'Disponível' },
      rates: { normal: 40, overtime: 50, midnight: 65, holiday: 80, weekend: 60 },
      history: { clients: 8, hours: 320, ratings: 19, cancellations: 1 },
      avgRating: 4.8,
      reviews: [
        { parent: 'Gustavo Nobre', text: 'Excelente profissional com ótimas referências médicas.', date: '2026-05-12', rating: 5 }
      ]
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 'appt-1',
      familyId: 'fam-1',
      childId: 'child-1',
      nannyId: 'nan-1',
      date: '2026-06-29',
      startTime: '08:00',
      endTime: '18:00',
      status: 'Event Confirmed', // 'Pending Approval', 'Event Confirmed', 'Completed'
      address: 'Alameda Lorena, 1500 - Jardins, São Paulo',
      serviceType: 'Babá Regular',
      alerts: 'Lembrete: Beatriz tem alergia a amendoim!',
    },
    {
      id: 'appt-2',
      familyId: 'fam-2',
      childId: 'child-3',
      nannyId: 'nan-2',
      date: '2026-06-30',
      startTime: '10:00',
      endTime: '16:00',
      status: 'Proposal Sent',
      address: 'Rua Bela Cintra, 800 - Consolação, São Paulo',
      serviceType: 'Cuidados Especiais',
      alerts: 'Enzo tem rinite ativa se tempo estiver muito frio.',
    }
  ]);

  // Check-in and out state
  const [shiftState, setShiftState] = useState<{
    status: 'idle' | 'checked_in';
    checkInTime?: string;
    checkOutTime?: string;
    photoAttached?: string;
    locationShared?: boolean;
  }>({ status: 'idle' });

  // In-app messaging simulations
  const [chats, setChats] = useState([
    { sender: 'Ana Silva', role: 'nanny', text: 'Olá Mariana, a Beatriz acabou de almoçar tudo! Comeu a cenourinha e a mandioquinha.', time: '11:55', file: null, type: 'text' },
    { sender: 'Mariana Silva', role: 'family', text: 'Ótimo, Ana! Ela dormiu a soneca da tarde direitinho?', time: '13:10', file: null, type: 'text' },
    { sender: 'Ana Silva', role: 'nanny', text: 'Sim, dormiu às 13:00 e acabou de acordar agora. Super bem-humorada!', time: '15:22', file: null, type: 'text' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Daily Activity feed logged by Nanny in real-time
  const [dailyTimeline, setDailyTimeline] = useState([
    { time: '08:00', label: 'Chegada', desc: 'Cheguei pontualmente. Beatriz e Leo me receberam super bem.', category: 'checkin', photo: null },
    { time: '08:20', label: 'Café da manhã', desc: 'Beatriz comeu mamão picado com mel e Leo tomou a mamadeira.', category: 'food', photo: null },
    { time: '09:30', label: 'Parque ao ar livre', desc: 'Brincamos na areia e no balanço do parquinho do condomínio.', category: 'play', photo: null },
    { time: '11:40', label: 'Almoço saudável', desc: 'Arroz integral, feijão, frango desfiado e purê de abóbora.', category: 'food', photo: null },
    { time: '13:00', label: 'Soneca da tarde', desc: 'Dormiram tranquilamente no bercinho e na cama de Beatriz.', category: 'sleep', photo: null },
    { time: '15:20', label: 'Lanchinho', desc: 'Banana amassada com aveia e suquinho de laranja.', category: 'food', photo: null },
    { time: '17:30', label: 'Banho quentinho', desc: 'Sem choradeira, Beatriz adora brincar com os patinhos.', category: 'bath', photo: null }
  ]);

  const [newLog, setNewLog] = useState({
    time: '18:00',
    label: '',
    desc: '',
    category: 'other'
  });

  // Digital Child Library State
  const [libraryDocs, setLibraryDocs] = useState([
    { id: 'doc-1', name: 'Carteira_Vacinacao_Beatriz.pdf', type: 'health', size: '2.4 MB', date: '2026-05-10' },
    { id: 'doc-2', name: 'Receita_Amoxicilina_Pediatra.pdf', type: 'health', size: '1.1 MB', date: '2026-06-20' },
    { id: 'doc-3', name: 'Contrato_Prestacao_Servicos_BGrowth.pdf', type: 'contract', size: '4.5 MB', date: '2026-04-01', signed: true },
    { id: 'doc-4', name: 'Autorizacao_Escola_Passeio.pdf', type: 'school', size: '840 KB', date: '2026-06-15' }
  ]);

  // Double-sided rating states
  const [selectedNannyToReview, setSelectedNannyToReview] = useState('nan-1');
  const [reviewFields, setReviewFields] = useState({ punctuality: 5, care: 5, communication: 5, organization: 5, safety: 5, text: '' });
  const [familyReview, setFamilyReview] = useState({ rating: 5, text: '' });

  // Intelligent Copilot IA States
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Olá! Sou o Assistente Inteligente IA BGrowth Babysitter™. Posso te ajudar a gerar relatórios diários de atividades, resumir o comportamento da criança, sugerir planos educativos personalizados ou dar dicas de primeiros socorros.' }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Notification simulation alert banner
  const [bannerAlert, setBannerAlert] = useState<string | null>(null);

  // Create new appointment form state
  const [bookingForm, setBookingForm] = useState({
    childId: 'child-1',
    nannyId: 'nan-1',
    date: '2026-06-29',
    startTime: '08:00',
    endTime: '18:00',
    serviceType: 'Babá Regular',
    notes: ''
  });

  // Families modal states
  const [searchChildQuery, setSearchChildQuery] = useState('');
  const [showAddChildModal, setShowAddChildModal] = useState<string | null>(null); // familyId
  const [newChildData, setNewChildData] = useState({
    name: '', age: 2, dob: '', photo: '👶', school: '', grade: '', teacher: '',
    bloodType: 'O+', allergies: '', medications: '', diet: '', illnesses: '',
    medicalPlan: '', doctor: '', hospital: '', sleep: '', meals: '', bath: '',
    study: '', activities: '', preferences: ''
  });

  const getTranslation = (key: string) => {
    return TRANSLATIONS[lang][key] || key;
  };

  // Helper function to handle AI responses with Gemini
  const handleAskAI = async (customPrompt?: string) => {
    const promptToSend = customPrompt || aiInput;
    if (!promptToSend.trim()) return;

    const userMessage = { role: 'user' as const, text: promptToSend };
    setAiChat(prev => [...prev, userMessage]);
    setAiInput('');
    setAiLoading(true);

    try {
      // Build a comprehensive payload describing current kid state and timeline log context so Gemini can analyze
      const activeChild = families[0].children[0];
      const contextPayload = `
        System context: You are the AI of BGrowth Babysitter™ child care suite.
        Target Kid analyzed: ${activeChild.name} (${activeChild.age} years old).
        Health details: Blood type ${activeChild.bloodType}, allergies: ${activeChild.allergies}, medications: ${activeChild.medications}, diet: ${activeChild.diet}.
        Current Daily Logs generated by the Nanny so far:
        ${dailyTimeline.map(log => `- ${log.time} [${log.label}]: ${log.desc}`).join('\n')}
        
        The user asks: "${promptToSend}"
        Respond in a helpful, friendly, professional tone, matching the active language chosen by the user (Current interface language code is: ${lang}). Keep it structured, engaging and highly practical!
        Provide concrete, fun parenting/babysitting recommendations, patterns spot, or guidelines. Include a small medical disclaimer if giving first aid instructions.
      `;

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: contextPayload })
      });

      if (!response.ok) {
        throw new Error('API server failed');
      }

      const data = await response.json();
      setAiChat(prev => [...prev, { role: 'assistant', text: data.response }]);
    } catch (err) {
      // Fallback answers matching rich features in case of network glitch or sandbox limits
      let simulatedReply = '';
      if (promptToSend.toLowerCase().includes('relatório') || promptToSend.toLowerCase().includes('report') || promptToSend.toLowerCase().includes('resumo')) {
        simulatedReply = lang === 'pt'
          ? `🌟 **Resumo Inteligente da Beatriz (4 anos):** O dia foi incrivelmente produtivo! Ela manteve um excelente apetite durante o almoço de legumes grelhados e dormiu uma soneca revigorante de 1h30m. Durante as atividades ao ar livre, apresentou grande coordenação motora e demonstrou excelente sociabilidade no parquinho. Alerta de Rotina: Mantivemos a ingestão adequada de líquidos e não houve coriza ou alterações de humor.`
          : `🌟 **Intelligent Summary for Beatriz (4 yo):** The day was wonderfully active! She had an excellent appetite eating grilled veggies during lunch, took a solid 1.5-hour afternoon nap, and excelled in social outdoor sand play. Routine check: Adequate hydration kept, playful mood throughout, and no sign of allergic triggers.`;
      } else if (promptToSend.toLowerCase().includes('atividad') || promptToSend.toLowerCase().includes('play') || promptToSend.toLowerCase().includes('brincar')) {
        simulatedReply = lang === 'pt'
          ? `🧩 **Plano de Atividades Recomendadas para Beatriz (4 anos):**
          1. **Sensorial:** Caça ao tesouro com pedrinhas e folhas coletadas no parque.
          2. **Cognitivo:** Desenhar formas geométricas com giz colorido na calçada (estimula raciocínio e motricidade).
          3. **Culinária Lúdica:** Montar rostinhos de animais usando rodelas de banana e morango (estimula aceitação de frutas).`
          : `🧩 **Customized Activity Plan for Beatriz (4 yo):**
          1. **Sensory Play:** Outdoor treasure hunt collecting safety stones and colorful leaves in the backyard.
          2. **Cognitive:** Sidewalk chalk geometric games (helps spatial memory).
          3. **Creative:** Mini fruit-plate art (arranging strawberry slices and blueberries into animal shapes to prompt fun eating).`;
      } else if (promptToSend.toLowerCase().includes('socorro') || promptToSend.toLowerCase().includes('first aid') || promptToSend.toLowerCase().includes('engasgo')) {
        simulatedReply = lang === 'pt'
          ? `🚨 **Guia Rápido de Primeiros Socorros - Engasgo em Crianças (Manobra de Heimlich):**
          1. Posicione-se por trás da criança e circunde-a com os braços ao redor da cintura.
          2. Faça um punho com uma das mãos e posicione-o logo acima do umbigo.
          3. Segure o punho com a outra mão e realize compressões rápidas para dentro e para cima.
          *AVISO: Ligue imediatamente para o SAMU (192) ou Bombeiros (193) se a criança não conseguir respirar ou tossir. Esta resposta serve apenas como diretriz informativa.*`
          : `🚨 **First Aid Quick Guide - Choking Incident (Heimlich Maneuver):**
          1. Stand behind the child and wrap your arms around their waist.
          2. Make a fist with one hand and place it slightly above the navel.
          3. Grasp your fist with the other hand and press into the abdomen with quick upward thrusts.
          *DISCLAIMER: Immediately dial local emergency services (911) if the child is unable to speak or cough. This AI tool is strictly for educational guidance.*`;
      } else {
        simulatedReply = lang === 'pt'
          ? `Compreendo! Analisando a rotina da Beatriz e do Leo, recomendo monitorar o horário do medicamento após as mamadeiras e priorizar brincadeiras de blocos lógicos hoje devido ao tempo ameno de 21°C. Posso te ajudar com algo mais específico sobre a alimentação ou sono deles?`
          : `I understand! Based on Beatriz and Leo's parameters, I suggest scheduling logical blocks play inside due to the mild 21°C weather. Keep an eye on hydration after outdoor play. What else can I optimize for their schedule?`;
      }

      setAiChat(prev => [...prev, { role: 'assistant', text: simulatedReply }]);
    } finally {
      setAiLoading(false);
    }
  };

  const triggerSOS = () => {
    alert(getTranslation('sosTriggered') + `\n\n🎯 Localização: Jardins, SP\n📞 Contatos Médicos: ${families[0].emergency}\n💊 Alergias Críticas: Beatriz - ${families[0].children[0].allergies}`);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      sender: currentRole === 'family' ? 'Mariana Silva' : currentRole === 'nanny' ? 'Ana Silva' : 'Agência BGrowth',
      role: currentRole,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file: null,
      type: 'text'
    };
    setChats(prev => [...prev, msg]);
    setNewMessage('');

    // Trigger auto-reply simulation for a real chatting feeling
    setTimeout(() => {
      setChats(prev => [...prev, {
        sender: currentRole === 'family' ? 'Ana Silva' : 'Mariana Silva',
        role: currentRole === 'family' ? 'nanny' : 'family',
        text: 'Perfeito, entendido! Vou atualizar o feed de fotos do dia em seguida.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: null,
        type: 'text'
      }]);
    }, 1200);
  };

  const handleCheckIn = () => {
    setShiftState({
      status: 'checked_in',
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      locationShared: true
    });
    setBannerAlert(getTranslation('checkinSuccess'));
    setTimeout(() => setBannerAlert(null), 4000);
  };

  const handleCheckOut = () => {
    setShiftState(prev => ({
      ...prev,
      status: 'idle',
      checkOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    setBannerAlert(getTranslation('checkoutSuccess'));
    setTimeout(() => setBannerAlert(null), 4000);
  };

  const handleAddTimelineLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.label || !newLog.desc) return;
    setDailyTimeline(prev => [
      ...prev,
      { time: newLog.time, label: newLog.label, desc: newLog.desc, category: newLog.category, photo: null }
    ].sort((a, b) => a.time.localeCompare(b.time)));
    setNewLog({ time: '18:00', label: '', desc: '', category: 'other' });
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppt = {
      id: `appt-${appointments.length + 1}`,
      familyId: 'fam-1',
      childId: bookingForm.childId,
      nannyId: bookingForm.nannyId,
      date: bookingForm.date,
      startTime: bookingForm.startTime,
      endTime: bookingForm.endTime,
      status: 'Pending Approval',
      address: families[0].address,
      serviceType: bookingForm.serviceType,
      alerts: bookingForm.notes || 'Nenhum alerta adicional.'
    };
    setAppointments(prev => [...prev, newAppt]);
    setBannerAlert(getTranslation('scheduleSuccess'));
    setTimeout(() => setBannerAlert(null), 4000);
  };

  const handleAddChild = (familyId: string) => {
    if (!newChildData.name) return;
    setFamilies(prev => prev.map(fam => {
      if (fam.id === familyId) {
        return {
          ...fam,
          children: [...fam.children, {
            ...newChildData,
            id: `child-${Date.now()}`,
            authorizedPickup: []
          }]
        };
      }
      return fam;
    }));
    setShowAddChildModal(null);
    setNewChildData({
      name: '', age: 2, dob: '', photo: '👶', school: '', grade: '', teacher: '',
      bloodType: 'O+', allergies: '', medications: '', diet: '', illnesses: '',
      medicalPlan: '', doctor: '', hospital: '', sleep: '', meals: '', bath: '',
      study: '', activities: '', preferences: ''
    });
  };

  const handleAddDocument = (name: string, type: string) => {
    const newDoc = {
      id: `doc-${libraryDocs.length + 1}`,
      name: name,
      type: type,
      size: '1.2 MB',
      date: new Date().toISOString().split('T')[0]
    };
    setLibraryDocs(prev => [...prev, newDoc]);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewer = families[0].parents;
    setNannies(prev => prev.map(nan => {
      if (nan.id === selectedNannyToReview) {
        const newRating = (reviewFields.punctuality + reviewFields.care + reviewFields.communication + reviewFields.organization + reviewFields.safety) / 5;
        const updatedRating = parseFloat(((nan.avgRating * nan.history.ratings + newRating) / (nan.history.ratings + 1)).toFixed(1));
        return {
          ...nan,
          avgRating: updatedRating,
          history: { ...nan.history, ratings: nan.history.ratings + 1 },
          reviews: [...nan.reviews, { parent: reviewer, text: reviewFields.text || 'Excelente profissional!', date: new Date().toISOString().split('T')[0], rating: Math.round(newRating) }]
        };
      }
      return nan;
    }));
    setReviewFields({ punctuality: 5, care: 5, communication: 5, organization: 5, safety: 5, text: '' });
    alert('Avaliação enviada com sucesso!');
  };

  const allChildren = families.flatMap(f => f.children.map(c => ({ ...c, familyParents: f.parents, familyId: f.id })));
  const filteredChildren = allChildren.filter(c => c.name.toLowerCase().includes(searchChildQuery.toLowerCase()));

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col font-sans transition-all">
      {/* Banner Alert Notification */}
      {bannerAlert && (
        <div className="bg-emerald-600 text-white text-xs font-black py-2 px-6 text-center animate-bounce flex items-center justify-center gap-2 sticky top-0 z-50">
          <CheckCircle2 className="w-4 h-4" /> {bannerAlert}
        </div>
      )}

      {/* Header Container */}
      <div className="bg-white border-b border-slate-100 p-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-3xs">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🍼</span>
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                {getTranslation('title')}
              </h1>
              <span className="bg-rose-50 border border-rose-100 text-rose-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                BGrowth Ecosystem
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase">
              {getTranslation('subtitle')}
            </p>
          </div>
        </div>

        {/* Global Controls: Language & SOS */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Access Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(['pt', 'en', 'es', 'fr'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                  lang === l ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* SOS Urgent Trigger Button */}
          <button
            onClick={triggerSOS}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-xl shadow-md shadow-red-100 flex items-center gap-1.5 animate-pulse transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {getTranslation('sosButton')}
          </button>
        </div>
      </div>

      {/* Profile/Role Chooser Bar */}
      <div className="bg-slate-900/95 text-slate-100 p-3 flex flex-col md:flex-row justify-between items-center gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400 text-xs font-extrabold tracking-wide uppercase">
            {getTranslation('switchRole')}
          </span>
          <div className="inline-flex bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => { setCurrentRole('family'); setActiveTab('dashboard'); }}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentRole === 'family' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              👨‍👩‍👧 {getTranslation('families')}
            </button>
            <button
              onClick={() => { setCurrentRole('nanny'); setActiveTab('dashboard'); }}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentRole === 'nanny' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              👶 {getTranslation('nannies')}
            </button>
            <button
              onClick={() => { setCurrentRole('agency'); setActiveTab('dashboard'); }}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentRole === 'agency' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏢 {getTranslation('agencies')}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>{getTranslation('activeProfile')}:</span>
          <span className="bg-white/10 px-3 py-1 rounded-lg text-white font-black uppercase tracking-wider text-[10px]">
            {currentRole === 'family' ? 'Mariana Silva (Family Account)' : currentRole === 'nanny' ? 'Ana Silva (Babysitter)' : 'Admin Agency BGrowth'}
          </span>
        </div>
      </div>

      {/* Main Workspace split into side menu + content space */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Workspace Sub-Sidebar */}
        <aside className="w-full md:w-60 bg-white border-r border-slate-100 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">MODULE MENUS</div>
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: getTranslation('dashboard'), icon: <Activity className="w-4 h-4" /> },
                { id: 'scheduling', label: getTranslation('scheduling'), icon: <Calendar className="w-4 h-4" /> },
                { id: 'families', label: getTranslation('familiesMgmt'), icon: <Users className="w-4 h-4" /> },
                { id: 'nannies', label: getTranslation('nanniesMgmt'), icon: <Award className="w-4 h-4" /> },
                { id: 'chat', label: getTranslation('chat'), icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'library', label: getTranslation('library'), icon: <BookOpen className="w-4 h-4" /> },
                { id: 'finances', label: getTranslation('finances'), icon: <DollarSign className="w-4 h-4" /> },
                { id: 'reviews', label: getTranslation('reviews'), icon: <Star className="w-4 h-4" /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-3 transition-all ${
                    activeTab === item.id
                      ? 'bg-slate-100 text-indigo-600 font-extrabold shadow-3xs'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Stats Block */}
          <div className="mt-8 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100/50 space-y-2 hidden md:block">
            <div className="flex items-center gap-1 text-[11px] font-black text-indigo-900 uppercase">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> BGrowth Secure
            </div>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              Platform active under SSL. Isolated parent directories securely backed up.
            </p>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto">

          {/* TAB 1: DASHBOARD VIEW (Differentiated by Selected Role) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/50 pb-3">
                <h2 className="text-lg font-black text-slate-900 uppercase">
                  {getTranslation('dashboard')} - {currentRole === 'family' ? getTranslation('families') : currentRole === 'nanny' ? getTranslation('nannies') : getTranslation('agencies')}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  {currentRole === 'family'
                    ? 'Acompanhe as atividades e status do cuidado com seus filhos em tempo real.'
                    : currentRole === 'nanny'
                      ? 'Visualize seus horários, controle o relógio de ponto e registre as atividades diárias.'
                      : 'Gerencie o catálogo de profissionais, faturamento consolidado e suporte administrativo.'}
                </p>
              </div>

              {/* FAMILY DASHBOARD */}
              {currentRole === 'family' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column (Stats & Alerts) */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Next Appointment Card */}
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1.5">
                        <span className="bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                          {getTranslation('nextAppt')}
                        </span>
                        <h3 className="text-base font-black text-slate-950">Segunda-feira, 29 de Junho de 2026</h3>
                        <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> 08:00 - 18:00
                          <span className="text-slate-300">|</span>
                          <User className="w-3.5 h-3.5 text-slate-400" /> {getTranslation('nannies')}: <b>Ana Silva</b>
                        </p>
                        <p className="text-xs text-indigo-600 font-bold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> Alameda Lorena, 1500 (Jardins)
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl text-center min-w-[120px]">
                        <span className="text-[10px] text-slate-400 font-black uppercase block">{getTranslation('arrival')}</span>
                        <span className="text-lg font-black text-slate-900 block">08:00 AM</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-1">✓ Confirmada</span>
                      </div>
                    </div>

                    {/* Pending & Stats Summary Widgets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">💰</div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-black uppercase block">{getTranslation('pendingPay')}</span>
                          <span className="text-base font-black text-slate-900">R$ 350,00</span>
                          <span className="text-[9px] text-slate-400 font-semibold">Fatura vence em 5 dias</span>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">📊</div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-black uppercase block">{getTranslation('weeklySum')}</span>
                          <span className="text-base font-black text-slate-900">42 horas cuidadas</span>
                          <span className="text-[9px] text-slate-400 font-semibold">Total de 4 agendamentos</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Live Tracking Feed */}
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{getTranslation('dayActivities')} (Beatriz)</h4>
                        <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-black uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping"></span> Real-time Live Feed
                        </span>
                      </div>

                      {/* Map Location Simulation Tracker */}
                      <div className="bg-slate-100 border border-slate-200/50 rounded-2xl p-4 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center py-4 space-y-2">
                          <MapPin className="w-8 h-8 text-rose-600 animate-bounce" />
                          <h5 className="text-xs font-black text-slate-900">Ubicación de la Niñera (Live Tracking)</h5>
                          <p className="text-[10px] text-slate-400 font-semibold max-w-sm">
                            Ana Silva está no <b>Parque do Condomínio (Área Comum)</b> com Beatriz. Check-in de perímetro ativo.
                          </p>
                          <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-[8px] font-black uppercase rounded-lg">
                            Precisão GPS: ~5 metros (Opcional)
                          </span>
                        </div>
                      </div>

                      {/* Interactive Child Timeline */}
                      <div className="relative border-l border-slate-200 pl-4 ml-2 space-y-4 pt-2">
                        {dailyTimeline.slice(-3).map((item, idx) => (
                          <div key={idx} className="relative text-xs">
                            {/* Dot */}
                            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white"></div>
                            <div className="flex justify-between items-center text-slate-400 text-[10px] font-black">
                              <span>{item.time} - {item.label.toUpperCase()}</span>
                            </div>
                            <p className="text-slate-800 font-semibold mt-0.5">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Emergency Alerts & Smart IA Summary Widget) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Alerts Block */}
                    <div className="bg-red-50 border border-red-100 p-5 rounded-3xl space-y-3">
                      <h4 className="text-xs font-black text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        {getTranslation('alerts')}
                      </h4>
                      <div className="space-y-2 text-xs text-red-800">
                        <div className="p-2.5 bg-white/60 rounded-xl border border-red-100">
                          ⚠️ <b>Lembrete de Alergia:</b> Beatriz tem alergia severa a amendoim. Evitar qualquer alimento com traços na lancheira.
                        </div>
                        <div className="p-2.5 bg-white/60 rounded-xl border border-red-100">
                          💊 <b>Medicamento Leo:</b> Dar 6 gotas de ferro com a refeição do almoço (introdução alimentar).
                        </div>
                      </div>
                    </div>

                    {/* IA Smart Copilot Summary Preview Widget */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-lg relative overflow-hidden space-y-4">
                      <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -mr-6 -mb-6"></div>
                      <div className="space-y-1">
                        <span className="bg-white/10 text-indigo-300 border border-indigo-400/20 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider inline-block">
                          AI COPILOT DAILY INSIGHT
                        </span>
                        <h4 className="text-sm font-black uppercase">Resumo Inteligente</h4>
                        <p className="text-[10px] text-indigo-200 font-semibold">
                          Análise automática de padrões gerados pelas anotações da babá.
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-[11px] leading-relaxed text-indigo-100">
                        "Beatriz manteve excelente apetite. Dormiu 1h30m (padrão saudável para a idade). Teve pico de energia às 09:30 no parque. Recomendado evitar brincadeiras muito agitadas após as 19:30 para garantir o sono das 21:00."
                      </div>

                      <button
                        onClick={() => { setActiveTab('chat'); handleAskAI('Resuma o dia da Beatriz e sugira atividades'); }}
                        className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-[10px] uppercase rounded-xl transition-all"
                      >
                        Abrir Assistente Completo &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* NANNY DASHBOARD */}
              {currentRole === 'nanny' && (
                <div className="space-y-6">
                  {/* Punch Card Clock widget (Check-in / Check-out) */}
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-1.5 text-center md:text-left">
                      <h3 className="text-base font-black text-slate-900 uppercase">
                        {getTranslation('checkinout')}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold">
                        Registre seu horário e localização ao iniciar ou encerrar os cuidados.
                      </p>
                      {shiftState.status === 'checked_in' ? (
                        <div className="flex items-center gap-2 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl w-fit">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></span>
                          CHECKED-IN: {shiftState.checkInTime} (Localização Ativa)
                        </div>
                      ) : (
                        <div className="text-xs font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-xl w-fit">
                          Shift Status: Ocioso / Fora de Serviço
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {shiftState.status === 'idle' ? (
                        <button
                          onClick={handleCheckIn}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase rounded-xl shadow-lg shadow-emerald-100 transition-all"
                        >
                          ✔ Fazer Check-In (Entrada)
                        </button>
                      ) : (
                        <button
                          onClick={handleCheckOut}
                          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl shadow-lg shadow-red-100 transition-all"
                        >
                          ✖ Fazer Check-Out (Saída)
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Nanny key metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: getTranslation('hoursWorked'), val: '32h 15m', icon: '⏱️', sub: 'Esta semana' },
                      { label: getTranslation('weeklyEarn'), val: 'R$ 1.128,00', icon: '💰', sub: 'Calculado sobre horas' },
                      { label: getTranslation('distance'), val: '12.4 km', icon: '🚗', sub: 'Deslocamentos calculados' },
                      { label: getTranslation('avgRating'), val: '4.9 ★', icon: '⭐', sub: '28 avaliações de pais' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{stat.label}</span>
                          <span className="text-lg">{stat.icon}</span>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mt-2">{stat.val}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{stat.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Upcoming Assignments list */}
                  <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Próximos Serviços Escalados</h4>
                    <div className="divide-y divide-slate-100">
                      {appointments.map((appt) => {
                        const family = families.find(f => f.id === appt.familyId);
                        const child = family?.children.find(c => c.id === appt.childId);
                        return (
                          <div key={appt.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{child?.photo || '👶'}</span>
                              <div>
                                <h5 className="text-xs font-black text-slate-900">{child?.name} ({family?.parents})</h5>
                                <p className="text-[10px] text-slate-400 font-semibold">{appt.date} às {appt.startTime} - {appt.endTime} • {appt.serviceType}</p>
                                <p className="text-[10px] text-indigo-600 font-bold">{appt.address}</p>
                              </div>
                            </div>
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[9px] font-black uppercase px-2.5 py-1 rounded-xl">
                              Escalado (SMS Ativado)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* AGENCY DASHBOARD */}
              {currentRole === 'agency' && (
                <div className="space-y-6">
                  {/* Agency Overview Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: getTranslation('nanniesAvail'), val: '15 Disponíveis', icon: '👩‍🍼', sub: 'De 18 cadastradas', color: 'bg-emerald-50 text-emerald-600' },
                      { label: getTranslation('activeClients'), val: '32 Famílias', icon: '🏢', sub: '12 planos recorrentes', color: 'bg-blue-50 text-blue-600' },
                      { label: 'Agendamentos Hoje', val: '8 Serviços', icon: '📅', sub: 'Nenhum atraso reportado', color: 'bg-indigo-50 text-indigo-600' },
                      { label: getTranslation('revenue'), val: 'R$ 14.500,00', icon: '💰', sub: 'Comissão estimada: R$ 2.900', color: 'bg-amber-50 text-amber-600' }
                    ].map((card, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl ${card.color} flex items-center justify-center font-bold text-lg shrink-0`}>
                          {card.icon}
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-black uppercase block">{card.label}</span>
                          <span className="text-base font-black text-slate-900">{card.val}</span>
                          <span className="text-[9px] text-slate-400 font-semibold block">{card.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Layout: Nanny Rankings & Cancellation stats */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Rankings Column */}
                    <div className="lg:col-span-8 bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{getTranslation('nannyRanking')}</h4>
                      <div className="divide-y divide-slate-100 text-xs">
                        {nannies.map((nan, idx) => (
                          <div key={nan.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-slate-400">#{idx + 1}</span>
                              <span className="text-xl">{nan.photo}</span>
                              <div>
                                <h5 className="font-black text-slate-900">{nan.name}</h5>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">{nan.certifications}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-black text-slate-950 flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {nan.avgRating}
                              </span>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">{nan.history.hours} horas acumuladas</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Registration & Cancel Actions */}
                    <div className="lg:col-span-4 bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4 text-xs font-bold text-slate-600">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Ações Administrativas</h4>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab('nannies')}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] rounded-xl flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Cadastrar Nova Babá
                        </button>
                        <button
                          onClick={() => setActiveTab('families')}
                          className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-[10px] rounded-xl flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Cadastrar Nova Família
                        </button>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="text-[10px] text-slate-400 font-black uppercase">Faturamento Consolidado</span>
                          <div className="flex justify-between items-center mt-1">
                            <span>Taxa de Agência (20%)</span>
                            <span className="font-extrabold text-slate-900">R$ 2.900,00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SMART SCHEDULING & BOOKING ENGINE */}
          {activeTab === 'scheduling' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/50 pb-3">
                <h2 className="text-lg font-black text-slate-900 uppercase">
                  {getTranslation('scheduling')}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  O sistema evita conflitos de horários de babás, calcula tempo de deslocamento e sugere substitutas em tempo real.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Book appointment form */}
                <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Agendar Novo Atendimento</h4>
                  <form onSubmit={handleCreateBooking} className="space-y-4 text-xs font-bold text-slate-600">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">Criança Beneficiária</label>
                        <select
                          value={bookingForm.childId}
                          onChange={(e) => setBookingForm({ ...bookingForm, childId: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          {families.flatMap(f => f.children).map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">Selecione a Babá</label>
                        <select
                          value={bookingForm.nannyId}
                          onChange={(e) => setBookingForm({ ...bookingForm, nannyId: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          {nannies.map(n => (
                            <option key={n.id} value={n.id}>{n.name} (R$ {n.rates.normal}/h)</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">Data do Atendimento</label>
                        <input
                          type="date"
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">Horário de Início</label>
                        <input
                          type="time"
                          value={bookingForm.startTime}
                          onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">Horário de Fim</label>
                        <input
                          type="time"
                          value={bookingForm.endTime}
                          onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-black">Instruções ou Alertas Especiais</label>
                      <textarea
                        rows={2}
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        placeholder="Ex: Alergias, medicamentos específicos, horário de sono no dia..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    {/* Conflict check simulator indicators */}
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-[11px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <b>Motor de Inteligência de Conflito:</b> {getTranslation('noConflicts')}
                        <span className="block text-[10px] text-emerald-600">Transit: ~15 minutos de distância calculada.</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs rounded-xl shadow-lg shadow-indigo-100 transition-all"
                    >
                      Confirmar Agendamento Inteligente
                    </button>
                  </form>
                </div>

                {/* Calendar & schedule dispatches list */}
                <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Histórico de Agendamentos Ativos</h4>
                  <div className="space-y-3">
                    {appointments.map((appt) => {
                      const family = families.find(f => f.id === appt.familyId);
                      const child = family?.children.find(c => c.id === appt.childId);
                      const nanny = nannies.find(n => n.id === appt.nannyId);
                      return (
                        <div key={appt.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-black text-slate-900">{child?.name}</h5>
                              <p className="text-[10px] text-slate-400 font-semibold">{appt.date} • {appt.startTime} - {appt.endTime}</p>
                            </div>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-lg ${
                              appt.status === 'Event Confirmed' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {appt.status}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 border-t border-slate-200/50 pt-2 flex justify-between">
                            <span>Nanny: <b>{nanny?.name}</b></span>
                            <span>Loc: <b>{family?.latLng}</b></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAMILIES REGISTRATION & CHILD PROFILES */}
          {activeTab === 'families' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/50 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 uppercase">
                    {getTranslation('familiesMgmt')}
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold">
                    Cadastro completo dos pais, contatos de emergência e fichas médicas detalhadas das crianças.
                  </p>
                </div>
                {/* Child search widget */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchChildQuery}
                    onChange={(e) => setSearchChildQuery(e.target.value)}
                    placeholder="Buscar criança..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Children List and details card view */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredChildren.map((child) => (
                  <div key={child.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl">
                          {child.photo}
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-slate-900">{child.name}</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            Idade: {child.age} anos ({child.dob}) • {child.grade} ({child.school})
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold">Pais: {child.familyParents}</p>
                        </div>
                      </div>

                      {/* Take doctor & home controls */}
                      <div className="flex flex-col gap-1 text-right">
                        <button
                          onClick={() => alert(`${getTranslation('receiveHome')}: Beatriz está sendo aguardada em casa. Notificação enviada à babá.`)}
                          className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[9px] font-black uppercase rounded-lg border border-rose-100/40"
                        >
                          🏠 {getTranslation('receiveHome')}
                        </button>
                        <button
                          onClick={() => alert(`${getTranslation('takeDoctor')}: Guia médico da SulAmérica impresso e consulta pré-agendada com Dr. Paulo às 15:30.`)}
                          className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[9px] font-black uppercase rounded-lg border border-blue-100/40"
                        >
                          🩺 {getTranslation('takeDoctor')}
                        </button>
                      </div>
                    </div>

                    {/* Nested medical health details tabs */}
                    <div className="bg-slate-50 p-4 rounded-2xl space-y-3 text-xs">
                      <div className="border-b border-slate-200/50 pb-2">
                        <span className="font-black text-slate-900 uppercase tracking-wider text-[10px] block">
                          🩺 {getTranslation('healthRoutine')}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 font-semibold text-slate-600">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase block">Tipo Sanguíneo</span>
                          <span className="text-slate-900 font-extrabold">{child.bloodType}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase block">Alergias</span>
                          <span className="text-red-600 font-extrabold">{child.allergies || 'Nenhuma'}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase block">Medicamentos</span>
                          <span className="text-slate-900">{child.medications || 'Nenhum'}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase block">Plano Médico</span>
                          <span className="text-slate-900">{child.medicalPlan}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[9px] text-slate-400 uppercase block">Rotina Alimentar</span>
                          <span className="text-slate-900 block">{child.diet}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[9px] text-slate-400 uppercase block">Rotina de Coucher & Soneca</span>
                          <span className="text-slate-900 block">{child.sleep}</span>
                        </div>
                      </div>
                    </div>

                    {/* Authorized pick ups */}
                    {child.authorizedPickup && child.authorizedPickup.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-slate-400 uppercase font-black block">{getTranslation('pickupAuth')}</span>
                        <div className="flex flex-wrap gap-2">
                          {child.authorizedPickup.map((p, pIdx) => (
                            <div key={pIdx} className="bg-slate-100 border border-slate-200/50 px-2.5 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-bold text-slate-700">
                              <span>{p.photo}</span>
                              <div>
                                <span className="block font-black text-slate-900 leading-tight">{p.name}</span>
                                <span className="block text-[8px] text-slate-400 font-semibold">{p.relation} • {p.doc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Family & Child quick simulator button */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Novo Cadastro de Família & Filho</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      const name = prompt('Nome do Filho/Criança:');
                      const age = parseInt(prompt('Idade:') || '2');
                      if (name) {
                        setFamilies(prev => prev.map(fam => {
                          if (fam.id === 'fam-1') {
                            return {
                              ...fam,
                              children: [...fam.children, {
                                id: `child-${Date.now()}`,
                                name: name,
                                age: age,
                                dob: '2024-01-01',
                                photo: '👶',
                                school: 'Maple Bear',
                                grade: 'Maternal',
                                teacher: 'Miss Clara',
                                bloodType: 'O+',
                                allergies: 'Nenhuma',
                                medications: 'Nenhum',
                                diet: 'Normal',
                                illnesses: 'Nenhuma',
                                medicalPlan: 'Bradesco',
                                doctor: 'Dr. Paulo',
                                hospital: 'Sabará',
                                sleep: '13:00 Soneca',
                                meals: 'Café, Almoço, Jantar',
                                bath: '17:30',
                                study: 'Histórias infantis',
                                activities: 'Massinha',
                                preferences: 'Desenhar',
                                authorizedPickup: []
                              }]
                            };
                          }
                          return fam;
                        }));
                        alert('Criança adicionada à Família Silva com sucesso!');
                      }
                    }}
                    className="p-3 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-700 font-black uppercase text-[10px] rounded-xl text-center"
                  >
                    + Adicionar Nova Criança à Família Silva
                  </button>

                  <button
                    onClick={() => {
                      const parents = prompt('Nome dos Pais:');
                      const address = prompt('Endereço:');
                      if (parents) {
                        const newFam = {
                          id: `fam-${families.length + 1}`,
                          parents: parents,
                          phones: '(11) 98765-4321',
                          emails: 'novo@email.com',
                          address: address || 'Rua Augusta, 1200 - Consolação, São Paulo',
                          latLng: 'Consolação, SP',
                          emergency: 'Dr. Lucas: (11) 95555-4444',
                          children: []
                        };
                        setFamilies(prev => [...prev, newFam]);
                        alert('Família cadastrada com sucesso! Agora você pode adicionar crianças.');
                      }
                    }}
                    className="p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 font-black uppercase text-[10px] rounded-xl text-center"
                  >
                    + Registrar Nova Família Completa
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NANNY PROFESSIONAL REGISTRY */}
          {activeTab === 'nannies' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/50 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900 uppercase">
                    {getTranslation('nanniesMgmt')}
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold">
                    Gerencie o perfil profissional, antecedentes certificados e parametrização financeira de taxas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {nannies.map((nan) => (
                  <div key={nan.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl">
                          {nan.photo}
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-slate-900">{nan.name}</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            Babá Certificada • {nan.history.clients} Clientes Atendidos
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg flex items-center gap-1">
                              ✓ Background Check Aprovado
                            </span>
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg">
                              CPF {nan.docs.cpf}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-950 flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {nan.avgRating}
                        </span>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">{nan.history.ratings} avaliações</p>
                      </div>
                    </div>

                    {/* Competency Skills Tags */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-400 uppercase font-black block">Habilidades & Competências</span>
                      <div className="flex flex-wrap gap-1.5">
                        {nan.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Availability calendar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600 border-t border-b border-slate-100 py-3">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block">Disponibilidade</span>
                        <span className="text-slate-900 font-extrabold">{nan.availability.days.join(', ')} ({nan.availability.hours})</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block">Certificação Principal</span>
                        <span className="text-slate-900 font-bold block truncate">{nan.certifications}</span>
                      </div>
                    </div>

                    {/* Rate matrix settings */}
                    <div className="space-y-2">
                      <span className="text-[9px] text-slate-400 uppercase font-black block">Matriz de Preços & Taxas</span>
                      <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                        {[
                          { key: 'Normal', val: nan.rates.normal },
                          { key: 'Extra', val: nan.rates.overtime },
                          { key: 'Madrugada', val: nan.rates.midnight },
                          { key: 'Feriado', val: nan.rates.holiday },
                          { key: 'Fim-Sem', val: nan.rates.weekend }
                        ].map((rateItem, idx) => (
                          <div key={idx} className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <span className="text-slate-400 font-bold block">{rateItem.key}</span>
                            <span className="font-extrabold text-slate-900 block mt-0.5">R$ {rateItem.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Nanny simulation */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs text-xs font-bold text-slate-600">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Novo Registro de Babá Profissional</h4>
                <button
                  onClick={() => {
                    const name = prompt('Nome Completo da Babá:');
                    const certs = prompt('Certificações (Ex: Primeiros socorros, Técnica em Enfermagem):');
                    if (name) {
                      const newNan = {
                        id: `nan-${nannies.length + 1}`,
                        name: name,
                        photo: '👩',
                        skills: ['Primeiros socorros', 'Educação infantil'],
                        docs: { cpf: '456.789.123-44', passport: 'BR444333', bgCheck: 'Verificado ✓' },
                        certifications: certs || 'Pedagogia Completo',
                        availability: { days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], hours: '08:00 - 18:00', status: 'Disponível' },
                        rates: { normal: 35, overtime: 45, midnight: 55, holiday: 70, weekend: 50 },
                        history: { clients: 1, hours: 10, ratings: 1, cancellations: 0 },
                        avgRating: 5.0,
                        reviews: []
                      };
                      setNannies(prev => [...prev, newNan]);
                      alert('Babá registrada com sucesso! Antecedentes criminais e profissionais verificados pelo sistema.');
                    }
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] rounded-xl transition-all"
                >
                  + Cadastrar Nova Babá com Background Check
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: IN-APP DIRECT COORDINATION CHAT & FILE SHARE */}
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
              {/* Chat Conversation Thread */}
              <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl shadow-3xs flex flex-col h-[520px]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-3xl">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                    <h3 className="text-xs font-black text-slate-900 uppercase">Chat Interno Direto</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Parents &lt;&gt; Nanny</span>
                </div>

                {/* Messages Panel */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chats.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[70%] text-xs ${
                        (currentRole === 'family' && msg.role === 'family') ||
                        (currentRole === 'nanny' && msg.role === 'nanny') ||
                        (currentRole === 'agency' && msg.role === 'agency')
                          ? 'ml-auto items-end'
                          : 'items-start'
                      }`}
                    >
                      <span className="text-[9px] text-slate-400 font-black uppercase mb-0.5">{msg.sender} ({msg.time})</span>
                      <div
                        className={`p-3 rounded-2xl ${
                          (currentRole === 'family' && msg.role === 'family') ||
                          (currentRole === 'nanny' && msg.role === 'nanny') ||
                          (currentRole === 'agency' && msg.role === 'agency')
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-slate-100 text-slate-800 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input box */}
                <div className="p-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const text = prompt('Envie um documento simulado:');
                      if (text) {
                        setChats(prev => [...prev, {
                          sender: currentRole === 'family' ? 'Mariana Silva' : 'Ana Silva',
                          role: currentRole,
                          text: `📄 Documento: ${text}`,
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          file: null,
                          type: 'doc'
                        }]);
                      }
                    }}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
                    title="Anexar Documento"
                  >
                    📎
                  </button>
                  <button
                    onClick={() => {
                      setChats(prev => [...prev, {
                        sender: currentRole === 'family' ? 'Mariana Silva' : 'Ana Silva',
                        role: currentRole,
                        text: `🎙️ Áudio Gravado (0:15s)`,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        file: null,
                        type: 'audio'
                      }]);
                    }}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
                    title="Gravar Áudio"
                  >
                    🎙️
                  </button>

                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua mensagem privada para a babá ou agência..."
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* BGrowth Gemini Copilot Chat Workspace */}
              <div className="lg:col-span-4 bg-slate-900 text-slate-100 rounded-3xl shadow-lg flex flex-col h-[520px]">
                <div className="p-4 border-b border-slate-800 bg-slate-950 rounded-t-3xl">
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                    IA BGrowth COPILOT
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-white mt-1">Assistente de Cuidado</h3>
                </div>

                {/* Copilot message log */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin text-xs">
                  {aiChat.map((msg, idx) => (
                    <div key={idx} className={`space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <span className="text-[8px] text-slate-500 font-black uppercase">
                        {msg.role === 'user' ? 'Você' : 'IA BGrowth'}
                      </span>
                      <div
                        className={`p-3 rounded-2xl leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-indigo-600 text-white ml-auto max-w-[85%]'
                            : 'bg-slate-800 text-indigo-100 mr-auto max-w-[85%]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="text-slate-400 text-[10px] font-bold animate-pulse flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> IA processando análise pedagógica...
                    </div>
                  )}
                </div>

                {/* Quick actions ready made buttons */}
                <div className="p-3 border-t border-slate-800/60 bg-slate-950 flex flex-wrap gap-1.5 justify-center">
                  <button
                    onClick={() => handleAskAI('Gerar plano de atividades lúdicas e educativas personalizadas para Beatriz de 4 anos')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-[9px] font-black uppercase rounded-lg border border-slate-700"
                  >
                    🧩 Plano de Atividades
                  </button>
                  <button
                    onClick={() => handleAskAI('Resuma as notas diárias da Beatriz')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-[9px] font-black uppercase rounded-lg border border-slate-700"
                  >
                    📄 Resumir o Dia do Bebê
                  </button>
                  <button
                    onClick={() => handleAskAI('O que fazer em caso de engasgo de criança pequena? Primeiros Socorros')}
                    className="px-2 py-1 bg-red-950/40 hover:bg-red-950/75 text-red-300 text-[9px] font-black uppercase rounded-lg border border-red-900/40"
                  >
                    🚨 Guia de Engasgo (SOS)
                  </button>
                </div>

                {/* Prompt box */}
                <div className="p-3 border-t border-slate-800 bg-slate-950 rounded-b-3xl flex items-center gap-2">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                    placeholder={getTranslation('askIaPlaceholder')}
                    className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500"
                  />
                  <button
                    onClick={() => handleAskAI()}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DIGITAL CHILD LIBRARY & CONTRACTS CENTER */}
          {activeTab === 'library' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/50 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900 uppercase">
                    {getTranslation('library')}
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold">
                    Central de arquivos digitais: carteira de vacinação, receitas médicas, contratos assinados e autorizações escolares.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt('Nome do arquivo (Ex: Carteira_Vacinacao.pdf):');
                    if (name) {
                      handleAddDocument(name, 'health');
                    }
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase rounded-xl"
                >
                  + Carregar Documento
                </button>
              </div>

              {/* Grid of existing documents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {libraryDocs.map((doc) => (
                  <div key={doc.id} className="bg-white border border-slate-100 p-4 rounded-3xl shadow-3xs space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl">{doc.type === 'health' ? '🏥' : doc.type === 'contract' ? '📝' : '🏫'}</span>
                      {doc.signed ? (
                        <span className="bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg border border-emerald-100">
                          Assinado Digitalmente
                        </span>
                      ) : (
                        <span className="bg-slate-50 text-slate-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg border border-slate-200/40">
                          PDF
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-900 truncate" title={doc.name}>
                        {doc.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{doc.size} • Carregado em {doc.date}</p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => alert(`Visualizando arquivo digital: ${doc.name}`)}
                        className="flex-1 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[9px] font-black uppercase rounded-lg text-center"
                      >
                        Visualizar
                      </button>
                      <button
                        onClick={() => alert(`Baixando arquivo digital: ${doc.name}`)}
                        className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Digital signature simulation block */}
              <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl shadow-md space-y-4">
                <h3 className="text-sm font-black uppercase text-white">Assinatura Digital de Contratos</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  BGrowth Babysitter™ possui validade jurídica em contratos de prestação de serviços. Os pais e babás podem assinar com biometria facial ou assinatura digital desenhada.
                </p>
                <div className="border border-dashed border-slate-700 p-4 rounded-2xl bg-slate-950 text-center text-slate-400 text-xs py-8">
                  🖋️ Desenhe sua assinatura nesta área utilizando o mouse ou tablet
                </div>
                <button
                  onClick={() => alert('Contrato de Cuidado assinado e registrado na blockchain BGrowth com carimbo de tempo!')}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl uppercase transition-all"
                >
                  Validar e Assinar Contrato Digital
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: FINANCIAL LEDGER */}
          {activeTab === 'finances' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/50 pb-3">
                <h2 className="text-lg font-black text-slate-900 uppercase">
                  {getTranslation('finances')}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Extrato e controle financeiro completo do cuidado de acordo com o perfil de usuário.
                </p>
              </div>

              {/* Stats based on current user role */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {currentRole === 'family' && (
                  <>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Quanto Gastou</span>
                      <h3 className="text-2xl font-black text-slate-900">R$ 1.575,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Acumulado no mês corrente</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Próximos Pagamentos</span>
                      <h3 className="text-2xl font-black text-amber-600">R$ 350,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Vencimento em 5 dias</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Preço por Hora</span>
                      <h3 className="text-2xl font-black text-indigo-600">R$ 35,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Valor com a babá Ana Silva</p>
                    </div>
                  </>
                )}

                {currentRole === 'nanny' && (
                  <>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Quanto Recebeu</span>
                      <h3 className="text-2xl font-black text-slate-900">R$ 3.820,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Ganhos liquidados no mês</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Receita Estimada Mensal</span>
                      <h3 className="text-2xl font-black text-emerald-600">R$ 4.500,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Projeção com agendamentos ativos</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Retenção de Imposto</span>
                      <h3 className="text-2xl font-black text-red-600">R$ 191,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Cálculo de Microempreendedor Individual (MEI)</p>
                    </div>
                  </>
                )}

                {currentRole === 'agency' && (
                  <>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Comissão Líquida (20%)</span>
                      <h3 className="text-2xl font-black text-slate-900">R$ 2.900,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Do faturamento total do sistema</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Receita Bruta do Sistema</span>
                      <h3 className="text-2xl font-black text-emerald-600">R$ 14.500,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Total transacionado</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-2">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Lucro Administrativo</span>
                      <h3 className="text-2xl font-black text-indigo-600">R$ 2.450,00</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Descontando custos de servidores e suporte</p>
                    </div>
                  </>
                )}
              </div>

              {/* Transactions log */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Histórico de Transações Recentes</h4>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-black text-slate-900 block">Atendimento Beatriz Silva</span>
                      <span className="text-[10px] text-slate-400 font-semibold">25 de Junho de 2026 • Transferência Direta</span>
                    </div>
                    <span className="font-extrabold text-emerald-600">+ R$ 350,00</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-black text-slate-900 block">Atendimento Enzo Nobre</span>
                      <span className="text-[10px] text-slate-400 font-semibold">18 de Junho de 2026 • Cartão de Crédito</span>
                    </div>
                    <span className="font-extrabold text-emerald-600">+ R$ 240,00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DOUBLE-SIDED REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200/50 pb-3">
                <h2 className="text-lg font-black text-slate-900 uppercase">
                  {getTranslation('reviews')}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Sistema de avaliação mútua: os pais avaliam as babás em 5 categorias essenciais e as babás também avaliam as famílias.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Parents review Babysitter Form */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Avaliar Babá (Pais)</h4>
                  <form onSubmit={handleAddReview} className="space-y-4 text-xs font-bold text-slate-600">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-black">Escolha a Babá</label>
                      <select
                        value={selectedNannyToReview}
                        onChange={(e) => setSelectedNannyToReview(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        {nannies.map(n => (
                          <option key={n.id} value={n.id}>{n.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Star evaluation sliders */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl">
                      {[
                        { label: 'Pontualidade', key: 'punctuality' },
                        { label: 'Carinho / Cuidado', key: 'care' },
                        { label: 'Comunicação', key: 'communication' },
                        { label: 'Organização', key: 'organization' },
                        { label: 'Segurança', key: 'safety' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-slate-600 font-semibold">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="1"
                              max="5"
                              value={(reviewFields as any)[item.key]}
                              onChange={(e) => setReviewFields({ ...reviewFields, [item.key]: parseInt(e.target.value) })}
                              className="w-24 accent-indigo-600"
                            />
                            <span className="text-slate-900 font-black">{(reviewFields as any)[item.key]} ★</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-black">Mensagem de Feedback</label>
                      <textarea
                        rows={3}
                        value={reviewFields.text}
                        onChange={(e) => setReviewFields({ ...reviewFields, text: e.target.value })}
                        placeholder="Escreva como foi a experiência com a profissional..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs rounded-xl"
                    >
                      Enviar Avaliação da Babá
                    </button>
                  </form>
                </div>

                {/* Babysitter rates Family Form */}
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Avaliar Família (Babá)</h4>
                  <div className="space-y-4 text-xs font-bold text-slate-600">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-black">Família Avaliada</label>
                      <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <option>Mariana & Rodrigo Silva (Beatriz)</option>
                        <option>Camila & Gustavo Nobre (Enzo)</option>
                      </select>
                    </div>

                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                      <span className="text-slate-600 font-semibold">Respeito / Ambiente de Trabalho</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={familyReview.rating}
                          onChange={(e) => setFamilyReview({ ...familyReview, rating: parseInt(e.target.value) })}
                          className="w-24 accent-indigo-600"
                        />
                        <span className="text-slate-900 font-black">{familyReview.rating} ★</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-black">Depoimento Profissional</label>
                      <textarea
                        rows={3}
                        value={familyReview.text}
                        onChange={(e) => setFamilyReview({ ...familyReview, text: e.target.value })}
                        placeholder="Comente sobre as condições de trabalho, respeito mútuo e clareza das instruções..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      onClick={() => {
                        alert('Família avaliada com sucesso! O feedback foi registrado para garantir a qualidade de trabalho no ecossistema.');
                        setFamilyReview({ rating: 5, text: '' });
                      }}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs rounded-xl"
                    >
                      Enviar Avaliação da Família
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Footnote */}
      <footer className="bg-white border-t border-slate-100 py-3 px-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">
        © 2026 {getTranslation('title')}. {getTranslation('medicalDisclaimer')}
      </footer>
    </div>
  );
}
