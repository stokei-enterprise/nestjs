import { isBoolean } from '.';

describe('isBoolean', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when value is boolean', () => {
    expect(isBoolean(true)).toStrictEqual(true);
    expect(isBoolean(false)).toStrictEqual(true);
    expect(isBoolean(1)).toStrictEqual(true);
    expect(isBoolean(0)).toStrictEqual(true);
    expect(isBoolean('true')).toStrictEqual(true);
    expect(isBoolean('false')).toStrictEqual(true);
    expect(isBoolean('1')).toStrictEqual(true);
    expect(isBoolean('0')).toStrictEqual(true);
  });

  it('should return false when value is not boolean', () => {
    expect(isBoolean(undefined)).toStrictEqual(false);
    expect(isBoolean(null)).toStrictEqual(false);
    expect(isBoolean('anyValue')).toStrictEqual(false);
  });
});
