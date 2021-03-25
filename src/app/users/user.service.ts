import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  middlewareURL;

  constructor(private http: Http) { 
    this.middlewareURL = 'http://localhost:4000';

  }
  showChat(id) {
    return new Promise((resolve, reject) => {
        this.http.get(this.middlewareURL+'/user/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveUser(data) {
    return new Promise((resolve, reject) => {
        this.http.post(this.middlewareURL+'/user', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
}
