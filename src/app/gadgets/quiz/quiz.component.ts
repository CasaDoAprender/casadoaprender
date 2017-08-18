import { Component, OnInit, Input } from '@angular/core';

import { Gadget } from 'app/core/gadget';
import { Quiz } from 'app/core/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() gadget: Quiz;
  public isHelpOn: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isHelpOn = false;
  }

  getValue(value: string) {
    if(value == this.gadget.selectedQuestion.resp_certa) {
       return this.gadget.transitionRight;
    } else {
       return this.gadget.transitionWrong;
    }
  }

  helpDisplay() {
    this.isHelpOn = !this.isHelpOn;
  }

}
