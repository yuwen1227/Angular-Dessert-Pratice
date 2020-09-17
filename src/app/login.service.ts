import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private token;
  private email;
  private status;
  getToken() {
    return this.token;
  }
  setToken(token: string) {
    this.token = token;
  }
  getEmail() {
    return this.email;
  }
  setEmail(email: string) {
    this.email = email;
  }
  getStatus() {
    return this.status;
  }
  setStatus(status: boolean) {
    this.status = status;
  }
}
