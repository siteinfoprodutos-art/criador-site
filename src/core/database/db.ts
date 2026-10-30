import Dexie, { Table } from 'dexie';
import { WebsiteProject, WebsitePage, WebsiteComponent, WebsiteAsset, WebsiteVersion, TemplateItem, WorkspaceSettings } from '../../types';
import { INITIAL_TEMPLATES } from '../templates/templateData';

export class SiteForgeDatabase extends Dexie {
  projects!: Table<WebsiteProject, string>;
  pages!: Table<WebsitePage, string>;
  components!: Table<WebsiteComponent, string>;
  assets!: Table<WebsiteAsset, string>;
  templates!: Table<TemplateItem, string>;
  versions!: Table<WebsiteVersion, string>;
  settings!: Table<WorkspaceSettings, string>;

  constructor() {
    super('SiteForgeIADatabase');
    
    this.version(1).stores({
      projects: 'id, name, category, status, createdAt, updatedAt',
      pages: 'id, projectId, slug, order',
      components: 'id, type, name, order',
      assets: 'id, projectId, type, createdAt',
      templates: 'id, name, category, style',
      versions: 'id, projectId, versionNumber, createdAt',
      settings: 'id'
    });
  }

  async seedInitialDataIfNeeded() {
    try {
      const templateCount = await this.templates.count();
      if (templateCount === 0) {
        await this.templates.bulkAdd(INITIAL_TEMPLATES);
      }

      const settingsCount = await this.settings.count();
      if (settingsCount === 0) {
        await this.settings.add({
          id: 'default-settings',
          workspaceName: 'Meu Studio Local',
          ownerName: 'Criador SITEFORGE',
          theme: 'dark',
          autoSaveInterval: 30,
          exportFormat: 'html-css',
          localEngineVersion: '1.0.0-phase1'
        });
      }
    } catch (error) {
      console.warn('Erro ao inicializar dados padrão no Dexie IndexedDB:', error);
    }
  }
}

export const db = new SiteForgeDatabase();

// Run initial seed on start
db.seedInitialDataIfNeeded();
