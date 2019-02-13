import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: any;
  data: any;
  me: any = {};
  constructor(public http: HttpClient, public storage: LocalStorageService, public globalservice: GlobalService, public userservice: UserService) {
    this.api = this.globalservice.getAPI();
/*    this.userservice.getMe().then(response => {
      let data: any = response;
      if (data.data) {
        this.me = data.data;
        console.log(this.me)
      }
    })*/
  }


  ngOnInit() {
    this.api = this.globalservice.getAPI();
  }


  doLogin(email, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let param = JSON.stringify({
      email: email,
      password: password,
    });
    return new Promise(resolve => {
      this.http.post(this.api + "/api/login", param, httpOptions)
        .subscribe(response => {
          console.log(response, "Token");
          let data: any = response;
          if (data.success) {
            this.storage.store('token', data.success.token);
            this.userservice.getMe().then(response => {
              let data: any = response;
              if (data.data) {
                this.me = data.data;
                console.log(this.me)
                location.reload();
              }
            })
          }
          resolve(response);
        }, err => {
          resolve(err);
        });
    });
  }


  entryChange(email, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let param = JSON.stringify({
      email: email,
      password: password,
    });
    return new Promise(resolve => {
      this.http.post(this.api + "/api/login", param, httpOptions)
        .subscribe(response => {
          console.log(response, "Token");
          let data: any = response;
          if (data.success) {
            this.storage.store('token', data.success.token);
            this.userservice.getMe().then(response => {
              let data: any = response;
              if (data.data) {
                this.me = data.data;
                console.log(this.me)
              }
            })
          }
          resolve(response);
        }, err => {
          resolve(err);
        });
    });
  }

  changePassword(password) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    let param = JSON.stringify({
      new_password: password
    });
    return new Promise(resolve => {
      this.http.post(this.api + "/api/me/change-password", param, httpOptions)
        .subscribe(response => {
          console.log(response, "Token");
          let data: any = response;
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  getToken() {
    return this.storage.retrieve("token")
  }


  isLoggednIn() {
    return this.getToken() !== null;
  }

  isAdmin() {
    console.log(this.me)
    if (this.me.user_type_id == 1) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.storage.clear();
    this.me = {};
    location.reload();
  }

}
