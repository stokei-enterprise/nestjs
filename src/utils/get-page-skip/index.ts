export const getPageSkip = (pageNumber, limit) =>
  pageNumber > 1 ? (pageNumber - 1) * limit : 0;
