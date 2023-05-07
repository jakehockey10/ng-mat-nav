import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, map, of } from 'rxjs';
import { DataGridService } from './data-grid-service.interface';
import { LoadOptions } from './load-options.interface';

export class DataGridStore<
  T extends Record<string, unknown>
> extends DataSource<T> {
  private readonly recordsSubject = new BehaviorSubject<T[]>([]);
  private readonly totalCountSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  get records(): T[] {
    return this.recordsSubject.value;
  }

  records$ = this.recordsSubject.asObservable();
  totalCount$ = this.totalCountSubject.asObservable();

  loading$ = this.loadingSubject.asObservable();

  constructor(private readonly service: DataGridService<T>) {
    super();
  }

  connect() {
    return this.recordsSubject.asObservable();
  }

  disconnect() {
    this.recordsSubject.complete();
    this.loadingSubject.complete();
  }

  load(options?: LoadOptions) {
    this.loadingSubject.next(true);

    this.service
      .load(options)
      .pipe(
        catchError(() => of({ total: 0, records: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response) => {
        const { records, total } = response;
        this.recordsSubject.next(records);
        this.totalCountSubject.next(total);
      });
  }
}
