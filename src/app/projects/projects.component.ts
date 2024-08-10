import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { VisibilityDirective } from '../directives/visibility.directive';
import { LazyImageDirective } from '../directives/lazy-image.directive';

export type TabLink = { label: string };

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, VisibilityDirective, LazyImageDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  activeAt = 0;
  intervalId?: any;
  timeout: number = 2500;

  tabLinks: TabLink[] = [{ label: 'ToDo' }, { label: 'Marketplace' }, { label: 'Tracker' }, { label: 'Food' }, { label: 'Chat' }, { label: 'Library' }, { label: 'Cafe' }, { label: 'Terrain' }];

  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;
  @ViewChildren(VisibilityDirective, { read: ElementRef }) projectRefs!: QueryList<ElementRef<HTMLElement>>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => { this.switchActiveArticle() }, this.timeout);
  }

  ngAfterViewInit(): void {
    this.adjustParentSize();

    this.setActiveAt(this.activeAt);
  }

  ngOnDestroy(): void {
    this.deleteInterval();
  }

  onLinkClick(index: number) {
    this.setActiveAt(index);

    this.deleteInterval();
  }

  switchActiveArticle() {
    const newIndex = (this.activeAt + 1) % this.projectRefs.length;

    this.setActiveAt(newIndex);
  }

  private setActiveAt(index: number) {
    this.setHiddenAt(this.activeAt);

    this.activeAt = index;

    this.setVisibleAt(this.activeAt);
  }

  private setVisibleAt(index: number) {
    this.renderer.addClass(this.projectRefs.toArray()[index].nativeElement, 'visible');
  }

  private setHiddenAt(index: number) {
    this.renderer.removeClass(this.projectRefs.toArray()[index].nativeElement, 'visible');
  }

  @HostListener('window:resize', ['$event'])
  private adjustParentSize() {

    const tallestElm = this.projectRefs.toArray().reduce((prev, curr) => {
      const currBoundingBox = curr.nativeElement.getBoundingClientRect();
      const prevBoundingBox = prev.nativeElement.getBoundingClientRect();

      return currBoundingBox.height > prevBoundingBox.height ? curr : prev;

    });

    const contentSize = tallestElm.nativeElement.getBoundingClientRect();

    // const contentSize = this.projectRefs.toArray()[0].nativeElement.getBoundingClientRect();

    this.renderer.setStyle(this.content.nativeElement, 'height', `${contentSize.height}px`);
  }

  deleteInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
