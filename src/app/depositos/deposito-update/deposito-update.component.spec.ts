import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoUpdateComponent } from './deposito-update.component';

describe('DepositoUpdateComponent', () => {
  let component: DepositoUpdateComponent;
  let fixture: ComponentFixture<DepositoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
