import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWhatToCreateComponent } from './choose-what-to-create.component';

describe('ChooseWhatToCreateComponent', () => {
  let component: ChooseWhatToCreateComponent;
  let fixture: ComponentFixture<ChooseWhatToCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseWhatToCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseWhatToCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
