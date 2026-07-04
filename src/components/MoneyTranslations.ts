export interface TranslationSet {
  title: string;
  subtitle: string;
  selectMode: string;
  personalMode: string;
  businessMode: string;
  selectLanguage: string;
  backToDashboard: string;
  dashboard: string;
  accounts: string;
  transactions: string;
  budgets: string;
  goals: string;
  patrimony: string;
  investments: string;
  education: string;
  journey: string;
  calendar: string;
  documents: string;
  reports: string;
  
  // Dashboard Strings
  howIsLife: string;
  healthLevel: string;
  excellent: string;
  good: string;
  regular: string;
  critical: string;
  scoreTitle: string;
  scoreDescription: string;
  scoreGood: string;
  scoreBad: string;
  scoreImprove: string;
  
  // Indicators
  availableBalance: string;
  workingCapital: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  monthlySavings: string;
  netWorth: string;
  debts: string;
  emergencyFund: string;
  businessReserve: string;
  investmentsTitle: string;
  pendingBills: string;
  overdueBills: string;
  monthlyGoal: string;
  
  // Accounts
  addNewAccount: string;
  accountName: string;
  accountType: string;
  balance: string;
  creditLimit: string;
  checking: string;
  savingsAcc: string;
  digital: string;
  wallet: string;
  joint: string;
  creditCard: string;
  save: string;
  cancel: string;
  actions: string;
  
  // Transactions
  addTransaction: string;
  description: string;
  value: string;
  date: string;
  category: string;
  type: string;
  income: string;
  expense: string;
  all: string;
  searchPlaceholder: string;
  noTransactions: string;
  
  // Budgets
  budgetTitle: string;
  budgetSubtitle: string;
  limit: string;
  spent: string;
  remaining: string;
  createBudget: string;
  
  // Goals
  goalsTitle: string;
  goalsSubtitle: string;
  emergencyTitle: string;
  emergencyTarget: string;
  emergencyCurrent: string;
  timeToGoal: string;
  months: string;
  learnToBuild: string;
  contribute: string;
  
  // Patrimony
  patrimonyTitle: string;
  patrimonySubtitle: string;
  assets: string;
  liabilities: string;
  patrimonyLiquid: string;
  evolution: string;
  
  // Investments
  investmentsSubtitle: string;
  assetType: string;
  stocks: string;
  etfs: string;
  funds: string;
  treasury: string;
  fixedIncome: string;
  crypto: string;
  pension: string;
  currentBalance: string;
  costBasis: string;
  yield: string;
  
  // Education & Challenges
  eduSubtitle: string;
  learningPaths: string;
  challenges: string;
  achievements: string;
  library: string;
  podcasts: string;
  calculators: string;
  quizTitle: string;
  quizCorrect: string;
  quizWrong: string;
  
  // Journey
  journeyTitle: string;
  journeySubtitle: string;
  addMilestone: string;
  milestoneTitle: string;
  milestoneDate: string;
  milestoneText: string;
  milestonePlaceholder: string;
  
  // Documents
  docsTitle: string;
  docsSubtitle: string;
  dragDrop: string;
  docName: string;
  docTag: string;
  upload: string;
  noDocs: string;
  
  // Reports
  repTitle: string;
  repSubtitle: string;
  cashFlow: string;
  categoryShare: string;
}

export const moneyTranslations: Record<'pt' | 'en' | 'es', TranslationSet> = {
  pt: {
    title: "BGrowth Money™",
    subtitle: "Educação Financeira e Inteligência Patrimonial",
    selectMode: "Tipo de Perfil",
    personalMode: "Pessoa Física (Pessoal)",
    businessMode: "Pessoa Jurídica (Empresa)",
    selectLanguage: "Idioma",
    backToDashboard: "Voltar para Hub",
    dashboard: "Painel",
    accounts: "Contas e Cartões",
    transactions: "Transações",
    budgets: "Orçamentos",
    goals: "Metas e Reserva",
    patrimony: "Patrimônio",
    investments: "Investimentos",
    education: "Educação & Desafios",
    journey: "Minha Jornada",
    calendar: "Calendário",
    documents: "Documentos",
    reports: "Relatórios",
    
    howIsLife: "Como está sua vida financeira hoje?",
    healthLevel: "Saúde Financeira",
    excellent: "Excelente",
    good: "Boa",
    regular: "Regular",
    critical: "Crítica",
    scoreTitle: "Score Financeiro BGrowth™",
    scoreDescription: "Sua pontuação de desenvolvimento financeiro baseado em hábitos e metas.",
    scoreGood: "O que está bom: Reserva montada, poucos parcelamentos de consumo, orçamento controlado.",
    scoreBad: "O que precisa melhorar: Aumentar aportes em investimentos de longo prazo.",
    scoreImprove: "Como subir a pontuação: Reduza os jantares fora e guarde R$ 200 a mais neste mês.",
    
    availableBalance: "Saldo Disponível",
    workingCapital: "Capital de Giro",
    monthlyIncome: "Receitas do Mês",
    monthlyExpenses: "Despesas do Mês",
    monthlySavings: "Economia do Mês",
    netWorth: "Patrimônio",
    debts: "Dívidas",
    emergencyFund: "Reserva de Emergência",
    businessReserve: "Reserva de Caixa",
    investmentsTitle: "Investimentos",
    pendingBills: "Contas a Vencer",
    overdueBills: "Contas Vencidas",
    monthlyGoal: "Meta Mensal",
    
    addNewAccount: "Adicionar Nova Conta",
    accountName: "Nome da Conta/Instituição",
    accountType: "Tipo de Conta",
    balance: "Saldo Inicial",
    creditLimit: "Limite de Crédito",
    checking: "Conta Corrente",
    savingsAcc: "Poupança",
    digital: "Conta Digital",
    wallet: "Dinheiro / Carteira",
    joint: "Conta Conjunta",
    creditCard: "Cartão de Crédito",
    save: "Salvar",
    cancel: "Cancelar",
    actions: "Ações",
    
    addTransaction: "Registrar Transação",
    description: "Descrição",
    value: "Valor",
    date: "Data",
    category: "Categoria",
    type: "Tipo",
    income: "Receita",
    expense: "Despesa",
    all: "Todos",
    searchPlaceholder: "Buscar transação...",
    noTransactions: "Nenhuma transação cadastrada.",
    
    budgetTitle: "Orçamentos por Categoria",
    budgetSubtitle: "Controle seus gastos estabelecendo limites saudáveis por área.",
    limit: "Limite",
    spent: "Gasto",
    remaining: "Restante",
    createBudget: "Definir Orçamento",
    
    goalsTitle: "Metas Financeiras",
    goalsSubtitle: "Transforme sonhos pessoais ou marcos empresariais em conquistas reais.",
    emergencyTitle: "Construção de Reserva",
    emergencyTarget: "Meta de Reserva",
    emergencyCurrent: "Valor Guardado",
    timeToGoal: "Tempo Estimado",
    months: "meses",
    learnToBuild: "Aprenda como construir e rentabilizar sua reserva.",
    contribute: "Aportar Valor",
    
    patrimonyTitle: "Patrimônio Líquido",
    patrimonySubtitle: "Soma de todos os seus bens menos as suas obrigações.",
    assets: "Bens e Ativos (Dinheiro, Investimentos, Carros, Imóveis, FGTS)",
    liabilities: "Dívidas e Obrigações (Empréstimos, Financiamentos, Faturas)",
    patrimonyLiquid: "Patrimônio Líquido",
    evolution: "Evolução Histórica",
    
    investmentsSubtitle: "Acompanhamento de posições patrimoniais em carteira.",
    assetType: "Classe de Ativo",
    stocks: "Ações",
    etfs: "ETFs / Fundos de Índice",
    funds: "Fundos de Investimento",
    treasury: "Tesouro Direto",
    fixedIncome: "CDB / LCI / LCA",
    crypto: "Criptomoedas",
    pension: "Previdência Privada",
    currentBalance: "Saldo Atual",
    costBasis: "Preço de Compra",
    yield: "Rentabilidade",
    
    eduSubtitle: "Desenvolva seus hábitos financeiros com trilhas de estudo e desafios.",
    learningPaths: "Trilhas de Aprendizagem",
    challenges: "Desafios BGrowth",
    achievements: "Minhas Conquistas",
    library: "Biblioteca de Conteúdo",
    podcasts: "Podcasts Exclusivos",
    calculators: "Simuladores & Calculadoras",
    quizTitle: "Mini-Quiz de Fixação",
    quizCorrect: "Parabéns, resposta correta! Educação é riqueza.",
    quizWrong: "Quase lá! Tente reler a trilha e tente novamente.",
    
    journeyTitle: "Minha Jornada Financeira™",
    journeySubtitle: "Transformamos números em uma história de crescimento real.",
    addMilestone: "Registrar Marco na Jornada",
    milestoneTitle: "Título do Marco",
    milestoneDate: "Mês/Ano",
    milestoneText: "Escreva uma breve descrição da sua conquista",
    milestonePlaceholder: "Ex: Completei minha reserva de emergência!",
    
    docsTitle: "Arquivos & Documentos Financeiros",
    docsSubtitle: "Guarde comprovantes, contratos, faturas e garantias de forma organizada.",
    dragDrop: "Arraste e solte o arquivo aqui ou clique para selecionar",
    docName: "Nome do Documento",
    docTag: "Categoria/Tag",
    upload: "Enviar Arquivo",
    noDocs: "Nenhum documento armazenado.",
    
    repTitle: "Análise de Relatórios",
    repSubtitle: "Entenda o fluxo do seu dinheiro e tome decisões mais inteligentes.",
    cashFlow: "Fluxo de Caixa (Entradas vs Saídas)",
    categoryShare: "Distribuição por Categoria"
  },
  en: {
    title: "BGrowth Money™",
    subtitle: "Financial Education and Wealth Intelligence",
    selectMode: "Profile Type",
    personalMode: "Personal (Individual)",
    businessMode: "Business (Company)",
    selectLanguage: "Language",
    backToDashboard: "Back to Hub",
    dashboard: "Dashboard",
    accounts: "Accounts & Cards",
    transactions: "Transactions",
    budgets: "Budgets",
    goals: "Goals & Reserves",
    patrimony: "Net Worth",
    investments: "Investments",
    education: "Education & Challenges",
    journey: "My Journey",
    calendar: "Calendar",
    documents: "Documents",
    reports: "Reports",
    
    howIsLife: "How is your financial life today?",
    healthLevel: "Financial Health",
    excellent: "Excellent",
    good: "Good",
    regular: "Regular",
    critical: "Critical",
    scoreTitle: "BGrowth™ Financial Score",
    scoreDescription: "Your financial growth rating based on habits, budgets and active goals.",
    scoreGood: "What is good: Emergency fund completed, low interest-bearing consumer debt, structured budget.",
    scoreBad: "What to improve: Increase monthly allocation to long-term equity/assets.",
    scoreImprove: "How to increase score: Cut dining out by 15% and invest $200 extra this month.",
    
    availableBalance: "Available Balance",
    workingCapital: "Working Capital",
    monthlyIncome: "Monthly Income",
    monthlyExpenses: "Monthly Expenses",
    monthlySavings: "Monthly Savings",
    netWorth: "Net Worth",
    debts: "Debts",
    emergencyFund: "Emergency Fund",
    businessReserve: "Cash Buffer",
    investmentsTitle: "Investments",
    pendingBills: "Upcoming Bills",
    overdueBills: "Overdue Bills",
    monthlyGoal: "Monthly Goal",
    
    addNewAccount: "Add New Account",
    accountName: "Account / Bank Name",
    accountType: "Account Type",
    balance: "Starting Balance",
    creditLimit: "Credit Limit",
    checking: "Checking Account",
    savingsAcc: "Savings Account",
    digital: "Digital Account",
    wallet: "Cash / Wallet",
    joint: "Joint Account",
    creditCard: "Credit Card",
    save: "Save",
    cancel: "Cancel",
    actions: "Actions",
    
    addTransaction: "Log Transaction",
    description: "Description",
    value: "Value",
    date: "Date",
    category: "Category",
    type: "Type",
    income: "Income",
    expense: "Expense",
    all: "All",
    searchPlaceholder: "Search transaction...",
    noTransactions: "No registered transactions found.",
    
    budgetTitle: "Category Budgets",
    budgetSubtitle: "Control your spending by setting healthy limits per category.",
    limit: "Limit",
    spent: "Spent",
    remaining: "Remaining",
    createBudget: "Set Budget",
    
    goalsTitle: "Financial Goals",
    goalsSubtitle: "Convert personal dreams or business milestones into real progress.",
    emergencyTitle: "Reserve Building",
    emergencyTarget: "Target Buffer",
    emergencyCurrent: "Amount Saved",
    timeToGoal: "Estimated Time",
    months: "months",
    learnToBuild: "Learn how to build and optimize your reserve fund.",
    contribute: "Fund Reserve",
    
    patrimonyTitle: "Net Worth Tracker",
    patrimonySubtitle: "The sum of all your assets minus your liabilities.",
    assets: "Assets (Cash, Investments, Real Estate, Vehicles, Pension)",
    liabilities: "Liabilities (Loans, Financing, Card Bills, Debts)",
    patrimonyLiquid: "Net Worth",
    evolution: "Historical Progress",
    
    investmentsSubtitle: "Keep track of asset allocation and investment holdings.",
    assetType: "Asset Class",
    stocks: "Stocks / Equities",
    etfs: "ETFs / Index Funds",
    funds: "Mutual Funds",
    treasury: "Government Bonds",
    fixedIncome: "CDs / Fixed Income",
    crypto: "Cryptocurrencies",
    pension: "Private Retirement Pension",
    currentBalance: "Current Balance",
    costBasis: "Purchase Price",
    yield: "Yield / Profitability",
    
    eduSubtitle: "Build high-impact habits with courses, challenges, and tools.",
    learningPaths: "Learning Paths",
    challenges: "BGrowth Challenges",
    achievements: "My Achievements",
    library: "Content Library",
    podcasts: "Exclusive Podcasts",
    calculators: "Simulators & Calculators",
    quizTitle: "Retention Quiz",
    quizCorrect: "Congratulations! Correct answer. Knowledge is wealth.",
    quizWrong: "Almost! Read the path summary and try again.",
    
    journeyTitle: "My Financial Journey™",
    journeySubtitle: "We turn cold numbers into an inspiring life story of growth.",
    addMilestone: "Register Journey Milestone",
    milestoneTitle: "Milestone Title",
    milestoneDate: "Month/Year",
    milestoneText: "Describe this landmark achievement briefly",
    milestonePlaceholder: "e.g., Hit my first $10k in investments!",
    
    docsTitle: "Secure Financial Document Vault",
    docsSubtitle: "Store receipts, contracts, invoices and warranties safely.",
    dragDrop: "Drag and drop files here, or click to browse",
    docName: "Document Name",
    docTag: "Tag / Category",
    upload: "Upload Document",
    noDocs: "No files stored in this vault yet.",
    
    repTitle: "Report Analytics",
    repSubtitle: "Understand cash flow trends and make better decisions.",
    cashFlow: "Cash Flow (Income vs Outflow)",
    categoryShare: "Category Allocation"
  },
  es: {
    title: "BGrowth Money™",
    subtitle: "Educación Financiera e Inteligencia Patrimonial",
    selectMode: "Tipo de Perfil",
    personalMode: "Persona Física (Personal)",
    businessMode: "Persona Jurídica (Empresa)",
    selectLanguage: "Idioma",
    backToDashboard: "Volver al Hub",
    dashboard: "Panel",
    accounts: "Cuentas y Tarjetas",
    transactions: "Transacciones",
    budgets: "Presupuestos",
    goals: "Metas y Reserva",
    patrimony: "Patrimonio",
    investments: "Inversiones",
    education: "Educación & Retos",
    journey: "Mi Trayectoria",
    calendar: "Calendario",
    documents: "Documentos",
    reports: "Informes",
    
    howIsLife: "¿Cómo está tu vida financiera hoy?",
    healthLevel: "Salud Financiera",
    excellent: "Excelente",
    good: "Buena",
    regular: "Regular",
    critical: "Crítica",
    scoreTitle: "Score Financiero BGrowth™",
    scoreDescription: "Tu puntuación de desarrollo financiero basada en hábitos y metas.",
    scoreGood: "Lo bueno: Fondo de emergencia listo, bajas deudas de consumo, presupuesto controlado.",
    scoreBad: "Lo que debe mejorar: Aumentar aportaciones en inversiones a largo plazo.",
    scoreImprove: "Cómo subir el score: Reduce cenas fuera e invierte $ 200 extras este mes.",
    
    availableBalance: "Saldo Disponible",
    workingCapital: "Capital de Trabajo",
    monthlyIncome: "Ingresos del Mes",
    monthlyExpenses: "Gastos del Mes",
    monthlySavings: "Ahorro del Mes",
    netWorth: "Patrimonio",
    debts: "Deudas",
    emergencyFund: "Fondo de Emergencia",
    businessReserve: "Reserva de Caja",
    investmentsTitle: "Inversiones",
    pendingBills: "Cuentas por Vencer",
    overdueBills: "Cuentas Vencidas",
    monthlyGoal: "Meta Mensual",
    
    addNewAccount: "Agregar Nueva Cuenta",
    accountName: "Nombre de la Cuenta/Banco",
    accountType: "Tipo de Cuenta",
    balance: "Saldo Inicial",
    creditLimit: "Límite de Crédito",
    checking: "Cuenta Corriente",
    savingsAcc: "Cuenta de Ahorros",
    digital: "Cuenta Digital",
    wallet: "Efectivo / Cartera",
    joint: "Cuenta Mancomunada",
    creditCard: "Tarjeta de Crédito",
    save: "Guardar",
    cancel: "Cancelar",
    actions: "Acciones",
    
    addTransaction: "Registrar Transacción",
    description: "Descripción",
    value: "Valor",
    date: "Fecha",
    category: "Categoría",
    type: "Tipo",
    income: "Ingreso",
    expense: "Gasto",
    all: "Todos",
    searchPlaceholder: "Buscar transacción...",
    noTransactions: "Ninguna transacción registrada.",
    
    budgetTitle: "Presupuesto por Categoría",
    budgetSubtitle: "Controla tus gastos definiendo límites saludables por área.",
    limit: "Límite",
    spent: "Gastado",
    remaining: "Restante",
    createBudget: "Definir Presupuesto",
    
    goalsTitle: "Metas Financieras",
    goalsSubtitle: "Transforma tus sueños personales o metas corporativas en logros reales.",
    emergencyTitle: "Construcción de Reserva",
    emergencyTarget: "Meta de Reserva",
    emergencyCurrent: "Monto Guardado",
    timeToGoal: "Tiempo Estimado",
    months: "meses",
    learnToBuild: "Aprende cómo construir y optimizar tu fondo de reserva.",
    contribute: "Aportar Dinero",
    
    patrimonyTitle: "Patrimonio Neto",
    patrimonySubtitle: "Suma de todos tus activos menos tus pasivos.",
    assets: "Activos y Bienes (Efectivo, Inversiones, Vehículos, Inmuebles)",
    liabilities: "Pasivos y Deudas (Préstamos, Financiamientos, Tarjetas)",
    patrimonyLiquid: "Patrimonio Neto",
    evolution: "Evolución Histórica",
    
    investmentsSubtitle: "Seguimiento de posiciones patrimoniales en cartera.",
    assetType: "Tipo de Activo",
    stocks: "Acciones",
    etfs: "ETFs / Fondos de Índice",
    funds: "Fondos Mutuos",
    treasury: "Bonos del Estado",
    fixedIncome: "Depósitos a Plazo",
    crypto: "Criptomonedas",
    pension: "Plan de Pensiones",
    currentBalance: "Saldo Actual",
    costBasis: "Precio de Compra",
    yield: "Rendimiento",
    
    eduSubtitle: "Mejora tus hábitos financieros con cursos, retos y simuladores.",
    learningPaths: "Rutas de Aprendizaje",
    challenges: "Retos BGrowth",
    achievements: "Mis Logros",
    library: "Biblioteca de Contenidos",
    podcasts: "Podcasts Exclusivos",
    calculators: "Simuladores & Calculadoras",
    quizTitle: "Mini-Evaluación",
    quizCorrect: "¡Felicitaciones, respuesta correcta! La educación es riqueza.",
    quizWrong: "¡Casi! Lee nuevamente la lección e inténtalo otra vez.",
    
    journeyTitle: "Mi Trayectoria Financiera™",
    journeySubtitle: "Transformamos números fríos en una historia de crecimiento real.",
    addMilestone: "Registrar Hito en Trayectoria",
    milestoneTitle: "Título del Hito",
    milestoneDate: "Mes/Año",
    milestoneText: "Describe este logro brevemente",
    milestonePlaceholder: "Ej: ¡Llegué a mis primeros $10k ahorrados!",
    
    docsTitle: "Bóveda de Documentos Financieros",
    docsSubtitle: "Guarda comprobantes, contratos, facturas y garantías de forma segura.",
    dragDrop: "Arrastra y suelta el archivo aquí o haz clic para buscar",
    docName: "Nombre del Documento",
    docTag: "Categoría/Tag",
    upload: "Subir Archivo",
    noDocs: "Ningún documento almacenado en esta bóveda.",
    
    repTitle: "Análisis de Informes",
    repSubtitle: "Entiende el flujo de tu dinero y toma mejores decisiones.",
    cashFlow: "Flujo de Caja (Ingresos vs Gastos)",
    categoryShare: "Distribución por Categoría"
  }
};
