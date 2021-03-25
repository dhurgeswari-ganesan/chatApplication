import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat/chat.service';
import * as io from "socket.io-client";
import { ActivatedRoute } from '@angular/router'
import {Router} from "@angular/router"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chats: any;
  userlist:any;
  ChatByUser:any;
  chatRoom:any;
  chatUser:any;
  joinned: boolean = false;
  msgData = { room: '', nickname: '', message: '',createdTo: '' };
  chatingUser = { room: '', nickname: '', message: '',createdTo: '' };

  socket = io('http://localhost:4000');
  clickedUser:any;
  constructor(private chatService: ChatService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
  
      this.chatUser = this.route.snapshot.paramMap.get('user')
      this.chatRoom = this.route.snapshot.paramMap.get('room')
      this.chattingUser();
      this.getUserByRoom(this.chatRoom);
    //   this.msgData = { room: user.room, nickname: user.nickname, message: '' }
    //   console.log("getChatByRoom ==",this.msgData);
    //   this.joinned = true;
    //   this.scrollToBottom();
    // }
    this.socket.on('new-message', function (data) {
      console.log("room ==",data);
      if(data.message.room === this.chatRoom) {
       // this.ChatByUser.push(data.message);
        console.log("userlist ==",this.ChatByUser);
        this.getChatByUser(localStorage.getItem("clickedUser"),localStorage.getItem("loggedInUser"),localStorage.getItem("clickedUserRoom"));
        this.scrollToBottom();
      }
    }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  chattingUser() {
    this.chatService.chatUser(this.chatRoom,this.chatUser).then((res) => {
      this.chatingUser = res[0];
      console.log("chattingUser ==",this.userlist);
    }, (err) => {
      console.log(err);
    });
  }

  getUserByRoom(room) {
    this.chatService.getUserByRoom(room).then((res) => {
      this.userlist = res;
      console.log("getUserByRoom ==",this.userlist);
    }, (err) => {
      console.log(err);
    });
  }
  getChatByUser(user,loggedInUser,clickedUserRoom) {
    this.msgData = { room: clickedUserRoom, nickname: loggedInUser, message: '',createdTo: user }
    localStorage.setItem("clickedUserRoom",clickedUserRoom);
    localStorage.setItem("loggedInUser",loggedInUser);
    localStorage.setItem("clickedUser",user);
    this.clickedUser = true;
    this.chatService.getChatByUser(user,loggedInUser).then((res) => {
      this.ChatByUser = res;
      console.log("getChatByUser ==",this.ChatByUser);
    }, (err) => {
      console.log(err);
    });
  }

 
  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    this.router.navigate(['/users'])

    //this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
  }

}
