import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridDemoComponent } from './data-grid-demo.component';

describe('DataGridDemoComponent', () => {
  let component: DataGridDemoComponent;
  let fixture: ComponentFixture<DataGridDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataGridDemoComponent]
    });
    fixture = TestBed.createComponent(DataGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
