import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagospageComponent } from './pagospage.component';

describe('PagospageComponent', () => {
  let component: PagospageComponent;
  let fixture: ComponentFixture<PagospageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagospageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
