import { Component, Input } from '@angular/core';

/**
 * Mavix Tech logo (Flow M). Static files in /public/brand/.
 * tone: 'color' (on white) | 'light' (on blue / navy)
 */
@Component({
  selector: 'app-logo',
  template: `
    <span class="logo" [class.light]="tone === 'light'" [class.anim]="animate" dir="ltr" [style.--s]="size + 'px'">
        <svg class="mark flow" viewBox="0 0 64 64" aria-hidden="true">
          <defs><linearGradient id="mxg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1E5EFF"/><stop offset="1" stop-color="#38BDF8"/></linearGradient></defs>
          <path class="line" pathLength="100" d="M12 50 V16 L32 38 L52 16 V50" fill="none" [attr.stroke]="tone === 'light' ? '#FFFFFF' : 'url(#mxg)'" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          <circle class="n n1" cx="12" cy="50" r="6" [attr.fill]="tone === 'light' ? '#FFFFFF' : '#1E5EFF'"/>
          <circle class="n n2" cx="52" cy="50" r="6" [attr.fill]="tone === 'light' ? '#BAE6FD' : '#38BDF8'"/>
          <circle class="n n3" cx="32" cy="38" r="5.5" [attr.fill]="tone === 'light' ? '#1E5EFF' : '#FFFFFF'" [attr.stroke]="tone === 'light' ? '#FFFFFF' : '#1E5EFF'" stroke-width="4"/>
        </svg>
        <span class="word stacked">
          <span class="name">mavix</span>
          <span class="tag">TECH</span>
        </span>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }
    .logo { display: inline-flex; align-items: center; gap: calc(var(--s) * .28); color: #0B1B3F; line-height: 1; }
    .logo.light { color: #fff; }
    .mark.flow { width: var(--s); height: var(--s); }

    .stacked { display: flex; flex-direction: column; gap: calc(var(--s) * .06); }
    .stacked .name { font: 700 calc(var(--s) * .72) 'Outfit', 'Space Grotesk', sans-serif; letter-spacing: -.04em; }
    .stacked .tag { font: 600 calc(var(--s) * .2) 'Outfit', sans-serif; letter-spacing: .58em; color: #1E5EFF; padding-left: 1px; }
    .light .stacked .tag { color: #BAE6FD; }


    /* load animation */
    .anim .flow .line { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw 1.1s .2s cubic-bezier(.6,0,.2,1) forwards; }
    .anim .flow .n { transform-box: fill-box; transform-origin: center; transform: scale(0); animation: pop .45s cubic-bezier(.3,1.7,.5,1) forwards; }
    .anim .flow .n1 { animation-delay: .15s; } .anim .flow .n3 { animation-delay: .7s; } .anim .flow .n2 { animation-delay: 1.2s; }
    .anim .word { animation: fade .7s .5s both; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes pop { to { transform: scale(1); } }
    @keyframes fade { from { opacity: 0; transform: translateX(-6px); } }

    /* hover: idle motion */
    .logo:hover .flow .n3 { animation: pulse 1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.35); } }
  `],
})
export class LogoComponent {
  @Input() size = 40;
  @Input() tone: 'color' | 'light' = 'color';
  @Input() animate = false;
}
