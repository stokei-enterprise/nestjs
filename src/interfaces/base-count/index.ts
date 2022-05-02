import { IWhere } from '../base-find-many';

export interface IBaseCountDTO<TWhereData = any> {
  where?: IWhere<TWhereData>;
}
