import { db } from '../database/db';
import { WebsiteProject, WebsitePage, BriefingData, TemplateItem } from '../../types';
import { LocalSitePlanner } from '../intelligence/localPlanner';
import JSZip from 'jszip';

export class ProjectService {
  static async getAllProjects(): Promise<WebsiteProject[]> {
    return await db.projects.orderBy('updatedAt').reverse().toArray();
  }

  static async getProjectById(id: string): Promise<WebsiteProject | undefined> {
    return await db.projects.get(id);
  }

  static async createProjectFromBriefing(briefing: BriefingData): Promise<WebsiteProject> {
    const project = LocalSitePlanner.generateProjectFromBriefing(briefing);
    await db.projects.add(project);
    return project;
  }

  static async createProjectFromTemplate(template: TemplateItem, customName?: string): Promise<WebsiteProject> {
    const projectId = 'proj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    const pages: WebsitePage[] = template.defaultPages.map((page, idx) => ({
      ...page,
      id: `page-${idx + 1}-${Date.now()}`,
      projectId,
    }));

    const project: WebsiteProject = {
      id: projectId,
      name: customName || template.name,
      description: template.description,
      category: template.category,
      style: template.style,
      createdAt: now,
      updatedAt: now,
      status: 'rascunho',
      designTokens: template.designTokens,
      settings: { language: 'pt-BR' },
      pages,
      assets: [],
      version: 1,
      thumbnailUrl: template.thumbnailUrl
    };

    await db.projects.add(project);
    return project;
  }

  static async updateProject(project: WebsiteProject): Promise<WebsiteProject> {
    project.updatedAt = new Date().toISOString();
    await db.projects.put(project);
    return project;
  }

  static async duplicateProject(projectId: string): Promise<WebsiteProject | undefined> {
    const source = await db.projects.get(projectId);
    if (!source) return undefined;

    const newProjectId = 'proj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    const duplicatedPages: WebsitePage[] = source.pages.map(p => ({
      ...p,
      id: `page-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      projectId: newProjectId
    }));

    const newProject: WebsiteProject = {
      ...source,
      id: newProjectId,
      name: `${source.name} (Cópia)`,
      createdAt: now,
      updatedAt: now,
      pages: duplicatedPages,
      version: 1
    };

    await db.projects.add(newProject);
    return newProject;
  }

  static async deleteProject(id: string): Promise<void> {
    await db.projects.delete(id);
  }

  static async exportProjectAsZip(project: WebsiteProject): Promise<Blob> {
    const zip = new JSZip();

    // Generate HTML for pages
    project.pages.forEach(page => {
      const fileName = page.isHome ? 'index.html' : `${page.slug}.html`;
      const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
</head>
<body style="background-color: ${project.designTokens.backgroundColor}; color: ${project.designTokens.textColor}; font-family: '${project.designTokens.bodyFont}', sans-serif; margin: 0; padding: 0;">
  
  <header style="background: ${project.designTokens.surfaceColor}; padding: 1rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: 800; font-size: 1.25rem; color: ${project.designTokens.primaryColor};">${project.name}</div>
    <nav style="display: flex; gap: 1.5rem;">
      ${project.pages.map(p => `<a href="${p.isHome ? 'index.html' : p.slug + '.html'}" style="color: ${project.designTokens.textColor}; text-decoration: none; font-size: 0.9rem;">${p.name}</a>`).join('')}
    </nav>
  </header>

  <main style="max-width: 1200px; margin: 0 auto; padding: 3rem 1.5rem;">
    <section style="text-align: center; padding: 4rem 1rem;">
      <h1 style="font-size: 3rem; font-family: '${project.designTokens.headingFont}', serif; margin-bottom: 1rem;">${page.title}</h1>
      <p style="font-size: 1.25rem; color: #A1A9C2; max-width: 700px; margin: 0 auto;">${page.description}</p>
    </section>

    ${page.components.map(comp => `
      <section style="margin: 3rem 0; padding: 2rem; background: ${project.designTokens.surfaceColor}; border-radius: ${project.designTokens.borderRadius}; border: 1px solid rgba(255,255,255,0.05);">
        <h2 style="color: ${project.designTokens.primaryColor}; font-size: 1.5rem; margin-top: 0;">${comp.name}</h2>
        <p>${comp.properties.heading || comp.properties.title || comp.properties.badge || 'Conteúdo do componente'}</p>
        ${comp.properties.subheading ? `<p style="color: #A1A9C2;">${comp.properties.subheading}</p>` : ''}
      </section>
    `).join('')}
  </main>

  <footer style="background: #090B18; padding: 2rem; text-align: center; color: #A1A9C2; font-size: 0.875rem; border-top: 1px solid rgba(255,255,255,0.1);">
    <p>© ${new Date().getFullYear()} ${project.name}. Criado com SITEFORGE IA.</p>
  </footer>

</body>
</html>`;

      zip.file(fileName, htmlContent);
    });

    // Add CSS
    const cssContent = `/* SITEFORGE IA Generated Stylesheet */
:root {
  --primary: ${project.designTokens.primaryColor};
  --secondary: ${project.designTokens.secondaryColor};
  --bg: ${project.designTokens.backgroundColor};
  --surface: ${project.designTokens.surfaceColor};
  --text: ${project.designTokens.textColor};
  --radius: ${project.designTokens.borderRadius};
}

* { box-sizing: border-box; }
body { margin: 0; background-color: var(--bg); color: var(--text); }
a { color: var(--primary); text-decoration: none; }
a:hover { text-decoration: underline; }
`;

    zip.folder('assets/css')?.file('styles.css', cssContent);

    // Add README
    zip.file('README.md', `# ${project.name}

Projeto gerado via **SITEFORGE IA — Professional Website Creation Studio**.

## Estrutura dos Arquivos

- \`index.html\`: Página Principal
- \`assets/css/styles.css\`: Estilos Globais
- Arquivos adicionais de páginas

## Como Publicar

1. Extraia os arquivos do ZIP.
2. Faça o upload direto para qualquer hospedagem (Netlify, Vercel, GitHub Pages, Hostinger, cPanel).
3. O site funcionará imediatamente sem necessidade de build ou backend.
`);

    return await zip.generateAsync({ type: 'blob' });
  }
}
