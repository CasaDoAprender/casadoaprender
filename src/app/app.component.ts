import { Component } from '@angular/core';
import { SectionService } from "app/core/section.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private sectionService: SectionService) {
    this.sectionService.load('section-01.json');
  }
}
