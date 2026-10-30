import React, { useState } from 'react';
import { 
  Building2, 
  Rocket, 
  ShoppingBag, 
  Briefcase, 
  Utensils, 
  Wrench, 
  BookOpen, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Palette, 
  Layers, 
  Upload, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { BriefingData, SiteCategory, SiteStyle, WebsiteProject } from '../../types';
import { ProjectService } from '../../core/projects/projectService';

interface NewProjectWizardProps {
  onProjectCreated: (project: WebsiteProject) => void;
  onCancel: () => void;
  initialCategory?: SiteCategory;
}

export const NewProjectWizard: React.FC<NewProjectWizardProps> = ({
  onProjectCreated,
  onCancel,
  initialCategory
}) => {
  const [step, setStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStepText, setGenerationStepText] = useState<string>('Analisando briefing...');

  const [briefing, setBriefing] = useState<BriefingData>({
    category: initialCategory || 'institucional',
    businessName: '',
    segment: '',
    description: '',
    targetAudience: '',
    goal: '',
    productsServices: '',
    differentials: '',
    contactEmail: '',
    contactPhone: '',
    socialMedia: '',
    address: '',
    selectedPages: ['Home', 'Sobre Nós', 'Serviços', 'Contato'],
    selectedStyle: 'moderno',
    primaryColor: '#8257F5',
    secondaryColor: '#4388F5',
    logoUrl: ''
  });

  const categoriesList: { id: SiteCategory; label: string; desc: string; icon: any }[] = [
    { id: 'institucional', label: 'Institucional', desc: 'Empresas, clínicas, escritórios e consultorias', icon: Building2 },
    { id: 'landing-page', label: 'Landing Page', desc: 'Lançamentos, produtos e captação de leads', icon: Rocket },
    { id: 'e-commerce', label: 'Loja Virtual', desc: 'Catálogos de produtos com checkout externo', icon: ShoppingBag },
    { id: 'portfolio', label: 'Portfólio', desc: 'Designers, desenvolvedores e criativos', icon: Briefcase },
    { id: 'restaurante', label: 'Restaurante / Bares', desc: 'Cardápios virtuais, reservas e bistro', icon: Utensils },
    { id: 'servicos', label: 'Serviços', desc: 'Barbearias, salões, academias e prestadores', icon: Wrench },
    { id: 'blog', label: 'Blog / Editorial', desc: 'Notícias, artigos e criação de conteúdo', icon: BookOpen },
    { id: 'web-app', label: 'Web Application', desc: 'Dashboards, ferramentas e sistemas', icon: Cpu }
  ];

  const pageOptions = [
    'Home',
    'Sobre Nós',
    'Serviços',
    'Produtos',
    'Portfólio',
    'Depoimentos',
    'Blog',
    'Contato',
    'FAQ / Dúvidas',
    'Tabela de Preços'
  ];

  const stylesList: { id: SiteStyle; label: string; desc: string }[] = [
    { id: 'moderno', label: 'Moderno & High-Tech', desc: 'Visual vibrante com gradientes e alto contraste' },
    { id: 'minimalista', label: 'Minimalista & Clean', desc: 'Espaçoso, foco em tipografia e simplicidade' },
    { id: 'corporativo', label: 'Corporativo & Sólido', desc: 'Profissional, sério e confiável' },
    { id: 'luxuoso', label: 'Luxuoso & Sofisticado', desc: 'Cores quentes, detalhes dourados e elegância' },
    { id: 'criativo', label: 'Criativo & Arrojado', desc: 'Cores chamativas e composições dinâmicas' },
    { id: 'tecnologico', label: 'Tecnológico & Dark', desc: 'Inspirado em plataformas SaaS internacionais' }
  ];

  const handleTogglePage = (page: string) => {
    if (briefing.selectedPages.includes(page)) {
      if (briefing.selectedPages.length > 1) {
        setBriefing({
          ...briefing,
          selectedPages: briefing.selectedPages.filter(p => p !== page)
        });
      }
    } else {
      setBriefing({
        ...briefing,
        selectedPages: [...briefing.selectedPages, page]
      });
    }
  };

  const handleGenerateProject = async () => {
    setIsGenerating(true);
    
    // Simulate steps of Local Site Planner execution for rich feedback
    const steps = [
      'Organizando briefing e requisitos...',
      'Mapeando arquitetura de páginas e slugs...',
      'Aplicando design system e paleta de cores...',
      'Sintetizando componentes semânticos e seções...',
      'Persistindo projeto no IndexedDB local...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStepText(steps[i]);
      await new Promise(r => setTimeout(r, 400));
    }

    try {
      const newProject = await ProjectService.createProjectFromBriefing(briefing);
      setIsGenerating(false);
      onProjectCreated(newProject);
    } catch (error) {
      console.error('Erro ao gerar projeto:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Wizard Header Progress Bar */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8257F5]" />
              <span>Assistente de Criação — SITEFORGE IA</span>
            </h1>
            <p className="text-xs text-[#A1A9C2]">Etapa {step} de 5 — Configuração do projeto</p>
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-[#A1A9C2] hover:text-white px-3 py-1.5 rounded-lg border border-[#1C2340] hover:bg-[#1C2340]"
          >
            Cancelar
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#0D1020] h-2 rounded-full overflow-hidden border border-[#1C2340]">
          <div 
            className="bg-gradient-to-r from-[#8257F5] to-[#4388F5] h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 sm:p-8 shadow-xl">
        
        {/* ETAPA 1 — TIPO DE SITE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Qual o tipo de site que deseja criar?</h2>
              <p className="text-xs text-[#A1A9C2]">O assistente local selecionará a melhor estrutura de componentes para esta categoria.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoriesList.map((cat) => {
                const Icon = cat.icon;
                const isSelected = briefing.category === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setBriefing({ ...briefing, category: cat.id })}
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#8257F5]/10 border-[#8257F5] text-white shadow-lg shadow-[#8257F5]/10' 
                        : 'bg-[#0D1020] border-[#1C2340] text-[#A1A9C2] hover:border-[#8257F5]/40 hover:text-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#8257F5] text-white' : 'bg-[#151A2E] text-[#A1A9C2]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{cat.label}</h3>
                      <p className="text-xs text-[#A1A9C2] mt-0.5">{cat.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ETAPA 2 — INFORMAÇÕES DO NEGÓCIO */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Informações sobre seu Negócio</h2>
              <p className="text-xs text-[#A1A9C2]">Preencha os detalhes para personalizar automaticamente os textos do site.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">Nome da Empresa / Projeto *</label>
                <input
                  type="text"
                  value={briefing.businessName}
                  onChange={(e) => setBriefing({ ...briefing, businessName: e.target.value })}
                  placeholder="Ex: Nexus Cloud, Savoria Bistro, Dr. Lucas"
                  className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#8257F5] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">Segmento de Atuação</label>
                <input
                  type="text"
                  value={briefing.segment}
                  onChange={(e) => setBriefing({ ...briefing, segment: e.target.value })}
                  placeholder="Ex: Tecnologia, Gastronomia, Saúde"
                  className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#8257F5] focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-white mb-1">Descrição Curta do Negócio</label>
                <textarea
                  rows={3}
                  value={briefing.description}
                  onChange={(e) => setBriefing({ ...briefing, description: e.target.value })}
                  placeholder="Descreva resumidamente o que sua empresa faz e qual valor entrega aos clientes..."
                  className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#8257F5] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  value={briefing.contactPhone}
                  onChange={(e) => setBriefing({ ...briefing, contactPhone: e.target.value })}
                  placeholder="(11) 99999-8888"
                  className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#8257F5] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">E-mail de Contato</label>
                <input
                  type="email"
                  value={briefing.contactEmail}
                  onChange={(e) => setBriefing({ ...briefing, contactEmail: e.target.value })}
                  placeholder="contato@suaempresa.com"
                  className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#8257F5] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 3 — IDENTIDADE VISUAL */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Identidade Visual & Cores</h2>
              <p className="text-xs text-[#A1A9C2]">Escolha a paleta de cores principal para o seu site.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-2">Cor Primária (Destaques & Botões)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={briefing.primaryColor}
                    onChange={(e) => setBriefing({ ...briefing, primaryColor: e.target.value })}
                    className="w-12 h-10 rounded-xl bg-[#0D1020] border border-[#1C2340] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={briefing.primaryColor}
                    onChange={(e) => setBriefing({ ...briefing, primaryColor: e.target.value })}
                    className="flex-1 bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-2">Cor Secundária (Acentos)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={briefing.secondaryColor}
                    onChange={(e) => setBriefing({ ...briefing, secondaryColor: e.target.value })}
                    className="w-12 h-10 rounded-xl bg-[#0D1020] border border-[#1C2340] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={briefing.secondaryColor}
                    onChange={(e) => setBriefing({ ...briefing, secondaryColor: e.target.value })}
                    className="flex-1 bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Quick Palette Presets */}
            <div>
              <label className="block text-xs font-semibold text-white mb-2">Paletas Pré-configuradas Sugeridas</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Violet Studio', p: '#8257F5', s: '#4388F5' },
                  { name: 'Ocean Tech', p: '#0284C7', s: '#38BDF8' },
                  { name: 'Emerald Clean', p: '#059669', s: '#34D399' },
                  { name: 'Amber Luxury', p: '#D97706', s: '#F59E0B' }
                ].map((palette, i) => (
                  <button
                    key={i}
                    onClick={() => setBriefing({ ...briefing, primaryColor: palette.p, secondaryColor: palette.s })}
                    className="p-3 bg-[#0D1020] border border-[#1C2340] hover:border-[#8257F5] rounded-xl text-left transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-xs font-medium text-white">{palette.name}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.p }} />
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.s }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 4 — ESTRUTURA DO SITE */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Selecione as Páginas do Seu Site</h2>
              <p className="text-xs text-[#A1A9C2]">O SITEFORGE criará a estrutura de rotas e navegação entre elas.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pageOptions.map((page) => {
                const isSelected = briefing.selectedPages.includes(page);

                return (
                  <button
                    key={page}
                    onClick={() => handleTogglePage(page)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#8257F5]/20 border-[#8257F5] text-white' 
                        : 'bg-[#0D1020] border-[#1C2340] text-[#A1A9C2] hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold">{page}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#8257F5]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ETAPA 5 — ESTILO VISUAL & GERAR */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Estilo Visual Pretendido</h2>
              <p className="text-xs text-[#A1A9C2]">Define as fontes, arredondamentos e layout dos componentes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stylesList.map((st) => {
                const isSelected = briefing.selectedStyle === st.id;

                return (
                  <button
                    key={st.id}
                    onClick={() => setBriefing({ ...briefing, selectedStyle: st.id })}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#8257F5]/20 border-[#8257F5] text-white' 
                        : 'bg-[#0D1020] border-[#1C2340] text-[#A1A9C2] hover:text-white'
                    }`}
                  >
                    <h3 className="text-xs font-bold text-white">{st.label}</h3>
                    <p className="text-[11px] text-[#A1A9C2] mt-0.5">{st.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Summary Box */}
            <div className="p-4 bg-[#0D1020] border border-[#1C2340] rounded-xl text-xs space-y-1">
              <p className="text-white font-bold">Resumo do Projeto:</p>
              <p className="text-[#A1A9C2]">
                <span className="text-white">{briefing.businessName || 'Sem nome'}</span> · Categoria: <span className="text-[#B7A1FF] capitalize">{briefing.category}</span> · Páginas: <span className="text-white">{briefing.selectedPages.join(', ')}</span>
              </p>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Actions */}
        <div className="pt-6 mt-6 border-t border-[#1C2340] flex items-center justify-between">
          <button
            disabled={step === 1 || isGenerating}
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 rounded-xl border border-[#1C2340] text-xs font-semibold text-[#A1A9C2] hover:text-white hover:bg-[#1C2340] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#8257F5]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Próximo Passo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled={isGenerating}
              onClick={handleGenerateProject}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-black hover:opacity-95 shadow-lg shadow-[#8257F5]/30 flex items-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Gerando Projeto...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Projeto com SITEFORGE PLANNER</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

      {/* Generation Overlay Modal */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151A2E] border border-[#8257F5]/40 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl animate-scale-up">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8257F5] to-[#4388F5] flex items-center justify-center mx-auto text-white shadow-xl shadow-[#8257F5]/30 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white">Criando Seu Site Profissional</h3>
            <p className="text-xs text-[#B7A1FF] font-medium font-mono animate-fade-in">
              {generationStepText}
            </p>

            <div className="w-full bg-[#0D1020] h-2 rounded-full overflow-hidden border border-[#1C2340]">
              <div className="bg-gradient-to-r from-[#8257F5] to-[#4388F5] h-full animate-pulse w-full" />
            </div>

            <p className="text-[11px] text-[#A1A9C2]">
              LOCAL SITE PLANNER · Construindo estrutura responsiva, estilos e componentes sem consumir créditos externos.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
