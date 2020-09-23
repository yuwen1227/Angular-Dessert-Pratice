import { LoginService } from './../login.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Desserts } from './../../../desserts';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dessertinfo',
  templateUrl: './dessertinfo.component.html',
  styleUrls: ['./dessertinfo.component.css']
})
export class DessertinfoComponent implements OnInit, OnChanges {
  constructor(private http: HttpClient, private loginService: LoginService) { }
  @Input() typeId: string;
  desserts: Desserts[];
  numberforall: number;
  number: number;
  typename: string;
  productname: string;
  ngOnInit(): void {
    this.getAllProducts();
    this.typename = '所有甜點';
  }

  // 元件內有@Input ngOnChanges就會被觸發
  ngOnChanges(changes: SimpleChanges): void {
    changes.typeId[0] = this.typeId;
    console.log(changes.typeId);
    console.log(changes.typeId[0]);
    this.queryByTypeId();
  }
  getAllProducts(): void {
    const url = '/api/getAllProducts';
    this.http.get<Desserts[]>(url).subscribe(res => {
      this.desserts = res;
      this.numberforall = res.length;
      console.log(this.desserts, this.numberforall);
    }, error => {
      alert('error:' + error);
    });
  }
  queryByTypeId(): void {
    const url = '/api/queryByTypeId';
    const body = new HttpParams()
      .set('typeId', this.typeId);
    this.typeId = this.typeId;
    this.http.post<Desserts[]>(url, body).subscribe(res => {
      this.desserts = res;
      this.number = res.length;
      console.log(this.desserts, this.number);
      this.queryTypeAndNums(this.typeId);
    }, error => {
      alert('error:' + error);
    });
  }
  // Return 所有類別細節(名稱、狀態、數量、id)
  queryTypeAndNums(Id: string): void {
    const url = '/api/queryTypeAndNums';
    this.http.get(url).subscribe(res => {
      console.log('typeId = ', this.typeId);
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
    }, error => {
      alert('error:' + error);
    });
  }

  // 網站放到購物車
  changeQuantity4select(productName: string): void {
    if (this.loginService.getStatus() === true) {
      const url = '/api/changeQuantity4select';
      this.productname = productName;
      const body = new HttpParams()
        .set('userEmail', 'admin')
        .set('productName', this.productname)
        .set('quantity', '1');
      console.log(this.productname);
      this.http.post(url, body).subscribe(res => {
        console.log(res);
        alert(`${this.productname}\n成功加入購物車`);
      }, error => {
        alert('error:' + error);
      });
    } else {
      alert('尚未登入!\n無法加入購物車');
    }
  }
}
