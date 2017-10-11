import { Component, OnInit, Input } from '@angular/core';

import { SectionService } from 'app/core/section.service';
import { Gadget } from 'app/core/gadget';
import { Quiz } from 'app/core/quiz';
import { UserEvaluatorService } from 'app/core/user-evaluator.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() gadget: Quiz;
  public isHelpOn: boolean;
  private rightAnswer: boolean;

  constructor(private userEvaluator: UserEvaluatorService) {
  }

  ngOnInit() {
    this.isHelpOn = false;
  }

  ngAfterViewInit() {
    this.gadget.setReady();
    this.gadget.quizComponent = this;
  }

  setGadgetValue(option: string) {
    if(option == this.gadget.selectedQuestion.resp_certa) {
       this.gadget.value = this.gadget.transitionRight;
       this.rightAnswer = true;
    } else {
       this.gadget.value = this.gadget.transitionWrong;
       this.rightAnswer = false;
    }
  }

  helpDisplay() {
    this.isHelpOn = !this.isHelpOn;
    this.userEvaluator.setHelpTrue(this.gadget.selectedQuestion.id);
  }

  answer() {
    var data = {
      rightAnswer: this.rightAnswer,
      time: (new Date().getTime() - this.gadget.startTime)
    }

    this.userEvaluator.answer(this.gadget.selectedQuestion.id, data);
  }

}
