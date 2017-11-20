import { Component, OnInit } from '@angular/core';

import { SectionService } from "app/core/section.service";

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButton implements OnInit {

  public visible: boolean = true;
  menuCallState: string;

  constructor(private sectionService: SectionService) { }

  ngOnInit() {
  }

  onClick() {
    if(this.sectionService.currentState.label != 'menu') {
      this.sectionService.currentState.callMenu();
    } else {
      this.sectionService.currentState.goToPage(this.sectionService.currentState.previousState);
    }
  }

}
