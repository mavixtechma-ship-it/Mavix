// ============================================================
//  SITE CONFIG — contact info, links, projects (edit here)
// ============================================================

export const CONTACT = {
  brand: 'Mavix Tech',
  name: 'Marwan Ahmed',
  email: 'mavixtechma@gmail.com',
  // Used only inside wa.me links — never rendered as visible text.
  whatsapp: '201025970071',            // digits only, country code first
  // Contact form → Formspree (free). Create a form at formspree.io and paste its ID (e.g. 'xyzabcd').
  // Empty → the form opens WhatsApp with the message pre-filled.
  formspreeId: '',
  socials: [
    { key: 'facebook',  url: 'https://www.facebook.com/people/Mavix/61595159147334/' },
    { key: 'instagram', url: 'https://www.instagram.com/mavixtech.eg/' },
    { key: 'github',    url: 'https://github.com/mavixtechma-ship-it' },
  ],
};

export type WorkCategory = 'systems' | 'automation' | 'graduation';

export interface WorkItem {
  category: WorkCategory;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  tech: string[];
  image?: string;        // 'work/file.png' inside /public/work/
  demo?: string;         // live deployed URL (https only)
  repo?: string;         // GitHub repository URL (https only)
}

export const WORK: WorkItem[] = [
  {
    category: 'systems',
    title: { en: 'FieldPulse', ar: 'FieldPulse' },
    summary: { en: 'Shift check-ins with geofencing and photo proof, supervisor visits and in-store sales for every branch.', ar: 'تسجيل حضور الورديات بالموقع الجغرافي وصورة إثبات، وزيارات المشرفين ومبيعات الفروع في مكان واحد.' },
    tech: ['Angular', 'TypeScript'],
    image: 'work/ushers-tracking.png',
    demo: 'https://mavixtechma-ship-it.github.io/Ushers_Tracking/login',
  },
  {
    category: 'systems',
    title: { en: 'RouteWise', ar: 'RouteWise' },
    summary: { en: 'Weekly journey plans for field supervisors, market coverage and KPI task tracking.', ar: 'خطط زيارات أسبوعية للمشرفين الميدانيين، وتغطية السوق ومتابعة مؤشرات الأداء.' },
    tech: ['JavaScript', 'Tailwind CSS'],
    image: 'work/routewise.png',
    demo: 'https://mavixtechma-ship-it.github.io/Saytra_Supervisor/login.html',
  },
  {
    category: 'systems',
    title: { en: 'PresenceHub', ar: 'PresenceHub' },
    summary: { en: 'Attendance for hybrid teams — an admin console plus a self-service view for every employee.', ar: 'نظام حضور للفرق الهجينة — لوحة تحكم للإدارة وصفحة خدمة ذاتية لكل موظف.' },
    tech: ['JavaScript', 'Tailwind CSS'],
    image: 'work/presencehub.png',
    demo: 'https://mavixtechma-ship-it.github.io/Remote_Work_tracker/login.html?next=index.html&reason=signin',
  },
  {
    category: 'automation',
    title: { en: 'AgriSense', ar: 'AgriSense' },
    summary: { en: 'Smart-farm console: soil, irrigation and solar sensors, instant alerts and remote pump control.', ar: 'منصة مزرعة ذكية: حساسات التربة والري والطاقة الشمسية، تنبيهات فورية وتحكم في المضخات عن بُعد.' },
    tech: ['Angular', 'TypeScript'],
    image: 'work/agrisense.png',
    demo: 'https://mavixtechma-ship-it.github.io/AgricultureProject/',
  },
  {
    category: 'graduation',
    title: { en: 'Loomline Store', ar: 'متجر Loomline' },
    summary: { en: 'Menswear e-commerce store with categories, search, wishlist and cart.', ar: 'متجر إلكتروني لملابس رجالي بالأقسام والبحث وقائمة المفضلة وسلة المشتريات.' },
    tech: ['Angular', 'TypeScript'],
    image: 'work/e-clothes-shop.png',
    demo: 'https://mavixtechma-ship-it.github.io/E-Clothes_Shop/',
  },
];

export const TECH = [
  'C# / ASP.NET', 'Angular', 'SQL Server', 'JavaScript', 'TypeScript', 'n8n',
  'WhatsApp API', 'REST APIs', 'IIS / Windows Server', 'AI / LLM APIs', 'Git',
];
