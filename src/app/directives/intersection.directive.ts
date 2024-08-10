import { AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';

export type IntersectionEvent = {
  type: 'enter' | 'exit';
};

@Directive({
  selector: '[appIntersection]',
  standalone: true
})
export class IntersectionDirective implements OnInit, OnDestroy, AfterViewInit {
  private observer!: IntersectionObserver;
  @Input() root?: HTMLElement;
  @Input() rootMargin: string = '0px';
  @Input() threshold: number | number[] = 0;
  @Input() unobserveOnReach: boolean = false;

  @HostBinding('class.is-intersecting')
  isIntersecting: boolean = false;

  @Output() intersect = new EventEmitter<IntersectionEvent>();

  constructor(private element: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.setObserver();
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private setObserver() {
    const options = {
      root: this.root ?? null,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isIntersecting = true;
          this.intersect.emit({ type: 'enter' });

          if (this.unobserveOnReach) {
            this.observer.unobserve(entry.target);
          }
        }
        else {
          this.isIntersecting = false;
          this.intersect.emit({ type: 'exit' });
        }
      });
    }, options);
  }
}
