import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { TemplatePreviewModal } from './components/TemplatePreviewModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

import { DashboardView } from './modules/dashboard/DashboardView';
import { NewProjectWizard } from './modules/new-project/NewProjectWizard';
import { ProjectsView } from './modules/projects/ProjectsView';
import { TemplatesView } from './modules/templates/TemplatesView';
import { ComponentLibraryView } from './modules/components-library/ComponentLibraryView';
import { AssetManagerView } from './modules/assets/AssetManagerView';
import { SettingsView } from './modules/settings/SettingsView';
import { VisualEditorShell } from './modules/visual-editor/VisualEditorShell';

import { ProjectService } from './core/projects/projectService';
import { db } from './core/database/db';
import { WebsiteProject, TemplateItem, SiteCategory } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [activeProject, setActiveProject] = useState<WebsiteProject | null>(null);

  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [quickCategory, setQuickCategory] = useState<SiteCategory | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const allProjects = await ProjectService.getAllProjects();
      setProjects(allProjects);

      const allTemplates = await db.templates.toArray();
      setTemplates(allTemplates);
    } catch (err) {
      console.error('Erro ao carregar dados do IndexedDB:', err);
    }
  };

  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now(),
      title,
      description,
      type
    };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleOpenProject = (project: WebsiteProject) => {
    setActiveProject(project);
    setCurrentTab('editor');
  };

  const handleProjectCreated = (newProject: WebsiteProject) => {
    addToast('Projeto Criado com Sucesso!', `O site "${newProject.name}" foi salvo localmente.`);
    loadData();
    setActiveProject(newProject);
    setCurrentTab('editor');
  };

  const handleDuplicateProject = async (projectId: string) => {
    const dup = await ProjectService.duplicateProject(projectId);
    if (dup) {
      addToast('Projeto Duplicado!', `Cópia "${dup.name}" foi adicionada aos seus projetos.`);
      await loadData();
    }
  };

  const handleExportProjectZip = async (project: WebsiteProject) => {
    try {
      addToast('Gerando Arquivo ZIP...', 'Preparando estrutura de arquivos e assets.', 'info');
      const zipBlob = await ProjectService.exportProjectAsZip(project);
      
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-siteforge.zip`;
      a.click();
      URL.revokeObjectURL(url);

      addToast('Exportação Concluída!', 'Download do ZIP iniciado com sucesso.');
    } catch (err) {
      addToast('Erro ao Exportar', 'Falha ao empacotar o projeto em ZIP.', 'error');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      await ProjectService.deleteProject(projectId);
      addToast('Projeto Excluído', 'O projeto foi removido do armazenamento local.');
      await loadData();
    }
  };

  const handleSelectTemplate = async (template: TemplateItem) => {
    setPreviewTemplate(null);
    const newProj = await ProjectService.createProjectFromTemplate(template);
    addToast('Template Instanciado!', `Projeto "${newProj.name}" gerado no estúdio.`);
    await loadData();
    setActiveProject(newProj);
    setCurrentTab('editor');
  };

  const handleQuickStartCategory = (category: SiteCategory) => {
    setQuickCategory(category);
    setCurrentTab('new-project');
  };

  return (
    <div className="min-h-screen bg-[#090B18] text-white flex flex-col font-sans">
      
      {/* Editor Fullscreen Viewport Mode */}
      {currentTab === 'editor' && activeProject ? (
        <VisualEditorShell
          project={activeProject}
          onBackToDashboard={() => setCurrentTab('dashboard')}
          onSaveProject={async (updated) => {
            await ProjectService.updateProject(updated);
            setActiveProject(updated);
            await loadData();
          }}
          onExportProject={handleExportProjectZip}
        />
      ) : (
        /* Studio Layout Mode */
        <div className="flex flex-1">
          <Sidebar
            currentTab={currentTab}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              setQuickCategory(undefined);
            }}
            isOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
            <Header
              onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              onNavigate={setCurrentTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
              {currentTab === 'dashboard' && (
                <DashboardView
                  projects={projects}
                  templates={templates}
                  onNavigate={setCurrentTab}
                  onOpenProject={handleOpenProject}
                  onDuplicateProject={handleDuplicateProject}
                  onExportProject={handleExportProjectZip}
                  onDeleteProject={handleDeleteProject}
                  onSelectTemplate={handleSelectTemplate}
                  onQuickStartCategory={handleQuickStartCategory}
                />
              )}

              {currentTab === 'new-project' && (
                <NewProjectWizard
                  initialCategory={quickCategory}
                  onProjectCreated={handleProjectCreated}
                  onCancel={() => setCurrentTab('dashboard')}
                />
              )}

              {currentTab === 'projects' && (
                <ProjectsView
                  projects={projects}
                  onCreateNew={() => setCurrentTab('new-project')}
                  onOpenProject={handleOpenProject}
                  onDuplicateProject={handleDuplicateProject}
                  onExportProject={handleExportProjectZip}
                  onDeleteProject={handleDeleteProject}
                />
              )}

              {currentTab === 'templates' && (
                <TemplatesView
                  templates={templates}
                  onPreviewTemplate={setPreviewTemplate}
                  onSelectTemplate={handleSelectTemplate}
                />
              )}

              {currentTab === 'components' && <ComponentLibraryView />}

              {currentTab === 'assets' && <AssetManagerView />}

              {currentTab === 'publishing' && (
                <div className="space-y-6 pb-12">
                  <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 shadow-xl">
                    <h1 className="text-xl font-bold text-white mb-2">Publicação & Exportação de Sites</h1>
                    <p className="text-xs text-[#A1A9C2]">
                      Exporte o código-fonte limpo do seu site em formato ZIP pronto para publicação em qualquer hospedagem externa (Netlify, Vercel, GitHub Pages, Hostinger, etc.).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-6 bg-[#151A2E] border border-[#1C2340] rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-white">{proj.name}</h3>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#8257F5]/20 text-[#B7A1FF] uppercase">
                            {proj.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#A1A9C2]">{proj.description}</p>
                        <button
                          onClick={() => handleExportProjectZip(proj)}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer"
                        >
                          Baixar Código Fonte em ZIP
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentTab === 'settings' && <SettingsView />}
            </main>
          </div>
        </div>
      )}

      {/* Template Detailed Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Toast Notifications */}
      <NotificationToast toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}

export default App;
