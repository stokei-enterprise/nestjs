import { PaginationMapper } from '.';

describe('PaginationMapper', () => {
  const items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
  const totalCount = items.length;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show all items', async () => {
    const responseMock = {
      items,
      totalCount,
      currentPage: 1,
      totalPages: 1,
      firstPage: 1,
      lastPage: 1,
      nextPage: 1,
      previousPage: 1,
      hasNextPage: false,
      hasPreviousPage: false
    };
    expect(
      new PaginationMapper().toPaginationList({
        items,
        totalCount,
        page: {
          limit: 5,
          number: 1
        }
      })
    ).toStrictEqual(responseMock);
  });

  it('should show default values when items not found', async () => {
    const responseMock = {
      items: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      firstPage: 1,
      lastPage: 1,
      nextPage: 1,
      previousPage: 1,
      hasNextPage: false,
      hasPreviousPage: false
    };
    expect(
      new PaginationMapper().toPaginationList({
        items: [],
        totalCount: 0
      })
    ).toStrictEqual(responseMock);
  });

  it('should show first page with 3 items', async () => {
    const responseMock = {
      items: items.slice(0, 3),
      totalCount,
      currentPage: 1,
      totalPages: 2,
      firstPage: 1,
      lastPage: 2,
      nextPage: 2,
      previousPage: 1,
      hasNextPage: true,
      hasPreviousPage: false
    };
    expect(
      new PaginationMapper().toPaginationList({
        items: responseMock.items,
        totalCount,
        page: {
          limit: 3,
          number: 1
        }
      })
    ).toStrictEqual(responseMock);
  });

  it('should show second page with 2 items', async () => {
    const responseMock = {
      items: items.slice(2),
      totalCount,
      currentPage: 2,
      totalPages: 2,
      firstPage: 1,
      lastPage: 2,
      nextPage: 2,
      previousPage: 1,
      hasNextPage: false,
      hasPreviousPage: true
    };
    expect(
      new PaginationMapper().toPaginationList({
        items: responseMock.items,
        totalCount,
        page: {
          limit: 3,
          number: 2
        }
      })
    ).toStrictEqual(responseMock);
  });
});
