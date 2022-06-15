import { cleanObject } from '../cleaners';

export const HIDDEN_DATA_STRING = '***';

export const hiddenPrivateDataFromObject = (
  data: any,
  privateKeys: string[]
) => {
  const objectClean = cleanObject(data);
  if (!objectClean) {
    return objectClean;
  }
  const isArrayData = Array.isArray(data);
  if (isArrayData) {
    const isEmptyData = data?.length > 0;
    if (!isEmptyData) {
      return undefined;
    }
    return data.map((currentData) => {
      if (typeof currentData === 'object') {
        return hiddenPrivateDataFromObject(currentData, privateKeys);
      }
      return currentData;
    });
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
        currentValue = hiddenPrivateDataFromObject(
          currentDataValue,
          privateKeys
        );
      }
      const isPrivateValue = privateKeys.includes(currentDataKey);
      return {
        ...prevData,
        ...(currentValue && {
          [currentDataKey]: isPrivateValue ? HIDDEN_DATA_STRING : currentValue
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
