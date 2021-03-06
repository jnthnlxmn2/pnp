import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  api: any = "";
  meridianTime: any;
  constructor(public http: HttpClient, public globalservice: GlobalService, public storage: LocalStorageService) {
    this.api = globalservice.getAPI();
  }

  submitReport(params) {
    console.log(this.meridianTime)
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.post(api + "/api/admin/records", params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  getReport(params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Promise(resolve => {
      this.http.post(this.api + "/api/admin/search", params, httpOptions)
        .subscribe(response => {
          let data: any = response;
          if (data.data) {
            resolve(data.data);
          } else {
            resolve(response);
          }
        }, err => {
          resolve(err);
        });
    });
  }
  deleteCustomer(id) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.delete(api + "/api/admin/customer/" + id, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }
  updateCustomer(id, params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.put(api + "/api/admin/customer/" + id, params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

}
