import { Component } from '@angular/core';
import { IntersectionDirective } from '../directives/intersection.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [IntersectionDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent { }
