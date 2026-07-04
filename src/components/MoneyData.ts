export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'digital' | 'wallet' | 'joint' | 'card';
  balance: number;
  limit?: number;
  profile: 'pf' | 'pj'; // pf = personal, pj = business
}

export interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
  profile: 'pf' | 'pj';
  accountId: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  profile: 'pf' | 'pj';
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  estimatedMonths: number;
  profile: 'pf' | 'pj';
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  costBasis: number;
  currentValue: number;
  yieldRate: number; // e.g., 12.5%
  profile: 'pf' | 'pj';
}

export interface JourneyMilestone {
  id: string;
  title: string;
  date: string; // e.g., "Jan 2026"
  description: string;
  profile: 'pf' | 'pj';
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  daysTotal: number;
  daysRemaining: number;
  rewardPoints: number;
  profile: 'pf' | 'pj';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  profile: 'pf' | 'pj';
}

export interface FinancialDocument {
  id: string;
  name: string;
  size: string;
  tag: string;
  date: string;
  profile: 'pf' | 'pj';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  amount: number;
  type: 'income' | 'expense' | 'bill' | 'subscription';
  completed: boolean;
  profile: 'pf' | 'pj';
}

// Initial Data
export const initialAccounts: Account[] = [
  // PF (Personal)
  { id: 'pf_acc1', name: 'Itaú Unibanco', type: 'checking', balance: 3450.00, profile: 'pf' },
  { id: 'pf_acc2', name: 'Nubank Reserva', type: 'digital', balance: 5000.00, profile: 'pf' },
  { id: 'pf_acc3', name: 'Tesouro Selic', type: 'savings', balance: 8500.00, profile: 'pf' },
  { id: 'pf_acc4', name: 'Carteira (Dinheiro)', type: 'wallet', balance: 350.00, profile: 'pf' },
  { id: 'pf_card1', name: 'Visa Platinum Nubank', type: 'card', balance: -1240.50, limit: 5000, profile: 'pf' },
  // PJ (Business)
  { id: 'pj_acc1', name: 'Conta PJ Nubank', type: 'digital', balance: 42500.00, profile: 'pj' },
  { id: 'pj_acc2', name: 'Banco do Brasil Empresa', type: 'checking', balance: 18450.00, profile: 'pj' },
  { id: 'pj_acc3', name: 'CDB Liquidez Diária PJ', type: 'savings', balance: 30000.00, profile: 'pj' },
  { id: 'pj_card1', name: 'Cartão PJ Corporate', type: 'card', balance: -4500.00, limit: 20000, profile: 'pj' }
];

export const initialTransactions: Transaction[] = [
  // PF (Personal)
  { id: 'pf_t1', description: 'Salário CLT BGrowth', value: 6500.00, date: '2026-06-05', category: 'Salário', type: 'income', profile: 'pf', accountId: 'pf_acc1' },
  { id: 'pf_t2', description: 'Supermercado Pão de Açúcar', value: 420.50, date: '2026-06-12', category: 'Mercado', type: 'expense', profile: 'pf', accountId: 'pf_card1' },
  { id: 'pf_t3', description: 'Netflix Recorrente', value: 55.90, date: '2026-06-15', category: 'Assinaturas', type: 'expense', profile: 'pf', accountId: 'pf_card1' },
  { id: 'pf_t4', description: 'Freelance Design Website', value: 1200.00, date: '2026-06-18', category: 'Freelas', type: 'income', profile: 'pf', accountId: 'pf_acc2' },
  { id: 'pf_t5', description: 'Almoço Restaurante Coco Bambu', value: 180.00, date: '2026-06-20', category: 'Restaurantes', type: 'expense', profile: 'pf', accountId: 'pf_acc1' },
  { id: 'pf_t6', description: 'Combustível Posto Ipiranga', value: 150.00, date: '2026-06-22', category: 'Combustível', type: 'expense', profile: 'pf', accountId: 'pf_card1' },
  { id: 'pf_t7', description: 'Mensalidade Academia BlueFit', value: 119.90, date: '2026-06-25', category: 'Assinaturas', type: 'expense', profile: 'pf', accountId: 'pf_card1' },
  { id: 'pf_t8', description: 'Rendimento Dividendos ITUB4', value: 45.30, date: '2026-06-28', category: 'Dividendos', type: 'income', profile: 'pf', accountId: 'pf_acc3' },
  
  // PJ (Business)
  { id: 'pj_t1', description: 'Faturamento Cliente Alfa LTDA', value: 18500.00, date: '2026-06-10', category: 'Clientes', type: 'income', profile: 'pj', accountId: 'pj_acc1' },
  { id: 'pj_t2', description: 'Folha de Pagamento Equipe', value: 8500.00, date: '2026-06-05', category: 'Equipe/Salários', type: 'expense', profile: 'pj', accountId: 'pj_acc2' },
  { id: 'pj_t3', description: 'Licença Mensal Adobe Creative Cloud', value: 275.00, date: '2026-06-15', category: 'Assinaturas/Software', type: 'expense', profile: 'pj', accountId: 'pj_card1' },
  { id: 'pj_t4', description: 'Faturamento Cliente Beta Inc', value: 12000.00, date: '2026-06-20', category: 'Clientes', type: 'income', profile: 'pj', accountId: 'pj_acc1' },
  { id: 'pj_t5', description: 'Serviços Nuvem AWS', value: 680.00, date: '2026-06-18', category: 'Infraestrutura', type: 'expense', profile: 'pj', accountId: 'pj_card1' },
  { id: 'pj_t6', description: 'Aluguel Escritório Coworking', value: 2500.00, date: '2026-06-01', category: 'Imóvel/Espaço', type: 'expense', profile: 'pj', accountId: 'pj_acc2' },
  { id: 'pj_t7', description: 'Campanha de Tráfego Google Ads', value: 1500.00, date: '2026-06-14', category: 'Marketing', type: 'expense', profile: 'pj', accountId: 'pj_card1' }
];

export const initialBudgets: Budget[] = [
  // PF
  { id: 'pf_b1', category: 'Mercado', limit: 800.00, spent: 420.50, profile: 'pf' },
  { id: 'pf_b2', category: 'Restaurantes', limit: 400.00, spent: 180.00, profile: 'pf' },
  { id: 'pf_b3', category: 'Lazer', limit: 300.00, spent: 120.00, profile: 'pf' },
  { id: 'pf_b4', category: 'Combustível', limit: 400.00, spent: 150.00, profile: 'pf' },
  { id: 'pf_b5', category: 'Assinaturas', limit: 250.00, spent: 175.80, profile: 'pf' },
  // PJ
  { id: 'pj_b1', category: 'Marketing', limit: 5000.00, spent: 1500.00, profile: 'pj' },
  { id: 'pj_b2', category: 'Infraestrutura', limit: 2000.00, spent: 680.00, profile: 'pj' },
  { id: 'pj_b3', category: 'Viagens/Reuniões', limit: 1500.00, spent: 340.00, profile: 'pj' },
  { id: 'pj_b4', category: 'Equipamentos', limit: 3000.00, spent: 1200.00, profile: 'pj' }
];

export const initialGoals: Goal[] = [
  // PF
  { id: 'pf_g1', name: 'Reserva de Emergência', target: 20000.00, current: 13500.00, estimatedMonths: 4, profile: 'pf' },
  { id: 'pf_g2', name: 'Viagem para o Chile', target: 6000.00, current: 4200.00, estimatedMonths: 2, profile: 'pf' },
  { id: 'pf_g3', name: 'Trocar de Celular', target: 5000.00, current: 1500.00, estimatedMonths: 6, profile: 'pf' },
  { id: 'pf_g4', name: 'Entrada da Casa Própria', target: 80000.00, current: 12000.00, estimatedMonths: 24, profile: 'pf' },
  // PJ
  { id: 'pj_g1', name: 'Fundo de Reserva Empresarial', target: 100000.00, current: 72500.00, estimatedMonths: 5, profile: 'pj' },
  { id: 'pj_g2', name: 'Aquisição de Servidores e Hardware', target: 25000.00, current: 15000.00, estimatedMonths: 3, profile: 'pj' },
  { id: 'pj_g3', name: 'Expansão de Sede Física', target: 150000.00, current: 30000.00, estimatedMonths: 18, profile: 'pj' }
];

export const initialInvestments: Investment[] = [
  // PF
  { id: 'pf_i1', name: 'CDB Banco Inter 102% CDI', type: 'CDB', costBasis: 5000.00, currentValue: 5240.00, yieldRate: 11.2, profile: 'pf' },
  { id: 'pf_i2', name: 'Tesouro IPCA+ 2035', type: 'Tesouro', costBasis: 8000.00, currentValue: 8750.00, yieldRate: 12.8, profile: 'pf' },
  { id: 'pf_i3', name: 'Ações Itaú (ITUB4)', type: 'Ações', costBasis: 4000.00, currentValue: 4350.00, yieldRate: 8.75, profile: 'pf' },
  { id: 'pf_i4', name: 'Ethereum (ETH)', type: 'Criptomoedas', costBasis: 2000.00, currentValue: 2450.00, yieldRate: 22.5, profile: 'pf' },
  // PJ
  { id: 'pj_i1', name: 'Tesouro Selic Simples PJ', type: 'Tesouro', costBasis: 30000.00, currentValue: 31200.00, yieldRate: 10.55, profile: 'pj' },
  { id: 'pj_i2', name: 'Letras de Crédito Imobiliário (LCI)', type: 'LCI', costBasis: 15000.00, currentValue: 15600.00, yieldRate: 9.8, profile: 'pj' }
];

export const initialJourneyMilestones: JourneyMilestone[] = [
  // PF
  { id: 'pf_jm1', title: 'Primeira Meta Criada', date: 'Jan 2026', description: 'Definimos a meta de construir a Reserva de Emergência de R$ 20k.', profile: 'pf' },
  { id: 'pf_jm2', title: 'Cartão de Crédito Totalmente Quitado', date: 'Mar 2026', description: 'Eliminamos as faturas pendentes atrasadas e reestruturamos o limite de uso diário.', profile: 'pf' },
  { id: 'pf_jm3', title: 'Metade da Reserva Concluída', date: 'Jun 2026', description: 'Alcançamos os primeiros R$ 10.000 aplicados em liquidez diária e seguros.', profile: 'pf' },
  // PJ
  { id: 'pj_jm1', title: 'Faturamento de R$ 50k ultrapassado', date: 'Fev 2026', description: 'Atingimos um marco operacional histórico no primeiro trimestre de atividade.', profile: 'pj' },
  { id: 'pj_jm2', title: 'Capital de Giro Estabilizado', date: 'Mai 2026', description: 'Reserva empresarial de 3 meses de despesas totalmente consolidadas.', profile: 'pj' }
];

export const lessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Trilha 1: Organização Financeira e Diagnóstico',
    subtitle: 'Entenda como mapear suas contas e descobrir para onde vai cada centavo.',
    content: `O primeiro passo de toda pessoa rica e organizada é mapear sua realidade atual. Muitas pessoas erram ao tentar economizar sem saber para onde o dinheiro está indo.

REGRAS DE OURO:
1. Anote tudo: Um gasto de R$ 5,00 acumulado pode somar centenas de reais ao fim do mês.
2. Defina uma Regra de Divisão (Regra 50/30/20):
   - 50% para Necessidades básicas (Moradia, Alimentação, Saúde).
   - 30% para Desejos pessoais (Lazer, Jantares, Hobbies).
   - 20% para Poupar/Investir ou pagar dívidas acumuladas.

Ao fazer isso, você cria paz de espírito e assume o volante do seu dinheiro de forma definitiva.`,
    quiz: {
      question: 'O que propõe a regra financeira saudável 50/30/20?',
      options: [
        '50% para poupar, 30% para lazer, 20% para contas básicas.',
        '50% para contas essenciais, 30% para lazer e desejos, 20% para poupar/investir.',
        '50% para investimentos de alto risco, 30% para viagens, 20% para moradia.',
        '50% para impostos, 30% para despesas fixas, 20% para diversão.'
      ],
      answerIndex: 1
    }
  },
  {
    id: 'l2',
    title: 'Trilha 2: Controlando Gastos e Orçamentos',
    subtitle: 'Aprenda como criar limites mensais que evitam faturas assustadoras.',
    content: `Diferente do que muitos acham, criar um orçamento não significa parar de gastar, mas sim planejar o gasto com antecedência!

DICAS DE CONTROLE:
- Crie envelopes digitais ou categorias de orçamento (ex: R$ 400 para Restaurantes).
- Se gastou mais em Lazer na primeira quinzena, compense reduzindo compras na segunda quinzena.
- Monitore sua proporção de limite utilizado no cartão de crédito. Usar mais de 50% do limite gera alertas de risco de superendividamento.`,
    quiz: {
      question: 'Por que estabelecer orçamentos por categorias ajuda na saúde financeira?',
      options: [
        'Porque proíbe totalmente qualquer tipo de lazer.',
        'Porque permite planejar seus gastos e compensar excessos de forma proativa.',
        'Porque cancela automaticamente seu cartão se você ultrapassar o limite.',
        'Porque garante ganhos automáticos na bolsa de valores.'
      ],
      answerIndex: 1
    }
  },
  {
    id: 'l3',
    title: 'Trilha 3: Criando sua Reserva de Emergência',
    subtitle: 'Seu escudo protetor contra imprevistos, desemprego e oportunidades do mercado.',
    content: `A reserva de emergência é a base de toda riqueza duradoura. Sem ela, qualquer imprevisto (conserto do carro, despesas de saúde, demissão) fará você pegar empréstimos caros e se endividar.

QUANTO DEVE TER:
- CLT / Funcionários fixos: 6 meses de suas despesas mensais essenciais.
- Autônomos / Profissionais Liberais: 12 meses de despesas essenciais.

ONDE GUARDAR:
- Em ativos extremamente seguros e com liquidez diária (que você possa resgatar no mesmo dia se necessário). Exemplos: Tesouro Selic, CDB de Liquidez Diária, ou Contas Digitais de alta segurança renderizando pelo menos 100% do CDI.`,
    quiz: {
      question: 'Qual o valor ideal estimado para a Reserva de Emergência de um profissional autônomo?',
      options: [
        '1 a 2 meses de despesa essencial.',
        '6 meses de despesa essencial.',
        '12 meses de despesa essencial, devido à maior oscilação de receitas.',
        'Apenas R$ 500,00 aplicados em ações de alto risco.'
      ],
      answerIndex: 2
    }
  },
  {
    id: 'l4',
    title: 'Trilha 4: Como começar a Investir com Segurança',
    subtitle: 'Fazendo os juros trabalharem para você em vez de trabalhar para os bancos.',
    content: `Investir é colocar seu dinheiro para trabalhar por você através do poder do tempo e dos juros compostos.

CONCEITOS IMPORTANTES:
1. Renda Fixa: Você empresta dinheiro para o governo ou bancos em troca de uma taxa de juros garantida (ex: Tesouro Direto, CDBs). É ideal para metas de curto e médio prazo.
2. Renda Variável: Você se torna sócio de grandes empresas ou investe em imóveis (ex: Ações, Fundos Imobiliários). Ideal para o longo prazo e construção de patrimônio previdenciário.
3. Diversificação: Nunca coloque todos os ovos na mesma cesta! Divida sua carteira para reduzir riscos.`,
    quiz: {
      question: 'Qual a principal diferença entre Renda Fixa e Renda Variável?',
      options: [
        'A renda variável garante 10% de ganho fixo todos os meses.',
        'A renda fixa oferece maior previsibilidade e menor risco, enquanto a variável oscila de valor e é voltada ao longo prazo.',
        'A renda fixa é proibida para pessoas físicas comuns.',
        'Criptomoedas são exemplos clássicos de investimentos de renda fixa.'
      ],
      answerIndex: 1
    }
  }
];

export const initialChallenges: Challenge[] = [
  // PF
  { id: 'pf_ch1', title: 'Desafio R$ 1.000 Guardados', description: 'Monte o primeiro tijolo de segurança depositando suas economias.', target: 1000, current: 650, daysTotal: 30, daysRemaining: 12, rewardPoints: 100, profile: 'pf' },
  { id: 'pf_ch2', title: '30 Dias sem Delivery', description: 'Cozinhe em casa e veja o saldo do cartão despencar com orgulho!', target: 30, current: 18, daysTotal: 30, daysRemaining: 12, rewardPoints: 150, profile: 'pf' },
  { id: 'pf_ch3', title: 'Primeira Aplicação de Investimento', description: 'Diga adeus à poupança antiga e compre seu primeiro ativo rentável.', target: 1, current: 0, daysTotal: 7, daysRemaining: 4, rewardPoints: 200, profile: 'pf' },
  // PJ
  { id: 'pj_ch1', title: 'Lucratividade de 20%', description: 'Otimize custos variáveis para elevar a margem líquida da empresa.', target: 20, current: 14.5, daysTotal: 30, daysRemaining: 15, rewardPoints: 250, profile: 'pj' },
  { id: 'pj_ch2', title: 'Fundo Corporativo Concluído', description: 'Manter saldo em caixa equivalente a 3 meses de folha operacional.', target: 50000, current: 35000, daysTotal: 90, daysRemaining: 45, rewardPoints: 300, profile: 'pj' }
];

export const initialAchievements: Achievement[] = [
  // PF
  { id: 'pf_ac1', title: 'Primeiro Poupador', description: 'Fez sua primeira economia mensal positiva.', icon: '💰', unlocked: true, profile: 'pf' },
  { id: 'pf_ac2', title: 'Mestre da Reserva', description: 'Completou mais de 50% da sua Reserva de Emergência.', icon: '🛡️', unlocked: true, profile: 'pf' },
  { id: 'pf_ac3', title: 'Investidor Pioneiro', description: 'Registrou seu primeiro ativo de renda fixa ou variável.', icon: '📈', unlocked: false, profile: 'pf' },
  { id: 'pf_ac4', title: 'Dívidas Zero', description: 'Liquidou todas as pendências ou faturas em atraso.', icon: '🕊️', unlocked: true, profile: 'pf' },
  { id: 'pf_ac5', title: 'Clube dos R$ 10k', description: 'Alcançou mais de R$ 10.000 em patrimônio acumulado.', icon: '💎', unlocked: true, profile: 'pf' },
  // PJ
  { id: 'pj_ac1', title: 'Primeira Nota Fiscal', description: 'Registrou sua primeira receita comercial de faturamento.', icon: '🏢', unlocked: true, profile: 'pj' },
  { id: 'pj_ac2', title: 'Margem Saudável', description: 'Manteve despesas operacionais abaixo de 60% do faturamento.', icon: '⚡', unlocked: true, profile: 'pj' },
  { id: 'pj_ac3', title: 'Caixa Blindado', description: 'Atingiu a meta de reserva de capital de giro.', icon: '🔒', unlocked: false, profile: 'pj' }
];

export const initialDocuments: FinancialDocument[] = [
  // PF
  { id: 'pf_d1', name: 'Contrato Aluguel Apartamento.pdf', size: '1.4 MB', tag: 'Moradia/Contratos', date: '2026-01-10', profile: 'pf' },
  { id: 'pf_d2', name: 'Recibo Compra Notebook Dell.pdf', size: '420 KB', tag: 'Tecnologia/Garantias', date: '2026-03-15', profile: 'pf' },
  { id: 'pf_d3', name: 'Comprovante Aplicação Tesouro.pdf', size: '180 KB', tag: 'Investimentos', date: '2026-06-05', profile: 'pf' },
  // PJ
  { id: 'pj_d1', name: 'Contrato Social BGrowth Solutions.pdf', size: '2.8 MB', tag: 'Constituição/Legais', date: '2026-02-15', profile: 'pj' },
  { id: 'pj_d2', name: 'Nota Fiscal Emissão NFe 041.pdf', size: '280 KB', tag: 'Impostos/Faturamento', date: '2026-06-10', profile: 'pj' }
];

export const initialCalendarEvents: CalendarEvent[] = [
  // PF
  { id: 'pf_ce1', title: 'Depósito Salário BGrowth', date: '2026-07-05', amount: 6500.00, type: 'income', completed: false, profile: 'pf' },
  { id: 'pf_ce2', title: 'Vencimento Boleto Aluguel', date: '2026-07-10', amount: 2200.00, type: 'bill', completed: false, profile: 'pf' },
  { id: 'pf_ce3', title: 'Cobrança Netflix Premium', date: '2026-07-15', amount: 55.90, type: 'subscription', completed: false, profile: 'pf' },
  { id: 'pf_ce4', title: 'Aporte Mensal Tesouro Selic', date: '2026-07-20', amount: 500.00, type: 'expense', completed: false, profile: 'pf' },
  { id: 'pf_ce5', title: 'Vencimento Fatura Cartão Itaú', date: '2026-07-25', amount: 1240.50, type: 'bill', completed: false, profile: 'pf' },
  // PJ
  { id: 'pj_ce1', title: 'Faturamento Cliente Alfa NFe', date: '2026-07-10', amount: 18500.00, type: 'income', completed: false, profile: 'pj' },
  { id: 'pj_ce2', title: 'Impostos Simples Nacional DAS', date: '2026-07-20', amount: 1450.00, type: 'bill', completed: false, profile: 'pj' },
  { id: 'pj_ce3', title: 'Folha de Pagamento Funcionários', date: '2026-07-05', amount: 8500.00, type: 'bill', completed: false, profile: 'pj' },
  { id: 'pj_ce4', title: 'Serviços Amazon AWS Server', date: '2026-07-18', amount: 680.00, type: 'subscription', completed: false, profile: 'pj' }
];
