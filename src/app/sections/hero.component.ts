import { Component, HostListener, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { I18nService } from '../shared/i18n.service';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-hero',
  imports: [IconComponent],
  template: `
    <section id="top" class="hero">
      <div class="bg" aria-hidden="true">
        <span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>
        <div class="grid"></div>
      </div>

      <div class="container wrap">
        <div class="copy">
          <div class="badge"><span class="dot"></span>{{ t().hero.badge }}</div>
          <h1>
            {{ t().hero.titleA }}
            <span class="rotator">
              @for (w of [word()]; track w) { <span class="word">{{ w }}</span> }
            </span>
            <span class="tail">{{ t().hero.titleB }}</span>
          </h1>
          <p class="lead">{{ t().hero.lead }}</p>
          <div class="actions">
            <a href="#contact" class="btn btn-primary">{{ t().hero.primary }} <app-icon name="arrow" [size]="18" class="flip" /></a>
            <a href="#work" class="btn btn-outline">{{ t().hero.secondary }}</a>
          </div>
        </div>

        <div class="visual" aria-hidden="true" [style.transform]="'translate3d(' + px() + 'px,' + py() + 'px,0)'">
          <svg class="wires" viewBox="0 0 520 480" preserveAspectRatio="none">
            <path d="M120 150 C 260 150, 260 260, 380 270" />
            <path d="M380 270 C 300 330, 220 340, 160 400" />
          </svg>

          <div class="card c-dash">
            <div class="c-head"><app-icon name="chart" [size]="18" /> {{ t().hero.card1 }}</div>
            <div class="bars">
              @for (h of bars; track $index) { <span [style.--h]="h + '%'" [style.animation-delay.ms]="$index * 120"></span> }
            </div>
          </div>

          <div class="card c-wa">
            <span class="wa-ic"><app-icon name="whatsapp" [size]="20" /></span>
            <span>{{ t().hero.card2 }}</span>
            <span class="tick"><app-icon name="check" [size]="16" [stroke]="2.4" /></span>
          </div>

          <div class="card c-grad">
            <span class="g-ic"><app-icon name="graduation" [size]="22" /></span>
            <div class="g-body">
              <strong>{{ t().hero.card3 }}</strong>
              <span class="g-bar"><i></i></span>
            </div>
          </div>

          <span class="chip ch1">ASP.NET</span>
          <span class="chip ch2">Angular</span>
          <span class="chip ch3">SQL Server</span>
          <span class="chip ch4">n8n</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero { position: relative; min-height: 100vh; padding: 140px 0 96px; display: flex; align-items: center; overflow: hidden; background: linear-gradient(180deg, #f6f9ff 0%, #ffffff 100%); }
    .bg { position: absolute; inset: 0; pointer-events: none; }
    .blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .55; animation: drift 16s ease-in-out infinite; }
    .b1 { width: 520px; height: 520px; background: #bcd2ff; top: -140px; inset-inline-end: -120px; }
    .b2 { width: 380px; height: 380px; background: #c7ecff; bottom: -120px; inset-inline-start: -80px; animation-delay: -5s; }
    .b3 { width: 260px; height: 260px; background: #d9e4ff; top: 40%; left: 45%; animation-delay: -9s; }
    @keyframes drift { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(40px,-30px) scale(1.08); } 66% { transform: translate(-30px,30px) scale(.95); } }
    .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(30,94,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,255,.07) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse at 60% 40%, #000 20%, transparent 70%); animation: pan 30s linear infinite; }
    @keyframes pan { to { background-position: 48px 48px; } }

    .wrap { position: relative; display: grid; grid-template-columns: 1.1fr .9fr; gap: 48px; align-items: center; }
    @media (max-width: 1000px) { .wrap { grid-template-columns: 1fr; } .visual { max-width: 520px; margin: 0 auto; width: 100%; } }

    .badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 999px; background: #fff; border: 1px solid var(--border); color: var(--muted); font-size: 14px; box-shadow: 0 6px 20px -12px rgba(16,52,140,.3); animation: up .7s .05s both; }
    .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--blue); animation: ping 1.8s infinite; }
    @keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(30,94,255,.55); } 80%,100% { box-shadow: 0 0 0 10px rgba(30,94,255,0); } }

    h1 { margin: 26px 0 22px; font: 700 clamp(40px, 6.2vw, 84px)/1.04 var(--display); letter-spacing: -.03em; animation: up .8s .15s both; }
    :host-context([dir='rtl']) h1 { letter-spacing: 0; line-height: 1.25; }
    .rotator { display: block; position: relative; height: 1.12em; overflow: hidden; color: var(--blue); }
    :host-context([dir='rtl']) .rotator { height: 1.4em; }
    .word { display: block; white-space: nowrap; background: linear-gradient(90deg, var(--blue), var(--sky)); -webkit-background-clip: text; background-clip: text; color: transparent; animation: roll .6s cubic-bezier(.2,.8,.2,1) both; }
    @keyframes roll { from { transform: translateY(100%); opacity: 0; } to { transform: none; opacity: 1; } }
    .tail { display: block; }
    .lead { margin: 0 0 36px; max-width: 620px; font-size: 19px; color: var(--muted); animation: up .8s .3s both; }
    .actions { display: flex; flex-wrap: wrap; gap: 14px; animation: up .8s .45s both; }
    :host-context([dir='rtl']) .flip { transform: scaleX(-1); }
    @keyframes up { from { opacity: 0; transform: translateY(26px); } }

    .visual { position: relative; height: 480px; transition: transform .25s ease-out; animation: up 1s .3s both; }
    .wires { position: absolute; inset: 0; width: 100%; height: 100%; }
    .wires path { fill: none; stroke: var(--blue); stroke-width: 2; stroke-dasharray: 6 8; opacity: .45; animation: flow 1.2s linear infinite; }
    @keyframes flow { to { stroke-dashoffset: -28; } }

    .card { position: absolute; background: #fff; border: 1px solid var(--border); border-radius: 18px; box-shadow: var(--shadow); }
    .c-dash { top: 30px; inset-inline-start: 0; width: 280px; padding: 18px; animation: float 6s ease-in-out infinite; }
    .c-head { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; color: var(--ink); }
    .c-head app-icon { color: var(--blue); }
    .bars { display: flex; align-items: flex-end; gap: 10px; height: 110px; margin-top: 16px; padding-top: 8px; border-top: 1px dashed var(--border); }
    .bars span { flex: 1; height: var(--h); border-radius: 6px 6px 3px 3px; background: linear-gradient(180deg, var(--blue), #8fb0ff); transform-origin: bottom; animation: grow 2.8s ease-in-out infinite alternate; }
    .bars span:nth-child(even) { background: linear-gradient(180deg, var(--sky), #bfe8ff); }
    @keyframes grow { 0% { transform: scaleY(.35); } 100% { transform: scaleY(1); } }

    .c-wa { top: 230px; inset-inline-end: 0; display: flex; align-items: center; gap: 12px; padding: 14px 18px; max-width: 300px; font-size: 14px; font-weight: 500; animation: float 7s ease-in-out -2s infinite, pop 4s ease-in-out infinite; }
    .wa-ic { flex: none; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--wa); color: #fff; }
    .tick { flex: none; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--bg-tint); color: var(--blue); }
    @keyframes pop { 0%, 70%, 100% { box-shadow: var(--shadow); } 80% { box-shadow: 0 0 0 6px rgba(37,211,102,.18), var(--shadow); } }

    .c-grad { bottom: 20px; inset-inline-start: 40px; display: flex; align-items: center; gap: 14px; padding: 16px 18px; width: 300px; animation: float 6.5s ease-in-out -4s infinite; }
    .g-ic { flex: none; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--blue-800); color: #fff; }
    .g-body { flex: 1; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
    .g-bar { height: 6px; border-radius: 6px; background: var(--bg-tint); overflow: hidden; }
    .g-bar i { display: block; height: 100%; width: 0; background: linear-gradient(90deg, var(--blue), var(--sky)); border-radius: inherit; animation: load 3.5s ease-in-out infinite; }
    @keyframes load { 0% { width: 0; } 70%, 100% { width: 100%; } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }

    .chip { position: absolute; padding: 7px 14px; border-radius: 999px; font: 500 13px 'Space Grotesk', sans-serif; color: var(--blue-800); background: rgba(255,255,255,.9); border: 1px solid var(--border); box-shadow: 0 8px 20px -14px rgba(16,52,140,.4); animation: float 5s ease-in-out infinite; }
    .ch1 { top: 0; inset-inline-end: 60px; animation-delay: -1s; }
    .ch2 { top: 300px; inset-inline-start: 0; animation-delay: -2.5s; }
    .ch3 { top: 160px; inset-inline-end: 0; animation-delay: -3.5s; }
    .ch4 { bottom: 70px; inset-inline-end: 0; animation-delay: -.5s; }
    @media (max-width: 560px) {
      .visual { height: 440px; }
      .c-dash { width: 240px; } .c-wa { max-width: 250px; top: 220px; } .c-grad { width: 260px; inset-inline-start: 0; }
      .ch2 { display: none; }
    }
  `],
})
export class HeroComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  t = this.i18n.t;
  idx = signal(0);
  word = computed(() => { const r = this.t().hero.rotate; return r[this.idx() % r.length]; });
  bars = [45, 70, 55, 90, 65, 80, 100];
  px = signal(0);
  py = signal(0);
  private timer: any;

  ngOnInit(): void { this.timer = setInterval(() => this.idx.update(i => i + 1), 2600); }
  ngOnDestroy(): void { clearInterval(this.timer); }

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (innerWidth < 1000) return;
    this.px.set((e.clientX / innerWidth - .5) * -18);
    this.py.set((e.clientY / innerHeight - .5) * -18);
  }
}
