import { LoginService } from './../login.service';
import { Desserts } from './../../../desserts';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-desserthome',
  templateUrl: './desserthome.component.html',
  styleUrls: ['./desserthome.component.css']
})
export class DesserthomeComponent implements OnInit {
  desserts: Desserts[];
  typeId: string;
  typename: string;
  productname: string;
  quantity: string;
  token: string;
  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.queryByTypeId('1');
  }
  queryByTypeId(typeId: string): void {
    const url = '/api/queryByTypeId';
    const body = new HttpParams()
      .set('typeId', typeId);
    this.typeId = typeId;
    console.log(typeId, this.typeId);
    this.http.post<Desserts[]>(url, body).subscribe(res => {
      this.desserts = res;
      console.log(this.desserts);
      this.queryTypeAndNums(typeId);
    }, error => {
      alert('error:' + error);
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
      } else if (Id == '2') {
        this.typename = res[1].chinese;
        console.log(this.typename);
      } else if (Id == '3') {
        this.typename = res[2].chinese;
        console.log(this.typename);
      }
    }, error => {
      alert('錯誤!請找專業人員處理');
    });
  }
  // 網站放到購物車
  changeQuantity4select(productName: string): void {
    if (this.loginService.getStatus() === true) {
      const url = '/api/changeQuantity4select';
      this.productname = productName;
      const body = new HttpParams()
        .set('userEmail', 'admin')
        .set('productName', productName)
        .set('quantity', '1');
      console.log(this.productname);
      this.http.post(url, body).subscribe(res => {
        console.log(res);
        alert(`${this.productname}\n成功加入購物車`);
      }, error => {
        console.log(error);
        if (error.status === 400) {
          alert('400:BadRequest');
        } else {
          alert('錯誤!請找專業人員處理');
        }
      });
    } else {
      alert('尚未登入!\n無法購物車');
    }
  }
}
