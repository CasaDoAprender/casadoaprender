import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { AuthService } from 'app/core/auth.service';

@Injectable()
export class UserEvaluatorService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }


  answer(data) {

    var ref = this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions/" + data['questionId']);

    ref.child("/attempts").once("value").then(attempts => data['attempts'] = (attempts.val() + 1));
    //data['score'] = this.getScore(data['questionId'],  data['rightAnswer']);
    //this.db.database.ref('/users/' + this.authService.getUser().uid).update(data);

  }


  setHelpTrue(questionId) {
    this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions/" + questionId).update({helpUsed: true});
  }


  getScore(questionId, rightAnswer) {
    var ref = this.db.database.ref('/users/' + this.authService.getUser().uid);
    ref.child("/questions/" + questionId + "helpUsed").once("value").then();
  }
}
