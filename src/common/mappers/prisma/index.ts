import {
  IBaseOrderByData,
  IOperator,
  IPaginationArgsToPrismaDataPaginationPrismaMapper,
  IWhere,
  IWhereAllowIsEmptyValues,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '../../../interfaces';
import { cleanObject, cleanValueNumber } from '../../../utils/cleaners';

export const MAX_LIMIT = 20;
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
  toWhere<TDataType = IWhere>(
    data: TDataType,
    allowIsEmptyValues?: IWhereAllowIsEmptyValues
  ) {
    const mapDTODataToPrisma = (operator: IOperator) => {
      let operatorData: any = data?.[operator];
      if (!operatorData) {
        return null;
      }
      if (operator === 'OR') {
        operatorData = Object.entries(operatorData).map(
          ([currentOperatorDataKey, currentOperatorDataValue]) => ({
            [currentOperatorDataKey]: currentOperatorDataValue
          })
        );
      }
      return {
        [operator]: operatorData
      };
    };
    return {
      ...cleanObject(mapDTODataToPrisma('AND'), allowIsEmptyValues?.AND),
      ...cleanObject(mapDTODataToPrisma('OR'), allowIsEmptyValues?.OR),
      ...cleanObject(mapDTODataToPrisma('NOT'), allowIsEmptyValues?.NOT)
    };
  }
  toWhereIds<TColumnType = string>(columnName: TColumnType, data: string[]) {
    return (
      columnName && {
        [columnName + '']: {
          ...(data?.length > 0 && {
            in: data
          })
        }
      }
    );
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
    const skip = pageNumber > 1 ? (pageNumber - 1) * limit : 0;
    return {
      skip,
      take: limit
    };
  }
}
