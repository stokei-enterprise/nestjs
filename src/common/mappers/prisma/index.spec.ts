import { MAX_PAGE_LIMIT, MIN_PAGE_LIMIT } from '../../../constants/pagination';
import {
  IBaseOrderByData,
  IPaginationArgsToPrismaDataPaginationPrismaMapper,
  IWhere,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '../../../interfaces';
import { PrismaMapper } from '.';

describe('PrismaMapper', () => {
  describe('toOrderBy', () => {
    it('should return correct orderBy values', async () => {
      const dataMock: IBaseOrderByData = {
        name: 'asc',
        createdAt: 'asc'
      };
      const responseMock = [
        {
          name: 'asc'
        },
        {
          createdAt: 'asc'
        }
      ];

      expect(new PrismaMapper().toOrderBy(dataMock)).toStrictEqual(
        responseMock
      );
    });
  });

  describe('toWhereIds', () => {
    it('should return correct data where ids values', async () => {
      const dataMock: string[] = ['id1', 'id2', 'id3'];
      const responseMock = {
        in: dataMock
      };

      expect(new PrismaMapper().toWhereIds(dataMock)).toStrictEqual(
        responseMock
      );
    });
  });

  describe('toWhere', () => {
    it('should return correct where values', async () => {
      const dataMock: IWhere<Record<string, IWhereData>> = {
        AND: {
          teste: {
            equals: 'meu teste'
          }
        },
        NOT: undefined,
        OR: undefined
      };
      const responseMock = {
        AND: {
          teste: {
            equals: 'meu teste'
          }
        }
      };

      expect(new PrismaMapper().toWhere(dataMock)).toStrictEqual(responseMock);
    });
    it('should remove data when data is empty', async () => {
      const dataMock: IWhere<Record<string, IWhereData<string | number>>> = {
        AND: {
          teste: {
            equals: 'meu teste'
          },
          age: {
            equals: undefined
          }
        },
        NOT: {
          teste: {
            equals: ''
          }
        },
        OR: undefined
      };
      const responseMock = {
        AND: {
          teste: {
            equals: 'meu teste'
          }
        }
      };

      expect(new PrismaMapper().toWhere(dataMock)).toStrictEqual(responseMock);
    });
    it('should return correct data with empty values in NOT option', async () => {
      const dataMock: IWhere<Record<string, IWhereData>> = {
        AND: {
          teste: {
            equals: 'meu teste'
          }
        },
        NOT: {
          teste: {
            equals: ''
          }
        },
        OR: undefined
      };
      const responseMock = {
        AND: {
          teste: {
            equals: 'meu teste'
          }
        },
        NOT: {
          teste: {
            equals: ''
          }
        }
      };

      expect(
        new PrismaMapper().toWhere(dataMock, {
          NOT: true
        })
      ).toStrictEqual(responseMock);
    });
  });

  describe('toWhereData', () => {
    it('should return correct where values', async () => {
      const dataMock: IWhereData<string> = {
        equals: 'Jhon'
      };
      const responseMock = {
        equals: 'Jhon'
      };

      expect(new PrismaMapper().toWhereData(dataMock)).toStrictEqual(
        responseMock
      );
    });
  });
  describe('toWhereDataInterval', () => {
    it('should return correct where values are less and equal or greater and equal to range', async () => {
      const dataMock: IWhereDataInterval<number> = {
        lessEquals: 50,
        greaterEquals: 18
      };
      const responseMock = {
        lte: 50,
        gte: 18
      };

      expect(new PrismaMapper().toWhereDataInterval(dataMock)).toStrictEqual(
        responseMock
      );
    });

    it('should return correct where values are less than or greater than the range', async () => {
      const dataMock: IWhereDataInterval<number> = {
        less: 50,
        greater: 18
      };
      const responseMock = {
        lt: 50,
        gt: 18
      };

      expect(new PrismaMapper().toWhereDataInterval(dataMock)).toStrictEqual(
        responseMock
      );
    });
  });

  describe('toWhereDataSearch', () => {
    const mode = 'insensitive';
    it('should return the correct search value', async () => {
      const name = 'Jhon Doe';
      const dataMock: IWhereDataSearch<string> = {
        search: name
      };
      const responseMock = {
        contains: name,
        mode
      };

      expect(new PrismaMapper().toWhereDataSearch(dataMock)).toStrictEqual(
        responseMock
      );
    });
    it('should return the correct startsWith value', async () => {
      const name = 'Jhon';
      const dataMock: IWhereDataSearch<string> = {
        startsWith: name
      };
      const responseMock = {
        startsWith: name,
        mode
      };

      expect(new PrismaMapper().toWhereDataSearch(dataMock)).toStrictEqual(
        responseMock
      );
    });
    it('should return the correct endsWith value', async () => {
      const name = 'Due';
      const dataMock: IWhereDataSearch<string> = {
        endsWith: name
      };
      const responseMock = {
        endsWith: name,
        mode
      };

      expect(new PrismaMapper().toWhereDataSearch(dataMock)).toStrictEqual(
        responseMock
      );
    });
    it('should return the correct startsWith and endsWith value', async () => {
      const firstname = 'Jhon';
      const lastname = 'Due';
      const dataMock: IWhereDataSearch<string> = {
        startsWith: firstname,
        endsWith: lastname
      };
      const responseMock = {
        startsWith: firstname,
        endsWith: lastname,
        mode
      };

      expect(new PrismaMapper().toWhereDataSearch(dataMock)).toStrictEqual(
        responseMock
      );
    });
  });

  describe('toPagination', () => {
    it('should return correct values', async () => {
      const dataMock: IPaginationArgsToPrismaDataPaginationPrismaMapper = {
        page: {
          limit: 2,
          number: 1
        }
      };
      const responseMock = {
        skip: 0,
        take: 2
      };

      expect(new PrismaMapper().toPagination(dataMock)).toStrictEqual(
        responseMock
      );
      expect(
        new PrismaMapper().toPagination({
          page: {
            limit: 2,
            number: 2
          }
        })
      ).toStrictEqual({
        skip: 2,
        take: 2
      });
      expect(
        new PrismaMapper().toPagination({
          page: {
            limit: 2,
            number: 3
          }
        })
      ).toStrictEqual({
        skip: 4,
        take: 2
      });
      expect(
        new PrismaMapper().toPagination({
          page: {
            limit: 2,
            number: 4
          }
        })
      ).toStrictEqual({
        skip: 6,
        take: 2
      });
    });
    it('should return MAX LIMIT when limit is exceeded', async () => {
      const dataMock: IPaginationArgsToPrismaDataPaginationPrismaMapper = {
        page: {
          limit: MAX_PAGE_LIMIT + 1,
          number: 1
        }
      };
      const responseMock = {
        skip: 0,
        take: MAX_PAGE_LIMIT
      };

      expect(new PrismaMapper().toPagination(dataMock)).toStrictEqual(
        responseMock
      );
    });
    it('should return MAX LIMIT when limit is negative', async () => {
      const dataMock: IPaginationArgsToPrismaDataPaginationPrismaMapper = {
        page: {
          limit: MIN_PAGE_LIMIT - 1,
          number: 1
        }
      };
      const responseMock = {
        skip: 0,
        take: MAX_PAGE_LIMIT
      };

      expect(new PrismaMapper().toPagination(dataMock)).toStrictEqual(
        responseMock
      );
    });
  });
});
