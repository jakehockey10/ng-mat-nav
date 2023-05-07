import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataGridColumns, DataGridComponent, DataGridStore } from 'components';
import { LessonService } from './lesson.service';

@Component({
  selector: 'app-data-grid-demo',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  templateUrl: './data-grid-demo.component.html',
  styleUrls: ['./data-grid-demo.component.scss'],
  providers: [LessonService],
})
export class DataGridDemoComponent {
  dataSource = new DataGridStore(inject(LessonService));
  columns: DataGridColumns = [
    {
      fieldName: 'seqNo',
      headerText: '#',
      visible: true,
      sticky: true,
    },
    {
      fieldName: 'description',
      headerText: 'Description',
      visible: true,
    },
    {
      fieldName: 'duration',
      headerText: 'Duration',
      visible: true,
    },
    {
      type: 'actions',
      enableEdit: true,
      enableDelete: true,
    },
  ];
}
