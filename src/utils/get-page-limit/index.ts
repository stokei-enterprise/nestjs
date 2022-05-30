import { MAX_PAGE_LIMIT, MIN_PAGE_LIMIT } from '../../constants/pagination';

export const getPageLimit = (limit) =>
  limit >= MIN_PAGE_LIMIT && limit <= MAX_PAGE_LIMIT ? limit : MAX_PAGE_LIMIT;
