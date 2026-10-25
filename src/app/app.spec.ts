import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('renders every section', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    for (const id of ['services', 'process', 'work', 'contact']) {
      expect(el.querySelector(`#${id}`)).withContext(id).not.toBeNull();
    }
    expect(el.querySelector('app-whatsapp-fab a')).not.toBeNull();
    fixture.destroy();
  });
});
