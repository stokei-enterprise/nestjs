import { IPaginatedType, IPaginationListData } from '../../../interfaces';
import { cleanValueNumber, getPageLimit } from '../../../utils';

export class PaginationMapper<TItem = any> {
  toPaginationList(data: IPaginationListData<TItem>): IPaginatedType<TItem> {
    const limit = getPageLimit(cleanValueNumber(data?.page?.limit));
    let totalPages = 1;
    if (data?.totalCount > 0) {
      if (limit > 0) {
        totalPages = Math.ceil(data?.totalCount / limit);
      }
    }

    const firstPage = 1;
    const currentPage =
      data?.page?.number > firstPage ? data?.page?.number : firstPage;
    const lastPage = totalPages > 0 ? totalPages : firstPage;
    const hasNextPage = currentPage < lastPage;
    const hasPreviousPage = currentPage > firstPage;
    const nextPage = hasNextPage ? currentPage + 1 : lastPage;
    const previousPage = hasPreviousPage ? currentPage - 1 : firstPage;

    return {
      items: data?.items || [],
      totalCount: data?.totalCount || 0,
      currentPage,
      totalPages,
      firstPage,
      lastPage,
      nextPage,
      previousPage,
      hasNextPage,
      hasPreviousPage
    };
  }
}
