import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersessionService {
 
  constructor() {}

  private userName: any;
  private userRoll: any;
  private userId: any;
  
  setUserName(data: any) {
    this.userName = data;
  }

  getUserName() {
    return this.userName;
  }

  clearUserName() {
    this.userName = null;
  }
  setUserRoll(data: any) {
    this.userRoll = data;
  }

  getUserRoll() {
    return this.userRoll;
  }

  clearUserRoll() {
    this.userId = null;
  }
  setUserId(data: any) {
    this.userId = data;
  }

  getUserId() {
    return this.userId;
  }

  clearUserId() {
    this.userId = null;
  }
}
