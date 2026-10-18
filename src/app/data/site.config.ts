// ============================================================
//  SITE CONFIG — contact info, links, projects (edit here)
// ============================================================

export const CONTACT = {
  brand: 'Mavix Tech',
  name: 'Marwan Ahmed',
  email: 'you@example.com',            // TODO
  phone: '+20 000 000 0000',           // TODO (display)
  whatsapp: '200000000000',            // TODO digits only, country code first
  // Contact form → Formspree (free). Create a form at formspree.io and paste its ID (e.g. 'xyzabcd').
  // Empty → the form opens WhatsApp with the message pre-filled.
  formspreeId: '',
  socials: [
    { key: 'facebook',  url: 'https://facebook.com/' },        // TODO
    { key: 'linkedin',  url: 'https://www.linkedin.com/' },    // TODO
    { key: 'instagram', url: 'https://instagram.com/' },       // TODO
    { key: 'github',    url: 'https://github.com/' },          // TODO
  ],
};

export type WorkCategory = 'systems' | 'automation' | 'graduation';

export interface WorkItem {
  category: WorkCategory;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  tech: string[];
  image?: string;        // '/work/file.png' inside /public/work/
  url?: string;
}

// TODO: replace with real client work
export const WORK: WorkItem[] = [
  {
    category: 'systems',
    title: { en: '[PROJECT NAME]', ar: '[اسم المشروع]' },
    summary: { en: 'Inventory & sales system for a distribution company.', ar: 'نظام مخازن ومبيعات لشركة توزيع.' },
    tech: ['ASP.NET', 'Angular', 'SQL Server'],
  },
  {
    category: 'automation',
    title: { en: '[PROJECT NAME]', ar: '[اسم المشروع]' },
    summary: { en: 'Daily sales report sent automatically to WhatsApp.', ar: 'تقرير مبيعات يومي يُرسل تلقائياً على واتساب.' },
    tech: ['n8n', 'WhatsApp API', 'SQL Server'],
  },
  {
    category: 'graduation',
    title: { en: '[PROJECT NAME]', ar: '[اسم المشروع]' },
    summary: { en: 'Clinic management system with full documentation.', ar: 'نظام إدارة عيادة مع توثيق كامل.' },
    tech: ['ASP.NET MVC', 'SQL Server', 'Bootstrap'],
  },
  {
    category: 'systems',
    title: { en: '[PROJECT NAME]', ar: '[اسم المشروع]' },
    summary: { en: 'HR & attendance portal with role-based access.', ar: 'بوابة موارد بشرية وحضور بصلاحيات.' },
    tech: ['ASP.NET Core', 'Angular'],
  },
  {
    category: 'automation',
    title: { en: '[PROJECT NAME]', ar: '[اسم المشروع]' },
    summary: { en: 'AI assistant bot that answers customers 24/7.', ar: 'بوت ذكاء اصطناعي يرد على العملاء طوال اليوم.' },
    tech: ['C#', 'Telegram', 'LLM API'],
  },
  {
    category: 'graduation',
    title: { en: '[PROJECT NAME]', ar: '[اسم المشروع]' },
    summary: { en: 'E-commerce store with admin dashboard.', ar: 'متجر إلكتروني مع لوحة تحكم.' },
    tech: ['Angular', 'ASP.NET API', 'SQL Server'],
  },
];

export const TECH = [
  'C# / ASP.NET', 'Angular', 'SQL Server', 'JavaScript', 'TypeScript', 'n8n',
  'WhatsApp API', 'REST APIs', 'IIS / Windows Server', 'AI / LLM APIs', 'Git',
];
