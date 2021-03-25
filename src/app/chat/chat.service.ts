import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
 middlewareURL;
  constructor(private http: Http) { 
    this.middlewareURL = 'http://localhost:4000';

  }

  chatUser(room,user) {
    return new Promise((resolve, reject) => {
      this.http.get(this.middlewareURL+'/user/' + room+'/'+user)
        .map(res => res.json())
        .subscribe(res => {
          console.log("getUserByRoom service == ",res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get(this.middlewareURL+'/user/' + room)
        .map(res => res.json())
        .subscribe(res => {
          console.log("getUserByRoom service == ",res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getChatByUser(user,loggedInUser) {
    console.log("getChatByRoom user == ",user);

    return new Promise((resolve, reject) => {
      this.http.get(this.middlewareURL+'/chat/users/' + user+"/"+loggedInUser)
        .map(res => res.json())
        .subscribe(res => {
          console.log("getChatByRoom service == ",res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showChat(id) {
    return new Promise((resolve, reject) => {
        this.http.get(this.middlewareURL+'/chat/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post(this.middlewareURL+'/chat', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateChat(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.middlewareURL+'/chat/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteChat(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/chat/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
