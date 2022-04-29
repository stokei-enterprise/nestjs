import { IWhereData } from '../../../interfaces';

export const mapDTODataToPrismaWhereData = <
  TColumnType = string,
  TDataType = string
>(
  columnName: TColumnType,
  data: IWhereData<TDataType>
) =>
  columnName && {
    [columnName + '']: {
      ...(data?.equals && {
        equals: data?.equals
      })
    }
  };
