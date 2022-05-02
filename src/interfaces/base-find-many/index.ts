import { IPaginatinInputDTO } from '../paginated';

export type IOrderBy = 'asc' | 'desc' | '1' | '-1';
export type IBaseOrderByData = Record<string, IOrderBy>;

export interface IWhereData<TDataType = string> {
  equals?: TDataType;
}

export interface IWhereDataSearch<TDataType = string>
  extends IWhereData<TDataType> {
  search?: TDataType;
  startsWith?: TDataType;
  endsWith?: TDataType;
}

export interface IWhereDataInterval<TDataType = string>
  extends IWhereData<TDataType> {
  greater?: TDataType;
  greaterEquals?: TDataType;
  less?: TDataType;
  lessEquals?: TDataType;
}

export type IOperator = 'OR' | 'AND' | 'NOT';
export interface IWhere<TDataType = Record<string, string>> {
  OR?: TDataType;
  AND?: TDataType;
  NOT?: TDataType;
}

export interface IBaseFindManyDTO<
  TWhereData = any,
  TOrderBy = IBaseOrderByData
> {
  where?: IWhere<TWhereData>;
  page?: IPaginatinInputDTO;
  orderBy?: TOrderBy;
}
