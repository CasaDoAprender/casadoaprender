import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { SectionService } from "app/core/section.service";

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

      if(sectionService.currentState.label != 'menu') {
        sectionService.currentState.callMenu();
        location.pushState(null, null, '');
        console.log('not exit');
      } else {
        console.log('exit');
        location.back();
      }

    });
  }

  select(state: string) {
    console.log(state);
  }
}
