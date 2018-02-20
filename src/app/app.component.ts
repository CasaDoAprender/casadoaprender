import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { SectionService } from "app/core/section.service";
import { browser } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  menuCallState: string;

  constructor(private sectionService: SectionService, location: PlatformLocation) {
    //this.sectionService.load('casa.json');
    this.sectionService.loadFromFirebase();
    location.onPopState(() => {

      if(sectionService.currentState.label != 'inicio') {
        //sectionService.currentState.callMenu();
        sectionService.currentState.goToPage('inicio');
        location.pushState(null, null, '');
        console.log('not exit');
      } else {
        console.log('exit');
        location.back();
        setTimeout(() => {
          location.pushState(null, null, '');
        }, 3000);
      }

    });
  }

  select(state: string) {
    console.log(state);
  }
}
