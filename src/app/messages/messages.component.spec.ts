import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [
        { provide: MessageService }
      ], // Provide the MessageService class.
    })
      .compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display messages when there are messages', () => {
    messageService.messages = ['Message 1', 'Message 2'];
    fixture.detectChanges();

    const messagesElement = fixture.nativeElement.querySelector('div > h2');
    expect(messagesElement.textContent).toContain('Messages');

    const messageElements = fixture.nativeElement.querySelectorAll('.message');
    expect(messageElements.length).toBe(2);
    expect(messageElements[0].textContent).toContain('Message 1');
    expect(messageElements[1].textContent).toContain('Message 2');
  });

  it('should not display messages when there are no messages', () => {
    messageService.messages = [];
    fixture.detectChanges();

    const messagesElement = fixture.nativeElement.querySelector('div > h2');
    expect(messagesElement).toBeNull();
  });

  it('should clear messages when the clear button is clicked', () => {
    messageService.messages = ['Message 1', 'Message 2'];
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('button.clear');
    clearButton.click();

    expect(messageService.messages.length).toBe(0);
  });
});
