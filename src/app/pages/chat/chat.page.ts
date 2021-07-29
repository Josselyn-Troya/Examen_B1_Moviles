import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
 
export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
 
  messages: Observable<any[]>;
  newMsg = '';

  // File upload task 
  fileUploadTask: AngularFireUploadTask;

  fileUploadedPath: Observable<string>;

  FileName: string;
  FileSize: number;
 
  constructor(private chatService: ChatService, private router: Router) { }
 
  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }
 
  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
 
  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }


  
 
}
