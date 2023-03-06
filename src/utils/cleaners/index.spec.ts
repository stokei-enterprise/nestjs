import { IWhere, IWhereData } from '../../interfaces';
import {
  cleanObject,
  cleanValueBoolean,
  cleanWhere,
  cleanWhereDataNumber,
  cleanWhereDataString
} from '.';

describe('Cleaners', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('cleanValueBoolean', () => {
    it('should return an boolean', () => {
      expect(cleanValueBoolean(true)).toStrictEqual(true);
      expect(cleanValueBoolean('true')).toStrictEqual(true);
      expect(cleanValueBoolean(1)).toStrictEqual(true);
      expect(cleanValueBoolean('1')).toStrictEqual(true);

      expect(cleanValueBoolean('false')).toStrictEqual(false);
      expect(cleanValueBoolean(false)).toStrictEqual(false);
      expect(cleanValueBoolean('0')).toStrictEqual(false);
      expect(cleanValueBoolean(0)).toStrictEqual(false);
    });
    it('should return undefined when is not a boolean', () => {
      expect(cleanValueBoolean('any')).toStrictEqual(undefined);
    });
  });

  describe('cleanWhere', () => {
    it('should return correct where values', async () => {
      const dataMock = {
        AND: {
          test: {
            equals: 'my test'
          }
        },
        NOT: {
          test: {
            equals: 'anymore'
          }
        },
        OR: [
          {
            test: {
              equals: 'any'
            }
          }
        ]
      };
      const responseMock = {
        AND: {
          test: {
            equals: 'my test'
          }
        },
        NOT: {
          test: {
            equals: 'anymore'
          }
        },
        OR: [
          {
            test: {
              equals: 'any'
            }
          }
        ]
      };

      expect(
        cleanWhere({
          data: dataMock,
          operatorMapper: (value) => ({
            test: cleanWhereDataString(value.test)
          })
        })
      ).toStrictEqual(responseMock);
    });
    it('should remove data when data is empty', async () => {
      const dataMock: IWhere<Record<string, IWhereData<string | number>>> = {
        AND: {
          test: {
            equals: 'my test'
          },
          age: {
            equals: undefined
          }
        },
        NOT: {
          test: {
            equals: ''
          }
        },
        OR: undefined
      };
      const responseMock = {
        AND: {
          test: {
            equals: 'my test'
          }
        }
      };

      expect(
        cleanWhere({
          data: dataMock,
          operatorMapper: (value) => ({
            test: cleanWhereDataString(value?.test as any),
            age: cleanWhereDataNumber(value?.age as any)
          })
        })
      ).toStrictEqual(responseMock);
    });
    it('should return correct data with empty values in NOT option', async () => {
      const dataMock = {
        AND: {
          test: {
            equals: 'my test'
          }
        },
        NOT: {
          test: {
            equals: ''
          }
        },
        OR: undefined
      };
      const responseMock = {
        AND: {
          test: {
            equals: 'my test'
          }
        },
        NOT: {
          test: {
            equals: ''
          }
        }
      };

      expect(
        cleanWhere({
          data: dataMock,
          operatorMapper: (value) => {
            return {
              test: cleanWhereDataString(value.test)
            };
          },
          allowIsEmptyValues: {
            NOT: true
          }
        })
      ).toStrictEqual(responseMock);
    });
  });

  describe('cleanObject', () => {
    it('should remove invalid values when it has invalid data', () => {
      const date = new Date().toISOString();
      const object = {
        ids: ['id1', 'id2'],
        name: 'Douglas',
        age: 24,
        nullableValue: null,
        undefinedValue: undefined,
        boolFalse: false,
        boolTrue: true,
        createdAt: date
      };
      const responseMock = {
        ids: ['id1', 'id2'],
        name: 'Douglas',
        age: 24,
        boolFalse: false,
        boolTrue: true,
        createdAt: date
      };
      expect(cleanObject(object)).toStrictEqual(responseMock);
    });
    it('should keep the same object when it has all valid data', () => {
      const object = {
        ids: ['id1', 'id2']
      };
      const responseMock = {
        ids: ['id1', 'id2']
      };
      expect(cleanObject(object)).toStrictEqual(responseMock);
    });
    it('should remove undefined items when array has undefined or null items', () => {
      const object = [undefined, null, undefined];
      const responseMock = undefined;
      expect(cleanObject(object)).toStrictEqual(responseMock);
    });
    it('should remove undefined when array has just undefined or null items', () => {
      const object = [undefined, null, undefined];
      const responseMock = undefined;
      expect(cleanObject(object)).toStrictEqual(responseMock);
    });
    it('should return an object with internal array formatted', () => {
      const object = {
        accounts: [{ name: 'Douglas' }, { name: 'João', age: null }]
      };
      const responseMock = {
        accounts: [{ name: 'Douglas' }, { name: 'João' }]
      };
      expect(cleanObject(object)).toStrictEqual(responseMock);
    });
  });
});
