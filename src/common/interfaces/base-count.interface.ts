import { IWhere } from './base-find-many.interface';

export interface IBaseCountDTO<TWhereData = any> {
  where?: IWhere<TWhereData>;
}
