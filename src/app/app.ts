import { Component } from '@angular/core';
import { NavbarComponent } from './sections/navbar.component';
import { HeroComponent } from './sections/hero.component';
import { ServicesComponent } from './sections/services.component';
import { ProcessComponent } from './sections/process.component';
import { WorkComponent } from './sections/work.component';
import { ContactComponent } from './sections/contact.component';
import { WhatsappFabComponent } from './sections/whatsapp-fab.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HeroComponent, ServicesComponent, ProcessComponent, WorkComponent, ContactComponent, WhatsappFabComponent],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-services />
      <app-process />
      <app-work />
      <app-contact />
    </main>
    <app-whatsapp-fab />
  `,
})
export class App {}
