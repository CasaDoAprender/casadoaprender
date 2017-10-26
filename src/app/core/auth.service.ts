import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Ng2DeviceService } from 'ng2-device-detector';

import { State } from 'app/core/state';

@Injectable()
export class AuthService {

  private userState$: Observable<firebase.User>;
  private user: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private deviceService: Ng2DeviceService) {
    this.userState$ = firebaseAuth.authState;
    //this.firebaseAuth.auth.onAuthStateChanged(_ => '');
  }

  public getUser() {
    return this.user;
  }

  public getUserState() {
    return this.userState$;
  }

  private login(provider) {

    return this.firebaseAuth.auth.signInWithPopup(provider).then(_ => {
        this.updateUser();
    }).catch (err =>
      console.log("auth error: " + err)
    );

  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    return this.login(provider);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    State.globals['user'] = '';
    this.user = null;
  }

  updateUser() {
    //TODO check auth call
    this.userState$.subscribe(user => {
      if(user) {
        this.user = user;
        State.globals['user'] = this.user.displayName;
        firebase.database().ref('/users/' + this.user.uid).update({nome: this.user.displayName});
        firebase.database().ref('/users/' + this.user.uid + '/deviceInfo/').update(this.deviceService.getDeviceInfo());
      } else {
        State.globals['user'] = '';
        this.user = null;
      }
    });
  }

}
