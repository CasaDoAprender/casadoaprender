import { Component, OnInit, Input } from '@angular/core';
import { MdMenuTrigger, MdMenu, MdDialog } from "@angular/material";

import { SectionService } from 'app/core/section.service';
import { Gadget } from 'app/core/gadget';
import { Quiz } from 'app/core/quiz';
import { UserEvaluatorService } from 'app/core/user-evaluator.service';
import { MessageDialog } from "app/ui/message-dialog/message-dialog.component";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() gadget: Quiz;
  public isHelpOn: boolean;
  private rightAnswer: boolean;

  constructor(private userEvaluator: UserEvaluatorService, public dialog: MdDialog) {
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
    if(this.rightAnswer != undefined) {
      var data = {
        rightAnswer: this.rightAnswer,
        time: (new Date().getTime() - this.gadget.startTime)
      }
      this.userEvaluator.answer(this.gadget.selectedQuestion.id, data);
    } else {
      let messageDlg = this.dialog.open(MessageDialog);
      messageDlg.componentInstance.message = "Marque uma questão";
    }
  }

}
