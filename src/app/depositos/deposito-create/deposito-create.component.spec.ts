import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoCreateComponent } from './deposito-create.component';

describe('DepositoCreateComponent', () => {
  let component: DepositoCreateComponent;
  let fixture: ComponentFixture<DepositoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
