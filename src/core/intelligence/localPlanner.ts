import { BriefingData, WebsiteProject, WebsitePage, WebsiteComponent, DesignTokens, SiteCategory, SiteStyle } from '../../types';

export class LocalSitePlanner {
  /**
   * Generates a complete WebsiteProject structure from user briefing inputs
   * without calling any external paid APIs.
   */
  static generateProjectFromBriefing(briefing: BriefingData): WebsiteProject {
    const projectId = 'proj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    const designTokens = this.resolveDesignTokens(briefing.selectedStyle, briefing.primaryColor, briefing.secondaryColor);
    const pages = this.generatePagesForBriefing(projectId, briefing, designTokens);

    return {
      id: projectId,
      name: briefing.businessName || 'Meu Novo Site',
      description: briefing.description || `Site profissional para ${briefing.businessName}`,
      category: briefing.category,
      style: briefing.selectedStyle,
      createdAt: now,
      updatedAt: now,
      status: 'rascunho',
      designTokens,
      settings: {
        language: 'pt-BR'
      },
      pages,
      assets: briefing.logoUrl ? [{
        id: 'asset-logo-' + Date.now(),
        projectId,
        name: 'Logotipo Principal',
        type: 'logo',
        mimeType: 'image/png',
        size: 1024,
        dataUrl: briefing.logoUrl,
        createdAt: now
      }] : [],
      version: 1,
      thumbnailUrl: briefing.logoUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    };
  }

  private static resolveDesignTokens(style: SiteStyle, primary?: string, secondary?: string): DesignTokens {
    const baseTokens: Record<SiteStyle, DesignTokens> = {
      minimalista: {
        primaryColor: primary || '#3B82F6',
        secondaryColor: secondary || '#1E40AF',
        backgroundColor: '#090B18',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '0.5rem'
      },
      corporativo: {
        primaryColor: primary || '#4388F5',
        secondaryColor: secondary || '#1D4ED8',
        backgroundColor: '#090B18',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '0.375rem'
      },
      luxuoso: {
        primaryColor: primary || '#D97706',
        secondaryColor: secondary || '#B45309',
        backgroundColor: '#0B0D1B',
        surfaceColor: '#161B33',
        textColor: '#FFFFFF',
        headingFont: 'Playfair Display',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '0.25rem'
      },
      moderno: {
        primaryColor: primary || '#8257F5',
        secondaryColor: secondary || '#4388F5',
        backgroundColor: '#090B18',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '0.75rem'
      },
      editorial: {
        primaryColor: primary || '#10B981',
        secondaryColor: secondary || '#047857',
        backgroundColor: '#0D1020',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Manrope',
        bodyFont: 'Manrope',
        borderRadius: '0.5rem'
      },
      criativo: {
        primaryColor: primary || '#EC4899',
        secondaryColor: secondary || '#8257F5',
        backgroundColor: '#090B18',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '1rem'
      },
      tecnologico: {
        primaryColor: primary || '#8257F5',
        secondaryColor: secondary || '#4388F5',
        backgroundColor: '#090B18',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '0.75rem'
      },
      elegante: {
        primaryColor: primary || '#A855F7',
        secondaryColor: secondary || '#7E22CE',
        backgroundColor: '#090B18',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '0.5rem'
      },
      comercial: {
        primaryColor: primary || '#F59E0B',
        secondaryColor: secondary || '#D97706',
        backgroundColor: '#090B18',
        surfaceColor: '#151A2E',
        textColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        borderRadius: '0.5rem'
      }
    };

    return baseTokens[style] || baseTokens.moderno;
  }

  private static generatePagesForBriefing(projectId: string, briefing: BriefingData, tokens: DesignTokens): WebsitePage[] {
    const selected = briefing.selectedPages.length > 0 ? briefing.selectedPages : ['Home', 'Sobre', 'Serviços', 'Contato'];

    return selected.map((pageName, index) => {
      const slug = pageName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const isHome = index === 0 || slug === 'home' || slug === 'inicio';

      return {
        id: `page-${index + 1}-${Date.now()}`,
        projectId,
        name: pageName,
        slug: slug || `pagina-${index + 1}`,
        title: `${pageName} — ${briefing.businessName}`,
        description: isHome ? briefing.description : `Conheça ${pageName} da ${briefing.businessName}`,
        order: index + 1,
        visibility: true,
        isHome,
        seo: {
          title: `${pageName} | ${briefing.businessName}`,
          description: briefing.description || `Página oficial ${pageName}`,
          keywords: [briefing.businessName, briefing.segment, pageName.toLowerCase()]
        },
        components: this.generateComponentsForPage(pageName, briefing, tokens, isHome)
      };
    });
  }

  private static generateComponentsForPage(pageName: string, briefing: BriefingData, tokens: DesignTokens, isHome: boolean): WebsiteComponent[] {
    const components: WebsiteComponent[] = [];

    // Header component
    components.push({
      id: `comp-header-${Date.now()}`,
      type: 'header',
      name: 'Cabeçalho Principal',
      order: 1,
      visibility: true,
      properties: {
        brandName: briefing.businessName,
        logoUrl: briefing.logoUrl,
        navLinks: briefing.selectedPages.map(p => ({
          label: p,
          href: `#${p.toLowerCase().replace(/\s+/g, '-')}`
        })),
        ctaText: 'Fale Conosco',
        phone: briefing.contactPhone
      },
      styles: {
        backgroundColor: tokens.backgroundColor,
        textColor: tokens.textColor,
        accentColor: tokens.primaryColor
      }
    });

    if (isHome) {
      // Hero Section
      components.push({
        id: `comp-hero-${Date.now()}`,
        type: 'hero',
        name: 'Hero Principal',
        order: 2,
        visibility: true,
        properties: {
          badge: briefing.segment.toUpperCase() || 'LÍDER NO SEGMENTO',
          heading: briefing.description ? `Transforme sua experiência com ${briefing.businessName}` : `Excelência e Inovação em ${briefing.segment}`,
          subheading: briefing.differentials || 'Apresentamos soluções de alto desempenho focadas nos seus objetivos comerciais.',
          primaryCta: 'Solicitar Orçamento',
          secondaryCta: 'Conhecer Soluções',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
        },
        styles: {
          backgroundColor: tokens.surfaceColor,
          textColor: tokens.textColor
        }
      });

      // Features Section
      components.push({
        id: `comp-features-${Date.now()}`,
        type: 'features',
        name: 'Diferenciais & Soluções',
        order: 3,
        visibility: true,
        properties: {
          title: 'Por Que Escolher a ' + briefing.businessName,
          subtitle: 'Compromisso absoluto com resultados e atendimento diferenciado.',
          items: [
            { title: 'Excelência Garantida', desc: 'Atendimento e suporte focado em alta qualidade e agilidade.', icon: 'Award' },
            { title: 'Inovação Constante', desc: 'Metodologias modernas e tecnologia de ponta para seu projeto.', icon: 'Sparkles' },
            { title: 'Atendimento Personalizado', desc: 'Equipe dedicada para entender e suprir suas necessidades exatas.', icon: 'Users' }
          ]
        },
        styles: {
          backgroundColor: tokens.backgroundColor,
          textColor: tokens.textColor
        }
      });

      // Call to action
      components.push({
        id: `comp-cta-${Date.now()}`,
        type: 'cta',
        name: 'Chamada de Ação',
        order: 4,
        visibility: true,
        properties: {
          heading: 'Inicie Seu Projeto Conosco Hoje Mesmo',
          subheading: 'Entre em contato com nossa equipe e receba um atendimento exclusivo.',
          buttonText: 'Conversar no WhatsApp',
          phone: briefing.contactPhone,
          email: briefing.contactEmail
        },
        styles: {
          backgroundColor: tokens.primaryColor,
          textColor: '#FFFFFF'
        }
      });
    } else {
      // Standard Page Hero Banner
      components.push({
        id: `comp-banner-${Date.now()}`,
        type: 'hero',
        name: `Banner ${pageName}`,
        order: 2,
        visibility: true,
        properties: {
          heading: pageName,
          subheading: `Saiba mais sobre ${pageName} na ${briefing.businessName}.`,
          primaryCta: 'Entrar em Contato'
        },
        styles: {
          backgroundColor: tokens.surfaceColor,
          textColor: tokens.textColor
        }
      });
    }

    // Footer component
    components.push({
      id: `comp-footer-${Date.now()}`,
      type: 'footer',
      name: 'Rodapé Completo',
      order: 99,
      visibility: true,
      properties: {
        brandName: briefing.businessName,
        copyright: `© ${new Date().getFullYear()} ${briefing.businessName}. Todos os direitos reservados.`,
        phone: briefing.contactPhone,
        email: briefing.contactEmail,
        address: briefing.address,
        socialMedia: briefing.socialMedia
      },
      styles: {
        backgroundColor: tokens.backgroundColor,
        textColor: tokens.textColor
      }
    });

    return components;
  }
}
