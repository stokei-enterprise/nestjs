import { HIDDEN_DATA_STRING, hiddenPrivateDataFromObject } from '.';

describe('hiddenPrivateDataFromObject', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hide private data', () => {
    const date = new Date().toISOString();
    const object = {
      ids: ['id1', 'id2'],
      name: 'Douglas',
      age: 24,
      password: '1123454515151',
      salt: 'SADAS561DAS515sd6a1das51das61',
      accounts: [
        {
          name: 'Douglas',
          age: 24,
          password: '1123454515151',
          salt: 'SADAS561DAS515sd6a1das51das61'
        },
        {
          name: 'Joao',
          age: 25,
          password: '1123454515151',
          salt: 'SADAS561DAS515sd6a1das51das61'
        }
      ],
      createdAt: date
    };
    const responseMock = {
      ids: ['id1', 'id2'],
      name: 'Douglas',
      age: 24,
      password: HIDDEN_DATA_STRING,
      salt: HIDDEN_DATA_STRING,
      accounts: [
        {
          name: 'Douglas',
          age: 24,
          password: HIDDEN_DATA_STRING,
          salt: HIDDEN_DATA_STRING
        },
        {
          name: 'Joao',
          age: 25,
          password: HIDDEN_DATA_STRING,
          salt: HIDDEN_DATA_STRING
        }
      ],
      createdAt: date
    };
    expect(
      hiddenPrivateDataFromObject(object, ['password', 'salt'])
    ).toStrictEqual(responseMock);
  });

  it('should return clean object with private data', () => {
    const date = new Date().toISOString();
    const object = {
      ids: ['id1', 'id2'],
      name: 'Douglas',
      age: 24,
      password: '1123454515151',
      createdAt: date
    };
    const responseMock = {
      ids: ['id1', 'id2'],
      name: 'Douglas',
      age: 24,
      password: '1123454515151',
      createdAt: date
    };
    expect(hiddenPrivateDataFromObject(object, [])).toStrictEqual(responseMock);
  });
});
