import {
  IBaseOrderByData,
  IPaginationArgsToPrismaDataPaginationPrismaMapper,
  IWhere,
  IWhereAllowIsEmptyValues,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '../../../interfaces';
import {
  cleanValueNumber,
  cleanWhere,
  getPageLimit,
  getPageSkip,
  isUndefined
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
  toWhere<DTO = any>({
    data,
    allowIsEmptyValues,
    operatorMapper
  }: {
    data: IWhere<DTO>;
    operatorMapper?: (operatorData: DTO) => any;
    allowIsEmptyValues?: IWhereAllowIsEmptyValues;
  }) {
    return cleanWhere({
      data,
      operatorMapper,
      allowIsEmptyValues
    });
  }
  toWhereIds(data: string[]) {
    return !isUndefined(data)
      ? {
          in: data
        }
      : undefined;
  }
  toWhereData<TDataType = string | string[]>(data: IWhereData<TDataType>) {
    if (isUndefined(data?.equals)) {
      return undefined;
    }
    if (Array.isArray(data?.equals)) {
      return this.toWhereIds(data?.equals);
    }
    return {
      equals: data?.equals
    };
  }
  toWhereDataInterval<TDataType = string | string[]>(
    data: IWhereDataInterval<TDataType>
  ) {
    return {
      ...this.toWhereData<TDataType>(data),
      ...(!isUndefined(data?.less) && {
        lt: data?.less
      }),
      ...(!isUndefined(data?.lessEquals) && {
        lte: data?.lessEquals
      }),
      ...(!isUndefined(data?.greater) && {
        gt: data?.greater
      }),
      ...(!isUndefined(data?.greaterEquals) && {
        gte: data?.greaterEquals
      })
    };
  }
  toWhereDataSearch<TDataType = string | string[]>(
    data: IWhereDataSearch<TDataType>
  ) {
    return {
      ...this.toWhereData<TDataType>(data),
      ...(!isUndefined(data?.search) && {
        contains: data?.search
      }),
      ...(!isUndefined(data?.startsWith) && {
        startsWith: data?.startsWith
      }),
      ...(!isUndefined(data?.endsWith) && {
        endsWith: data?.endsWith
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
