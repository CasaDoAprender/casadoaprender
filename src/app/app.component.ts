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

  constructor(private sectionService: SectionService, location: PlatformLocation) {
    // this.sectionService.load('casa.json');
    this.sectionService.loadFromFirebase();
    location.onPopState(() => {

        console.log('pressed back!');
    });
  }

  select(state: string) {
    console.log(state);
  }
}
