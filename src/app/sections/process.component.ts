import { Component, inject } from '@angular/core';
import { I18nService } from '../shared/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-process',
  imports: [RevealDirective],
  template: `
    <section id="process" class="section band">
      <div class="container">
        <h2 class="h2" appReveal>{{ t().process.title }}</h2>
        <ol class="steps" appReveal>
          <span class="line" aria-hidden="true"><i></i></span>
          @for (s of t().process.steps; track $index; let i = $index) {
            <li [style.--d]="(300 + i * 350) + 'ms'">
              <span class="circle">0{{ i + 1 }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: [`
    .band { background: linear-gradient(180deg, var(--bg-soft), #fff); border-block: 1px solid var(--border); }
    .steps { position: relative; list-style: none; margin: 64px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; }
    .line { position: absolute; top: 32px; inset-inline: 32px; height: 3px; border-radius: 3px; background: var(--border); overflow: hidden; }
    .line i { display: block; height: 100%; width: 0; background: linear-gradient(90deg, var(--blue), var(--sky)); transition: width 1.8s cubic-bezier(.4,0,.2,1) .3s; }
    :host-context([dir='rtl']) .line i { margin-inline-start: 0; background: linear-gradient(270deg, var(--blue), var(--sky)); }
    .steps.is-visible .line i { width: 100%; }
    li { position: relative; display: flex; flex-direction: column; gap: 10px; }
    .circle { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font: 700 20px 'Space Grotesk', sans-serif; background: #fff; color: var(--muted); border: 2px solid var(--border); transform: scale(.6); opacity: 0; transition: transform .6s cubic-bezier(.3,1.6,.5,1), opacity .4s, background .4s, color .4s, border-color .4s; transition-delay: var(--d); }
    .steps.is-visible .circle { transform: none; opacity: 1; background: var(--blue); color: #fff; border-color: var(--blue); box-shadow: 0 0 0 8px rgba(30,94,255,.12); }
    h3 { margin: 10px 0 0; font: 700 21px var(--display); }
    p { margin: 0; color: var(--muted); }
    li:hover .circle { animation: bob .6s ease; }
    @keyframes bob { 50% { transform: translateY(-6px); } }
    @media (max-width: 900px) {
      .steps { grid-template-columns: 1fr; gap: 36px; padding-inline-start: 88px; }
      .line { top: 0; bottom: 0; inset-inline-start: 31px; inset-inline-end: auto; width: 3px; height: auto; }
      .line i { width: 100% !important; height: 0; transition: height 1.8s cubic-bezier(.4,0,.2,1) .3s; background: linear-gradient(180deg, var(--blue), var(--sky)) !important; }
      .steps.is-visible .line i { height: 100%; }
      .circle { position: absolute; inset-inline-start: -88px; top: -8px; }
    }
  `],
})
export class ProcessComponent {
  t = inject(I18nService).t;
}
