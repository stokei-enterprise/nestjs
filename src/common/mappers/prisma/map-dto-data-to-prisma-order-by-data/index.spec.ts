import { IBaseOrderByData } from 'libs/common/src/interfaces';
import { mapDTODataToPrismaOrderByData } from '.';

describe('mapDTODataToPrismaOrderByData', () => {
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

    expect(mapDTODataToPrismaOrderByData(dataMock)).toStrictEqual(responseMock);
  });
});
