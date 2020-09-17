import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesserthomeComponent } from './desserthome.component';

describe('DesserthomeComponent', () => {
  let component: DesserthomeComponent;
  let fixture: ComponentFixture<DesserthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesserthomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesserthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
