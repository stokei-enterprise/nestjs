import { IWhereDataInterval } from '../../../interfaces';

import { mapDTODataToPrismaWhereData } from '../map-dto-data-to-prisma-where-data';

export const mapDTODataToPrismaWhereDataInterval = <
  TColumnType = string,
  TDataType = string
>(
  columnName: TColumnType,
  data: IWhereDataInterval<TDataType>
) =>
  columnName && {
    [columnName + '']: {
      ...mapDTODataToPrismaWhereData<TColumnType, TDataType>(
        columnName,
        data?.equals
      )[columnName + ''],
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
  };
