import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, Sparkles, Check, ArrowRight, Layers } from 'lucide-react';
import { TemplateItem } from '../types';

interface TemplatePreviewModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onSelectTemplate: (template: TemplateItem) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ 
  template, 
  onClose, 
  onSelectTemplate 
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  if (!template) return null;

  const activePage = template.defaultPages[activePageIndex] || template.defaultPages[0];

  const deviceWidths = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="bg-[#0D1020] border border-[#1C2340] rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#151A2E] border-b border-[#1C2340] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8257F5] to-[#4388F5] flex items-center justify-center text-white font-bold text-lg">
              {template.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{template.name}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#8257F5]/20 text-[#B7A1FF] border border-[#8257F5]/30 capitalize">
                  {template.category}
                </span>
              </div>
              <p className="text-xs text-[#A1A9C2]">{template.description}</p>
            </div>
          </div>

          {/* Device Controls */}
          <div className="flex items-center gap-2 bg-[#0D1020] p-1 rounded-xl border border-[#1C2340] self-center">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${device === 'desktop' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
              title="Desktop (1440px)"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${device === 'tablet' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${device === 'mobile' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTemplate(template)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#8257F5]/20 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Usar este Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#A1A9C2] hover:text-white hover:bg-[#1C2340] rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Page Tabs + Viewport Container */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Info & Page Selector */}
          <div className="w-full md:w-64 bg-[#0D1020] border-r border-[#1C2340] p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div>
              <div className="mb-4">
                <span className="text-[11px] font-bold text-[#A1A9C2] uppercase tracking-wider block mb-2">Páginas Incluídas ({template.defaultPages.length})</span>
                <div className="space-y-1">
                  {template.defaultPages.map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePageIndex(idx)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${activePageIndex === idx ? 'bg-[#151A2E] text-white border border-[#8257F5]/40 font-semibold' : 'text-[#A1A9C2] hover:bg-[#151A2E]/50'}`}
                    >
                      <span className="truncate">{page.name}</span>
                      {page.isHome && <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#8257F5]/20 text-[#B7A1FF]">Home</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Design Tokens Info */}
              <div className="mb-4 p-3 bg-[#151A2E] rounded-xl border border-[#1C2340]">
                <span className="text-[11px] font-bold text-white block mb-2">Identidade Visual</span>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: template.designTokens.primaryColor }} />
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: template.designTokens.secondaryColor }} />
                  <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: template.designTokens.backgroundColor }} />
                </div>
                <p className="text-[11px] text-[#A1A9C2]">
                  Fonte: <span className="text-white font-medium">{template.designTokens.headingFont}</span>
                </p>
                <p className="text-[11px] text-[#A1A9C2]">
                  Estilo: <span className="text-white font-medium capitalize">{template.style}</span>
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#151A2E]/60 rounded-xl border border-[#1C2340] text-[11px] text-[#A1A9C2]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                <Check className="w-3.5 h-3.5" />
                <span>Pronto para Edição</span>
              </div>
              Template 100% editável no Visual Builder do SITEFORGE IA.
            </div>
          </div>

          {/* Canvas Interactive Simulation Frame */}
          <div className="flex-1 bg-[#090B18] p-4 sm:p-8 flex items-center justify-center overflow-auto">
            <div className={`transition-all duration-300 ${deviceWidths[device]} h-full bg-[#0D1020] rounded-2xl border border-[#1C2340] shadow-2xl flex flex-col overflow-hidden`}>
              {/* Browser Shell Top Bar */}
              <div className="px-4 py-2.5 bg-[#151A2E] border-b border-[#1C2340] flex items-center gap-2 text-[11px] text-[#A1A9C2]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 bg-[#0D1020] rounded-md px-3 py-1 text-center font-mono text-[10px] text-[#A1A9C2] border border-[#1C2340] truncate">
                  https://preview.siteforge.app/{template.name.toLowerCase().replace(/\s+/g, '-')}/{activePage.slug}
                </div>
              </div>

              {/* Rendered Template Page Mock Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ backgroundColor: template.designTokens.backgroundColor, color: template.designTokens.textColor }}>
                
                {/* Header Mock */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: template.designTokens.primaryColor }} />
                    {template.name}
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-[#A1A9C2]">
                    {template.defaultPages.map((p, i) => (
                      <span key={i} className={i === activePageIndex ? 'text-white font-bold' : ''}>{p.name}</span>
                    ))}
                  </div>
                </div>

                {/* Page Content Mock */}
                <div className="py-8 text-center space-y-4 max-w-2xl mx-auto">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider" style={{ backgroundColor: template.designTokens.primaryColor + '30', color: template.designTokens.primaryColor }}>
                    {activePage.name}
                  </span>
                  <h1 className="text-3xl font-extrabold text-white leading-tight" style={{ fontFamily: template.designTokens.headingFont }}>
                    {activePage.title}
                  </h1>
                  <p className="text-sm text-[#A1A9C2] leading-relaxed">
                    {activePage.description}
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <div className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg" style={{ backgroundColor: template.designTokens.primaryColor }}>
                      Ação Principal
                    </div>
                    <div className="px-5 py-2.5 rounded-xl font-bold text-xs text-white/80 border border-white/20">
                      Saiba Mais
                    </div>
                  </div>
                </div>

                {/* Components Sections preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: template.designTokens.surfaceColor }}>
                    <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center font-bold text-xs" style={{ backgroundColor: template.designTokens.primaryColor + '20', color: template.designTokens.primaryColor }}>
                      01
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Layout Responsivo & Fluido</h4>
                    <p className="text-xs text-[#A1A9C2]">Construído com CSS moderno adaptável a qualquer resolução.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: template.designTokens.surfaceColor }}>
                    <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center font-bold text-xs" style={{ backgroundColor: template.designTokens.primaryColor + '20', color: template.designTokens.primaryColor }}>
                      02
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Múltiplas Páginas Prontas</h4>
                    <p className="text-xs text-[#A1A9C2]">Estrutura completa com navegação e SEO pré-configurado.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
