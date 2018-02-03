import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOfCreditComponent } from './line-of-credit.component';

describe('LineOfCreditComponent', () => {
  let component: LineOfCreditComponent;
  let fixture: ComponentFixture<LineOfCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineOfCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineOfCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
