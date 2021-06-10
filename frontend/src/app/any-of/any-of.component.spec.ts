import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOfComponent } from './any-of.component';

describe('AnyOfComponent', () => {
  let component: AnyOfComponent;
  let fixture: ComponentFixture<AnyOfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
