import {
  IMapDTOPaginationInputToPrismaData,
  mapDTOPaginationInputToPrismaData,
  MAX_LIMIT,
  MIN_LIMIT
} from '.';

describe('mapDTOPaginationInputToPrismaData', () => {
  it('should return correct values', async () => {
    const dataMock: IMapDTOPaginationInputToPrismaData = {
      page: {
        limit: 2,
        number: 1
      }
    };
    const responseMock = {
      skip: 0,
      take: 2
    };

    expect(mapDTOPaginationInputToPrismaData(dataMock)).toStrictEqual(
      responseMock
    );
  });
  it('should return MAX LIMIT when limit is exceeded', async () => {
    const dataMock: IMapDTOPaginationInputToPrismaData = {
      page: {
        limit: MAX_LIMIT + 1,
        number: 1
      }
    };
    const responseMock = {
      skip: 0,
      take: MAX_LIMIT
    };

    expect(mapDTOPaginationInputToPrismaData(dataMock)).toStrictEqual(
      responseMock
    );
  });
  it('should return MAX LIMIT when limit is negative', async () => {
    const dataMock: IMapDTOPaginationInputToPrismaData = {
      page: {
        limit: MIN_LIMIT - 1,
        number: 1
      }
    };
    const responseMock = {
      skip: 0,
      take: MAX_LIMIT
    };

    expect(mapDTOPaginationInputToPrismaData(dataMock)).toStrictEqual(
      responseMock
    );
  });
});
