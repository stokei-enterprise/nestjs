import { IWhereDataSearch } from '../../../interfaces';
import { mapDTODataToPrismaWhereData } from '../map-dto-data-to-prisma-where-data';

export const mapDTODataToPrismaWhereDataSearch = <
  TColumnType = string,
  TDataType = string
>(
  columnName: TColumnType,
  data: IWhereDataSearch<TDataType>
) =>
  columnName && {
    [columnName + '']: {
      ...mapDTODataToPrismaWhereData<TColumnType, TDataType>(
        columnName,
        data?.equals
      )[columnName + ''],
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
  };
