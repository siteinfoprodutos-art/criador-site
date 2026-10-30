import { TemplateItem } from '../../types';

export const INITIAL_TEMPLATES: TemplateItem[] = [
  {
    id: 'template-nexgen-tech',
    name: 'NexGen Cloud Studio',
    category: 'institucional',
    style: 'tecnologico',
    description: 'Plataforma corporativa moderna para startups de tecnologia, software de IA e estúdios digitais.',
    pageCount: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Tech', 'SaaS', 'Dark Theme', 'High Tech'],
    designTokens: {
      primaryColor: '#8257F5',
      secondaryColor: '#4388F5',
      backgroundColor: '#090B18',
      surfaceColor: '#151A2E',
      textColor: '#FFFFFF',
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Plus Jakarta Sans',
      borderRadius: '0.75rem'
    },
    defaultPages: [
      {
        name: 'Início',
        slug: 'home',
        title: 'NexGen Cloud Studio — Inovação Digital',
        description: 'Plataforma líder em soluções cloud e inteligência artificial para empresas escaláveis.',
        order: 1,
        visibility: true,
        isHome: true,
        seo: {
          title: 'NexGen Cloud Studio — Inovação Digital',
          description: 'Soluções avançadas em tecnologia.',
          keywords: ['tech', 'cloud', 'ai', 'saas']
        },
        components: [
          {
            id: 'comp-header-1',
            type: 'header',
            name: 'Cabeçalho Fixo',
            order: 1,
            visibility: true,
            properties: {
              brandName: 'NexGen Cloud',
              navLinks: [
                { label: 'Soluções', href: '#features' },
                { label: 'Plataforma', href: '#about' },
                { label: 'Depoimentos', href: '#testimonials' },
                { label: 'Preços', href: '#pricing' }
              ],
              ctaText: 'Iniciar Teste Grátis'
            },
            styles: { backgroundColor: '#090B18', textColor: '#FFFFFF' }
          },
          {
            id: 'comp-hero-1',
            type: 'hero',
            name: 'Hero Impacto Tech',
            order: 2,
            visibility: true,
            properties: {
              badge: 'NOVA GERAÇÃO CLOUD',
              heading: 'Infraestrutura Inteligente para o Futuro Digital',
              subheading: 'Acelere sua empresa com arquitetura distribuída, inteligência artificial integrada e segurança militar sem complicação.',
              primaryCta: 'Criar Conta Gratuita',
              secondaryCta: 'Ver Demonstração ao Vivo',
              imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
            },
            styles: { backgroundColor: '#0D1020', textColor: '#FFFFFF' }
          },
          {
            id: 'comp-features-1',
            type: 'features',
            name: 'Grade de Recursos',
            order: 3,
            visibility: true,
            properties: {
              title: 'Recursos Desenhados para Escala',
              subtitle: 'Tudo o que sua equipe precisa para desenvolver e operar com máxima eficiência.',
              items: [
                { title: 'IA Nativa no Core', desc: 'Automação de workflows com modelos otimizados de baixa latência.', icon: 'Cpu' },
                { title: 'Zero Latência Global', desc: 'Rede CDN distribuída em mais de 120 edge locations globais.', icon: 'Zap' },
                { title: 'Segurança End-to-End', desc: 'Criptografia em repouso e trânsito com conformidade SOC2 e LGPD.', icon: 'ShieldCheck' },
                { title: 'Análise em Tempo Real', desc: 'Dashboards personalizáveis com telemetria detalhada e alertas instantâneos.', icon: 'BarChart3' }
              ]
            },
            styles: { backgroundColor: '#151A2E', textColor: '#FFFFFF' }
          },
          {
            id: 'comp-cta-1',
            type: 'cta',
            name: 'Chamada Final',
            order: 4,
            visibility: true,
            properties: {
              heading: 'Pronto para Transformar sua Operação?',
              subheading: 'Junte-se a mais de 10.000 empresas que já utilizam a NexGen Cloud Studio.',
              buttonText: 'Começar Agora — É Grátis'
            },
            styles: { backgroundColor: '#8257F5', textColor: '#FFFFFF' }
          },
          {
            id: 'comp-footer-1',
            type: 'footer',
            name: 'Rodapé Institucional',
            order: 5,
            visibility: true,
            properties: {
              copyright: '© 2026 NexGen Cloud Studio. Todos os direitos reservados.',
              links: ['Privacidade', 'Termos de Uso', 'Documentação', 'Suporte']
            },
            styles: { backgroundColor: '#090B18', textColor: '#A1A9C2' }
          }
        ]
      },
      {
        name: 'Sobre Nós',
        slug: 'sobre',
        title: 'Sobre a NexGen — Nossa História',
        description: 'Conheça a equipe e a missão por trás da plataforma.',
        order: 2,
        visibility: true,
        seo: { title: 'Sobre Nós — NexGen', description: 'Nossa missão', keywords: ['sobre', 'empresa'] },
        components: []
      },
      {
        name: 'Serviços',
        slug: 'servicos',
        title: 'Soluções e Serviços Especializados',
        description: 'Nossos serviços de consultoria e engenharia cloud.',
        order: 3,
        visibility: true,
        seo: { title: 'Serviços — NexGen', description: 'Nossos serviços', keywords: ['servicos'] },
        components: []
      },
      {
        name: 'Contato',
        slug: 'contato',
        title: 'Fale Conosco — Atendimento NexGen',
        description: 'Entre em contato com nossos especialistas.',
        order: 4,
        visibility: true,
        seo: { title: 'Contato — NexGen', description: 'Atendimento ao cliente', keywords: ['contato'] },
        components: []
      }
    ]
  },
  {
    id: 'template-savoria-bistro',
    name: 'Savoria Gourmet & Bistro',
    category: 'restaurante',
    style: 'luxuoso',
    description: 'Layout elegante e refinado para restaurantes de alta gastronomia, bistrôs, cafeterias e eventos.',
    pageCount: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    tags: ['Restaurante', 'Gourmet', 'Gastronomia', 'Luxo'],
    designTokens: {
      primaryColor: '#D97706',
      secondaryColor: '#B45309',
      backgroundColor: '#0F172A',
      surfaceColor: '#1E293B',
      textColor: '#F8FAFC',
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
      borderRadius: '0.5rem'
    },
    defaultPages: [
      {
        name: 'Início',
        slug: 'home',
        title: 'Savoria Bistro — Alta Gastronomia Contemporânea',
        description: 'Uma experiência sensorial inesquecível com ingredientes orgânicos e chef renomado.',
        order: 1,
        visibility: true,
        isHome: true,
        seo: {
          title: 'Savoria Bistro — Experiência Gastronômica',
          description: 'Cozinha autoral e ambiente acolhedor.',
          keywords: ['restaurante', 'gourmet', 'jantar', 'bistro']
        },
        components: [
          {
            id: 'comp-sav-hero',
            type: 'hero',
            name: 'Hero Gourmet',
            order: 1,
            visibility: true,
            properties: {
              badge: 'RESERVA ONLINE DISPONÍVEL',
              heading: 'A Arte da Gastronomia Contemporânea',
              subheading: 'Ingredientes frescos selecionados diariamente para pratos autorais inesquecíveis.',
              primaryCta: 'Reservar uma Mesa',
              secondaryCta: 'Explorar Menu',
              imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
            },
            styles: { backgroundColor: '#0F172A', textColor: '#FFFFFF' }
          }
        ]
      },
      {
        name: 'Cardápio',
        slug: 'cardapio',
        title: 'Menu Autorais e Carta de Vinhos',
        description: 'Conheça nossos pratos de entrada, pratos principais e sobremesas finas.',
        order: 2,
        visibility: true,
        seo: { title: 'Cardápio — Savoria', description: 'Nosso menu completo', keywords: ['menu', 'cardapio'] },
        components: []
      },
      {
        name: 'Reservas',
        slug: 'reservas',
        title: 'Faça sua Reserva Online',
        description: 'Garanta sua mesa para momentos especiais.',
        order: 3,
        visibility: true,
        seo: { title: 'Reservas — Savoria', description: 'Reservas de mesas', keywords: ['reserva'] },
        components: []
      }
    ]
  },
  {
    id: 'template-aura-ecommerce',
    name: 'Aura Organic Beauty',
    category: 'e-commerce',
    style: 'minimalista',
    description: 'Loja virtual sofisticada para cosméticos, produtos naturais, moda e marcas autorais.',
    pageCount: 5,
    thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    tags: ['E-commerce', 'Moda', 'Skincare', 'Clean'],
    designTokens: {
      primaryColor: '#EC4899',
      secondaryColor: '#DB2777',
      backgroundColor: '#0F172A',
      surfaceColor: '#1E293B',
      textColor: '#FFFFFF',
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Plus Jakarta Sans',
      borderRadius: '1rem'
    },
    defaultPages: [
      {
        name: 'Início',
        slug: 'home',
        title: 'Aura Organic Beauty — Skincare Natural',
        description: 'Cuide da sua pele com fórmulas 100% veganas, orgânicas e dermatologicamente testadas.',
        order: 1,
        visibility: true,
        isHome: true,
        seo: {
          title: 'Aura Beauty — Cosméticos Orgânicos',
          description: 'Skincare vegano e sustentável.',
          keywords: ['skincare', 'beleza', 'loja virtual', 'vegan']
        },
        components: []
      },
      {
        name: 'Produtos',
        slug: 'produtos',
        title: 'Catálogo de Produtos Orgânicos',
        description: 'Explore nossa linha de séruns, cremes e óleos essenciais.',
        order: 2,
        visibility: true,
        seo: { title: 'Produtos — Aura Beauty', description: 'Catálogo completo', keywords: ['produtos'] },
        components: []
      },
      {
        name: 'Carrinho',
        slug: 'carrinho',
        title: 'Seu Carrinho de Compras',
        description: 'Revise seus itens e prossiga para o checkout.',
        order: 3,
        visibility: true,
        seo: { title: 'Carrinho — Aura', description: 'Carrinho de compras', keywords: ['carrinho'] },
        components: []
      }
    ]
  },
  {
    id: 'template-vanguard-portfolio',
    name: 'Vanguard Portfolio & Studio',
    category: 'portfolio',
    style: 'criativo',
    description: 'Portfólio de alto nível para designers, fotógrafos, arquitetos e diretores de arte.',
    pageCount: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tags: ['Portfolio', 'Design', 'Fotografia', 'Dark Studio'],
    designTokens: {
      primaryColor: '#38BDF8',
      secondaryColor: '#0284C7',
      backgroundColor: '#090B18',
      surfaceColor: '#151A2E',
      textColor: '#FFFFFF',
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Plus Jakarta Sans',
      borderRadius: '0.5rem'
    },
    defaultPages: [
      {
        name: 'Início',
        slug: 'home',
        title: 'Vanguard — Estúdio de Design & Direção de Arte',
        description: 'Projetos visuais extraordinários e identidades de marca marcantes.',
        order: 1,
        visibility: true,
        isHome: true,
        seo: { title: 'Vanguard Portfolio', description: 'Design studio', keywords: ['portfolio', 'design'] },
        components: []
      },
      {
        name: 'Projetos',
        slug: 'projetos',
        title: 'Galeria de Trabalhos Recentes',
        description: 'Cases de sucesso e trabalhos selecionados.',
        order: 2,
        visibility: true,
        seo: { title: 'Projetos — Vanguard', description: 'Trabalhos efetuados', keywords: ['cases'] },
        components: []
      }
    ]
  }
];
