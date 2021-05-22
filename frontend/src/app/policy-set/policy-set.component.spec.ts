import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySetComponent } from './policy-set.component';

describe('PolicySetComponent', () => {
  let component: PolicySetComponent;
  let fixture: ComponentFixture<PolicySetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
