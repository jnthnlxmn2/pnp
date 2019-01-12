import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  api='http://localhost:8000';
  constructor() { }
  getAPI() {
   return this.api;
 }
}
