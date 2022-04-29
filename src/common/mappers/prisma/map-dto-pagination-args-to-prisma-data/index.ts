import { cleanValueNumber } from '@stokei/shared';
import { IPaginatinInputDTO } from '../../../interfaces';

export const MAX_LIMIT = 1000;
export const MIN_LIMIT = 1;

export interface IMapDTOPaginationInputToPrismaData {
  page: IPaginatinInputDTO;
}

export const mapDTOPaginationInputToPrismaData = (
  data: IMapDTOPaginationInputToPrismaData
) => {
  if (!data?.page) {
    return null;
  }
  let limit = cleanValueNumber(data?.page.limit);
  const pageNumber = cleanValueNumber(data?.page.number) || 1;

  limit = limit >= MIN_LIMIT && limit <= MAX_LIMIT ? limit : MAX_LIMIT;
  const skip = pageNumber > 1 ? pageNumber * limit - 1 : 0;
  return {
    skip,
    take: limit
  };
};
