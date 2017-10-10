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

  constructor(private sectionService: SectionService, private userEvaluator: UserEvaluatorService) {
  }

  ngOnInit() {
    this.isHelpOn = false;
  }

  ngAfterViewInit() {
    this.gadget.setReady();
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

  private answer() {
    var data = {
      questionId: this.gadget.selectedQuestion.id,
      rightAnswer: this.rightAnswer
    }

    this.userEvaluator.answer(data);
  }

}
