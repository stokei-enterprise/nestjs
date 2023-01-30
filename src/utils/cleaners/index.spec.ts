import { cleanObject, cleanValueBoolean } from '.';

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
  describe('cleanObject', () => {
    it('should return an object formatted', () => {
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
    it('should return an array of ids formatted', () => {
      const object = {
        ids: ['id1', 'id2']
      };
      const responseMock = {
        ids: ['id1', 'id2']
      };
      expect(cleanObject(object)).toStrictEqual(responseMock);
    });
    it('should return an object with internal array formatted', () => {
      const object = {
        accounts: [{ name: 'Douglas' }, { name: 'João' }]
      };
      const responseMock = {
        accounts: [{ name: 'Douglas' }, { name: 'João' }]
      };
      expect(cleanObject(object)).toStrictEqual(responseMock);
    });
  });
});
