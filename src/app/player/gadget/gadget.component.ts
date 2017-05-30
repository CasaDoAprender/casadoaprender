import { Component, OnInit, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { Gadget } from 'app/core/gadget';
import { GadgetService } from 'app/gadgets/gadget.service';

@Component({
  selector: 'app-gadget',
  templateUrl: './gadget.component.html',
  styleUrls: ['./gadget.component.css'],
  providers: [GadgetService]  
})
export class GadgetComponent implements OnInit {
  @Input() gadget: Gadget;
  @ViewChild('gadgetHolder', { read: ViewContainerRef }) gadgetHolder: ViewContainerRef;

  constructor(private gadgetServ: GadgetService) { }

  ngOnInit() {
    this.gadgetServ.createComponent(this.gadget, false, this.gadgetHolder);
  }
}
