import React, { useState, useEffect } from 'react';
import { Settings, HardDrive, Download, Upload, ShieldCheck, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';
import { db } from '../../core/database/db';
import { WorkspaceSettings } from '../../types';

export const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState<WorkspaceSettings>({
    workspaceName: 'Meu Studio Local',
    ownerName: 'Criador SITEFORGE',
    theme: 'dark',
    autoSaveInterval: 30,
    exportFormat: 'html-css',
    localEngineVersion: '1.0.0-phase1'
  });

  const [projectCount, setProjectCount] = useState<number>(0);
  const [assetCount, setAssetCount] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    const pCount = await db.projects.count();
    const aCount = await db.assets.count();
    setProjectCount(pCount);
    setAssetCount(aCount);

    const saved = await db.settings.get('default-settings');
    if (saved) setSettings(saved);
  };

  const handleSaveSettings = async () => {
    await db.settings.put({
      ...settings,
      id: 'default-settings'
    });
    alert('Configurações salvas no banco local!');
  };

  const handleExportFullBackup = async () => {
    setIsExporting(true);
    const projects = await db.projects.toArray();
    const assets = await db.assets.toArray();
    const templates = await db.templates.toArray();

    const backupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      settings,
      projects,
      assets,
      templates
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siteforge-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setIsExporting(false);
  };

  const handleRestoreFullBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.projects && Array.isArray(data.projects)) {
          if (confirm(`Restauração detectada com ${data.projects.length} projeto(s). Deseja importar?`)) {
            setIsRestoring(true);
            await db.projects.bulkPut(data.projects);
            if (data.assets) await db.assets.bulkPut(data.assets);
            await loadInfo();
            setIsRestoring(false);
            alert('Backup restaurado com sucesso!');
          }
        } else {
          alert('Arquivo de backup inválido.');
        }
      } catch (err) {
        alert('Erro ao processar o arquivo de backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#8257F5]" />
            <span>Configurações & Backup Local</span>
          </h1>
          <p className="text-xs text-[#A1A9C2]">
            Gerencie o comportamento do estúdio e faça backups do seu banco IndexedDB.
          </p>
        </div>
      </div>

      {/* Workspace Settings Card */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#1C2340] pb-3">
          <ShieldCheck className="w-4 h-4 text-[#8257F5]" />
          <span>Informações do Workspace</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white mb-1">Nome do Studio / Workspace</label>
            <input
              type="text"
              value={settings.workspaceName}
              onChange={(e) => setSettings({ ...settings, workspaceName: e.target.value })}
              className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2 text-xs text-white focus:border-[#8257F5] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1">Nome do Proprietário</label>
            <input
              type="text"
              value={settings.ownerName}
              onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
              className="w-full bg-[#0D1020] border border-[#1C2340] rounded-xl px-4 py-2 text-xs text-white focus:border-[#8257F5] focus:outline-hidden"
            />
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 rounded-xl bg-[#8257F5] text-white text-xs font-bold hover:bg-[#8257F5]/90 transition-colors cursor-pointer"
        >
          Salvar Configurações
        </button>
      </div>

      {/* IndexedDB Database & Backup Manager */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#1C2340] pb-3">
          <HardDrive className="w-4 h-4 text-emerald-400" />
          <span>Armazenamento Local (IndexedDB)</span>
        </h2>

        <div className="p-4 bg-[#0D1020] rounded-xl border border-[#1C2340] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white">Estatísticas do Banco de Dados</p>
            <p className="text-xs text-[#A1A9C2] mt-0.5">
              {projectCount} projeto(s) salvo(s) · {assetCount} arquivo(s) local(is)
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            OFFLINE READY
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={handleExportFullBackup}
            disabled={isExporting}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#1C2340] hover:bg-[#1C2340]/80 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#B7A1FF]" />
            <span>Exportar Backup Completo (JSON)</span>
          </button>

          <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0D1020] border border-[#1C2340] hover:border-[#8257F5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-[#4388F5]" />
            <span>Restaurar Backup de Arquivo</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreFullBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Intelligence Engine Status Box */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 space-y-3 shadow-xl">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#B7A1FF]" />
          <span>SITEFORGE INTELLIGENCE ENGINE</span>
        </h2>
        <div className="space-y-2 text-xs text-[#A1A9C2]">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Local Site Planner: Motor ativo e sem chamadas a APIs pagas.</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Conversational Command Engine: Operações locais mapeadas.</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>External AI Prompt Bridge: Habilitado para copiar contextos de projeto.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
