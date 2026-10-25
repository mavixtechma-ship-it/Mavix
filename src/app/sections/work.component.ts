import { Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../shared/i18n.service';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { isSafeUrl } from '../shared/safe-url';
import { TECH, WORK, WorkCategory } from '../data/site.config';

type Filter = 'all' | WorkCategory;

@Component({
  selector: 'app-work',
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="work" class="section">
      <div class="container">
        <div class="head" appReveal>
          <h2 class="h2">{{ t().work.title }}</h2>
          <div class="filters" role="tablist">
            @for (f of filters; track f) {
              <button type="button" role="tab" [class.on]="filter() === f" [attr.aria-selected]="filter() === f" (click)="filter.set(f)">
                {{ t().work.filters[f] }}
              </button>
            }
          </div>
        </div>

        <div class="grid">
          @for (w of items(); track w; let i = $index) {
            <article class="item" [style.animation-delay.ms]="i * 80">
              <div class="shot" [attr.data-cat]="w.category">
                @if (w.image) {
                  <img [src]="w.image" [alt]="lang() === 'ar' ? w.title.ar : w.title.en" loading="lazy">
                } @else {
                  <div class="ph">
                    <span class="ph-ic"><app-icon [name]="w.category" [size]="34" [stroke]="1.5" /></span>
                    <small>{{ t().work.shot }}</small>
                  </div>
                }
                <span class="tag">{{ t().work.filters[w.category] }}</span>
              </div>
              <div class="body">
                <div class="tech" dir="ltr">{{ w.tech.join(' · ') }}</div>
                <h3>{{ lang() === 'ar' ? w.title.ar : w.title.en }}</h3>
                <p>{{ lang() === 'ar' ? w.summary.ar : w.summary.en }}</p>
                @if (safe(w.demo) || safe(w.repo)) {
                  <div class="actions">
                    @if (safe(w.demo)) {
                      <a class="act demo" [href]="w.demo" target="_blank" rel="noopener noreferrer">{{ t().work.demo }} <app-icon name="arrow" [size]="16" class="flip" /></a>
                    }
                    @if (safe(w.repo)) {
                      <a class="act repo" [href]="w.repo" target="_blank" rel="noopener noreferrer"><app-icon name="github" [size]="16" /> {{ t().work.code }}</a>
                    }
                  </div>
                }
              </div>
            </article>
          }
        </div>
      </div>

      <div class="tech-block">
        <div class="container"><div class="eyebrow" appReveal>{{ t().tech.title }}</div></div>
        <div class="marquee" dir="ltr">
          <div class="track">
            @for (x of loop; track $index) { <span class="pill">{{ x }}</span> }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .head { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-end; justify-content: space-between; margin-bottom: 44px; }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; padding: 6px; border-radius: 999px; background: var(--bg-soft); border: 1px solid var(--border); }
    .filters button { min-height: 44px; padding: 10px 20px; border: 0; border-radius: 999px; background: transparent; color: var(--muted); font: 500 15px var(--body); cursor: pointer; transition: background .3s, color .3s, box-shadow .3s; }
    .filters button:hover { color: var(--blue); }
    .filters button.on { background: var(--blue); color: #fff; box-shadow: 0 8px 20px -10px rgba(30,94,255,.8); }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
    @media (max-width: 420px) { .grid { grid-template-columns: 1fr; } }
    .item { border-radius: 22px; background: #fff; border: 1px solid var(--border); overflow: hidden; animation: enter .55s cubic-bezier(.2,.8,.2,1) both; transition: transform .35s, box-shadow .35s; }
    .item:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
    @keyframes enter { from { opacity: 0; transform: translateY(24px) scale(.97); } }
    .shot { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: var(--bg-soft); }
    .shot img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
    .item:hover .shot img { transform: scale(1.06); }
    .ph { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; align-items: center; justify-content: center; color: var(--muted); background-image: radial-gradient(rgba(30,94,255,.14) 1.2px, transparent 1.2px); background-size: 18px 18px; }
    .shot[data-cat='automation'] .ph { background-color: #eef9ff; }
    .shot[data-cat='graduation'] .ph { background-color: #f1f4ff; }
    .ph-ic { width: 76px; height: 76px; border-radius: 22px; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, var(--blue), var(--sky)); box-shadow: 0 14px 28px -14px rgba(30,94,255,.9); transition: transform .5s cubic-bezier(.3,1.6,.5,1); }
    .item:hover .ph-ic { transform: scale(1.1) rotate(6deg); }
    .ph small { font-size: 13px; }
    .tag { position: absolute; top: 14px; inset-inline-start: 14px; padding: 6px 12px; border-radius: 999px; background: rgba(255,255,255,.92); color: var(--blue-800); font-size: 13px; font-weight: 600; border: 1px solid var(--border); }
    .body { padding: 22px 24px 26px; display: flex; flex-direction: column; gap: 6px; }
    .tech { font: 500 13px 'Space Grotesk', sans-serif; color: var(--blue); text-align: start; }
    :host-context([dir='rtl']) .tech { text-align: end; }
    h3 { margin: 0; font: 700 21px var(--display); }
    p { margin: 0; color: var(--muted); }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
    .act { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 8px 16px; border-radius: 999px; font: 500 14.5px var(--body); text-decoration: none; transition: background .25s, color .25s, border-color .25s; }
    .demo { background: var(--blue); color: #fff; }
    .demo:hover { background: var(--blue-600); }
    .repo { border: 1px solid var(--border); color: var(--ink); background: #fff; }
    .repo:hover { border-color: var(--blue); color: var(--blue); }
    :host-context([dir='rtl']) .flip { transform: scaleX(-1); }

    .tech-block { margin-top: 96px; }
    .marquee { margin-top: 20px; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
    .track { display: flex; gap: 14px; width: max-content; padding: 10px 0; animation: scroll 38s linear infinite; }
    .marquee:hover .track { animation-play-state: paused; }
    @keyframes scroll { to { transform: translateX(-50%); } }
    .pill { padding: 14px 22px; border-radius: 14px; border: 1px solid var(--border); background: #fff; font: 500 16px 'Space Grotesk', sans-serif; white-space: nowrap; transition: border-color .25s, color .25s, background .25s; }
    .pill:hover { border-color: var(--blue); color: var(--blue); background: var(--bg-soft); }
  `],
})
export class WorkComponent {
  private i18n = inject(I18nService);
  t = this.i18n.t;
  lang = this.i18n.lang;
  filters: Filter[] = ['all', 'systems', 'automation', 'graduation'];
  filter = signal<Filter>('all');
  items = computed(() => this.filter() === 'all' ? WORK : WORK.filter(w => w.category === this.filter()));
  loop = [...TECH, ...TECH];
  safe = isSafeUrl;
}
