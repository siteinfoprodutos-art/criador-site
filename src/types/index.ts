export type SiteCategory = 
  | 'institucional'
  | 'landing-page'
  | 'e-commerce'
  | 'portfolio'
  | 'restaurante'
  | 'servicos'
  | 'blog'
  | 'web-app'
  | 'personalizado';

export type SiteStyle = 
  | 'minimalista'
  | 'corporativo'
  | 'luxuoso'
  | 'moderno'
  | 'editorial'
  | 'criativo'
  | 'tecnologico'
  | 'elegante'
  | 'comercial';

export interface DesignTokens {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
}

export interface WebsiteSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface WebsiteComponentProperty {
  [key: string]: any;
}

export interface WebsiteComponentStyle {
  [key: string]: string | number;
}

export interface WebsiteComponent {
  id: string;
  type: string; // e.g., 'header', 'hero', 'features', 'cta', 'testimonials', 'footer', 'pricing', 'form', 'gallery'
  name: string;
  properties: WebsiteComponentProperty;
  styles: WebsiteComponentStyle;
  responsiveStyles?: {
    mobile?: WebsiteComponentStyle;
    tablet?: WebsiteComponentStyle;
    desktop?: WebsiteComponentStyle;
  };
  children?: WebsiteComponent[];
  visibility: boolean;
  order: number;
}

export interface WebsitePage {
  id: string;
  projectId: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  components: WebsiteComponent[];
  seo: WebsiteSEO;
  order: number;
  visibility: boolean;
  isHome?: boolean;
}

export interface WebsiteAsset {
  id: string;
  projectId?: string;
  name: string;
  type: 'image' | 'logo' | 'icon' | 'document';
  mimeType: string;
  size: number;
  dataUrl: string; // Base64 data URL for local storage
  createdAt: string;
}

export interface WebsiteVersion {
  id: string;
  projectId: string;
  versionNumber: number;
  name: string;
  snapshot: any;
  createdAt: string;
}

export interface WebsiteProject {
  id: string;
  name: string;
  description: string;
  category: SiteCategory;
  style: SiteStyle;
  createdAt: string;
  updatedAt: string;
  status: 'rascunho' | 'publicado' | 'arquivado';
  designTokens: DesignTokens;
  settings: {
    favicon?: string;
    googleAnalyticsId?: string;
    customHeadCode?: string;
    language: string;
  };
  pages: WebsitePage[];
  assets: WebsiteAsset[];
  version: number;
  thumbnailUrl?: string;
}

export interface BriefingData {
  category: SiteCategory;
  businessName: string;
  segment: string;
  description: string;
  targetAudience: string;
  goal: string;
  productsServices: string;
  differentials: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: string;
  address: string;
  selectedPages: string[];
  selectedStyle: SiteStyle;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: SiteCategory;
  style: SiteStyle;
  description: string;
  pageCount: number;
  thumbnailUrl: string;
  tags: string[];
  designTokens: DesignTokens;
  defaultPages: Omit<WebsitePage, 'id' | 'projectId'>[];
}

export interface WorkspaceSettings {
  id?: string;
  workspaceName: string;
  ownerName: string;
  theme: 'dark' | 'light';
  autoSaveInterval: number;
  exportFormat: 'html-css' | 'react';
  localEngineVersion: string;
}
