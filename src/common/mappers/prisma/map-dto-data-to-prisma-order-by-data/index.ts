import { IBaseOrderByData } from '../../../interfaces';

export const mapDTODataToPrismaOrderByData = (data: IBaseOrderByData) => {
  if (!data) {
    return undefined;
  }
  return Object.entries(data).map(([dataKey, dataValue]) => ({
    [dataKey]: dataValue
  }));
};
