import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoListComponent } from './deposito-list.component';

describe('DepositoListComponent', () => {
  let component: DepositoListComponent;
  let fixture: ComponentFixture<DepositoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
