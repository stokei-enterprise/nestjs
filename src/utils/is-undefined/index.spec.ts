import { isUndefined } from '.';

describe('isUndefined', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when value is undefined', () => {
    expect(isUndefined(undefined)).toStrictEqual(true);
  });

  it('should return false when value is not undefined', () => {
    expect(isUndefined('anyValue')).toStrictEqual(false);
  });
});
