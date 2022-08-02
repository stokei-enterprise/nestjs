import { MAX_PAGE_LIMIT, MIN_PAGE_LIMIT } from '../../constants/pagination';
import { getPageLimit } from '.';

describe('getPageLimit', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct page limit', () => {
    expect(getPageLimit(2)).toStrictEqual(2);
  });

  it('should return MAX_PAGE_LIMIT when page number is less than MIN_PAGE_LIMIT', () => {
    expect(getPageLimit(MIN_PAGE_LIMIT - 1)).toStrictEqual(MAX_PAGE_LIMIT);
  });

  it('should return MAX_PAGE_LIMIT when page number is greater than MAX_PAGE_LIMIT', () => {
    expect(getPageLimit(MAX_PAGE_LIMIT + 1)).toStrictEqual(MAX_PAGE_LIMIT);
  });
});
