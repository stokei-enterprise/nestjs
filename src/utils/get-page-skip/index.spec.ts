import { getPageSkip } from '.';

describe('getPageSkip', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return zero when page number is negative', () => {
    expect(getPageSkip(-1, 10)).toStrictEqual(0);
  });

  it('should return zero when page number is 1 with page size 10', () => {
    expect(getPageSkip(1, 10)).toStrictEqual(0);
  });

  it('should return 10 when page number is 2 with page size 10', () => {
    expect(getPageSkip(2, 10)).toStrictEqual(10);
  });
});
