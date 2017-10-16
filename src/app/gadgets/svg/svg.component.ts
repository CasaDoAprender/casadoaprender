import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Gadget } from 'app/core/gadget';
import { Svg } from 'app/core/svg';
import { SectionService } from "app/core/section.service";
import { UserEvaluatorService } from "app/core/user-evaluator.service";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements OnInit {
  @Input() gadget: Svg;
  img: any = 'assets/server/loading.svg';

  constructor(private renderer: Renderer2, private sectionServ: SectionService, private userEvaluator: UserEvaluatorService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.img = this.gadget.file;
  }

  prepare(svgElm: SVGElement) {
    this.gadget.setReady();
    const touchables = svgElm.getElementsByClassName('touchable');
    for(let i = 0; i < touchables.length; i++) {
      let touchable = touchables[i];

      const state = this.sectionServ.currentState;
      let edge = state.outedges.find(edge => edge.label == touchable.id);
      if(edge && this.userEvaluator.answeredQuestionsStates.indexOf(edge.to) === -1) {
        this.renderer.listen(touchable, 'click', (evt) => {
          console.log(state);
          console.log(touchable.id);


          state.behavior.onTouch(touchable.id);
        })
      } else {
        (touchable as HTMLElement).style.fill = '#00cc00';
      }


    }
  }

}
