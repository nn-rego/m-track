import { Component, OnInit } from '@angular/core';
import { IndexdbService } from './indexdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'm-track';
  showSideMenu: boolean = false;

  constructor(private indexDbService: IndexdbService) {}

  ngOnInit(): void {
    /* Indexed DB */
    this.indexDbService.initIndexDb();
    
  }

  toggle_menu () {
    this.showSideMenu = !this.showSideMenu;
    this.indexDbService.findDataByMonth('ok');
  }
}
