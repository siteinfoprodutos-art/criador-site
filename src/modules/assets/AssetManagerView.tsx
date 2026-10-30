import React, { useState, useEffect } from 'react';
import { FolderOpen, Upload, Search, Trash2, Image, FileText, CheckCircle2, HardDrive } from 'lucide-react';
import { db } from '../../core/database/db';
import { WebsiteAsset } from '../../types';

export const AssetManagerView: React.FC = () => {
  const [assets, setAssets] = useState<WebsiteAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    const list = await db.assets.toArray();
    setAssets(list);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // File size validation: Max 5MB per asset for local browser performance
      if (file.size > 5 * 1024 * 1024) {
        alert(`O arquivo ${file.name} excede o limite de 5MB.`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        const newAsset: WebsiteAsset = {
          id: 'asset-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          mimeType: file.type,
          size: file.size,
          dataUrl,
          createdAt: new Date().toISOString()
        };

        await db.assets.add(newAsset);
        await loadAssets();
      };
      reader.readAsDataURL(file);
    }

    setIsUploading(false);
  };

  const handleDeleteAsset = async (id: string) => {
    if (confirm('Deseja excluir este arquivo local?')) {
      await db.assets.delete(id);
      await loadAssets();
    }
  };

  const filteredAssets = assets.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#151A2E] border border-[#1C2340] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#8257F5]" />
            <span>Biblioteca de Arquivos Locais</span>
          </h1>
          <p className="text-xs text-[#A1A9C2]">
            {assets.length} arquivo(s) armazenado(s) com segurança no IndexedDB local do navegador.
          </p>
        </div>

        {/* File Upload Button */}
        <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#4388F5] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#8257F5]/20 flex items-center gap-2 cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>Upload de Arquivo</span>
          <input
            type="file"
            accept="image/*,.svg"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A9C2]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome do arquivo..."
          className="w-full bg-[#151A2E] border border-[#1C2340] focus:border-[#8257F5] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#A1A9C2] focus:outline-hidden"
        />
      </div>

      {/* File Grid */}
      {filteredAssets.length === 0 ? (
        <div className="p-12 bg-[#151A2E]/60 border border-[#1C2340] border-dashed rounded-2xl text-center space-y-3">
          <HardDrive className="w-10 h-10 text-[#A1A9C2] mx-auto" />
          <h3 className="text-sm font-bold text-white">Nenhum arquivo local enviado ainda</h3>
          <p className="text-xs text-[#A1A9C2] max-w-xs mx-auto">
            Faça upload de logotipos, imagens ou ícones SVG para usar nos seus projetos do SITEFORGE.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#151A2E] border border-[#1C2340] hover:border-[#8257F5] rounded-2xl p-3 flex flex-col justify-between group transition-all"
            >
              <div className="h-28 bg-[#0D1020] rounded-xl overflow-hidden flex items-center justify-center mb-2 relative">
                {asset.mimeType.startsWith('image/') ? (
                  <img
                    src={asset.dataUrl}
                    alt={asset.name}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <FileText className="w-8 h-8 text-[#A1A9C2]" />
                )}

                <button
                  onClick={() => handleDeleteAsset(asset.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <p className="text-xs font-bold text-white truncate" title={asset.name}>
                  {asset.name}
                </p>
                <p className="text-[10px] text-[#A1A9C2] font-mono">
                  {(asset.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
