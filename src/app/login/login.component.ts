import { LoginService } from './../login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail: string;
  userPw: string;
  token: string;
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  // 使用者登入 return token / false
  UserLogin(userEmail, userPw): void {
    userPw = this.userPw;
    userEmail = this.userEmail;
    console.log(userPw, userEmail);
    const salt = '!ZaP0#8';
    userPw += salt;
    const encryptpw = Md5.hashStr(userPw).toString();
    userPw = encryptpw;
    console.log(encryptpw);
    const url = 'http://10.1.41.66:8080/UserLogin';
    const body = new HttpParams()
      .set('userEmail', userEmail)
      .set('userPw', encryptpw);
    this.http.post(url, body, { responseType: 'text', }).subscribe(res => {
      this.token = res;
      this.loginService.setToken(this.token);
      this.loginService.setEmail(this.userEmail);
      console.log(this.token, this.userEmail);
      if (res === 'false') {
        alert('帳號或密碼輸入錯誤!');
        window.location.reload();
      } else {
        alert('登入成功!');
        this.router.navigate(['/home']);
        this.loginService.setStatus(true);
      }
    }, error => {
      alert('error:' + error);
    });
  }
}
