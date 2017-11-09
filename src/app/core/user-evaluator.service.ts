import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { AuthService } from 'app/core/auth.service';
import { SectionService } from "app/core/section.service";
import { Quiz } from "app/core/quiz";
import { State } from "app/core/state";

@Injectable()
export class UserEvaluatorService {

  answeredRightQuestionStates: string[] =[];
  answeredWrongQuestionStates: string[] =[];

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

  getUserQuestions() {

    if(this.authService.getUser() != null) {

      var array: any = [];

      return this.db.database.ref('/users/' + this.authService.getUser().uid + "/questions").once("value").then(questions => {
        questions.forEach(question => {
            array.push({"key": question.key, "rightAnswer": question.val().rightAnswer});
        });
        return array;
      });
    }
  }

  updateQuestions() {

    if(this.authService.getUser() != null) {

      this.getUserQuestions().then(q => {
        this.answeredRightQuestionStates = [];
        this.answeredWrongQuestionStates = [];

        this.sectionService.current.states.forEach(state => {
          state.page.gadgets.forEach(gadget => {

            if(gadget.type == 'quiz') {
              var quiz = gadget as Quiz;

                let question = q.find(question => question.key == quiz.selectedQuestion.id);
                if(question) {
                   question.rightAnswer? this.answeredRightQuestionStates.push(state.label) : this.answeredWrongQuestionStates.push(state.label);
                }

              }
            });
          });
        });

      }
      
  }
}
