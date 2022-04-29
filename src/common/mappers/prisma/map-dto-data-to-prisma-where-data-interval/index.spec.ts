import { IWhereDataInterval } from 'libs/common/src/interfaces';
import { mapDTODataToPrismaWhereDataInterval } from '.';

describe('mapDTODataToPrismaWhereDataInterval', () => {
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
      mapDTODataToPrismaWhereDataInterval(columnName, dataMock)
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
      mapDTODataToPrismaWhereDataInterval(columnName, dataMock)
    ).toStrictEqual(responseMock);
  });
});
