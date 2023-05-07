import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';
import {
  EMPTY,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  tap,
} from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DataGridStore } from './data-grid-store';
import { DataGridColumnDef } from './data-grid-column-def';
import { VisiblePipe } from './visible.pipe';

@Component({
  selector: 'lib-data-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    VisiblePipe,
  ],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit, AfterViewInit {
  private readonly _destroyRef = inject(DestroyRef);

  @Input({ required: true }) dataSource!: DataGridStore<
    Record<string, unknown>
  >;

  @Input() pagination = true;

  displayedColumns = signal<string[]>([]);

  @Input({ required: true }) set columns(value: DataGridColumnDef[]) {
    this._columns = value;
    this.displayedColumns.set(
      this._columns.filter((c) => c.visible).map((c) => c.fieldName)
    );
  }
  get columns(): DataGridColumnDef[] {
    return this._columns;
  }
  private _columns: DataGridColumnDef[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: ElementRef | undefined;

  selection = new SelectionModel<Record<string, unknown>>(true, []);

  expandedRecord: Record<string, unknown> | null = null;

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    if (this.input) {
      // server-side search
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            if (this.paginator) this.paginator.firstPage();
            this.load();
          }),
          takeUntilDestroyed(this._destroyRef)
        )
        .subscribe();
    }

    if (this.sort) {
      // reset the paginator after sorting
      this.sort.sortChange
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => {
          if (this.paginator) this.paginator.pageIndex = 0;
        });
    }

    // on sort or paginate events, load a new page
    merge([this.sort?.sortChange ?? EMPTY, this.paginator?.page ?? EMPTY])
      .pipe(
        tap(() => this.load()),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  onRecordToggled(record: Record<string, unknown>) {
    this.selection.toggle(record);
    console.log(this.selection.selected);
  }

  onToggleRecord(record: Record<string, unknown>) {
    if (record == this.expandedRecord) {
      this.expandedRecord = null;
    } else {
      this.expandedRecord = record;
    }
  }

  isAllSelected() {
    return this.selection.selected?.length === this.dataSource.records.length;
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.records);
    }
  }

  private load() {
    this.dataSource.load({
      searchTerm: this.input?.nativeElement.value,
      sortDirection: this.sort?.direction,
      pageIndex: this.paginator?.pageIndex,
      pageSize: this.paginator?.pageSize,
    });
  }
}
