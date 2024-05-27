import { Component, OnInit } from '@angular/core';
import { LocalStorageName } from '../common/enum';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  displayMessage: any;
  
  constructor() {}

  ngOnInit(): void {
    const dataFromLocalStorage = localStorage.getItem(LocalStorageName.M_TRACK_INFO);
    if (dataFromLocalStorage) {
      this.displayMessage = dataFromLocalStorage;
      console.log("Found Item")
    } else {
      // Handle the case where data is not found in localStorage
      
      localStorage.setItem(LocalStorageName.M_TRACK_INFO, 'M-TRACK_DATA');
      
      localStorage.getItem(LocalStorageName.M_TRACK_INFO);
      console.log("Just Created item")
    }

    /* Indexd DB */


    

  }
}
