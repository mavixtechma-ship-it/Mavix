import { Component, inject } from '@angular/core';
import { I18nService } from '../shared/i18n.service';
import { IconComponent } from '../shared/icon.component';
import { CONTACT } from '../data/site.config';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [IconComponent],
  template: `
    <a class="fab" [href]="'https://wa.me/' + c.whatsapp" target="_blank" rel="noopener" [attr.aria-label]="t().contact.whatsapp">
      <span class="ring"></span><span class="ring r2"></span>
      <app-icon name="whatsapp" [size]="30" [stroke]="1.8" />
      <span class="tip">{{ t().contact.whatsapp }}</span>
    </a>
  `,
  styles: [`
    .fab { position: fixed; bottom: 24px; inset-inline-end: 24px; z-index: 90; width: 62px; height: 62px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--wa); color: #fff; box-shadow: 0 14px 30px -10px rgba(37,211,102,.7); animation: in .6s 1.2s both cubic-bezier(.3,1.6,.5,1); transition: transform .25s; }
    .fab:hover { transform: scale(1.08); }
    @keyframes in { from { transform: scale(0); } }
    .ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--wa); animation: wave 2.4s ease-out infinite; }
    .r2 { animation-delay: 1.2s; }
    @keyframes wave { from { transform: scale(1); opacity: .7; } to { transform: scale(1.8); opacity: 0; } }
    .tip { position: absolute; inset-inline-end: 76px; white-space: nowrap; padding: 8px 14px; border-radius: 10px; background: var(--ink); color: #fff; font-size: 14px; opacity: 0; transform: translateX(8px); pointer-events: none; transition: opacity .25s, transform .25s; }
    .fab:hover .tip { opacity: 1; transform: none; }
  `],
})
export class WhatsappFabComponent {
  t = inject(I18nService).t;
  c = CONTACT;
}
