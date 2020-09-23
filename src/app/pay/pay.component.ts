import { LoginService } from './../login.service';
import { Desserts } from './../../../desserts';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  firstname: string; // ngmodel要用的
  lastname: string;
  last3: string;
  creditcard: string;
  desserts: Desserts[];
  page = 1;
  pageSize = 3;
  subtotal = 0; // 小計
  alltotal = 0; // 總計
  fee = 0; // 運費

  // 表單
  payForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]*$')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]*$')]),
    creditcard: new FormControl('', [Validators.required, Validators.pattern('^[0-9\-]*$')]),
    last3: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  });
  get namel() {
    return this.payForm.get('lastname');
  }
  get namef() {
    return this.payForm.get('firstname');
  }
  get credit() {
    return this.payForm.get('creditcard');
  }
  get last() {
    return this.payForm.get('last3');
  }
  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.checkCart();
  }

  submitpay(): void {
    if (this.creditcard.length === 4) {
      this.creditcard = this.creditcard + '-';
      console.log(this.creditcard);
    }
    if (this.creditcard.length === 9) {
      this.creditcard = this.creditcard + '-';
    }
    if (this.creditcard.length === 14) {
      this.creditcard = this.creditcard + '-';
    }
    // if (this.lastname.match(/^[0-9]*$/) && this.lastname.length !== 0) {
    //   console.log('姓不可輸入數字');
    //   alert('姓不可輸入數字');
    //   (document.getElementById('lastname') as HTMLInputElement).value = '';
    //   this.lastname = '';
    //   console.log(this.lastname);
    // }
    // if (this.firstname.match(/^[0-9]*$/) && this.firstname.length !== 0) {
    //   console.log('名不可輸入數字');
    //   alert('名不可輸入數字');
    //   (document.getElementById('firstname') as HTMLInputElement).value = '';
    //   this.firstname = '';
    //   console.log(this.firstname);
    // }
    // if (this.last3.match(/[^\d]/)) {
    //   console.log('末三碼請輸入數字');
    //   alert('末三碼請輸入數字');
    //   (document.getElementById('last3') as HTMLInputElement).value = '';
    //   this.last3 = '';
    //   console.log(this.last3);
    // }
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
