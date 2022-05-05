import {
  IOrderBy,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '../../interfaces';

export const cleanSortValue = (value: IOrderBy): IOrderBy => {
  switch (value) {
    case 'asc':
    case '1':
      return 'asc';
    case 'desc':
    case '-1':
      return 'desc';
    default:
      return null;
  }
};

export const cleanValue = (value: string): string => {
  if (value) {
    return String(value).trim();
  }
  return null;
};

export const cleanValueNumber = (value: number): number => {
  try {
    if (isNaN(value)) {
      return null;
    }
    if (value || value === 0) {
      return Number(value);
    }
  } catch (error) {}
  return null;
};

export const cleanValueBoolean = (value: any): boolean => {
  switch (String(value)) {
    case 'true':
    case '1':
      return true;
    case 'false':
    case '0':
      return false;
    default:
      return undefined;
  }
};

export const cleanSlug = (value: string): string => {
  try {
    value = cleanValue(value);
    if (value) {
      value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
      return value.replace(/[^A-Za-z0-9]/g, '')?.toLowerCase();
    }
  } catch (error) {}
  return null;
};

export const cleanUsername = (value: string): string => {
  try {
    value = cleanValue(value);
    if (value) {
      value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
      return value.replace(/[^A-Za-z0-9]/g, '')?.toLowerCase();
    }
  } catch (error) {}
  return null;
};

export const cleanEmail = (value: string): string => {
  try {
    return cleanValue(value)?.toLowerCase();
  } catch (error) {}
  return null;
};

export const cleanObject = <TData = any>(
  data: TData,
  isAllowEmptyValue?: boolean
): any => {
  if (!data) {
    return undefined;
  }
  const dataArray = Object.entries(data);
  const isEmptyData = dataArray?.length > 0;
  if (!isEmptyData) {
    return undefined;
  }
  const result = dataArray.reduce(
    (prevData, [currentDataKey, currentDataValue]) => {
      let currentValue = currentDataValue;
      if (typeof currentDataValue === 'object') {
        currentValue = cleanObject(currentDataValue, isAllowEmptyValue);
      }
      return {
        ...prevData,
        ...((isAllowEmptyValue || currentValue) && {
          [currentDataKey]: currentValue
        })
      };
    },
    {}
  );
  const isEmptyResult = !Object.values(result)?.length;
  if (isEmptyResult) {
    return undefined;
  }
  return result;
};

export const cleanWhereDataString = (
  data: IWhereData<string>
): IWhereData<string> => {
  return {
    equals: cleanValue(data?.equals)
  };
};

export const cleanWhereDataNumber = (
  data: IWhereData<number>
): IWhereData<number> => {
  return {
    equals: cleanValueNumber(data?.equals)
  };
};

export const cleanWhereDataBoolean = (
  data: IWhereData<boolean>
): IWhereData<boolean> => {
  return {
    equals: cleanValueBoolean(data?.equals)
  };
};

export const cleanWhereDataSearch = (
  data: IWhereDataSearch<string>
): IWhereDataSearch<string> => {
  return {
    equals: cleanValue(data?.equals),
    search: cleanValue(data?.search),
    startsWith: cleanValue(data?.startsWith),
    endsWith: cleanValue(data?.endsWith)
  };
};

export const cleanWhereDataIntervalString = (
  data: IWhereDataInterval<string>
): IWhereDataInterval<string> => {
  return {
    equals: cleanValue(data?.equals),
    less: cleanValue(data?.less),
    lessEquals: cleanValue(data?.lessEquals),
    greater: cleanValue(data?.greater),
    greaterEquals: cleanValue(data?.greaterEquals)
  };
};

export const cleanWhereDataIntervalNumber = (
  data: IWhereDataInterval<number>
): IWhereDataInterval<number> => {
  return {
    equals: cleanValueNumber(data?.equals),
    less: cleanValueNumber(data?.less),
    lessEquals: cleanValueNumber(data?.lessEquals),
    greater: cleanValueNumber(data?.greater),
    greaterEquals: cleanValueNumber(data?.greaterEquals)
  };
};
