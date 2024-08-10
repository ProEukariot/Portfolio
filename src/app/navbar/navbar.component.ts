import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export type Link = { href: string, label: string, id?: string };

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly links: Link[] = [
    { href: "#hero", label: "Hero", id: "hero" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#contact", label: "Contact", id: "contact" }
  ];

  activeLink = this.links[0].id;

  setActive(id: string | undefined) {
    if (!id) return;

    this.activeLink = id;
  }
}
