import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersessionService {
  productId: any;
  private userName: any;
  private userRoll: any;
  private userId: any;
 
  constructor() {}

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
    this.userRoll = null;
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

  setProductId(data: any) {
    this.productId = data;
  }

  getProductId() {
    return this.productId;
  }

  clearProductId() {
    this.productId = null;
  }
}
