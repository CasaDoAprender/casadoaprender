import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { AuthService } from 'app/core/auth.service';

@Injectable()
export class UserEvaluatorService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }


  answer(questionId, data) {

    if(this.authService.getUser() != null) {

      var ref = this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions/" + questionId);

      ref.child("/attempts").once("value").then(attempts => {
        ref.update({attempts:  attempts.val() + 1});
      });
      ref.child("/time").once("value").then(time => {
        ref.update({time:  data['time'] + time.val()});
      });
      //data['score'] = this.getScore(data['questionId'],  data['rightAnswer']);


      ref.update({rightAnswer: data['rightAnswer']});
    }

  }


  setHelpTrue(questionId) {
    this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions/" + questionId).update({helpUsed: true});
  }


  getScore(questionId, rightAnswer) {
    var ref = this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions/" + questionId);
    ref.child("helpUsed").once("value").then();
  }
}
