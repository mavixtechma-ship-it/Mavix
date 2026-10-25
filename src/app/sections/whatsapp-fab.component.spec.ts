import { TestBed } from '@angular/core/testing';
import { WhatsappFabComponent } from './whatsapp-fab.component';

describe('WhatsappFabComponent', () => {
  it('links to the WhatsApp number without showing it', () => {
    const fixture = TestBed.createComponent(WhatsappFabComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const a = el.querySelector('a')!;
    expect(a.getAttribute('href')).toBe('https://wa.me/201025970071');
    expect(a.rel).toContain('noopener');
    expect(a.rel).toContain('noreferrer');
    expect(el.textContent).not.toMatch(/1025970071/);
  });
});
