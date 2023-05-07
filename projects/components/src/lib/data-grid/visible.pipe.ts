import { Pipe, PipeTransform } from '@angular/core';
import { DataGridColumnDef } from './data-grid-column-def';

@Pipe({
  name: 'visible',
  standalone: true,
})
export class VisiblePipe implements PipeTransform {
  transform(columns: DataGridColumnDef[]): DataGridColumnDef[] {
    return columns.filter((c) => c.visible);
  }
}
