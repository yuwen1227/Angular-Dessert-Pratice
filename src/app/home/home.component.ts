import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: object;
  typeId: string;
  typeandname: object;
  queryString: string;
  userEmail: number;
  productName: number;
  quantity: number;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.queryByTypeId(this.typeId);
    this.changeQuantity4select(this.userEmail, this.productName, this.quantity);
  }

  // return 該類產品
  queryByTypeId(typeId: string): void {
    const url = 'http://10.1.41.66:8080/queryByTypeId';
    const body = new HttpParams()
      .set('typeId', typeId);
    this.http.post(url, body).subscribe(res => {
      this.typeId = res[0];
      console.log(this.typeId);
    });
  }

  // 在網頁加入購物車
  changeQuantity4select(userEmail, productName, quantity): void {
    const url = 'http://10.1.41.66:8080/changeQuantity4select';
    const body = new HttpParams()
      .set('userEmail', userEmail)
      .set('productName', productName)
      .set('quantity', quantity);
    this.http.post(url, body).subscribe(res => {
      console.log(res);
    });
  }
}
