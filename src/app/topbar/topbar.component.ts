import { LoginService } from './../login.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  status: boolean;
  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  Logout() {
    if (this.loginService.getStatus() === true) {
      alert('確認要登出嗎?');
      this.loginService.setStatus(false);
      this.router.navigate(['/home']);
      alert('登出成功!');
      window.location.reload();
    } else {
      alert('尚未登入!');
      document.getElementById('logout').style.display = 'none';
      document.getElementById('login').style.display = '';
    }
  }
  changebtn() {
    document.getElementById('logout').style.display = '';
    document.getElementById('login').style.display = 'none';
    if (this.loginService.getStatus() === false) {
      document.getElementById('logout').style.display = 'none';
      document.getElementById('login').style.display = '';
    }
  }
}
