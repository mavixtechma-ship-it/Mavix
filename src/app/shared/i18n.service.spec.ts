import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';
import { AR, EN } from '../data/i18n';

describe('I18nService', () => {
  beforeEach(() => localStorage.removeItem('lang'));
  afterEach(() => localStorage.removeItem('lang'));

  function create(): I18nService {
    const s = TestBed.inject(I18nService);
    TestBed.tick();
    return s;
  }

  it('restores a saved language', () => {
    localStorage.setItem('lang', 'ar');
    const s = create();
    expect(s.lang()).toBe('ar');
    expect(s.t()).toBe(AR);
  });

  it('ignores invalid saved values', () => {
    localStorage.setItem('lang', '<script>');
    expect(['en', 'ar']).toContain(create().lang());
  });

  it('toggle switches dictionary, dir/lang attributes and persists', () => {
    localStorage.setItem('lang', 'en');
    const s = create();
    expect(s.t()).toBe(EN);

    s.toggle();
    TestBed.tick();
    expect(s.isAr()).toBeTrue();
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
    expect(localStorage.getItem('lang')).toBe('ar');

    s.toggle();
    TestBed.tick();
    expect(document.documentElement.dir).toBe('ltr');
    expect(localStorage.getItem('lang')).toBe('en');
  });
});
