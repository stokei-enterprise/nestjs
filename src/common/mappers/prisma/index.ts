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
import {
  cleanObject,
  cleanValueNumber,
  getPageLimit,
  getPageSkip
} from '../../../utils';

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
  toWhereIds(data: string[]) {
    return (
      data?.length > 0 && {
        in: data
      }
    );
  }
  toWhereData<TDataType = string>(data: IWhereData<TDataType>) {
    return (
      data?.equals && {
        equals: data?.equals
      }
    );
  }
  toWhereDataInterval<TDataType = string>(data: IWhereDataInterval<TDataType>) {
    return {
      ...this.toWhereData<TDataType>(data?.equals),
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
    };
  }
  toWhereDataSearch<TDataType = string>(data: IWhereDataSearch<TDataType>) {
    return {
      ...this.toWhereData<TDataType>(data?.equals),
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
    };
  }
  toPagination(data: IPaginationArgsToPrismaDataPaginationPrismaMapper) {
    if (!data?.page) {
      return null;
    }
    const limit = getPageLimit(cleanValueNumber(data?.page.limit));
    const pageNumber = cleanValueNumber(data?.page.number) || 1;
    const skip = getPageSkip(pageNumber, limit);
    return {
      skip,
      take: limit
    };
  }
}
