import {
  IOrderBy,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '../../interfaces';
import { isBoolean } from '../is-boolean';

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

export const cleanDate = (date: string | number | Date) => {
  if (typeof date === 'number') {
    return cleanValueNumber(date);
  }
  if (typeof date === 'string') {
    return cleanValue(date);
  }
  return date;
};

export const cleanValueBoolean = (value: any): boolean => {
  const values = {
    true: true,
    '1': true,
    false: false,
    '0': false
  };

  return values[String(value)];
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
  if (typeof data === 'undefined' || data === null) {
    return undefined;
  }
  const isAllowEmpty = isBoolean(isAllowEmptyValue) ? isAllowEmptyValue : false;
  const canReturnValue = (value: any) =>
    !!(isAllowEmpty || value || isBoolean(value));

  if (typeof data !== 'object') {
    if (canReturnValue(data)) {
      return data;
    }
    return undefined;
  }

  const isArrayData = Array.isArray(data);
  if (isArrayData) {
    const isEmptyData = !data?.length;
    if (isEmptyData) {
      return undefined;
    }
    const array = data
      .map((currentData) => {
        if (typeof currentData === 'object') {
          return cleanObject(currentData, isAllowEmpty);
        }
        return currentData;
      })
      ?.filter(Boolean);
    const isEmptyArray = !array?.length;
    if (isEmptyArray) {
      return undefined;
    }
    return array;
  }

  const objectEntries = Object.entries(data);
  const isEmptyObject = objectEntries?.length > 0;
  if (!isEmptyObject) {
    return undefined;
  }
  const result = objectEntries.reduce(
    (prevObject, [currentObjectKey, currentObjectValue]) => {
      const currentValue = cleanObject(currentObjectValue, isAllowEmpty);
      return {
        ...prevObject,
        ...(canReturnValue(currentValue) && {
          [currentObjectKey]: currentValue
        })
      };
    },
    {}
  );
  const isEmptyResult = !Object.entries(result)?.length;
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
