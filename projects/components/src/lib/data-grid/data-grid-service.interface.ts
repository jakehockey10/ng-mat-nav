import { Observable } from 'rxjs';
import { LoadOptions } from './load-options.interface';

export interface DataGridService<T extends Record<string, unknown>> {
  load: (options?: LoadOptions) => Observable<{ total: number; records: T[] }>;
}
