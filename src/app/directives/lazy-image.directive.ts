import { Directive, ViewContainerRef, TemplateRef, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit {

  @Input({ required: true, alias: 'appLazyImage' }) imgUrl!: string;

  constructor(private templateRef: TemplateRef<any>, private renderer: Renderer2, private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.viewContainer.clear();

    const parent: HTMLElement = this.renderer.createElement('div');
    this.renderer.setStyle(parent, 'background', `url(${this.imgUrl})`);
    this.renderer.setStyle(parent, 'background-position', `center`);
    this.renderer.setStyle(parent, 'background-size', `cover`);
    this.renderer.addClass(parent, 'lazy-img-container');

    const view = this.viewContainer.createEmbeddedView(this.templateRef);

    view.rootNodes.forEach(node => {
      this.renderer.listen(node, 'load', () => {
        this.renderer.addClass(node, 'loaded');
      });

      parent.appendChild(node);
    });

    this.viewContainer.element.nativeElement.parentNode.insertBefore(parent, this.viewContainer.element.nativeElement);

  }
}
