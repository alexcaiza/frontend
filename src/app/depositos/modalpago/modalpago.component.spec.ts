import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpagoComponent } from './modalpago.component';

describe('ModalpagoComponent', () => {
  let component: ModalpagoComponent;
  let fixture: ComponentFixture<ModalpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
