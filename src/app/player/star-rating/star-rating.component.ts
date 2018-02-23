import { Component, OnInit } from '@angular/core';
import { UserEvaluatorService } from "app/core/user-evaluator.service";
import { AuthService } from "app/core/auth.service";
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  img0: any= 'assets/server/estrela0.png';
  img1: any= 'assets/server/estrela1.png';
  img2: any= 'assets/server/estrela2.png';
  img3: any= 'assets/server/estrela3.png';
  img4: any= 'assets/server/estrela4.png';
  img5: any= 'assets/server/estrela5.png';

  img: any= '';

  visibility: any='hidden';
  constructor(private userEvaluator: UserEvaluatorService,private authService: AuthService) { }



  ngOnInit() {
  }

  updateStarsImage(){
    this.visibility='visible';
    if(this.userEvaluator.answeredRightQuestionStates.length/37.0 < 0.2){
      //estrela0.png
      this.img=this.img0;

    }
    else if(this.userEvaluator.answeredRightQuestionStates.length/37.0 < 0.4){
      //estrela1.png
      this.img=this.img1;


    }
    else if(this.userEvaluator.answeredRightQuestionStates.length/37.0 < 0.6){
      //estrela2.png
      this.img=this.img2;
    }
    else if(this.userEvaluator.answeredRightQuestionStates.length/37.0 < 0.8){
      //estrela3.png
      this.img=this.img3;
    }
    else if(this.userEvaluator.answeredRightQuestionStates.length/37.0 < 1){
      //estrela4.png
      this.img=this.img4;
    }
    else{
      //estrela5.png
      this.img=this.img5;
    }

  }

  hide() {
    this.img= '';
  }

}
