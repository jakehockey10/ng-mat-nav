import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  computed,
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
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DataGridStore } from './data-grid-store';
import {
  DataGridColumn,
  DataGridColumnDef,
  DataGridProcessedActionColumnDef,
  isActionColumn,
} from './data-grid-column-def';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationModule, ConfirmationService } from '../confirmation';

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
    MatIconModule,
    MatButtonModule,
    ConfirmationModule,
  ],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent implements OnInit, AfterViewInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _confirmation = inject(ConfirmationService);

  @Input({ required: true }) dataSource:
    | DataGridStore<Record<string, unknown>>
    | undefined;

  @Input() enablePagination = true;
  @Input() enableSorting = true;
  @Input() enableSearch = true;
  @Input() set enableSelection(value: BooleanInput) {
    this._enableSelection.set(coerceBooleanProperty(value));
  }
  get enableSelection(): boolean {
    return this._enableSelection();
  }
  private _enableSelection = signal(true);

  actionColumns = computed<DataGridProcessedActionColumnDef[]>(() => {
    const actionsColumns = this._columns().flatMap((c, i) =>
      isActionColumn(c) ? { ...c, id: i } : []
    );
    console.log(actionsColumns);
    return actionsColumns;
  });

  visibleColumns = computed<DataGridColumnDef[]>(() => {
    return this._columns().flatMap((c) =>
      !isActionColumn(c) && c.visible ? c : []
    );
  });

  displayedColumns = computed(() => {
    const displayedColumns = this._columns()
      .flatMap((c) => (!isActionColumn(c) ? c : []))
      .filter((c) => c.visible)
      .map((c) => c.fieldName);

    if (this.actionColumns().length > 0) {
      displayedColumns.push(
        ...this.actionColumns().map((c) => `action${c.id}`)
      );
    }

    if (this._enableSelection()) {
      displayedColumns.unshift('select');
    }

    console.log(displayedColumns);

    return displayedColumns;
  });

  @Input({ required: true }) set columns(value: DataGridColumn[]) {
    this._columns.set(value);
  }
  get columns(): DataGridColumn[] {
    return this._columns();
  }
  private _columns = signal<DataGridColumn[]>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: ElementRef | undefined;

  selection = new SelectionModel<Record<string, unknown>>(true, []);

  expandedRecord: Record<string, unknown> | null = null;

  records = computed(() => this.dataSource?.records() ?? []);
  loading = computed(() => this.dataSource?.loading() ?? false);
  totalCount = computed(() => this.dataSource?.totalCount() ?? 0);
  isAllSelected = computed(() => {
    if (this.dataSource)
      return this.selection.selected?.length === this.dataSource.records.length;
    return false;
  });

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
        .pipe(
          tap(() => {
            if (this.paginator) this.paginator.firstPage();
          }),
          tap(() => this.load()),
          takeUntilDestroyed(this._destroyRef)
        )
        .subscribe();
    }

    if (this.paginator) {
      // on paginate events, load a new page
      this.paginator.page
        .pipe(
          tap(() => this.load()),
          takeUntilDestroyed(this._destroyRef)
        )
        .subscribe();
    }
  }

  onRecordToggled(record: Record<string, unknown>) {
    this.selection.toggle(record);
    console.log(this.selection.selected);
  }

  onToggleRecord(record: Record<string, unknown>) {
    console.log('onToggleRecord', record);
    if (record == this.expandedRecord) {
      this.expandedRecord = null;
    } else {
      this.expandedRecord = record;
    }
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.records());
    }
  }

  onEdit(event: Event, record: Record<string, unknown>) {
    console.log('onEdit', record);
    event.stopPropagation();
  }

  async onDelete(event: Event, record: Record<string, unknown>) {
    console.log('onDelete', record);
    event.stopPropagation();
    const confirmed = await this._confirmation.confirm({
      title: 'Are you sure?',
      message: 'You are about to delete this record.',
    });
    if (confirmed) {
      this.dataSource?.delete(record);
    }
  }

  private load() {
    const options = {
      pageIndex:
        this.paginator?.pageIndex ?? (this.enablePagination ? 0 : undefined),
      pageSize:
        this.paginator?.pageSize ?? (this.enablePagination ? 3 : undefined),
      searchTerm:
        this.input?.nativeElement.value ?? (this.enableSearch ? '' : undefined),
      sortField: this.sort?.active ?? (this.enableSorting ? '' : undefined),
      sortDirection: this.sort?.direction ?? undefined,
    };
    this.dataSource?.load(options);
  }
}
