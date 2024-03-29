import { Component } from '@angular/core';
import { MessageService } from '../message.service'; // Import the MessageService class from the appropriate module.

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  constructor(public messageService: MessageService) { }
}
