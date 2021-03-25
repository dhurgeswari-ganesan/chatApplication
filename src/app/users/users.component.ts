import { Component, OnInit, ViewChild } from '@angular/core';
import * as io from "socket.io-client";
import { UserService } from '../users/user.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  msgData = { room: '', nickname: '', message: '' };
  newUser = { nickname: '', room: '' };
  socket = io('http://localhost:4000');
  joinned: boolean = false;
  userobj;
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
  }
  joinRoom(newUser) {
    var date = new Date();
    // this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.userService.saveUser(newUser).then((result) => {
     console.log("joinRoom ==",result);
     this.userobj = result;
     if(this.userobj.status === 'User Exists'){
      this.router.navigate(['/chats/'+this.userobj.user[0].nickname+'/'+this.userobj.user[0].room])
     }else if(this.userobj.status !== 'User Exists'){
      this.router.navigate(['/chats/'+this.userobj.nickname+'/'+this.userobj.room])
     }
     // this.socket.emit('save-message', result);
      this.socket.emit('save-message', { room: this.userobj.room, nickname: this.userobj.nickname, message: 'Join this room', updated_at: date });

    }, (err) => {
      console.log(err);
    });
    this.joinned = true;
  }

}
