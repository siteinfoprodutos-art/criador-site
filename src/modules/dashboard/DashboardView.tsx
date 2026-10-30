import React from 'react';
import { 
  PlusCircle, 
  LayoutTemplate, 
  FolderKanban, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Layers, 
  HardDrive, 
  Clock, 
  MoreVertical, 
  Edit3, 
  Copy, 
  Download, 
  Trash2,
  Building2,
  ShoppingBag,
  Briefcase,
  Rocket
} from 'lucide-react';
import { WebsiteProject, TemplateItem, SiteCategory } from '../../types';
import { NavTab } from '../../components/Sidebar';

interface DashboardViewProps {
  projects: WebsiteProject[];
  templates: TemplateItem[];
  onNavigate: (tab: NavTab) => void;
  onOpenProject: (project: WebsiteProject) => void;
  onDuplicateProject: (projectId: string) => void;
  onExportProject: (project: WebsiteProject) => void;
  onDeleteProject: (projectId: string) => void;
  onSelectTemplate: (template: TemplateItem) => void;
  onQuickStartCategory: (category: SiteCategory) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  templates,
  onNavigate,
  onOpenProject,
  onDuplicateProject,
  onExportProject,
  onDeleteProject,
  onSelectTemplate,
  onQuickStartCategory
}) => {
  const recentProjects = projects.slice(0, 4);
  const recommendedTemplates = templates.slice(0, 3);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#151A2E] via-[#1C2340] to-[#151A2E] border border-[#8257F5]/30 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8257F5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#4388F5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8257F5]/20 border border-[#8257F5]/40 text-[#B7A1FF] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO PROFISSIONAL LOCAL-FIRST</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Transforme suas ideias em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B7A1FF] via-[#8257F5] to-[#4388F5]">sites extraordinários.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#A1A9C2] font-medium leading-relaxed max-w-2xl">
            Crie experiências digitais profissionais com liberdade total para editar, personalizar e publicar. Sem assinatura mensal e 100% offline.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('new-project')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-extrabold hover:opacity-95 shadow-lg shadow-[#8257F5]/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>CRIAR NOVO SITE</span>
            </button>

            <button
              onClick={() => onNavigate('templates')}
              className="px-6 py-3 rounded-xl bg-[#151A2E] border border-[#1C2340] text-white text-xs font-extrabold hover:bg-[#1C2340] flex items-center gap-2 transition-all cursor-pointer"
            >
              <LayoutTemplate className="w-4 h-4 text-[#B7A1FF]" />
              <span>EXPLORAR TEMPLATES</span>
            </button>
          </div>
        </div>
      </div>

      {/* Local Studio Stats Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] space-y-1">
          <div className="flex items-center justify-between text-[#A1A9C2] text-xs">
            <span>Projetos Ativos</span>
            <FolderKanban className="w-4 h-4 text-[#8257F5]" />
          </div>
          <p className="text-2xl font-black text-white">{projects.length}</p>
          <p className="text-[11px] text-emerald-400 font-medium">Armazenados no IndexedDB</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] space-y-1">
          <div className="flex items-center justify-between text-[#A1A9C2] text-xs">
            <span>Total de Páginas</span>
            <Layers className="w-4 h-4 text-[#4388F5]" />
          </div>
          <p className="text-2xl font-black text-white">
            {projects.reduce((acc, p) => acc + (p.pages?.length || 0), 0)}
          </p>
          <p className="text-[11px] text-[#A1A9C2]">Estruturas Geradas</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] space-y-1">
          <div className="flex items-center justify-between text-[#A1A9C2] text-xs">
            <span>Templates Prontos</span>
            <LayoutTemplate className="w-4 h-4 text-[#B7A1FF]" />
          </div>
          <p className="text-2xl font-black text-white">{templates.length}</p>
          <p className="text-[11px] text-[#A1A9C2]">Biblioteca Local</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] space-y-1">
          <div className="flex items-center justify-between text-[#A1A9C2] text-xs">
            <span>Armazenamento</span>
            <HardDrive className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">Local-First</p>
          <p className="text-[11px] text-emerald-400 font-medium">100% Privado e Seguro</p>
        </div>
      </div>

      {/* Quick Start Categories */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Rocket className="w-5 h-5 text-[#8257F5]" />
          <span>Criação Rápida por Categoria</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onQuickStartCategory('landing-page')}
            className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] hover:border-[#8257F5]/50 text-left transition-all hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8257F5]/20 text-[#B7A1FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#B7A1FF] transition-colors">Criar Landing Page</h3>
            <p className="text-xs text-[#A1A9C2] mt-1">Alta conversão para lançamentos e produtos.</p>
          </button>

          <button
            onClick={() => onQuickStartCategory('institucional')}
            className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] hover:border-[#4388F5]/50 text-left transition-all hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4388F5]/20 text-[#4388F5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#4388F5] transition-colors">Criar Site Institucional</h3>
            <p className="text-xs text-[#A1A9C2] mt-1">Para empresas, clínicas e consultorias.</p>
          </button>

          <button
            onClick={() => onQuickStartCategory('e-commerce')}
            className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] hover:border-emerald-500/50 text-left transition-all hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Criar Loja Virtual</h3>
            <p className="text-xs text-[#A1A9C2] mt-1">Catálogo de produtos com checkout externo.</p>
          </button>

          <button
            onClick={() => onQuickStartCategory('portfolio')}
            className="p-5 rounded-2xl bg-[#151A2E] border border-[#1C2340] hover:border-amber-500/50 text-left transition-all hover:-translate-y-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Criar Portfólio</h3>
            <p className="text-xs text-[#A1A9C2] mt-1">Apresentação para criativos e profissionais.</p>
          </button>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-[#8257F5]" />
            <span>Projetos Recentes</span>
          </h2>
          {projects.length > 0 && (
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold text-[#B7A1FF] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Ver Todos ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {recentProjects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#151A2E]/60 border border-[#1C2340] border-dashed text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1C2340] text-[#A1A9C2] flex items-center justify-center mx-auto">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Nenhum projeto criado ainda</h3>
            <p className="text-xs text-[#A1A9C2] max-w-sm mx-auto">
              Comece criando seu primeiro site do zero com o assistente local ou escolha um template.
            </p>
            <button
              onClick={() => onNavigate('new-project')}
              className="px-4 py-2 rounded-xl bg-[#8257F5] text-white text-xs font-bold hover:bg-[#8257F5]/90 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Criar Meu Primeiro Site</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#151A2E] border border-[#1C2340] hover:border-[#8257F5]/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#8257F5]/20 text-[#B7A1FF] border border-[#8257F5]/30 capitalize">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-[#A1A9C2] font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(project.updatedAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#B7A1FF] transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#A1A9C2] line-clamp-2 mt-1">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1C2340] flex items-center justify-between gap-2">
                  <span className="text-xs text-[#A1A9C2] font-medium">
                    {project.pages?.length || 0} página(s)
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenProject(project)}
                      className="p-2 rounded-lg bg-[#8257F5]/20 hover:bg-[#8257F5] text-[#B7A1FF] hover:text-white transition-colors cursor-pointer"
                      title="Abrir no Editor Visual"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDuplicateProject(project.id)}
                      className="p-2 rounded-lg bg-[#1C2340] hover:bg-[#1C2340]/80 text-[#A1A9C2] hover:text-white transition-colors cursor-pointer"
                      title="Duplicar Projeto"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onExportProject(project)}
                      className="p-2 rounded-lg bg-[#1C2340] hover:bg-[#1C2340]/80 text-[#A1A9C2] hover:text-white transition-colors cursor-pointer"
                      title="Baixar ZIP"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-[#B7A1FF]" />
            <span>Templates Recomendados</span>
          </h2>
          <button
            onClick={() => onNavigate('templates')}
            className="text-xs font-semibold text-[#B7A1FF] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Ver Biblioteca Completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-[#151A2E] border border-[#1C2340] rounded-2xl overflow-hidden hover:border-[#8257F5]/50 transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                  {template.pageCount} Páginas
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{template.name}</h3>
                  <p className="text-xs text-[#A1A9C2] line-clamp-2 mb-3">{template.description}</p>
                </div>

                <div className="pt-3 border-t border-[#1C2340] flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#B7A1FF] capitalize">
                    {template.style}
                  </span>
                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#8257F5] text-white text-xs font-bold hover:bg-[#8257F5]/90 transition-colors cursor-pointer"
                  >
                    Usar Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
