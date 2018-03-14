import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialog implements OnInit {

  message = 'Mensagem'
  constructor(public dialogRef: MdDialogRef<MessageDialog>) { }

  ngOnInit() {
  }

}
