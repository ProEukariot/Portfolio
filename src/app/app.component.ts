import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from "./projects/projects.component";
import { IntersectionDirective, IntersectionEvent } from './directives/intersection.directive';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeroComponent, NavbarComponent, ProjectsComponent, IntersectionDirective, ExperienceComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  navVisible = false;
  @ViewChild('navbar', { static: true }) navbar!: NavbarComponent;

  hideNav(ev: IntersectionEvent) {
    this.navVisible = ev.type == 'exit';
  }

  updateActiveLink(id: string, ev: IntersectionEvent) {
    if (ev.type == 'enter')
      this.navbar.setActive(id);
  }
}
