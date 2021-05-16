import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewObservablesComponent } from './tree-view-observables.component';

describe('TreeViewObservablesComponent', () => {
  let component: TreeViewObservablesComponent;
  let fixture: ComponentFixture<TreeViewObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
