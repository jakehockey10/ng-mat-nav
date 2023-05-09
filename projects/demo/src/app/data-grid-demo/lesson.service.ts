import { Injectable, signal } from '@angular/core';
import { EMPTY, Observable, delay, map, of } from 'rxjs';
import { LoadOptions } from 'components';
import { Lesson } from './lesson.type';
import { LESSONS } from './lessons.mock';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private readonly _lessons = signal<{ total: number; records: Lesson[] }>({
    total: LESSONS.length,
    records: LESSONS,
  });

  private _currentOptions: LoadOptions<Lesson> | undefined;

  load(
    options?: LoadOptions<Lesson>
  ): Observable<{ total: number; records: Lesson[] }> {
    this._currentOptions = options;
    this._lessons.set({
      total: LESSONS.length,
      records: options ? this.filterWithOptions(LESSONS, options) : LESSONS,
    });
    return of(this._lessons()).pipe(delay(1000));
  }

  delete(lesson: Lesson) {
    LESSONS.splice(LESSONS.indexOf(lesson), 1);
    this._lessons.set({
      total: LESSONS.length,
      records: this._currentOptions
        ? this.filterWithOptions(LESSONS, this._currentOptions)
        : LESSONS,
    });
    return of(void 0);
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
