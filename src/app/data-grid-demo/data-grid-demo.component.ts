import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataGridComponent, DataGridStore } from 'components';
import { LessonService } from './lesson.service';

export type Lesson = {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
};

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
  columns = [
    {
      fieldName: 'seqNo',
      label: '#',
      visible: true,
      sticky: true,
    },
    {
      fieldName: 'description',
      label: 'Description',
      visible: true,
    },
    {
      fieldName: 'duration',
      label: 'Duration',
      visible: true,
    },
  ];
}
