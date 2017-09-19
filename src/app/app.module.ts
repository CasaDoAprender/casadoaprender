import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { StateService } from './core/state.service';
import { SectionService } from "app/core/section.service";
import { AuthService } from './core/auth.service';
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
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    SectionService,
    StateService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
