import React, { useState } from 'react';
import { LayoutTemplate, Search, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { TemplateItem, SiteCategory } from '../../types';

interface TemplatesViewProps {
  templates: TemplateItem[];
  onPreviewTemplate: (template: TemplateItem) => void;
  onSelectTemplate: (template: TemplateItem) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  onPreviewTemplate,
  onSelectTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-[#B7A1FF]" />
            <span>Biblioteca de Templates Editáveis</span>
          </h1>
          <p className="text-xs text-[#A1A9C2]">
            Templates estruturados em páginas e componentes prontos para personalização.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A9C2]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, tag ou estilo..."
            className="w-full bg-[#151A2E] border border-[#1C2340] focus:border-[#8257F5] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#A1A9C2] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'institucional', label: 'Institucional' },
            { id: 'e-commerce', label: 'E-commerce' },
            { id: 'portfolio', label: 'Portfólio' },
            { id: 'restaurante', label: 'Restaurante' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-[#8257F5] text-white shadow-md shadow-[#8257F5]/20'
                  : 'bg-[#151A2E] text-[#A1A9C2] hover:text-white border border-[#1C2340]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {filteredTemplates.length === 0 ? (
        <div className="p-12 bg-[#151A2E]/60 border border-[#1C2340] border-dashed rounded-2xl text-center space-y-2">
          <LayoutTemplate className="w-8 h-8 text-[#A1A9C2] mx-auto" />
          <p className="text-sm font-bold text-white">Nenhum template encontrado com os filtros aplicados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-[#151A2E] border border-[#1C2340] rounded-2xl overflow-hidden hover:border-[#8257F5]/50 transition-all flex flex-col group shadow-lg"
            >
              {/* Thumbnail Header */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider">
                  {template.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                  {template.pageCount} Páginas
                </div>
              </div>

              {/* Template Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#B7A1FF] transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs text-[#A1A9C2] line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {template.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#0D1020] text-[#A1A9C2] border border-[#1C2340]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1C2340] flex items-center gap-2">
                  <button
                    onClick={() => onPreviewTemplate(template)}
                    className="flex-1 py-2 rounded-xl bg-[#0D1020] hover:bg-[#1C2340] border border-[#1C2340] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B7A1FF]" />
                    <span>Visualizar</span>
                  </button>

                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#8257F5]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Usar Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
