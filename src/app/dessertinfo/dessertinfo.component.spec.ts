import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertinfoComponent } from './dessertinfo.component';

describe('DessertinfoComponent', () => {
  let component: DessertinfoComponent;
  let fixture: ComponentFixture<DessertinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
