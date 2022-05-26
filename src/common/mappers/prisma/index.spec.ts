import {
  IBaseOrderByData,
  IPaginationArgsToPrismaDataPaginationPrismaMapper,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '../../../interfaces';
import { PrismaMapper, MAX_LIMIT, MIN_LIMIT } from '.';

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
      const columnName = 'name';
      const dataMock: string[] = ['id1', 'id2', 'id3'];
      const responseMock = {
        [columnName]: {
          in: dataMock
        }
      };

      expect(new PrismaMapper().toWhereIds(columnName, dataMock)).toStrictEqual(
        responseMock
      );
    });
  });

  describe('toWhereData', () => {
    it('should return correct data where values', async () => {
      const columnName = 'name';
      const dataMock: IWhereData<string> = {
        equals: 'Jhon'
      };
      const responseMock = {
        [columnName]: {
          equals: 'Jhon'
        }
      };

      expect(
        new PrismaMapper().toWhereData(columnName, dataMock)
      ).toStrictEqual(responseMock);
    });
  });
  describe('toWhereDataInterval', () => {
    it('should return correct data where values are less and equal or greater and equal to range', async () => {
      const columnName = 'age';
      const dataMock: IWhereDataInterval<number> = {
        lessEquals: 50,
        greaterEquals: 18
      };
      const responseMock = {
        [columnName]: {
          lte: 50,
          gte: 18
        }
      };

      expect(
        new PrismaMapper().toWhereDataInterval(columnName, dataMock)
      ).toStrictEqual(responseMock);
    });

    it('should return correct data where values are less than or greater than the range', async () => {
      const columnName = 'age';
      const dataMock: IWhereDataInterval<number> = {
        less: 50,
        greater: 18
      };
      const responseMock = {
        [columnName]: {
          lt: 50,
          gt: 18
        }
      };

      expect(
        new PrismaMapper().toWhereDataInterval(columnName, dataMock)
      ).toStrictEqual(responseMock);
    });
  });

  describe('toWhereDataSearch', () => {
    const mode = 'insensitive';
    it('should return the correct search value', async () => {
      const name = 'Jhon Doe';
      const columnName = 'name';
      const dataMock: IWhereDataSearch<string> = {
        search: name
      };
      const responseMock = {
        [columnName]: {
          contains: name,
          mode
        }
      };

      expect(
        new PrismaMapper().toWhereDataSearch(columnName, dataMock)
      ).toStrictEqual(responseMock);
    });
    it('should return the correct startsWith value', async () => {
      const name = 'Jhon';
      const columnName = 'name';
      const dataMock: IWhereDataSearch<string> = {
        startsWith: name
      };
      const responseMock = {
        [columnName]: {
          startsWith: name,
          mode
        }
      };

      expect(
        new PrismaMapper().toWhereDataSearch(columnName, dataMock)
      ).toStrictEqual(responseMock);
    });
    it('should return the correct endsWith value', async () => {
      const name = 'Due';
      const columnName = 'name';
      const dataMock: IWhereDataSearch<string> = {
        endsWith: name
      };
      const responseMock = {
        [columnName]: {
          endsWith: name,
          mode
        }
      };

      expect(
        new PrismaMapper().toWhereDataSearch(columnName, dataMock)
      ).toStrictEqual(responseMock);
    });
    it('should return the correct startsWith and endsWith value', async () => {
      const firstname = 'Jhon';
      const lastname = 'Due';
      const columnName = 'name';
      const dataMock: IWhereDataSearch<string> = {
        startsWith: firstname,
        endsWith: lastname
      };
      const responseMock = {
        [columnName]: {
          startsWith: firstname,
          endsWith: lastname,
          mode
        }
      };

      expect(
        new PrismaMapper().toWhereDataSearch(columnName, dataMock)
      ).toStrictEqual(responseMock);
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
    });
    it('should return MAX LIMIT when limit is exceeded', async () => {
      const dataMock: IPaginationArgsToPrismaDataPaginationPrismaMapper = {
        page: {
          limit: MAX_LIMIT + 1,
          number: 1
        }
      };
      const responseMock = {
        skip: 0,
        take: MAX_LIMIT
      };

      expect(new PrismaMapper().toPagination(dataMock)).toStrictEqual(
        responseMock
      );
    });
    it('should return MAX LIMIT when limit is negative', async () => {
      const dataMock: IPaginationArgsToPrismaDataPaginationPrismaMapper = {
        page: {
          limit: MIN_LIMIT - 1,
          number: 1
        }
      };
      const responseMock = {
        skip: 0,
        take: MAX_LIMIT
      };

      expect(new PrismaMapper().toPagination(dataMock)).toStrictEqual(
        responseMock
      );
    });
  });
});
