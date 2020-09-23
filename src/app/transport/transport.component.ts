import { Desserts } from './../../../desserts';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  firstname: string; // ngmodel要用的
  lastname: string;
  telephone: string;
  desserts: Desserts[];
  subtotal = 0;
  fee = 0;
  alltotal = 0;
  page = 1; // 現在在第一頁
  pageSize = 3; // 一頁只能有3筆

  // 表單
  transportForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]*$')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]*$')]),
    telephone: new FormControl('', [Validators.required, Validators.pattern('^[0-9\-]*$')]),
  });
  get namel() {
    return this.transportForm.get('lastname');
  }
  get namef() {
    return this.transportForm.get('firstname');
  }
  get phone() {
    return this.transportForm.get('telephone');
  }

  constructor(private router: Router, private loginService: LoginService, private http: HttpClient) { }
  submitTransport(): void {
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
    if (this.telephone.length === 4) {
      this.telephone = this.telephone + '-';
      console.log(this.telephone);
    }
    if (this.telephone.length === 8) {
      this.telephone = this.telephone + '-';
    }
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



  ngOnInit(): void {
    this.checkCart();
  }

}
