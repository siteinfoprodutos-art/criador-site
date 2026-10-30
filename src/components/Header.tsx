import React from 'react';
import { Search, Plus, Menu, HelpCircle, HardDrive, ShieldCheck } from 'lucide-react';
import { NavTab } from './Sidebar';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  onNavigate: (tab: NavTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleMobileSidebar, 
  onNavigate,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0D1020]/90 backdrop-blur-md border-b border-[#1C2340] px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Workspace Name */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-[#A1A9C2] hover:text-white rounded-lg hover:bg-[#151A2E]"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#A1A9C2]">
          <span className="text-white font-semibold">Workspace</span>
          <span>/</span>
          <span className="text-[#B7A1FF]">Studio Local Principal</span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            Local-First
          </span>
        </div>
      </div>

      {/* Middle: Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A9C2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar projetos, templates ou componentes..."
            className="w-full bg-[#151A2E] border border-[#1C2340] focus:border-[#8257F5] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#A1A9C2] focus:outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* Right: Quick CTA & Profile Badge */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onNavigate('new-project')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-semibold hover:opacity-95 shadow-md shadow-[#8257F5]/20 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Site</span>
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-[#1C2340]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1C2340] to-[#8257F5]/30 border border-[#8257F5]/40 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            SL
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">Studio Local</p>
            <p className="text-[10px] text-[#A1A9C2]">Compra Única</p>
          </div>
        </div>
      </div>
    </header>
  );
};
