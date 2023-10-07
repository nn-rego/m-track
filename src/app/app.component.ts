import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'm-track';

  showSideMenu: boolean = false;

  constructor() {}

  toggle_menu () {
    this.showSideMenu = !this.showSideMenu;
  }
}
