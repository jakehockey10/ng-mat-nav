import { Observable } from 'rxjs';
import { LoadOptions } from './load-options.interface';

export interface DataGridService<T extends Record<string, unknown>> {
  load: (
    options?: LoadOptions<T>
  ) => Observable<{ total: number; records: T[] }>;

  delete?: (record: T) => Observable<void>;
}
