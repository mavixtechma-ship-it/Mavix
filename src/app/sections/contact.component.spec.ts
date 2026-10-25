import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { CONTACT } from '../data/site.config';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let c: ContactComponent;
  const originalFormId = CONTACT.formspreeId;

  beforeEach(() => {
    localStorage.setItem('lang', 'en');
    fixture = TestBed.createComponent(ContactComponent);
    c = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    CONTACT.formspreeId = originalFormId;
    localStorage.removeItem('lang');
  });

  const fill = () => Object.assign(c.model, { name: ' Ali ', reach: '010', details: 'Need a system' });

  it('never renders the phone number as text, but links WhatsApp to it', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).not.toMatch(/1025970071/);
    expect(el.querySelector('a[href^="tel:"]')).toBeNull();
    const wa = el.querySelector<HTMLAnchorElement>('a.wa')!;
    expect(wa.getAttribute('href')).toBe('https://wa.me/201025970071');
    expect(wa.rel).toContain('noreferrer');
  });

  it('every external link uses noopener noreferrer', () => {
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a[target="_blank"]');
    links.forEach(a => expect(a.rel).withContext(a.href).toContain('noreferrer'));
  });

  it('shows an error when required fields are blank', async () => {
    const open = spyOn(c, 'openMail');
    c.model.name = '   ';
    await c.submit();
    expect(c.state()).toBe('error');
    expect(open).not.toHaveBeenCalled();
  });

  it('without Formspree opens a pre-filled email to the business address', async () => {
    CONTACT.formspreeId = '';
    const open = spyOn(c, 'openMail');
    fill();
    await c.submit();
    const url = open.calls.mostRecent().args[0];
    expect(url.startsWith(`mailto:${CONTACT.email}?subject=`)).toBeTrue();
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('subject')).toContain(c.t().services.items[0].title);
    expect(params.get('body')).toContain('Name: Ali\n');
    expect(c.state()).toBe('ok');
  });

  it('caps field lengths before sending', async () => {
    CONTACT.formspreeId = '';
    const open = spyOn(c, 'openMail');
    fill();
    c.model.details = 'x'.repeat(5000);
    await c.submit();
    const body = new URLSearchParams(open.calls.mostRecent().args[0].split('?')[1]).get('body')!;
    expect(body.length).toBeLessThan(2300);
  });

  it('drops submissions that fill the honeypot', async () => {
    const open = spyOn(c, 'openMail');
    const fetchSpy = spyOn(window, 'fetch');
    fill();
    c.model.gotcha = 'spam';
    await c.submit();
    expect(open).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(c.state()).toBe('ok');
  });

  it('with Formspree POSTs JSON and resets the form', async () => {
    CONTACT.formspreeId = 'abc123';
    const fetchSpy = spyOn(window, 'fetch').and.resolveTo(new Response('{}', { status: 200 }));
    fill();
    await c.submit();
    const [url, init] = fetchSpy.calls.mostRecent().args as [string, RequestInit];
    expect(url).toBe('https://formspree.io/f/abc123');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toEqual(jasmine.objectContaining({ name: 'Ali', contact: '010' }));
    expect(c.state()).toBe('ok');
    expect(c.model.name).toBe('');
  });

  it('with Formspree shows an error on failure', async () => {
    CONTACT.formspreeId = 'abc123';
    spyOn(window, 'fetch').and.resolveTo(new Response('', { status: 500 }));
    fill();
    await c.submit();
    expect(c.state()).toBe('error');
  });
});
