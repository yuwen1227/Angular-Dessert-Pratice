import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  // 看購物車
  checkCart(): void {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDAwNTA0NzIsInN1YiI6ImFkbWluIiwiaXNzIjoiYXV0aDEiLCJhZG1pbiI6dHJ1ZX0.0Z8RU-vCZre4cbPficnPcFGkgnZU9zryd92P7DlymcY';
    const url = 'http://10.1.41.66:8080/checkCart';
    const body = new HttpParams()
      .set('token', token);
    this.http.post(url, body, {
      headers: { token: token }
    }).subscribe(res => {
      console.log(res);
    });
  }
}
