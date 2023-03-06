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
  toWhere<DTO = any>({
    data,
    allowIsEmptyValues,
    operatorMapper
  }: {
    data: IWhere<DTO>;
    operatorMapper?: (operatorData: DTO) => any;
    allowIsEmptyValues?: IWhereAllowIsEmptyValues;
  }) {
    const mapper = operatorMapper
      ? operatorMapper
      : (operatorData) => operatorData;
    const clearMapper = (operatorData) =>
      operatorData ? mapper(operatorData) : undefined;
    return {
      ...cleanObject(
        {
          AND: clearMapper(data?.AND)
        },
        allowIsEmptyValues?.AND
      ),
      ...cleanObject(
        {
          OR: data?.OR?.map(clearMapper)
        },
        allowIsEmptyValues?.OR
      ),
      ...cleanObject(
        {
          NOT: clearMapper(data?.NOT)
        },
        allowIsEmptyValues?.NOT
      )
    };
  }
  toWhereIds(data: string[]) {
    return {
      in: data
    };
  }
  toWhereData<TDataType = string>(data: IWhereData<TDataType>) {
    return {
      equals: data?.equals
    };
  }
  toWhereDataInterval<TDataType = string>(data: IWhereDataInterval<TDataType>) {
    return {
      ...this.toWhereData<TDataType>(data),
      ...{
        lt: data?.less
      },
      ...{
        lte: data?.lessEquals
      },
      ...{
        gt: data?.greater
      },
      ...{
        gte: data?.greaterEquals
      }
    };
  }
  toWhereDataSearch<TDataType = string>(data: IWhereDataSearch<TDataType>) {
    return {
      ...this.toWhereData<TDataType>(data),
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
