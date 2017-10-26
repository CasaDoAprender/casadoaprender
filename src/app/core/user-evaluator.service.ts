import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { AuthService } from 'app/core/auth.service';
import { SectionService } from "app/core/section.service";
import { Quiz } from "app/core/quiz";
import { State } from "app/core/state";

@Injectable()
export class UserEvaluatorService {

  answeredQuestionsStates: string[] =[];

  constructor(private db: AngularFireDatabase, private authService: AuthService, private sectionService: SectionService) { }


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
    if(this.authService.getUser() != null) {
      this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions/" + questionId).update({helpUsed: true});
    }
  }


  getScore() {

    if(this.authService.getUser() != null) {

      var score: number = 0;

      return this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions").once("value").then(questions => {
          questions.forEach(question => {

            if(question.val().rightAnswer) {
              score += 7;
              if(!question.val().helpUsed) {
                score += 3;
              }
            }


          });

          return score;
      });



    }


  }

  getUserRightQuestionsKeys() {

    if(this.authService.getUser() != null) {

      var keys: any = [];

      return this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions").once("value").then(questions => {
        questions.forEach(question => {
          if(question.val().rightAnswer) {
            keys.push(question.key);
          }
        });
        return keys;
      });
    }
  }

  updateQuestions() {

    if(this.authService.getUser() != null) {

        this.sectionService.current.states.forEach(state => {
          state.page.gadgets.forEach(gadget => {

            if(gadget.type == 'quiz') {
              var quiz = gadget as Quiz;
              this.getUserRightQuestionsKeys().then(keys => {

                if(keys.indexOf(quiz.selectedQuestion.id) !== -1 && this.answeredQuestionsStates.indexOf(state.label) === -1) {
                  this.answeredQuestionsStates.push(state.label);
                }

              });
            }

          });
        });

      }

  }
}
