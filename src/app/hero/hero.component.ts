import { Component } from '@angular/core';
import { LazyImageDirective } from '../directives/lazy-image.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LazyImageDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent { }
