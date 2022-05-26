import { cleanObject } from '.';

describe('Cleaners', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('cleanObject', () => {
    it('should return an object formatted', () => {
      const date = new Date().toISOString();
      const object = {
        ids: ['id1', 'id2'],
        name: 'Douglas',
        age: 24,
        createdAt: date
      };
      const responseMock = {
        ids: ['id1', 'id2'],
        name: 'Douglas',
        age: 24,
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
