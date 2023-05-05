import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyExampleComponent } from './lazy-example.component';

describe('LazyExampleComponent', () => {
  let component: LazyExampleComponent;
  let fixture: ComponentFixture<LazyExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LazyExampleComponent]
    });
    fixture = TestBed.createComponent(LazyExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
