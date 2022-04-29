import { IWhereDataSearch } from 'libs/common/src/interfaces';
import { mapDTODataToPrismaWhereDataSearch } from '.';

describe('mapDTODataToPrismaWhereDataSearch', () => {
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
      mapDTODataToPrismaWhereDataSearch(columnName, dataMock)
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
      mapDTODataToPrismaWhereDataSearch(columnName, dataMock)
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
      mapDTODataToPrismaWhereDataSearch(columnName, dataMock)
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
      mapDTODataToPrismaWhereDataSearch(columnName, dataMock)
    ).toStrictEqual(responseMock);
  });
});
