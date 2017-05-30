import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GadgetService } from './gadget.service';
import { GadgetsComponent } from './gadgets.component';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceBoardComponent } from './choice/choice-board.component';
import { InputComponent } from './input/input.component';
import { InputBoardComponent } from "./input/input-board.component";
import { TextComponent } from './text/text.component';
import { TextBoardComponent } from "./text/text-board.component";
import { Choice_v2Component } from './choice_v2/choice_v2.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    GadgetsComponent,
    ChoiceBoardComponent,
    ChoiceComponent,
    InputComponent,
    InputBoardComponent,
    TextComponent,
    TextBoardComponent,
    Choice_v2Component
],
  entryComponents: [
    ChoiceComponent,
    ChoiceBoardComponent,
    InputComponent,
    InputBoardComponent,
    TextComponent,
    TextBoardComponent
  ],
  providers: [
    GadgetService
  ],
  exports: [
    GadgetsComponent
  ]
})
export class GadgetsModule { }