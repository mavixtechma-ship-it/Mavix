import { Injectable, computed, effect, signal } from '@angular/core';
import { AR, EN } from '../data/i18n';

export type Lang = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.initial());
  readonly t = computed(() => (this.lang() === 'ar' ? AR : EN));
  readonly isAr = computed(() => this.lang() === 'ar');

  constructor() {
    effect(() => {
      const l = this.lang();
      document.documentElement.lang = l;
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
      try { localStorage.setItem('lang', l); } catch { /* ignore */ }
    });
  }

  toggle(): void {
    this.lang.set(this.lang() === 'ar' ? 'en' : 'ar');
  }

  private initial(): Lang {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch { /* ignore */ }
    return navigator.language?.startsWith('ar') ? 'ar' : 'en';
  }
}
