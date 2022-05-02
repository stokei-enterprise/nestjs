export interface IPaginatedType<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  previousPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IPaginatinInputDTO {
  limit?: number;
  number?: number;
}

export interface IPaginationListData<TItem = any> {
  items: TItem[];
  totalCount: number;
  page?: IPaginatinInputDTO;
}
