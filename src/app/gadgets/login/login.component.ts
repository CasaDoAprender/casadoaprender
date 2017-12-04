import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from 'app/core/auth.service';
import { SectionService } from 'app/core/section.service';
import { Gadget } from 'app/core/gadget';
import { Login } from 'app/core/login';
import { State } from 'app/core/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() gadget: Login;
  public isUserLoggedIn: boolean = false;
  private welcome: string = "";

  constructor(private auth: AuthService, private sectionService: SectionService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gadget.setReady();
  }

  loginGoogle() {
    this.auth.loginWithGoogle().then(_ => {

      this.auth.getUserState().subscribe(
        user => {
          if(user) {
            this.gadget.isUserLoggedIn = true;
            this.welcome = "Bem vindo(a) " + user.displayName.substring(0, 20) + "!";
            this.sectionService.current.showNextButtonTip = true;
          } else {
            this.gadget.isUserLoggedIn = false;
          }
        }
    )})
  }

  logoutGoogle() {
    this.auth.logout();
    this.sectionService.currentState.goToPage("inicio");
  }

}
