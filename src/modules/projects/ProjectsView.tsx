import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Edit3, 
  Copy, 
  Download, 
  Trash2, 
  Clock, 
  Layers, 
  Grid, 
  List, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { WebsiteProject, SiteCategory } from '../../types';

interface ProjectsViewProps {
  projects: WebsiteProject[];
  onCreateNew: () => void;
  onOpenProject: (project: WebsiteProject) => void;
  onDuplicateProject: (projectId: string) => void;
  onExportProject: (project: WebsiteProject) => void;
  onDeleteProject: (projectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onCreateNew,
  onOpenProject,
  onDuplicateProject,
  onExportProject,
  onDeleteProject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-[#8257F5]" />
            <span>Gerenciador de Projetos</span>
          </h1>
          <p className="text-xs text-[#A1A9C2]">
            {projects.length} site(s) salvo(s) localmente no IndexedDB.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#8257F5]/20 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Site</span>
        </button>
      </div>

      {/* Filter & View Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A9C2]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou descrição..."
              className="w-full bg-[#151A2E] border border-[#1C2340] focus:border-[#8257F5] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#A1A9C2] focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#151A2E] border border-[#1C2340] rounded-xl px-3 py-2 text-xs text-white focus:border-[#8257F5] focus:outline-hidden capitalize"
          >
            <option value="all">Todas as Categorias</option>
            <option value="institucional">Institucional</option>
            <option value="landing-page">Landing Page</option>
            <option value="e-commerce">Loja Virtual</option>
            <option value="portfolio">Portfólio</option>
            <option value="restaurante">Restaurante</option>
            <option value="servicos">Serviços</option>
          </select>

          <div className="flex items-center bg-[#151A2E] border border-[#1C2340] rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'list' ? 'bg-[#8257F5] text-white' : 'text-[#A1A9C2] hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display Area */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 bg-[#151A2E]/60 border border-[#1C2340] border-dashed rounded-2xl text-center space-y-3">
          <FolderKanban className="w-10 h-10 text-[#A1A9C2] mx-auto" />
          <h3 className="text-base font-bold text-white">Nenhum projeto encontrado</h3>
          <p className="text-xs text-[#A1A9C2]">Tente ajustar a pesquisa ou crie um novo projeto.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#151A2E] border border-[#1C2340] hover:border-[#8257F5]/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-2xl group"
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

                <h3 className="text-lg font-bold text-white group-hover:text-[#B7A1FF] transition-colors truncate">
                  {project.name}
                </h3>
                <p className="text-xs text-[#A1A9C2] line-clamp-2 mt-1 mb-4">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C2340] flex items-center justify-between">
                <span className="text-xs text-[#A1A9C2] font-medium flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#8257F5]" />
                  {project.pages?.length || 0} página(s)
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="p-2 rounded-lg bg-[#8257F5]/20 hover:bg-[#8257F5] text-[#B7A1FF] hover:text-white transition-colors cursor-pointer"
                    title="Editar no Studio Visual"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicateProject(project.id)}
                    className="p-2 rounded-lg bg-[#1C2340] hover:bg-[#1C2340]/80 text-[#A1A9C2] hover:text-white transition-colors cursor-pointer"
                    title="Duplicar"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onExportProject(project)}
                    className="p-2 rounded-lg bg-[#1C2340] hover:bg-[#1C2340]/80 text-[#A1A9C2] hover:text-white transition-colors cursor-pointer"
                    title="Exportar ZIP"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl overflow-hidden shadow-xl divide-y divide-[#1C2340]">
          {filteredProjects.map((project) => (
            <div key={project.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#1C2340]/50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white truncate">{project.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8257F5]/20 text-[#B7A1FF] capitalize">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-[#A1A9C2] truncate">{project.description}</p>
              </div>

              <div className="flex items-center gap-6 shrink-0 text-xs text-[#A1A9C2]">
                <span>{project.pages?.length || 0} página(s)</span>
                <span className="font-mono text-[11px]">{new Date(project.updatedAt).toLocaleDateString('pt-BR')}</span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="px-3 py-1.5 rounded-lg bg-[#8257F5] text-white text-xs font-semibold hover:bg-[#8257F5]/90 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => onExportProject(project)}
                    className="p-1.5 rounded-lg bg-[#1C2340] hover:bg-[#1C2340]/80 text-[#A1A9C2] hover:text-white transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
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
