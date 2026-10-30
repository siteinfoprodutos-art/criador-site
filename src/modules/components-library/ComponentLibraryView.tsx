import React, { useState } from 'react';
import { Box, Code, Copy, Check, Layout, Sparkles, ShoppingBag, FormInput, Navigation, FileText } from 'lucide-react';

export const ComponentLibraryView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('estrutura');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'estrutura', label: 'Estrutura', icon: Layout },
    { id: 'conteudo', label: 'Conteúdo', icon: FileText },
    { id: 'comercial', label: 'Comercial', icon: Sparkles },
    { id: 'formularios', label: 'Formulários', icon: FormInput },
    { id: 'navegacao', label: 'Navegação', icon: Navigation },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag }
  ];

  const componentsCatalog = [
    {
      id: 'comp-hero-split',
      category: 'estrutura',
      name: 'Hero split com Imagem e CTA',
      description: 'Banner principal com Badge, Título impactante, Subtítulo e botões de ação.',
      codeSnippet: `<section className="py-16 px-8 bg-[#0D1020] border-b border-[#1C2340]">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#8257F5]/20 text-[#B7A1FF]">INOVAÇÃO DIGITAL</span>
      <h1 className="text-4xl font-extrabold text-white mt-4">Sua Plataforma de Alto Desempenho</h1>
      <p className="text-sm text-[#A1A9C2] mt-2">Crie experiências digitais profissionais sem depender de código complexo.</p>
      <div className="mt-6 flex gap-3">
        <button className="px-5 py-2.5 rounded-xl bg-[#8257F5] text-white text-xs font-bold">Começar Agora</button>
      </div>
    </div>
  </div>
</section>`
    },
    {
      id: 'comp-feature-cards',
      category: 'conteudo',
      name: 'Grade de Benefícios (3 Colunas)',
      description: 'Cards com ícone destacado, título e descrição em layout de grade responsiva.',
      codeSnippet: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="p-6 rounded-2xl bg-[#151A2E] border border-[#1C2340]">
    <h3 className="text-base font-bold text-white">Alta Velocidade</h3>
    <p className="text-xs text-[#A1A9C2] mt-2">Carregamento ultrarrápido otimizado para navegadores modernos.</p>
  </div>
</div>`
    },
    {
      id: 'comp-pricing-table',
      category: 'comercial',
      name: 'Tabela de Preços com Destaque',
      description: 'Planos comerciais com badges, lista de recursos e botão de assinatura.',
      codeSnippet: `<div className="p-8 rounded-2xl bg-[#151A2E] border border-[#8257F5] relative">
  <span className="absolute -top-3 right-6 bg-[#8257F5] text-white text-[10px] font-bold px-3 py-1 rounded-full">POPULAR</span>
  <h3 className="text-lg font-bold text-white">Plano Pro Studio</h3>
  <div className="text-3xl font-black text-white my-3">R$ 199 <span className="text-xs text-[#A1A9C2] font-normal">/único</span></div>
</div>`
    },
    {
      id: 'comp-contact-form',
      category: 'formularios',
      name: 'Formulário de Contato Completo',
      description: 'Campos para nome, e-mail, telefone e mensagem com validação.',
      codeSnippet: `<form className="space-y-4 bg-[#151A2E] p-6 rounded-2xl border border-[#1C2340]">
  <input type="text" placeholder="Seu Nome" className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2 text-xs text-white" />
  <textarea placeholder="Sua Mensagem" className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2 text-xs text-white" rows={4}></textarea>
  <button className="w-full py-2.5 rounded-xl bg-[#8257F5] text-white text-xs font-bold">Enviar Mensagem</button>
</form>`
    }
  ];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredComponents = componentsCatalog.filter(c => c.category === activeCategory);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 shadow-xl">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Box className="w-5 h-5 text-[#8257F5]" />
          <span>Biblioteca de Componentes do SITEFORGE</span>
        </h1>
        <p className="text-xs text-[#A1A9C2]">
          Elementos visuais modulares pré-estilizados prontos para uso em qualquer página.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive 
                  ? 'bg-[#8257F5] text-white shadow-md shadow-[#8257F5]/20' 
                  : 'bg-[#151A2E] border border-[#1C2340] text-[#A1A9C2] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Component Cards */}
      <div className="space-y-6">
        {filteredComponents.length === 0 ? (
          <div className="p-8 bg-[#151A2E]/60 border border-[#1C2340] rounded-2xl text-center text-xs text-[#A1A9C2]">
            Nenhum componente cadastrado nesta categoria no momento.
          </div>
        ) : (
          filteredComponents.map((comp) => (
            <div key={comp.id} className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{comp.name}</h3>
                  <p className="text-xs text-[#A1A9C2]">{comp.description}</p>
                </div>
                <button
                  onClick={() => handleCopyCode(comp.id, comp.codeSnippet)}
                  className="px-3 py-1.5 rounded-xl bg-[#0D1020] border border-[#1C2340] hover:border-[#8257F5] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === comp.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B7A1FF]" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Box */}
              <div className="bg-[#0D1020] border border-[#1C2340] rounded-xl p-4 font-mono text-xs text-[#B7A1FF] overflow-x-auto">
                <pre>{comp.codeSnippet}</pre>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
