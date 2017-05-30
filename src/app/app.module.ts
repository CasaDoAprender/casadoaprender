import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SectionService } from "app/core/section.service";
import { PlayerComponent } from "app/player/player.component";
import { GadgetsModule } from "app/gadgets/gadgets.module";
import { InterventionComponent } from "app/player/intervention/intervention.component";
import { NextButtonComponent } from "app/player/next-button/next-button.component";
import { SharedModule } from "app/shared/shared.module";

import 'hammerjs';
import { GadgetComponent } from "app/player/gadget/gadget.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    GadgetComponent,
    InterventionComponent,
    NextButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GadgetsModule,
    SharedModule
  ],
  providers: [
    SectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
