import { LoginService } from './../login.service';
import { Desserts } from './../../../desserts';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  desserts: Desserts[];
  constructor(private http: HttpClient, private loginService: LoginService) { }
  page = 1;
  pageSize = 3;
  subtotal = 0;
  alltotal = 0;
  fee = 0;
  ngOnInit(): void {
    this.checkCart();
  }
  // 看購物車 + 計算total(price * quantity)
  checkCart(): void {
    const token = this.loginService.getToken();
    const url = '/api/checkCart';
    const body = new HttpParams()
      .set('token', token);
    this.http.post<Desserts[]>(url, body, {
      headers: { token: token }
    }).subscribe(res => {
      console.log(res);
      this.desserts = res;
      for (let a = 0; a < this.desserts.length; a++) {
        this.desserts[a].total = this.desserts[a].price * this.desserts[a].order_quantity;
        this.subtotal = this.desserts[a].total + this.subtotal;
        this.alltotal = this.subtotal + this.fee;
      }
    });
  }
}
