import React from 'react';
import { 
  Home, 
  PlusCircle, 
  FolderKanban, 
  LayoutTemplate, 
  Box, 
  FolderOpen, 
  Globe, 
  Settings, 
  HardDrive,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'new-project'
  | 'projects'
  | 'templates'
  | 'components'
  | 'assets'
  | 'publishing'
  | 'settings'
  | 'editor';

interface SidebarProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate, isOpen, onCloseMobile }) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Início', icon: Home },
    { id: 'new-project' as NavTab, label: 'Criar Novo Site', icon: PlusCircle, highlight: true },
    { id: 'projects' as NavTab, label: 'Meus Projetos', icon: FolderKanban },
    { id: 'templates' as NavTab, label: 'Templates', icon: LayoutTemplate },
    { id: 'components' as NavTab, label: 'Componentes', icon: Box },
    { id: 'assets' as NavTab, label: 'Arquivos', icon: FolderOpen },
    { id: 'publishing' as NavTab, label: 'Publicações', icon: Globe },
    { id: 'settings' as NavTab, label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0D1020] border-r border-[#1C2340] flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-[#1C2340]/80 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8257F5] to-[#4388F5] flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#8257F5]/20">
                S
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white tracking-tight text-base">SITEFORGE</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#8257F5]/20 text-[#B7A1FF] border border-[#8257F5]/30">IA</span>
                </div>
                <p className="text-[11px] text-[#A1A9C2] font-medium tracking-wide">STUDIO PROFISSIONAL</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#8257F5]/20 to-[#4388F5]/10 text-white border border-[#8257F5]/40 shadow-sm' 
                      : item.highlight 
                        ? 'text-[#B7A1FF] hover:bg-[#151A2E] hover:text-white'
                        : 'text-[#A1A9C2] hover:bg-[#151A2E] hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#8257F5]' : item.highlight ? 'text-[#B7A1FF]' : 'text-[#A1A9C2]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#8257F5]" />
                  )}
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#8257F5]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Local-First Studio Offline Footer Indicator */}
        <div className="p-4 border-t border-[#1C2340] bg-[#090B18]/60 m-3 rounded-2xl border">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="relative">
              <HardDrive className="w-4 h-4 text-[#4388F5]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">IndexedDB Engine</span>
          </div>
          <p className="text-[11px] text-[#A1A9C2] leading-tight mb-2">
            Projetos mantidos 100% offline e seguros no seu navegador.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A9C2] pt-2 border-t border-[#1C2340]/60">
            <span>MODO LOCAL</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Ativo
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
