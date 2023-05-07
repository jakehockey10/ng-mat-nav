export interface LoadOptions<T> {
  searchTerm?: string;
  sortDirection?: string;
  sortField?: keyof T;
  pageIndex?: number;
  pageSize?: number;
}
