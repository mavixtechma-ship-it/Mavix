import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../shared/i18n.service';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { LogoComponent } from '../shared/logo.component';
import { isSafeUrl } from '../shared/safe-url';
import { CONTACT } from '../data/site.config';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, IconComponent, RevealDirective, LogoComponent],
  template: `
    <section id="contact" class="section">
      <div class="container">
        <div class="panel" appReveal>
          <span class="orb o1" aria-hidden="true"></span><span class="orb o2" aria-hidden="true"></span>

          <div class="info">
            <h2 class="h2">{{ t().contact.title }}</h2>
            <p class="lead">{{ t().contact.lead }}</p>
            <a [href]="waLink()" target="_blank" rel="noopener noreferrer" class="btn wa">
              <app-icon name="whatsapp" [size]="20" /> {{ t().contact.whatsapp }}
            </a>
            <div class="lines">
              <a [href]="'mailto:' + c.email"><app-icon name="mail" [size]="18" /> <span dir="ltr">{{ c.email }}</span></a>
            </div>
            <div class="socials">
              @for (s of socials; track s.key) {
                <a [href]="s.url" target="_blank" rel="noopener noreferrer" [attr.aria-label]="s.key"><app-icon [name]="s.key" [size]="19" /></a>
              }
            </div>
          </div>

          <form class="form" (ngSubmit)="submit()" novalidate>
            <label>{{ t().contact.form.name }}
              <input name="name" [(ngModel)]="model.name" [placeholder]="t().contact.form.namePh" required autocomplete="name" [maxlength]="limits.name">
            </label>
            <label>{{ t().contact.form.reach }}
              <input name="reach" [(ngModel)]="model.reach" [placeholder]="t().contact.form.reachPh" required [maxlength]="limits.reach">
            </label>
            <label>{{ t().contact.form.service }}
              <select name="service" [(ngModel)]="model.service">
                @for (s of t().services.items; track $index) { <option [value]="$index">{{ s.title }}</option> }
              </select>
            </label>
            <label>{{ t().contact.form.details }}
              <textarea name="details" rows="4" [(ngModel)]="model.details" [placeholder]="t().contact.form.detailsPh" required [maxlength]="limits.details"></textarea>
            </label>
            <!-- honeypot: hidden from people, bots fill it -->
            <input class="hp" name="_gotcha" [(ngModel)]="model.gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">

            <button type="submit" class="btn btn-primary send" [disabled]="state() === 'sending'">
              {{ state() === 'sending' ? t().contact.form.sending : t().contact.form.send }}
            </button>
            @if (msg()) { <p class="msg" [class.err]="state() === 'error'" role="status">{{ msg() }}</p> }
          </form>
        </div>
      </div>
    </section>

    <footer>
      <div class="container foot">
        <span class="brand"><app-logo [size]="30" /> <span>© {{ year }} {{ c.brand }}</span></span>
        <span>{{ t().footer.tagline }}</span>
      </div>
    </footer>
  `,
  styles: [`
    .panel { position: relative; overflow: hidden; isolation: isolate; display: flex; flex-wrap: wrap; gap: 48px; padding: clamp(28px, 5vw, 64px); border-radius: 32px; color: #fff; background: linear-gradient(135deg, var(--blue-800) 0%, var(--blue) 60%, #3d8bff 100%); background-size: 200% 200%; animation: hue 12s ease infinite; }
    @keyframes hue { 50% { background-position: 100% 100%; } }
    .orb { position: absolute; z-index: -1; border-radius: 50%; border: 1px solid rgba(255,255,255,.18); animation: orbit 14s linear infinite; }
    .o1 { width: 420px; height: 420px; top: -180px; inset-inline-end: -120px; }
    .o2 { width: 260px; height: 260px; bottom: -120px; inset-inline-start: 30%; animation-duration: 10s; animation-direction: reverse; }
    .orb::after { content: ''; position: absolute; top: -5px; left: 50%; width: 10px; height: 10px; border-radius: 50%; background: #bfe8ff; box-shadow: 0 0 14px #bfe8ff; }
    @keyframes orbit { to { transform: rotate(360deg); } }

    .info { flex: 1 1 380px; display: flex; flex-direction: column; gap: 22px; }
    .h2 { margin: 0; color: #fff; }
    .lead { margin: 0; font-size: 18px; color: #dbe7ff; }
    .wa { align-self: flex-start; background: var(--wa); color: #06331a; font-weight: 600; box-shadow: 0 12px 26px -12px rgba(0,0,0,.45); }
    .wa:hover { background: #2fe174; }
    .lines { display: flex; flex-direction: column; gap: 12px; }
    .lines a { display: inline-flex; align-items: center; gap: 10px; color: #fff; text-decoration: none; opacity: .92; }
    .lines a:hover { opacity: 1; text-decoration: underline; }
    .socials { display: flex; gap: 10px; }
    .socials a { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; border: 1px solid rgba(255,255,255,.35); transition: background .25s, color .25s, transform .25s; }
    .socials a:hover { background: #fff; color: var(--blue); transform: translateY(-3px); }

    .form { flex: 1 1 400px; display: flex; flex-direction: column; gap: 16px; padding: 28px; border-radius: 24px; background: #fff; color: var(--ink); box-shadow: 0 30px 60px -30px rgba(5,20,70,.6); }
    label { display: flex; flex-direction: column; gap: 8px; font-size: 14px; font-weight: 600; color: var(--muted); }
    input, select, textarea { font: 400 16px var(--body); color: var(--ink); padding: 14px 16px; border-radius: 14px; border: 1px solid var(--border); background: var(--bg-soft); transition: border-color .2s, box-shadow .2s, background .2s; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--blue); background: #fff; box-shadow: 0 0 0 4px rgba(30,94,255,.14); }
    textarea { resize: vertical; }
    .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
    .send { width: 100%; }
    .send[disabled] { opacity: .7; cursor: progress; }
    .msg { margin: 0; color: #0d7a3f; font-weight: 500; }
    .msg.err { color: #b42318; }

    footer { border-top: 1px solid var(--border); margin-top: 0; }
    .brand { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .foot { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; padding-block: 28px; color: var(--muted); font-size: 14px; }
  `],
})
export class ContactComponent {
  t = inject(I18nService).t;
  c = CONTACT;
  socials = CONTACT.socials.filter(s => isSafeUrl(s.url));
  year = new Date().getFullYear();
  readonly limits = { name: 100, reach: 150, details: 2000 };
  model = { name: '', reach: '', service: '0', details: '', gotcha: '' };
  state = signal<'idle' | 'sending' | 'ok' | 'error'>('idle');
  msg = signal('');

  waLink(text = ''): string {
    return `https://wa.me/${this.c.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;
  }

  // mailto hands off to the mail app without leaving the page (window.open can leave a blank tab).
  openMail(url: string): void {
    window.location.href = url;
  }

  async submit(): Promise<void> {
    const f = this.t().contact.form;
    // Client-side checks are UX only — trim and cap lengths before sending anywhere.
    const name = this.model.name.trim().slice(0, this.limits.name);
    const reach = this.model.reach.trim().slice(0, this.limits.reach);
    const details = this.model.details.trim().slice(0, this.limits.details);
    if (!name || !reach || !details) {
      this.state.set('error'); this.msg.set(f.required); return;
    }
    // Honeypot filled → bot. Pretend success, send nothing.
    if (this.model.gotcha) {
      this.state.set('ok'); this.msg.set(f.ok); return;
    }
    const service = this.t().services.items[+this.model.service]?.title ?? '';
    const text = `${f.name}: ${name}\n${f.reach}: ${reach}\n${f.service}: ${service}\n${f.details}: ${details}`;

    // No Formspree → open the visitor's email app, addressed to us and pre-filled
    if (!this.c.formspreeId) {
      const subject = `${f.subject} — ${service}`;
      this.openMail(`mailto:${this.c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`);
      this.state.set('ok'); this.msg.set(f.mailOk); return;
    }

    this.state.set('sending'); this.msg.set('');
    try {
      const res = await fetch(`https://formspree.io/f/${encodeURIComponent(this.c.formspreeId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, contact: reach, service, message: details }),
      });
      if (!res.ok) throw new Error(String(res.status));
      this.state.set('ok'); this.msg.set(f.ok);
      this.model = { name: '', reach: '', service: '0', details: '', gotcha: '' };
    } catch {
      this.state.set('error'); this.msg.set(f.err);
    }
  }
}
