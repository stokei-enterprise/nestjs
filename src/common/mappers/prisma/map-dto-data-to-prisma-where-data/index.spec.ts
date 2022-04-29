import { IWhereData } from 'libs/common/src/interfaces';
import { mapDTODataToPrismaWhereData } from '.';

describe('mapDTODataToPrismaWhereData', () => {
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

    expect(mapDTODataToPrismaWhereData(columnName, dataMock)).toStrictEqual(
      responseMock
    );
  });
});
