import { DataSource } from '@angular/cdk/collections';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  finalize,
  first,
  map,
  of,
} from 'rxjs';
import { DataGridService } from './data-grid-service.interface';
import { LoadOptions } from './load-options.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';

export class DataGridStore<
  T extends Record<string, unknown>
> extends DataSource<T> {
  // private readonly recordsSubject = new BehaviorSubject<T[]>([]);
  // private readonly totalCountSubject = new BehaviorSubject<number>(0);
  // private loadingSubject = new BehaviorSubject<boolean>(false);

  // get records(): T[] {
  //   return this.recordsSubject.value;
  // }

  // records$ = this.recordsSubject.asObservable();
  // totalCount$ = this.totalCountSubject.asObservable();
  // totalCount = toSignal(this.totalCount$);

  // loading$ = this.loadingSubject.asObservable();
  // loading = toSignal(this.loading$);

  private readonly _records = signal<T[]>([]);
  private readonly _loading = signal(false);
  private readonly _totalCount = signal(0);
  private readonly _records$ = toObservable(this._records);
  private readonly _loadOptions = signal<LoadOptions<T>>({});
  records = this._records.asReadonly();
  loading = this._loading.asReadonly();
  totalCount = this._totalCount.asReadonly();

  constructor(private readonly service: DataGridService<T>) {
    super();
  }

  connect() {
    return this._records$;
    // return this.recordsSubject.asObservable();
  }

  disconnect() {
    // TODO:?
    // this.recordsSubject.complete();
    // this.loadingSubject.complete();
  }

  load(options?: LoadOptions<T>) {
    this._loading.set(true);
    if (options) this._loadOptions.set(options);

    this.service
      .load(options)
      .pipe(
        catchError(() => of({ total: 0, records: [] })),
        finalize(() => this._loading.set(false))
      )
      .subscribe((response) => {
        const { records, total } = response;
        this._records.set(records);
        this._totalCount.set(total);
      });
  }

  delete(record: T) {
    this._loading.set(true);

    (this.service.delete
      ? this.service.delete(record).pipe(
          finalize(() => this._loading.set(false)),
          catchError(() => EMPTY)
        )
      : EMPTY.pipe(finalize(() => this._loading.set(false)))
    ).subscribe(() => this.load(this._loadOptions()));
  }
}
