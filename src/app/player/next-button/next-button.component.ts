import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';
import { SectionService } from 'app/core/section.service';

@Component({
  selector: 'app-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.css'],
  animations: [
    trigger('visibilityState', [
      state('blinking', style({opacity: '0.5'})),
      state('normal', style({opacity: '1'})),
      transition('blinking <=> normal', animate('1s linear'))
    ])
  ]
})
export class NextButtonComponent {
  @Input() visible: boolean = true;
  @Output() onNext = new EventEmitter();
  @Input() private visibilityState: string = 'normal';
  private obs: Subscription;
  private intevalID;

  constructor(private sectionService: SectionService) {
    this.obs = this.sectionService.current.$blinkButton.subscribe(value => {
      this.blinking(value);
    });
  }

  show() { this.visible = true; }
  hide() { this.visible = false; }
  onClick() { this.onNext.emit(); }

  blinking(status) {
    if(status) {
      clearInterval(this.intevalID);
      this.intevalID = setInterval(() => {
       this.visibilityState = (this.visibilityState == 'normal' ? 'blinking' : 'normal');
      },800);
   } else {
      clearInterval(this.intevalID);
      this.visibilityState = 'normal';
   }
  }
}
