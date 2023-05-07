import { Injectable, signal } from '@angular/core';
import { EMPTY, Observable, delay, map, of } from 'rxjs';
import { LoadOptions } from 'components';
import { Lesson } from './lesson.type';

let LESSONS = [
  {
    id: 1,
    description: 'Angular Tutorial For Beginners',
    duration: '4:17',
    seqNo: 1,
  },
  {
    id: 2,
    description: 'Building Your First Component',
    duration: '2:07',
    seqNo: 2,
  },
  {
    id: 3,
    description: 'Component @Input',
    duration: '2:33',
    seqNo: 3,
  },
  {
    id: 4,
    description: 'Component @Output',
    duration: '3:27',
    seqNo: 4,
  },
  {
    id: 5,
    description: 'Component Events',
    duration: '4:44',
    seqNo: 5,
  },
  {
    id: 6,
    description: 'Component Templates',
    duration: '2:59',
    seqNo: 6,
  },
  {
    id: 7,
    description: 'Component Styles',
    duration: '2:55',
    seqNo: 7,
  },
  {
    id: 8,
    description: 'Dynamic Components',
    duration: '2:33',
    seqNo: 8,
  },
  {
    id: 9,
    description: 'ngIf Directive',
    duration: '4:22',
    seqNo: 9,
  },
  {
    id: 10,
    description: 'ngFor Directive',
    duration: '2:55',
    seqNo: 10,
  },
  {
    id: 11,
    description: 'ngClass Directive',
    duration: '2:07',
    seqNo: 11,
  },
  {
    id: 12,
    description: 'ngStyle Directive',
    duration: '2:19',
    seqNo: 12,
  },
  {
    id: 13,
    description: 'Component Interaction',
    duration: '2:33',
    seqNo: 13,
  },
  {
    id: 14,
    description: 'Angular Lifecycle Hooks',
    duration: '2:55',
    seqNo: 14,
  },
  {
    id: 15,
    description: 'ngOnChanges',
    duration: '2:33',
    seqNo: 15,
  },
  {
    id: 16,
    description: 'ngOnInit',
    duration: '3:27',
    seqNo: 16,
  },
  {
    id: 17,
    description: 'ngDoCheck',
    duration: '1:47',
    seqNo: 17,
  },
  {
    id: 18,
    description: 'ngAfterContentInit',
    duration: '1:47',
    seqNo: 18,
  },
  {
    id: 19,
    description: 'ngAfterContentChecked',
    duration: '2:33',
    seqNo: 19,
  },
  {
    id: 20,
    description: 'ngAfterViewInit',
    duration: '3:27',
    seqNo: 20,
  },
];

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  load(
    options?: LoadOptions<Lesson>
  ): Observable<{ total: number; records: Lesson[] }> {
    return of(LESSONS).pipe(
      map((lessons) => {
        if (options) {
          return this.filterWithOptions(lessons, options);
        }

        return lessons;
      }),
      map((lessons) => ({ total: LESSONS.length, records: lessons }))
    );
  }

  delete(lesson: Lesson) {
    LESSONS = LESSONS.filter((l) => l.id !== lesson.id);
    return EMPTY;
  }

  private filterWithOptions(
    lessons: Lesson[],
    options: LoadOptions<Lesson>
  ): Lesson[] {
    if (options.searchTerm) {
      lessons = lessons.filter((lesson) =>
        lesson.description
          .toLowerCase()
          .includes(options.searchTerm!.toLowerCase())
      );
    }

    if (options.sortDirection) {
      lessons = lessons.sort((a, b) => {
        if (a[options.sortField!] < b[options.sortField!]) {
          return options.sortDirection === 'asc' ? -1 : 1;
        }

        if (a[options.sortField!] > b[options.sortField!]) {
          return options.sortDirection === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    if (
      options.pageIndex !== undefined &&
      options.pageIndex >= 0 &&
      options.pageSize !== undefined &&
      options.pageSize >= 0
    ) {
      lessons = lessons.slice(
        options?.pageIndex * options?.pageSize,
        (options?.pageIndex + 1) * options?.pageSize
      );
    }

    return lessons;
  }
}
