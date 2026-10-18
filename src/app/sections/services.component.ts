import { Component, inject } from '@angular/core';
import { I18nService } from '../shared/i18n.service';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="services" class="section">
      <div class="container">
        <div class="head" appReveal>
          <div class="eyebrow">{{ t().services.eyebrow }}</div>
          <h2 class="h2">{{ t().services.title }}</h2>
        </div>
        <div class="grid">
          @for (s of t().services.items; track $index; let i = $index) {
            <article class="card" appReveal [revealDelay]="i * 140">
              <div class="top">
                <span class="icon"><app-icon [name]="icons[i]" [size]="30" [stroke]="1.6" /></span>
                <span class="num">0{{ i + 1 }}</span>
              </div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
              <ul>
                @for (p of s.points; track p) {
                  <li><span class="ck"><app-icon name="check" [size]="14" [stroke]="2.6" /></span>{{ p }}</li>
                }
              </ul>
              <a href="#contact" class="more">{{ t().services.more }} <app-icon name="arrow" [size]="16" class="flip" /></a>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .head { margin-bottom: 56px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
    @media (max-width: 980px) { .grid { grid-template-columns: 1fr; max-width: 560px; } }

    .card { position: relative; padding: 36px; border-radius: 24px; background: #fff; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 16px; transition: transform .35s ease, box-shadow .35s ease, border-color .35s; isolation: isolate; overflow: hidden; }
    /* rotating gradient border on hover */
    .card::before { content: ''; position: absolute; inset: -2px; z-index: -2; border-radius: inherit; background: conic-gradient(from var(--a, 0deg), var(--blue), var(--sky), #ffffff, var(--blue)); opacity: 0; transition: opacity .35s; animation: spin 4s linear infinite; }
    .card::after { content: ''; position: absolute; inset: 2px; z-index: -1; border-radius: 22px; background: #fff; }
    .card:hover { transform: translateY(-8px); box-shadow: var(--shadow); border-color: transparent; }
    .card:hover::before { opacity: 1; }
    @property --a { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
    @keyframes spin { to { --a: 360deg; } }

    .top { display: flex; justify-content: space-between; align-items: flex-start; }
    .icon { width: 64px; height: 64px; border-radius: 18px; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, var(--blue), var(--sky)); box-shadow: 0 12px 24px -12px rgba(30,94,255,.8); transition: transform .5s cubic-bezier(.3,1.6,.5,1); }
    .card:hover .icon { transform: rotate(-8deg) scale(1.08); }
    .num { font: 700 44px 'Space Grotesk', sans-serif; color: var(--bg-tint); line-height: 1; transition: color .35s; }
    .card:hover .num { color: #c9d9ff; }
    h3 { margin: 8px 0 0; font: 700 26px var(--display); }
    p { margin: 0; color: var(--muted); }
    ul { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    li { display: flex; align-items: center; gap: 10px; font-size: 15.5px; }
    .ck { flex: none; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--bg-tint); color: var(--blue); }
    .more { margin-top: auto; padding-top: 8px; display: inline-flex; align-items: center; gap: 8px; font-weight: 600; text-decoration: none; }
    .more app-icon { transition: transform .3s; }
    .card:hover .more app-icon { transform: translateX(4px); }
    :host-context([dir='rtl']) .flip { transform: scaleX(-1); }
    :host-context([dir='rtl']) .card:hover .more app-icon { transform: scaleX(-1) translateX(4px); }
  `],
})
export class ServicesComponent {
  t = inject(I18nService).t;
  icons = ['systems', 'automation', 'graduation'];
}
