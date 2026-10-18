// ============================================================
//  TRANSLATIONS — English / Arabic. Keep both objects same shape.
// ============================================================

export const EN = {
  nav: { services: 'Services', process: 'Process', work: 'Work', contact: 'Contact', cta: 'Start a project', lang: 'عربي' },
  hero: {
    badge: 'Available for new projects',
    titleA: 'I build systems that',
    rotate: ['run your business', 'save your time', 'automate your work', 'grow with you'],
    titleB: '— and automate the rest.',
    lead: 'Full-stack developer (ASP.NET · C# · Angular · SQL Server). Custom business systems, workflow automation, and complete graduation projects — delivered with source code and documentation.',
    primary: 'Get a free quote',
    secondary: 'See my work',
    card1: 'Orders today', card2: 'Report sent to WhatsApp', card3: 'Graduation project ready',
  },
  services: {
    eyebrow: 'What I build',
    title: 'Three ways I can help',
    items: [
      { title: 'Business Systems', text: 'ERP modules, CRM, inventory, HR, sales tracking and admin dashboards — web apps on ASP.NET + SQL Server with Angular front-ends.', points: ['Role-based admin portals', 'Reports & dashboards', 'API integrations'] },
      { title: 'Workflow Automation', text: 'Stop repeating manual work. Connect your tools so orders, leads, reports and notifications move on their own.', points: ['n8n / WhatsApp / email flows', 'Scheduled reports', 'AI assistants & bots'] },
      { title: 'Graduation Projects', text: 'Complete web projects for students: working system, database, documentation and presentation support.', points: ['Full source code', 'Documentation & diagrams', 'Discussion preparation'] },
    ],
    more: 'Ask about this',
  },
  process: {
    title: 'How we work together',
    steps: [
      { title: 'Discuss', text: 'Message me on WhatsApp. We define what you need.' },
      { title: 'Plan & quote', text: 'Clear scope, timeline and fixed price before any work.' },
      { title: 'Build', text: 'Weekly demos so you see progress early.' },
      { title: 'Deliver & support', text: 'Deployment, handover and support after launch.' },
    ],
  },
  work: {
    title: 'Selected work',
    filters: { all: 'All', systems: 'Systems', automation: 'Automation', graduation: 'Graduation' },
    shot: 'Project screenshot',
  },
  tech: { title: 'Tech I use' },
  contact: {
    title: 'Have an idea? Let’s build it.',
    lead: 'Fastest reply on WhatsApp. Free consultation and quote.',
    whatsapp: 'Chat on WhatsApp',
    form: {
      name: 'Name', namePh: 'Your name',
      reach: 'WhatsApp / Email', reachPh: 'How can I reach you?',
      service: 'Service',
      details: 'Project details', detailsPh: 'Tell me about your idea',
      send: 'Send message', sending: 'Sending…',
      ok: 'Thanks! I’ll reply soon.', err: 'Something went wrong. Please use WhatsApp.',
      required: 'Please fill name, contact and details.',
    },
  },
  footer: { tagline: 'Systems · Automation · Graduation Projects' },
};

export type Dict = typeof EN;

export const AR: Dict = {
  nav: { services: 'الخدمات', process: 'طريقة العمل', work: 'أعمالي', contact: 'تواصل', cta: 'ابدأ مشروعك', lang: 'EN' },
  hero: {
    badge: 'متاح لمشاريع جديدة',
    titleA: 'أبني أنظمة',
    rotate: ['تدير شغلك', 'توفر وقتك', 'تؤتمت مهامك', 'تكبر معاك'],
    titleB: '— وأؤتمت الباقي.',
    lead: 'مطوّر Full-Stack (ASP.NET · C# · Angular · SQL Server). أنظمة مخصصة للشركات، أتمتة سير العمل، ومشاريع تخرج كاملة — مع الكود المصدري والتوثيق.',
    primary: 'اطلب عرض سعر مجاني',
    secondary: 'شاهد أعمالي',
    card1: 'طلبات اليوم', card2: 'تم إرسال التقرير على واتساب', card3: 'مشروع التخرج جاهز',
  },
  services: {
    eyebrow: 'ماذا أقدّم',
    title: 'ثلاث طرق أساعدك بها',
    items: [
      { title: 'أنظمة الشركات', text: 'وحدات ERP، إدارة عملاء CRM، مخازن، موارد بشرية، متابعة مبيعات ولوحات تحكم — على ASP.NET و SQL Server وواجهات Angular.', points: ['لوحات تحكم بصلاحيات', 'تقارير وإحصائيات', 'ربط مع أنظمة أخرى'] },
      { title: 'أتمتة سير العمل', text: 'وقف تكرار الشغل اليدوي. اربط أدواتك عشان الطلبات والعملاء والتقارير والإشعارات تتحرك لوحدها.', points: ['n8n / واتساب / إيميل', 'تقارير مجدولة', 'مساعدات وبوتات ذكية'] },
      { title: 'مشاريع التخرج', text: 'مشاريع ويب كاملة للطلاب: نظام شغال، قاعدة بيانات، توثيق، ومساعدة في التحضير للمناقشة.', points: ['الكود المصدري كامل', 'توثيق ومخططات', 'تحضير للمناقشة'] },
    ],
    more: 'اسأل عن الخدمة',
  },
  process: {
    title: 'إزاي نشتغل مع بعض',
    steps: [
      { title: 'نتكلم', text: 'ابعتلي على واتساب ونحدد احتياجك.' },
      { title: 'خطة وسعر', text: 'نطاق واضح، مدة محددة، وسعر ثابت قبل البدء.' },
      { title: 'التنفيذ', text: 'عرض أسبوعي عشان تشوف التقدم بدري.' },
      { title: 'التسليم والدعم', text: 'رفع على السيرفر، تسليم، ودعم بعد الإطلاق.' },
    ],
  },
  work: {
    title: 'نماذج من أعمالي',
    filters: { all: 'الكل', systems: 'أنظمة', automation: 'أتمتة', graduation: 'تخرج' },
    shot: 'صورة المشروع',
  },
  tech: { title: 'التقنيات اللي بستخدمها' },
  contact: {
    title: 'عندك فكرة؟ يلا ننفذها.',
    lead: 'أسرع رد على واتساب. استشارة وعرض سعر مجاناً.',
    whatsapp: 'كلمني على واتساب',
    form: {
      name: 'الاسم', namePh: 'اسمك',
      reach: 'واتساب / إيميل', reachPh: 'أتواصل معاك إزاي؟',
      service: 'الخدمة',
      details: 'تفاصيل المشروع', detailsPh: 'احكيلي عن فكرتك',
      send: 'إرسال', sending: 'جاري الإرسال…',
      ok: 'شكراً! هرد عليك قريب.', err: 'حصل خطأ. تواصل على واتساب.',
      required: 'من فضلك اكتب الاسم ووسيلة التواصل والتفاصيل.',
    },
  },
  footer: { tagline: 'أنظمة · أتمتة · مشاريع تخرج' },
};
