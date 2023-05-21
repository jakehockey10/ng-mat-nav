import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDialogComponent } from './board-dialog.component';

describe('BoardDialogComponent', () => {
  let component: BoardDialogComponent;
  let fixture: ComponentFixture<BoardDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardDialogComponent]
    });
    fixture = TestBed.createComponent(BoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});