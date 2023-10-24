import {
  IOrderBy,
  IWhere,
  IWhereAllowIsEmptyValues,
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
      return undefined;
  }
};

export const cleanValue = (value: string): string => {
  if (value) {
    return String(value).trim();
  }
  return '';
};

export const cleanValueNumber = (value: number): number => {
  try {
    if (isNaN(value)) {
      return undefined;
    }
    if (value || value === 0) {
      return Number(value);
    }
  } catch (error) {}
  return undefined;
};

export const cleanValueOrValues = (
  value: string | string[]
): string | string[] => {
  if (Array.isArray(value)) {
    return value?.map((currentValue) => cleanValue(currentValue));
  }
  return cleanValue(value);
};

export const cleanValueNumberOrValueNumbers = (
  value: number | number[]
): number | number[] => {
  if (Array.isArray(value)) {
    return value?.map((currentValue) => cleanValueNumber(currentValue));
  }
  return cleanValueNumber(value);
};

export const cleanValueBooleanOrValueBooleans = (
  value: boolean | boolean[]
): boolean | boolean[] => {
  if (Array.isArray(value)) {
    return value?.map((currentValue) => cleanValueBoolean(currentValue));
  }
  return cleanValueBoolean(value);
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
  return '';
};

export const cleanUsername = (value: string): string => {
  try {
    value = cleanValue(value);
    if (value) {
      value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
      return value.replace(/[^A-Za-z0-9]/g, '')?.toLowerCase();
    }
  } catch (error) {}
  return '';
};

export const cleanEmail = (value: string): string => {
  try {
    return cleanValue(value)?.toLowerCase();
  } catch (error) {}
  return '';
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

export const cleanWhere = <DTO = any>({
  data,
  allowIsEmptyValues,
  operatorMapper
}: {
  data: IWhere<DTO>;
  operatorMapper?: (operatorData: DTO) => any;
  allowIsEmptyValues?: IWhereAllowIsEmptyValues;
}) => {
  const mapper = operatorMapper
    ? operatorMapper
    : (operatorData) => operatorData;
  const cleanMapper = (operatorData) =>
    operatorData ? mapper(operatorData) : undefined;
  return {
    ...cleanObject(
      {
        AND: cleanMapper(data?.AND)
      },
      allowIsEmptyValues?.AND
    ),
    ...cleanObject(
      {
        OR: data?.OR?.map(cleanMapper)
      },
      allowIsEmptyValues?.OR
    ),
    ...cleanObject(
      {
        NOT: cleanMapper(data?.NOT)
      },
      allowIsEmptyValues?.NOT
    )
  };
};

export const cleanWhereDataString = (
  data: IWhereData<string | string[]>
): IWhereData<string | string[]> => {
  return {
    equals: cleanValueOrValues(data?.equals)
  };
};

export const cleanWhereDataNumber = (
  data: IWhereData<number | number[]>
): IWhereData<number | number[]> => {
  return {
    equals: cleanValueNumberOrValueNumbers(data?.equals)
  };
};

export const cleanWhereDataBoolean = (
  data: IWhereData<boolean | boolean[]>
): IWhereData<boolean | boolean[]> => {
  return {
    equals: cleanValueBooleanOrValueBooleans(data?.equals)
  };
};

export const cleanWhereDataSearch = (
  data: IWhereDataSearch<string | string[]>
): IWhereDataSearch<string | string[]> => {
  return {
    ...cleanWhereDataString(data),
    search: cleanValueOrValues(data?.search),
    startsWith: cleanValueOrValues(data?.startsWith),
    endsWith: cleanValueOrValues(data?.endsWith)
  };
};

export const cleanWhereDataIntervalString = (
  data: IWhereDataInterval<string | string[]>
): IWhereDataInterval<string | string[]> => {
  return {
    equals: cleanValueOrValues(data?.equals),
    less: cleanValueOrValues(data?.less),
    lessEquals: cleanValueOrValues(data?.lessEquals),
    greater: cleanValueOrValues(data?.greater),
    greaterEquals: cleanValueOrValues(data?.greaterEquals)
  };
};

export const cleanWhereDataIntervalNumber = (
  data: IWhereDataInterval<number | number[]>
): IWhereDataInterval<number | number[]> => {
  return {
    equals: cleanValueNumberOrValueNumbers(data?.equals),
    less: cleanValueNumberOrValueNumbers(data?.less),
    lessEquals: cleanValueNumberOrValueNumbers(data?.lessEquals),
    greater: cleanValueNumberOrValueNumbers(data?.greater),
    greaterEquals: cleanValueNumberOrValueNumbers(data?.greaterEquals)
  };
};
