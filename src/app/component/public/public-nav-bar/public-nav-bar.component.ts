import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-nav-bar',
  templateUrl: './public-nav-bar.component.html',
  styleUrls: ['./public-nav-bar.component.scss']
})
export class PublicNavBarComponent implements OnInit {

  isMenuOpen: boolean;

  constructor() {
    this.isMenuOpen = true;
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
