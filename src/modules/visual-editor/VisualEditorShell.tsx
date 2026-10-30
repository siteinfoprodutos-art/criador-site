import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Download, 
  Save, 
  Layers, 
  Plus, 
  Box, 
  FolderOpen, 
  FileText, 
  Settings2, 
  Sparkles, 
  MessageSquare, 
  Copy, 
  Trash2, 
  Eye, 
  ChevronRight,
  Send,
  ExternalLink,
  X,
  Layout
} from 'lucide-react';
import { WebsiteProject, WebsitePage, WebsiteComponent } from '../../types';

interface VisualEditorShellProps {
  project: WebsiteProject;
  onBackToDashboard: () => void;
  onSaveProject: (updatedProject: WebsiteProject) => void;
  onExportProject: (project: WebsiteProject) => void;
}

export const VisualEditorShell: React.FC<VisualEditorShellProps> = ({
  project,
  onBackToDashboard,
  onSaveProject,
  onExportProject
}) => {
  const [currentProject, setCurrentProject] = useState<WebsiteProject>(project);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [activeTabLeft, setActiveTabLeft] = useState<'pages' | 'elements' | 'sections' | 'layers' | 'assets'>('pages');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreview, setIsPreview] = useState<boolean>(false);
  
  // Conversational Assistant State
  const [commandInput, setCommandInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([
    { sender: 'assistant', text: `Olá! Sou o assistente local do SITEFORGE IA. Como posso ajudar a modificar o site "${project.name}"?` }
  ]);
  const [showPromptBridge, setShowPromptBridge] = useState<boolean>(false);

  const activePage = currentProject.pages[activePageIndex] || currentProject.pages[0];
  const selectedComponent = activePage?.components?.find(c => c.id === selectedComponentId);

  const deviceWidths = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  const handleAddPage = () => {
    const pageName = prompt('Nome da nova página:');
    if (!pageName) return;

    const slug = pageName.toLowerCase().replace(/\s+/g, '-');
    const newPage: WebsitePage = {
      id: `page-${Date.now()}`,
      projectId: currentProject.id,
      name: pageName,
      slug,
      title: `${pageName} — ${currentProject.name}`,
      description: `Página ${pageName}`,
      order: currentProject.pages.length + 1,
      visibility: true,
      seo: { title: pageName, description: '', keywords: [] },
      components: [
        {
          id: `comp-header-${Date.now()}`,
          type: 'header',
          name: 'Cabeçalho',
          order: 1,
          visibility: true,
          properties: { brandName: currentProject.name },
          styles: { backgroundColor: currentProject.designTokens.backgroundColor }
        },
        {
          id: `comp-hero-${Date.now()}`,
          type: 'hero',
          name: 'Hero Banner',
          order: 2,
          visibility: true,
          properties: { heading: pageName, subheading: 'Edite este conteúdo no painel de propriedades.' },
          styles: { backgroundColor: currentProject.designTokens.surfaceColor }
        }
      ]
    };

    const updated = {
      ...currentProject,
      pages: [...currentProject.pages, newPage]
    };

    setCurrentProject(updated);
    onSaveProject(updated);
    setActivePageIndex(updated.pages.length - 1);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const userText = commandInput;
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setCommandInput('');

    // Rule-based Local Conversational Command Engine
    setTimeout(() => {
      const lower = userText.toLowerCase();

      if (lower.includes('depoimentos') || lower.includes('testimonial')) {
        // Add Testimonials Section
        const newComp: WebsiteComponent = {
          id: `comp-testi-${Date.now()}`,
          type: 'testimonials',
          name: 'Seção de Depoimentos',
          order: activePage.components.length + 1,
          visibility: true,
          properties: {
            title: 'O Que Nossos Clientes Dizem',
            items: [
              { quote: 'Serviço excelente e atendimento rápido!', author: 'Maria Silva' },
              { quote: 'Superou todas as nossas expectativas digitais.', author: 'João Souza' }
            ]
          },
          styles: { backgroundColor: currentProject.designTokens.surfaceColor }
        };

        const updatedPages = currentProject.pages.map((p, idx) => {
          if (idx === activePageIndex) {
            return { ...p, components: [...p.components, newComp] };
          }
          return p;
        });

        const updated = { ...currentProject, pages: updatedPages };
        setCurrentProject(updated);
        onSaveProject(updated);

        setChatHistory(prev => [...prev, {
          sender: 'assistant',
          text: '✅ Adicionei uma nova seção de depoimentos na página atual!'
        }]);
      } else if (lower.includes('fundo') || lower.includes('cor') || lower.includes('azul')) {
        setChatHistory(prev => [...prev, {
          sender: 'assistant',
          text: '🎨 A cor de fundo dos componentes pode ser alterada diretamente no Painel de Propriedades no lado direito.'
        }]);
      } else {
        setChatHistory(prev => [...prev, {
          sender: 'assistant',
          text: 'Comando local não reconhecido diretamente. Você pode usar a ponte "External AI Prompt Bridge" para gerar instruções avançadas via ChatGPT/Gemini.'
        }]);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090B18] text-white flex flex-col overflow-hidden">
      
      {/* Top Studio Bar */}
      <header className="h-14 bg-[#0D1020] border-b border-[#1C2340] px-4 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-1.5 rounded-xl bg-[#151A2E] hover:bg-[#1C2340] text-[#A1A9C2] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-px bg-[#1C2340]" />

          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-xs">{currentProject.name}</h2>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#8257F5]/20 text-[#B7A1FF] uppercase tracking-wider">
              {currentProject.category}
            </span>
          </div>
        </div>

        {/* Viewport Switcher Controls */}
        <div className="flex items-center gap-1 bg-[#151A2E] p-1 rounded-xl border border-[#1C2340]">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${device === 'desktop' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
            title="Desktop (1440px)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${device === 'tablet' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
            title="Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${device === 'mobile' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
            title="Mobile (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${isPreview ? 'bg-amber-500 text-black font-bold' : 'bg-[#151A2E] text-[#A1A9C2] hover:text-white'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPreview ? 'Sair da Prévia' : 'Pré-visualizar'}</span>
          </button>

          <button
            onClick={() => onExportProject(currentProject)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#8257F5]/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar ZIP</span>
          </button>
        </div>
      </header>

      {/* Main Builder Workspace (3 Column Layout) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Control Drawer */}
        {!isPreview && (
          <div className="w-64 bg-[#0D1020] border-r border-[#1C2340] flex flex-col shrink-0">
            {/* Drawer Tabs */}
            <div className="flex items-center border-b border-[#1C2340] bg-[#151A2E] text-[11px] text-[#A1A9C2]">
              <button
                onClick={() => setActiveTabLeft('pages')}
                className={`flex-1 py-2.5 font-bold transition-colors ${activeTabLeft === 'pages' ? 'text-white border-b-2 border-[#8257F5] bg-[#0D1020]' : 'hover:text-white'}`}
              >
                Páginas
              </button>
              <button
                onClick={() => setActiveTabLeft('elements')}
                className={`flex-1 py-2.5 font-bold transition-colors ${activeTabLeft === 'elements' ? 'text-white border-b-2 border-[#8257F5] bg-[#0D1020]' : 'hover:text-white'}`}
              >
                Elementos
              </button>
              <button
                onClick={() => setActiveTabLeft('layers')}
                className={`flex-1 py-2.5 font-bold transition-colors ${activeTabLeft === 'layers' ? 'text-white border-b-2 border-[#8257F5] bg-[#0D1020]' : 'hover:text-white'}`}
              >
                Camadas
              </button>
            </div>

            {/* Drawer Content Area */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {activeTabLeft === 'pages' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#A1A9C2] uppercase tracking-wider">Estrutura de Páginas</span>
                    <button
                      onClick={handleAddPage}
                      className="p-1 text-[#8257F5] hover:text-white rounded-md hover:bg-[#151A2E]"
                      title="Adicionar Nova Página"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {currentProject.pages.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePageIndex(idx)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${activePageIndex === idx ? 'bg-[#151A2E] text-white border border-[#8257F5]/40 font-bold' : 'text-[#A1A9C2] hover:bg-[#151A2E]/50'}`}
                    >
                      <span className="truncate">{p.name}</span>
                      {p.isHome && <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#8257F5]/20 text-[#B7A1FF]">Home</span>}
                    </button>
                  ))}
                </div>
              )}

              {activeTabLeft === 'elements' && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#A1A9C2] uppercase tracking-wider block mb-2">Blocos para Arrastar</span>
                  {['Título Principal', 'Parágrafo de Texto', 'Botão CTA', 'Imagem de Destaque', 'Grade de Benefícios', 'Formulário de Contato'].map((elem, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#151A2E] border border-[#1C2340] hover:border-[#8257F5] rounded-xl text-xs font-semibold text-white flex items-center gap-2 cursor-grab active:cursor-grabbing hover:bg-[#1C2340]/50 transition-colors"
                    >
                      <Box className="w-4 h-4 text-[#8257F5]" />
                      <span>{elem}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTabLeft === 'layers' && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#A1A9C2] uppercase tracking-wider block mb-2">Hierarquia de Componentes</span>
                  {activePage.components.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedComponentId(comp.id)}
                      className={`p-2 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${selectedComponentId === comp.id ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:bg-[#151A2E]'}`}
                    >
                      <span>{comp.name}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Center Canvas Viewport */}
        <div className="flex-1 bg-[#090B18] p-4 sm:p-6 flex items-center justify-center overflow-auto relative">
          <div className={`transition-all duration-300 ${deviceWidths[device]} h-full bg-[#0D1020] rounded-2xl border border-[#1C2340] shadow-2xl flex flex-col overflow-hidden`}>
            
            {/* Canvas Mock Header Bar */}
            <div className="px-4 py-2 bg-[#151A2E] border-b border-[#1C2340] flex items-center justify-between text-[11px] text-[#A1A9C2]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[10px] text-[#A1A9C2]">
                http://localhost:3000/{activePage.slug}
              </span>
            </div>

            {/* Interactive Page Component Preview Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ backgroundColor: currentProject.designTokens.backgroundColor, color: currentProject.designTokens.textColor }}>
              
              {activePage.components.map((comp) => {
                const isSelected = selectedComponentId === comp.id;

                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    className={`p-6 rounded-2xl transition-all relative group cursor-pointer ${
                      isSelected ? 'ring-2 ring-[#8257F5] shadow-xl' : 'hover:ring-1 hover:ring-[#8257F5]/50'
                    }`}
                    style={{ backgroundColor: String(comp.styles.backgroundColor || currentProject.designTokens.surfaceColor) }}
                  >
                    {/* Component Badge Identifier */}
                    {!isPreview && (
                      <span className="absolute top-2 right-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#0D1020]/80 text-[#B7A1FF] border border-[#1C2340] opacity-0 group-hover:opacity-100 transition-opacity">
                        {comp.name}
                      </span>
                    )}

                    {/* Render specific component mock types */}
                    {comp.type === 'header' && (
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{comp.properties.brandName || currentProject.name}</span>
                        <div className="flex gap-4 text-xs text-[#A1A9C2]">
                          <span>Início</span>
                          <span>Sobre</span>
                          <span>Contato</span>
                        </div>
                      </div>
                    )}

                    {comp.type === 'hero' && (
                      <div className="py-6 text-center space-y-3">
                        {comp.properties.badge && (
                          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#8257F5]/20 text-[#B7A1FF]">
                            {comp.properties.badge}
                          </span>
                        )}
                        <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: currentProject.designTokens.headingFont }}>
                          {comp.properties.heading || 'Título do Hero Banner'}
                        </h1>
                        <p className="text-xs text-[#A1A9C2] max-w-lg mx-auto">
                          {comp.properties.subheading || 'Subtítulo editável do componente.'}
                        </p>
                        {comp.properties.primaryCta && (
                          <button className="px-5 py-2.5 rounded-xl bg-[#8257F5] text-white text-xs font-bold mt-2">
                            {comp.properties.primaryCta}
                          </button>
                        )}
                      </div>
                    )}

                    {comp.type !== 'header' && comp.type !== 'hero' && (
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">{comp.name}</h3>
                        <p className="text-xs text-[#A1A9C2]">{comp.properties.title || comp.properties.heading || 'Conteúdo do componente'}</p>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* Right Properties Inspector */}
        {!isPreview && (
          <div className="w-72 bg-[#0D1020] border-l border-[#1C2340] p-4 flex flex-col shrink-0 overflow-y-auto space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#1C2340] pb-2">
              <Settings2 className="w-4 h-4 text-[#8257F5]" />
              <span>Painel de Propriedades</span>
            </h3>

            {selectedComponent ? (
              <div className="space-y-4">
                <div className="p-2.5 bg-[#151A2E] rounded-xl border border-[#1C2340]">
                  <span className="text-[11px] text-[#A1A9C2] block">Componente Selecionado:</span>
                  <span className="text-xs font-bold text-white">{selectedComponent.name}</span>
                </div>

                {/* Properties fields */}
                <div className="space-y-3">
                  {selectedComponent.properties.heading !== undefined && (
                    <div>
                      <label className="block text-[11px] font-semibold text-[#A1A9C2] mb-1">Título Principal</label>
                      <input
                        type="text"
                        value={selectedComponent.properties.heading}
                        onChange={(e) => {
                          const updatedComp = {
                            ...selectedComponent,
                            properties: { ...selectedComponent.properties, heading: e.target.value }
                          };
                          const updatedPages = currentProject.pages.map((p, idx) => {
                            if (idx === activePageIndex) {
                              return {
                                ...p,
                                components: p.components.map(c => c.id === selectedComponent.id ? updatedComp : c)
                              };
                            }
                            return p;
                          });
                          const updated = { ...currentProject, pages: updatedPages };
                          setCurrentProject(updated);
                          onSaveProject(updated);
                        }}
                        className="w-full bg-[#151A2E] border border-[#1C2340] rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  )}

                  {selectedComponent.properties.subheading !== undefined && (
                    <div>
                      <label className="block text-[11px] font-semibold text-[#A1A9C2] mb-1">Subtítulo</label>
                      <textarea
                        rows={2}
                        value={selectedComponent.properties.subheading}
                        onChange={(e) => {
                          const updatedComp = {
                            ...selectedComponent,
                            properties: { ...selectedComponent.properties, subheading: e.target.value }
                          };
                          const updatedPages = currentProject.pages.map((p, idx) => {
                            if (idx === activePageIndex) {
                              return {
                                ...p,
                                components: p.components.map(c => c.id === selectedComponent.id ? updatedComp : c)
                              };
                            }
                            return p;
                          });
                          const updated = { ...currentProject, pages: updatedPages };
                          setCurrentProject(updated);
                          onSaveProject(updated);
                        }}
                        className="w-full bg-[#151A2E] border border-[#1C2340] rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#151A2E]/60 border border-[#1C2340] rounded-xl text-center text-xs text-[#A1A9C2]">
                Clique em qualquer elemento do canvas para inspecionar e editar suas propriedades.
              </div>
            )}

            {/* Conversational Builder Assistant Box */}
            <div className="pt-4 border-t border-[#1C2340] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8257F5]" />
                  <span>Assistente Conversacional</span>
                </span>
                <button
                  onClick={() => setShowPromptBridge(true)}
                  className="text-[10px] text-[#B7A1FF] hover:underline"
                >
                  Prompt Bridge
                </button>
              </div>

              <div className="bg-[#151A2E] border border-[#1C2340] rounded-xl p-3 h-40 overflow-y-auto space-y-2">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`text-[11px] p-2 rounded-lg leading-snug ${
                      msg.sender === 'user' ? 'bg-[#8257F5]/20 text-white ml-4' : 'bg-[#0D1020] text-[#A1A9C2] mr-4'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommandSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Ex: Adicione seção de depoimentos..."
                  className="flex-1 bg-[#151A2E] border border-[#1C2340] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#8257F5] text-white hover:bg-[#8257F5]/90 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* External AI Prompt Bridge Modal */}
      {showPromptBridge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151A2E] border border-[#8257F5]/40 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C2340] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8257F5]" />
                <span>EXTERNAL AI PROMPT BRIDGE</span>
              </h3>
              <button onClick={() => setShowPromptBridge(false)} className="text-[#A1A9C2] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#A1A9C2]">
              Gere um prompt otimizado contendo todo o contexto do projeto "{currentProject.name}" para colar no ChatGPT ou Gemini da sua própria conta.
            </p>

            <div className="p-3 bg-[#0D1020] border border-[#1C2340] rounded-xl font-mono text-[11px] text-[#B7A1FF] h-36 overflow-y-auto">
              {`Ações solicitadas para o site "${currentProject.name}" (Categoria: ${currentProject.category}):\n- Estilo atual: ${currentProject.style}\n- Páginas existentes: ${currentProject.pages.map(p => p.name).join(', ')}\nPor favor, forneça as modificações estruturadas de HTML/CSS para o layout.`}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Contexto do projeto ${currentProject.name}...`);
                  alert('Prompt copiado para a área de transferência!');
                }}
                className="flex-1 py-2 rounded-xl bg-[#8257F5] text-white text-xs font-bold hover:bg-[#8257F5]/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copiar Prompt Otimizado</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
