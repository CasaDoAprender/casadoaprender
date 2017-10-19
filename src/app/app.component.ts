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
    // this.sectionService.load('casa.json');
    this.sectionService.loadFromFirebase();
    location.onPopState(() => {

      if(sectionService.currentState.label != 'menu') {
        this.menuCallState = sectionService.currentState.label;
        sectionService.currentState.callMenu();
        sectionService.currentState.menuCallState = this.menuCallState;
        location.pushState(null, null, '');
      } else {
        location.back();
      }

    });
  }

  select(state: string) {
    console.log(state);
  }
}
