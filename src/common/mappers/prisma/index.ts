import {
  IBaseOrderByData,
  IPaginationArgsToPrismaDataPaginationPrismaMapper,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '@/interfaces';
import { cleanValueNumber } from '@/utils/cleaners';

export const MAX_LIMIT = 1000;
export const MIN_LIMIT = 1;

export class PrismaMapper {
  toOrderBy(data: IBaseOrderByData) {
    if (!data) {
      return undefined;
    }
    return Object.entries(data).map(([dataKey, dataValue]) => ({
      [dataKey]: dataValue
    }));
  }
  toWhereData<TColumnType = string, TDataType = string>(
    columnName: TColumnType,
    data: IWhereData<TDataType>
  ) {
    return (
      columnName && {
        [columnName + '']: {
          ...(data?.equals && {
            equals: data?.equals
          })
        }
      }
    );
  }
  toWhereDataInterval<TColumnType = string, TDataType = string>(
    columnName: TColumnType,
    data: IWhereDataInterval<TDataType>
  ) {
    return (
      columnName && {
        [columnName + '']: {
          ...this.toWhereData<TColumnType, TDataType>(columnName, data?.equals)[
            columnName + ''
          ],
          ...(data?.less && {
            lt: data?.less
          }),
          ...(data?.lessEquals && {
            lte: data?.lessEquals
          }),
          ...(data?.greater && {
            gt: data?.greater
          }),
          ...(data?.greaterEquals && {
            gte: data?.greaterEquals
          })
        }
      }
    );
  }
  toWhereDataSearch<TColumnType = string, TDataType = string>(
    columnName: TColumnType,
    data: IWhereDataSearch<TDataType>
  ) {
    return (
      columnName && {
        [columnName + '']: {
          ...this.toWhereData<TColumnType, TDataType>(columnName, data?.equals)[
            columnName + ''
          ],
          ...(data?.search && {
            contains: data?.search,
            mode: 'insensitive'
          }),
          ...(data?.startsWith && {
            startsWith: data?.startsWith,
            mode: 'insensitive'
          }),
          ...(data?.endsWith && {
            endsWith: data?.endsWith,
            mode: 'insensitive'
          })
        }
      }
    );
  }
  toPagination(data: IPaginationArgsToPrismaDataPaginationPrismaMapper) {
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
  }
}
