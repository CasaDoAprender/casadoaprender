import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg';

import { GadgetService } from './gadget.service';
import { GadgetsComponent } from './gadgets.component';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceBoardComponent } from './choice/choice-board.component';
import { InputComponent } from './input/input.component';
import { InputBoardComponent } from "./input/input-board.component";
import { TextComponent } from './text/text.component';
import { TextBoardComponent } from "./text/text-board.component";
import { Choice_v2Component } from './choice_v2/choice_v2.component';
import { SvgBoardComponent } from "app/gadgets/svg/svg-board.component";
import { SvgComponent } from "app/gadgets/svg/svg.component";
import { QuizComponent } from './quiz/quiz.component';
import { QuizBoardComponent } from './quiz/quiz-board.component';
import { LoginComponent } from './login/login.component';
import { LoginBoardComponent } from './login/login-board.component';

@NgModule({
  imports: [
    SharedModule,
    InlineSVGModule
  ],
  declarations: [
    GadgetsComponent,
    ChoiceBoardComponent,
    ChoiceComponent,
    Choice_v2Component,
    InputComponent,
    InputBoardComponent,
    TextComponent,
    TextBoardComponent,
    SvgComponent,
    SvgBoardComponent,
    QuizComponent,
    QuizBoardComponent,
    LoginComponent,
    LoginBoardComponent
],
  entryComponents: [
    ChoiceComponent,
    ChoiceBoardComponent,
    InputComponent,
    InputBoardComponent,
    TextComponent,
    TextBoardComponent,
    SvgComponent,
    SvgBoardComponent,
    QuizComponent,
    QuizBoardComponent,
    LoginComponent,
    LoginBoardComponent
  ],
  providers: [
    GadgetService
  ],
  exports: [
    GadgetsComponent
  ]
})
export class GadgetsModule { }
