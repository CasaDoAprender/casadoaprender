import { Component, OnInit, Input } from '@angular/core';
import { Choice } from "app/core/choice";
import { SectionService } from "app/core/section.service";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  @Input() gadget: Choice;
  // answer: string;

  constructor(private sectionService: SectionService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gadget.setReady();
  }

  onClick() {

    if(this.sectionService.currentState.label == "inicio") {
      this.sectionService.current.showNextButtonTip = true;
      this.sectionService.current.setBlinkButton(true);
    }

  }

}
