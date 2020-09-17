import { HttpClient, HttpParams } from '@angular/common/http';
import { Desserts } from './../../../desserts';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dessertinfo',
  templateUrl: './dessertinfo.component.html',
  styleUrls: ['./dessertinfo.component.css']
})
export class DessertinfoComponent implements OnInit {
  constructor(private http: HttpClient) { }
  typeId: string;
  desserts: Desserts[];
  numberforall: number;
  number: number;
  typename: string;
  productname: string;
  ngOnInit(): void {
    this.getAllProducts();
    this.typename = '所有甜點';
  }
  getAllProducts(): void {
    const url = '/api/getAllProducts';
    this.http.get<Desserts[]>(url).subscribe(res => {
      this.desserts = res;
      this.numberforall = res.length;
      console.log(this.desserts, this.numberforall);
    });
  }
  queryByTypeId(typeId: string): void {
    const url = '/api/queryByTypeId';
    const body = new HttpParams()
      .set('typeId', typeId);
    this.typeId = typeId;
    this.http.post<Desserts[]>(url, body).subscribe(res => {
      this.desserts = res;
      this.number = res.length;
      console.log(this.desserts, this.number);
      this.queryTypeAndNums(typeId);
    });
  }
  // Return 所有類別細節(名稱、狀態、數量、id)
  queryTypeAndNums(Id: string): void {
    const url = '/api/queryTypeAndNums';
    this.http.get(url).subscribe(res => {
      console.log(Id);
      if (Id == '1') {
        this.typename = res[0].chinese;
        console.log(this.typename);
      }
      if (Id == '2') {
        this.typename = res[1].chinese;
        console.log(this.typename);
      }
      if (Id == '3') {
        this.typename = res[2].chinese;
        console.log(this.typename);
      }
      if (Id == '4') {
        this.typename = res[3].chinese;
        console.log(this.typename);
      }
    });
  }

  // 網站放到購物車
  changeQuantity4select(productName: string): void {
    const url = 'http://10.1.41.66:8080/changeQuantity4select';
    this.productname = productName;
    const body = new HttpParams()
      .set('userEmail', 'admin')
      .set('productName', this.productname)
      .set('quantity', '1');
    console.log(this.productname);
    this.http.post(url, body).subscribe(res => {
      console.log(res);
      alert(`${this.productname}\n成功加入購物車`);
    });
  }

}
