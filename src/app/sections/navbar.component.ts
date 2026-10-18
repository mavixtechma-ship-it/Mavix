import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../shared/i18n.service';
import { IconComponent } from '../shared/icon.component';
import { LogoComponent } from '../shared/logo.component';
import { CONTACT } from '../data/site.config';

@Component({
  selector: 'app-navbar',
  imports: [IconComponent, LogoComponent],
  template: `
    <div class="progress" [style.transform]="'scaleX(' + progress() + ')'"></div>
    <header class="nav" [class.scrolled]="scrolled()">
      <div class="container inner">
        <a href="#top" class="logo" (click)="open.set(false)" [attr.aria-label]="c.brand"><app-logo [size]="38" [animate]="true" /></a>

        <nav class="links" [class.open]="open()" aria-label="Main">
          @for (l of links; track l) {
            <a [href]="'#' + l" [class.active]="active() === l" (click)="open.set(false)">{{ $any(i18n.t().nav)[l] }}</a>
          }
          <button type="button" class="lang" (click)="i18n.toggle()" [attr.aria-label]="i18n.isAr() ? 'Switch to English' : 'التبديل إلى العربية'">
            <app-icon name="globe" [size]="18" /> {{ i18n.t().nav.lang }}
          </button>
          <a href="#contact" class="btn btn-primary cta" (click)="open.set(false)">{{ i18n.t().nav.cta }}</a>
        </nav>

        <button type="button" class="burger" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-label="Menu">
          <app-icon [name]="open() ? 'close' : 'menu'" [size]="24" />
        </button>
      </div>
    </header>
  `,
  styles: [`
    .progress { position: fixed; inset: 0 0 auto 0; height: 3px; z-index: 101; background: linear-gradient(90deg, var(--blue), var(--sky)); transform-origin: left; }
    :host-context([dir='rtl']) .progress { transform-origin: right; }
    .nav { position: fixed; inset: 0 0 auto 0; z-index: 100; transition: background .3s, box-shadow .3s; }
    .nav.scrolled { background: rgba(255,255,255,.82); backdrop-filter: blur(14px); box-shadow: 0 1px 0 var(--border), 0 10px 30px -20px rgba(16,52,140,.25); }
    .inner { height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .logo { text-decoration: none; display: inline-flex; }
    .links { display: flex; align-items: center; gap: 4px; }
    .links > a:not(.btn) { position: relative; color: var(--muted); text-decoration: none; padding: 10px 14px; font-size: 15.5px; transition: color .2s; }
    .links > a:not(.btn)::after { content: ''; position: absolute; left: 14px; right: 14px; bottom: 4px; height: 2px; border-radius: 2px; background: var(--blue); transform: scaleX(0); transition: transform .3s ease; }
    .links > a:not(.btn):hover, .links > a.active { color: var(--ink); }
    .links > a.active::after, .links > a:not(.btn):hover::after { transform: scaleX(1); }
    .lang { display: inline-flex; align-items: center; gap: 6px; margin-inline: 8px; min-height: 42px; padding: 8px 14px; border-radius: 999px; border: 1px solid var(--border); background: #fff; color: var(--ink); font: 500 15px var(--body); cursor: pointer; transition: border-color .2s, color .2s; }
    .lang:hover { border-color: var(--blue); color: var(--blue); }
    .cta { min-height: 44px; padding: 10px 22px; font-size: 15.5px; }
    .burger { display: none; width: 46px; height: 46px; border-radius: 12px; border: 1px solid var(--border); background: #fff; color: var(--ink); align-items: center; justify-content: center; cursor: pointer; }
    @media (max-width: 920px) {
      .burger { display: inline-flex; }
      .links { position: fixed; top: 76px; inset-inline: 0; flex-direction: column; align-items: stretch; gap: 4px; padding: 16px 24px 28px; background: #fff; box-shadow: 0 20px 40px -20px rgba(16,52,140,.3); opacity: 0; visibility: hidden; transform: translateY(-12px); transition: opacity .3s, transform .3s, visibility .3s; }
      .links.open { opacity: 1; visibility: visible; transform: none; }
      .links > a:not(.btn) { padding: 14px; }
      .lang { margin: 8px 0; justify-content: center; }
    }
  `],
})
export class NavbarComponent {
  i18n = inject(I18nService);
  c = CONTACT;
  links = ['services', 'process', 'work', 'contact'];
  scrolled = signal(false);
  open = signal(false);
  active = signal('');
  progress = signal(0);

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 10);
    const h = document.documentElement.scrollHeight - innerHeight;
    this.progress.set(h > 0 ? y / h : 0);
    let cur = '';
    for (const id of this.links) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) cur = id;
    }
    this.active.set(cur);
  }
}
