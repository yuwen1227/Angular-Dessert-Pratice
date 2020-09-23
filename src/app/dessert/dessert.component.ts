import { Desserts } from './../../../desserts';
import { Component, Input, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
export enum Kind {
  Today = '1',
  Popular = '2',
  New = '3',
  OutOfPrint = '4'
}
@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})

export class DessertComponent implements OnInit {
  typeId: string; // [typeId] = "typeId"(這個)
  selectedtypeId: string;
  desserts: Desserts[];
  number: number;
  type1 = 0;
  type2 = 0;
  type3 = 0;
  constructor(private http: HttpClient) { }

  public get kind(): typeof Kind {
    return Kind;
  }
  ngOnInit(): void {
    this.queryByTypeId('1'); // 3
    this.queryByTypeId('2'); // 5
    this.queryByTypeId('3'); // 7

  }
  queryByTypeId(typeId: string): void {
    const url = 'http://10.1.41.66:8080/queryByTypeId';
    const body = new HttpParams()
      .set('typeId', typeId);
    this.http.post<Desserts[]>(url, body).subscribe(res => {
      this.desserts = res;
      this.number = res.length;
      console.log(this.desserts, this.number);
      if (typeId === '1') {
        this.type1 = res.length;
      }
      if (typeId === '2') {
        this.type2 = res.length;
      }
      if (typeId === '3') {
        this.type3 = res.length;
      }
    }, error => {
      alert('error:' + error);
    });
  }
  onSelect(typeId: string): void {
    this.selectedtypeId = typeId;
    console.log(typeId);
    console.log(this.selectedtypeId);
  }

}
