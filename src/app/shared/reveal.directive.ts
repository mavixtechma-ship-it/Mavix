import { Directive, ElementRef, OnDestroy, OnInit, Input, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Adds `.is-visible` when element scrolls into view. Usage: <div appReveal [revealDelay]="100"> */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  private el = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.classList.add('reveal');
    node.style.transitionDelay = `${this.revealDelay}ms`;

    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return;
    }
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          node.classList.add('is-visible');
          this.observer?.unobserve(node);
        }
      }),
      { threshold: 0.15 }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
