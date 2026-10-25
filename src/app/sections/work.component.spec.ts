import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkComponent } from './work.component';
import { WORK, WorkItem } from '../data/site.config';

describe('WorkComponent', () => {
  let fixture: ComponentFixture<WorkComponent>;
  const original = [...WORK];

  afterEach(() => WORK.splice(0, WORK.length, ...original));

  function render(): HTMLElement {
    fixture = TestBed.createComponent(WorkComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('filters items by category', () => {
    render();
    const c = fixture.componentInstance;
    c.filter.set('automation');
    expect(c.items().length).toBeGreaterThan(0);
    expect(c.items().every(w => w.category === 'automation')).toBeTrue();
    c.filter.set('all');
    expect(c.items().length).toBe(WORK.length);
  });

  it('renders demo and repo links only for safe URLs', () => {
    const base: Omit<WorkItem, 'demo' | 'repo'> = { category: 'systems', title: { en: 'T', ar: 'T' }, summary: { en: 'S', ar: 'S' }, tech: [] };
    WORK.splice(0, WORK.length,
      { ...base, demo: 'https://demo.example.com', repo: 'https://github.com/u/r' },
      { ...base, demo: 'javascript:alert(1)', repo: 'http://insecure.example.com' },
    );
    const el = render();
    const cards = el.querySelectorAll('article');
    expect(cards[0].querySelector<HTMLAnchorElement>('a.demo')!.getAttribute('href')).toBe('https://demo.example.com');
    expect(cards[0].querySelector<HTMLAnchorElement>('a.repo')!.rel).toContain('noreferrer');
    expect(cards[1].querySelector('a')).toBeNull();
  });
});
