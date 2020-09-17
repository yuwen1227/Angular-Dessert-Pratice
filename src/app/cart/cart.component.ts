import { LoginService } from './../login.service';
import { Desserts } from './../../../desserts';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  desserts: Desserts[];
  token: string;
  quantity: number;
  name: string;
  price: number;
  subtotal = 0; // 小計
  fee = 0;
  alltotal = 0; // 總計
  constructor(private http: HttpClient, private loginService: LoginService) { }

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

  // 更改購物車內甜點數量
  changeQuantity(dessert: any, quantity: number): void {
    const userEmail = this.loginService.getEmail();
    const name = dessert.NAME;
    var count = '0';
    if (quantity === 1) {
      count = '1';
    } else {
      count = '-1';
    }
    const url = '/api/changeQuantity4select';
    const body = new HttpParams()
      .set('userEmail', userEmail)
      .set('productName', name)
      .set('quantity', count.toString());
    this.http.post<Desserts[]>(url, body).subscribe(res => {
      console.log(res);
      this.checkCart();
    });
  }

  // 刪除購物車產品
  deleteCart(dessert: Desserts): void {
    const userEmail = this.loginService.getEmail();
    const productName = dessert.NAME;
    console.log(productName);
    alert('確認要刪除此商品?');
    const url = `/api/cart/${userEmail}/${productName}`;
    this.http.delete(url).subscribe(res => {
      console.log(res);
    });
    this.checkCart();
  }
}
