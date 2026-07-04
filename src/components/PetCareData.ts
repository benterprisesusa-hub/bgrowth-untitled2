import { Client, Pet, PetService, VisitLog, Staff, FinancialRecord } from './PetCareTypes';

export const DEFAULT_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Sarah Connor',
    phone: '+55 11 98888-7777',
    email: 'sarah.c@bgrowth.com',
    address: 'Av. Paulista, 1000, Apto 51 - Bela Vista, São Paulo, SP',
    documentCpf: '123.456.789-00',
    emergencyContact: { name: 'John Connor', phone: '+55 11 98888-1234', relation: 'Filho' },
    paymentMethod: 'Credit Card (Visa ending in 4242)',
    notes: 'Cliente muito rigorosa com a administração de medicamentos no horário certo. Gosta de receber atualizações completas por foto.',
    keyControl: {
      hasKey: true,
      keyCode: 'KEY-501A',
      instructions: 'A chave abre a portaria de serviço e a porta social. Há um porteiro 24h. O código do interfone é 51.',
      holder: 'Jessica Mendes (Dog Walker Principal)'
    },
    packagesRemaining: 14
  },
  {
    id: 'c2',
    name: 'Roberto Alencar',
    phone: '+55 11 97777-6666',
    email: 'roberto.a@outlook.com',
    address: 'Rua Bela Cintra, 450, Casa 2 - Consolação, São Paulo, SP',
    documentCpf: '987.654.321-11',
    emergencyContact: { name: 'Clara Alencar', phone: '+55 11 97777-1111', relation: 'Esposa' },
    paymentMethod: 'PIX',
    notes: 'Possui portão eletrônico. O código de acesso ao teclado numérico externo é 9988#.',
    keyControl: {
      hasKey: false,
      keyCode: 'None',
      instructions: 'Não possui chave física guardada conosco. Utilizar o teclado de entrada eletrônico da garagem. Código: 9988#.',
      holder: 'None'
    },
    packagesRemaining: 8
  },
  {
    id: 'c3',
    name: 'Maria Julia Abreu',
    phone: '+55 21 99911-2233',
    email: 'maju.abreu@gmail.com',
    address: 'Rua Visconde de Pirajá, 300 - Ipanema, Rio de Janeiro, RJ',
    documentCpf: '222.333.444-55',
    emergencyContact: { name: 'Fernanda Abreu', phone: '+55 21 99911-0000', relation: 'Irmã' },
    paymentMethod: 'Boletos Faturados',
    notes: 'O pet Max é muito medroso e ansioso com barulho de chuva e fogos de artifício. Sempre conferir se as janelas estão trancadas.',
    keyControl: {
      hasKey: true,
      keyCode: 'KEY-112B',
      instructions: 'Chave do portão de grade frontal azul e porta principal de madeira.',
      holder: 'Felipe Santos'
    },
    packagesRemaining: 0
  }
];

export const DEFAULT_PETS: Pet[] = [
  {
    id: 'p1',
    name: 'Bella',
    clientId: 'c1',
    photo: '🐕',
    species: 'Dog',
    breed: 'Golden Retriever',
    sex: 'Female',
    weight: 28.5,
    age: 3,
    color: 'Dourado Brilhante',
    microchip: 'CHIP-982-110-234',
    neutered: true,
    birthdate: '2023-04-12',
    health: {
      vaccines: [
        { name: 'V10 (Múltipla)', date: '2026-05-10', status: 'Up to Date' },
        { name: 'Raiva', date: '2026-05-10', status: 'Up to Date' },
        { name: 'Gripe Canina', date: '2025-06-15', status: 'Expired' },
        { name: 'Leishmaniose', date: '2026-01-20', status: 'Up to Date' }
      ],
      allergies: ['Frango (Gera coceira na orelha)', 'Picada de Pulga'],
      illnesses: ['Nenhuma crônica ativa'],
      medications: [
        { name: 'Apoquel (Anti-coceira)', dosage: '1/2 Comprimido', frequency: 'Uma vez ao dia pela manhã' }
      ],
      surgeries: ['Castração realizada aos 6 meses'],
      restrictions: ['Não pode correr logo após comer (risco de torção gástrica)', 'Evitar caminhadas no asfalto quente acima de 28°C'],
      insurance: 'PetLove Saúde Bronze #9011-A',
      veterinarian: { name: 'Dr. Marcos Rezende', phone: '+55 11 96666-3333', clinic: 'Hospital Veterinário VetEspecialistas' },
      hospitalPreferential: 'Hospital VetEspecialistas Moema (24h)'
    },
    feeding: {
      brand: 'Royal Canin Golden Retriever Adulto',
      amount: '250g',
      times: ['08:00', '19:00'],
      restrictions: ['Proibido ossos de couro', 'Não dar restos de comida humana de forma alguma'],
      snacksAllowed: true,
      snacksDetails: 'Apenas petiscos de maçã desidratada ou cenoura crua.'
    },
    behavior: {
      sociable: true,
      aggressive: false,
      anxious: false,
      fearful: false,
      barksMuch: false,
      bites: false,
      friendlyWithDogs: true,
      friendlyWithKids: true,
      fearFireworks: true,
      fearStorms: true,
      lovesToPlay: true,
      favoriteToys: ['Bolinha de tênis amarela', 'KONG de borracha com pasta de amendoim']
    },
    care: {
      brushing: true,
      bathing: false,
      medicationsNeeded: true,
      walksFrequency: '2x por dia (Manhã e Tarde)',
      specialNeeds: ['Necessita limpar as dobras das patas com lenço umedecido após passear.'],
      dailyRoutine: 'Acorda às 07:00, passeia 30 minutos, come, dorme a tarde toda, passeia de novo às 17:00.'
    },
    documents: [
      { name: 'Carteira_Vacinas_Bella_2026.pdf', type: 'PDF', url: '#', date: '2026-05-10' },
      { name: 'Laudo_Alergico_Dermatologista.pdf', type: 'PDF', url: '#', date: '2025-11-04' }
    ],
    photos: ['📸 Passeio feliz no parque', '🦴 Comendo petisco de maçã', '💤 Dormindo de barriga para cima'],
    customChecklist: [
      'Passar lenço antisséptico nas patinhas ao voltar',
      'Administrar 1/2 Apoquel junto com uma colher de ração úmida',
      'Escovar os pelos por 5 minutos com a rasqueadeira'
    ]
  },
  {
    id: 'p2',
    name: 'Max',
    clientId: 'c3',
    photo: '🐱',
    species: 'Cat',
    breed: 'Persa',
    sex: 'Male',
    weight: 4.8,
    age: 5,
    color: 'Branco Neve',
    microchip: 'CHIP-102-445-998',
    neutered: true,
    birthdate: '2021-08-20',
    health: {
      vaccines: [
        { name: 'V5 Felina', date: '2026-02-15', status: 'Up to Date' },
        { name: 'Raiva Felina', date: '2026-02-15', status: 'Up to Date' }
      ],
      allergies: ['Frutos do mar', 'Antipulgas de aplicação tópica de marca genérica'],
      illnesses: ['Histórico leve de cálculo renal (controlado com ração especial Uinary)'],
      medications: [],
      surgeries: ['Remoção de cálculos na bexiga em 2024'],
      restrictions: ['Não comer ração de cão', 'Estritamente indoor (não pode ir à janela sem tela)'],
      insurance: 'Nenhum contratado',
      veterinarian: { name: 'Dra. Luiza Castro (Especialista em Felinos)', phone: '+55 21 95555-4444', clinic: 'Gatos & Cia Vet Clinic' },
      hospitalPreferential: 'Clínica Gatos & Cia Botafogo'
    },
    feeding: {
      brand: 'Royal Canin Urinary S/O Wet & Dry',
      amount: '50g seca + 1 sachê úmido',
      times: ['07:30', '18:30'],
      restrictions: ['Proibido qualquer alimento com sódio', 'Não comer sachê gelado'],
      snacksAllowed: true,
      snacksDetails: 'Apenas petiscos específicos para a saúde urinária (máximo de 4 pastilhas ao dia).'
    },
    behavior: {
      sociable: false,
      aggressive: false,
      anxious: true,
      fearful: true,
      barksMuch: false,
      bites: false,
      friendlyWithDogs: false,
      friendlyWithKids: false,
      fearFireworks: true,
      fearStorms: true,
      lovesToPlay: true,
      favoriteToys: ['Varinha com penas coloridas', 'Ratinho com catnip']
    },
    care: {
      brushing: true,
      bathing: false,
      medicationsNeeded: false,
      walksFrequency: 'Não passeia de coleira',
      specialNeeds: ['Limpeza diária dos olhos devido ao lacrimejamento constante do focinho achatado Persa.'],
      dailyRoutine: 'Gosta de dormir nos lugares mais altos do apartamento. Brinca por 10 minutos após comer.'
    },
    documents: [
      { name: 'Exame_Urina_Creatinina_Março.pdf', type: 'PDF', url: '#', date: '2026-03-12' }
    ],
    photos: ['🐾 Relaxando na torre de arranhar', '🧿 Olhando fixo para o sachê', '🧶 Brincando com a varinha'],
    customChecklist: [
      'Limpar as lágrimas dos olhos com soro fisiológico e algodão',
      'Trocar e lavar a fonte de água de cerâmica',
      'Peneirar a areia da caixinha sanitária fechada e borrifar neutralizador de odor'
    ]
  },
  {
    id: 'p3',
    name: 'Luna',
    clientId: 'c2',
    photo: '🐕',
    species: 'Dog',
    breed: 'Pastor Alemão',
    sex: 'Female',
    weight: 35.0,
    age: 7,
    color: 'Capa Preta / Marrom',
    microchip: 'CHIP-773-401-229',
    neutered: true,
    birthdate: '2019-11-01',
    health: {
      vaccines: [
        { name: 'V10', date: '2026-01-10', status: 'Up to Date' },
        { name: 'Antirrábica', date: '2026-01-10', status: 'Up to Date' }
      ],
      allergies: ['Nenhuma conhecida'],
      illnesses: ['Displasia coxofemoral leve (desgaste na articulação traseira)'],
      medications: [
        { name: 'Condroton (Protetor de Cartilagem)', dosage: '1 Comprimido', frequency: 'A cada 12 horas' }
      ],
      surgeries: [],
      restrictions: ['Evitar escadarias extensas ou saltos altos', 'Não forçar corridas de alta velocidade'],
      insurance: 'Amigo Pet Especial',
      veterinarian: { name: 'Dr. Roberto Cruz', phone: '+55 11 91234-5678', clinic: 'Clínica Veterinária Jardim Europa' },
      hospitalPreferential: 'Hospital Vet 24h Pinheiros'
    },
    feeding: {
      brand: 'PremieR Formula Raças Grandes Cães Adultos',
      amount: '350g',
      times: ['08:00', '20:00'],
      restrictions: ['Evitar excesso de sódio', 'Não dar ossos naturais cozidos'],
      snacksAllowed: true,
      snacksDetails: 'Sachê úmido misturado na ração seca para estimular o apetite.'
    },
    behavior: {
      sociable: true,
      aggressive: false,
      anxious: false,
      fearful: false,
      barksMuch: true,
      bites: false,
      friendlyWithDogs: true,
      friendlyWithKids: true,
      fearFireworks: false,
      fearStorms: false,
      lovesToPlay: true,
      favoriteToys: ['Frisbee de borracha flexível', 'Corda com nó gigante']
    },
    care: {
      brushing: true,
      bathing: true,
      medicationsNeeded: true,
      walksFrequency: '1x por dia, ritmo lento de 25 minutos',
      specialNeeds: ['Massagem leve nas pernas traseiras se demonstrar cansaço ou rigidez.'],
      dailyRoutine: 'Gosta de deitar no jardim da casa observando o movimento do portão.'
    },
    documents: [
      { name: 'Laudo_RaioX_Displasia_Traseira.pdf', type: 'PDF', url: '#', date: '2025-09-18' }
    ],
    photos: ['☀️ Luna deitada no sol do quintal', '🎾 Correndo devagar atrás da bolinha', '🏥 Check-up anual com o Dr. Roberto'],
    customChecklist: [
      'Dar o comprimido de Condroton envolto em uma colher de cream cheese',
      'Passeio higiênico de 20 minutos sem subir ladeiras ou rampas íngremes',
      'Completar a tigela de água filtrada adicionando cubos de gelo'
    ]
  }
];

export const DEFAULT_SERVICES: PetService[] = [
  {
    id: 's1',
    name: 'Dog Walking (Passeio Premium)',
    price: 45,
    duration: 45,
    color: 'teal',
    category: 'Dog Walking',
    description: 'Passeio estruturado, focado em gasto de energia física e mental, com enriquecimento ambiental e exercícios básicos de obediência na guia.',
    requiredItems: ['Guia resistente com mosquetão de segurança', 'Coleira adaptada ou peitoral', 'Sacos higiênicos para coleta de fezes', 'Garrafa de água portátil para hidratação'],
    notes: 'Sempre fazer o check-in por GPS no início e checar se o peitoral está perfeitamente ajustado e firme antes de abrir o portão.'
  },
  {
    id: 's2',
    name: 'Pet Sitting (Visita de Cuidados)',
    price: 60,
    duration: 60,
    color: 'indigo',
    category: 'Pet Sitting',
    description: 'Cuidados dedicados em domicílio para cães ou gatos. Inclui alimentação, troca de água, escovação, brincadeiras, limpeza de sujeiras (caixinha de areia/tapete) e carinho.',
    requiredItems: ['Chave física do imóvel cadastrada ou código de acesso', 'Lenços umedecidos antissépticos', 'Pá higiênica e sacos de descarte'],
    notes: 'Enviar relatório detalhado ao final de cada visita, com pelo menos 3 fotos demonstrando o bem-estar e alimentação do animal.'
  },
  {
    id: 's3',
    name: 'Hospedagem Familiar (Pet Boarding)',
    price: 120,
    duration: 1440, // 24 hours
    color: 'purple',
    category: 'Pet Boarding',
    description: 'Hospedagem livre de gaiolas na residência de um cuidador certificado. O cão dorme dentro de casa e desfruta de uma rotina familiar segura e divertida.',
    requiredItems: ['Cama própria do pet', 'Ração suficiente para o período de estadia', 'Brinquedos favoritos', 'Medicamentos se houver'],
    notes: 'Exigir carteira de vacinação 100% atualizada (inclusive tosse e giárdia) antes de aceitar o pet na residência.'
  },
  {
    id: 's4',
    name: 'Doggy Day Care (Creche)',
    price: 75,
    duration: 480, // 8 hours
    color: 'amber',
    category: 'Day Care',
    description: 'Um dia repleto de socialização supervisionada, atividades de recreação, piscinas de bolinha, socialização controlada e cochilos restauradores para cães ativos.',
    requiredItems: ['Guia de entrada', 'Ração ou marmita identificada para o almoço'],
    notes: 'Realizar avaliação comportamental inicial obrigatória para garantir que o pet não demonstra traços de agressividade social.'
  },
  {
    id: 's5',
    name: 'Visita de Medicação (Medication Visit)',
    price: 35,
    duration: 20,
    color: 'rose',
    category: 'Cuidados Especiais',
    description: 'Administração especializada de remédios orais, tópicos, colírios ou injeções de insulina subcutânea por profissionais experientes em cuidados de saúde animal.',
    requiredItems: ['Receita veterinária válida', 'Seringas descartáveis se aplicável', 'Petiscos facilitadores de medicação'],
    notes: 'Verificar com rigor extremo a dosagem prescrita e o horário exato determinado pelo veterinário do animal.'
  }
];

export const DEFAULT_STAFF: Staff[] = [
  {
    id: 'e1',
    name: 'Jessica Mendes',
    photo: '👩‍🦰',
    role: 'Dog Walker & Pet Sitter Sênior',
    specialties: ['Comportamento Canino Avançado', 'Primeiros Socorros Veterinários', 'Administração de Insulina'],
    availability: ['Segunda a Sexta (07:00 - 18:00)', 'Sábados (08:00 - 13:00)'],
    documents: ['Certificação_Primeiros_Socorros_Vet.pdf', 'Contrato_Prestacao_Servico_JM.pdf'],
    contact: '+55 11 91111-2222',
    rating: 4.9,
    notes: 'Excelente profissional, muito carinhosa e requisitada pelos clientes com cães de grande porte. Tem autorização para portar chaves físicas.'
  },
  {
    id: 'e2',
    name: 'Felipe Santos',
    photo: '👨',
    role: 'Cuidador e Especialista em Gatos (Feline Sitter)',
    specialties: ['Comportamento Felino', 'Enriquecimento Ambiental de Gatos', 'Higiene e Escovação'],
    availability: ['Segunda a Domingo (Horários flexíveis)'],
    documents: ['Certificacao_Feline_Sitter_Gatos.pdf'],
    contact: '+55 11 92222-3333',
    rating: 5.0,
    notes: 'Especialista em gatos ariscos ou tímidos. Consegue conquistar a confiança dos felinos rapidamente. Muito detalhista na limpeza.'
  },
  {
    id: 'e3',
    name: 'Mariana Costa',
    photo: '👩',
    role: 'Treinadora Canina & Anfitriã de Hospedagem',
    specialties: ['Adestramento Cognitivo', 'Hospedagem Pet Boarding', 'Socialização de Filhotes'],
    availability: ['Finais de Semana e Feriados (24h para Boarding)'],
    documents: ['Certificado_Adestramento_Amigo_Cao.pdf'],
    contact: '+55 11 93333-4444',
    rating: 4.8,
    notes: 'Disponibiliza sua casa ampla com quintal gramado e seguro no Morumbi para hospedagem de longa duração.'
  }
];

export const DEFAULT_VISIT_LOGS: VisitLog[] = [
  {
    id: 'v1',
    petIds: ['p1'],
    clientId: 'c1',
    serviceId: 's1',
    date: '2026-06-30',
    scheduledTime: '08:00',
    workerId: 'e1',
    status: 'Completed',
    checkInTime: '08:02',
    checkInGPS: '-23.561684, -46.655981 (Entrada Paulista)',
    checkInPhoto: '📸 Portão de Entrada de Serviço',
    checkInNotes: 'Entrada tranquila, Bella já estava esperando na porta batendo o rabo.',
    checkOutTime: '08:50',
    checkOutGPS: '-23.561702, -46.656024 (Saída Paulista)',
    checkOutPhoto: '📸 Bella cansada deitada no tapete',
    checkOutNotes: 'Bella passeou super bem. Fez xixi 2x e cocô 1x (recolhido). Tomou água e descansou.',
    completedTasks: ['Water refreshed', 'Walk completed', 'Medication administered', 'Playtime & Attention', 'Coat brushing'],
    reportNotes: 'Bella estava super animada hoje no parque do Trianon. Encontrou outros cães, brincou um pouco e gastou bastante energia. Dei o Apoquel na volta conforme as orientações.',
    rating: 5
  },
  {
    id: 'v2',
    petIds: ['p2'],
    clientId: 'c3',
    serviceId: 's2',
    date: '2026-06-30',
    scheduledTime: '09:30',
    workerId: 'e2',
    status: 'Checked-In',
    checkInTime: '09:28',
    checkInGPS: '-22.983452, -43.198754 (Ipanema)',
    checkInPhoto: '📸 Max olhando com curiosidade',
    checkInNotes: 'Entrei no apartamento e o Max estava em cima do arranhador. Sem sinais de estresse.',
    completedTasks: ['Water refreshed'],
    reportNotes: 'Visita em andamento...'
  },
  {
    id: 'v3',
    petIds: ['p3'],
    clientId: 'c2',
    serviceId: 's5',
    date: '2026-06-30',
    scheduledTime: '11:00',
    workerId: 'e1',
    status: 'Scheduled',
    completedTasks: []
  },
  {
    id: 'v4',
    petIds: ['p1', 'p3'], // Multiple pets demo!
    clientId: 'c1',
    serviceId: 's1',
    date: '2026-07-01',
    scheduledTime: '14:00',
    workerId: 'e1',
    status: 'Scheduled',
    completedTasks: []
  }
];

export const DEFAULT_FINANCIALS: FinancialRecord[] = [
  { id: 'f1', type: 'Income', category: 'Pacotes Mensais', amount: 450, date: '2026-06-28', paymentMethod: 'Credit Card', description: 'Renovação Pacote 10 Passeios - Sarah Connor' },
  { id: 'f2', type: 'Income', category: 'Hospedagem', amount: 360, date: '2026-06-27', paymentMethod: 'PIX', description: 'Hospedagem 3 dias - Luna' },
  { id: 'f3', type: 'Expense', category: 'Marketing', amount: 80, date: '2026-06-25', paymentMethod: 'PIX', description: 'Panfletos BGrowth Pet Care para pet shops locais' },
  { id: 'f4', type: 'Expense', category: 'Equipamentos', amount: 120, date: '2026-06-20', paymentMethod: 'Credit Card', description: 'Lote de coleiras e guias reforçadas de segurança' },
  { id: 'f5', type: 'Income', category: 'Serviço Avulso', amount: 75, date: '2026-06-29', paymentMethod: 'PIX', description: 'Doggy Day Care avulso - Max' }
];
