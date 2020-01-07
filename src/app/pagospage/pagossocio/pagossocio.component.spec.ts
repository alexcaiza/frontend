import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagossocioComponent } from './pagossocio.component';

describe('PagossocioComponent', () => {
  let component: PagossocioComponent;
  let fixture: ComponentFixture<PagossocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagossocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagossocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
