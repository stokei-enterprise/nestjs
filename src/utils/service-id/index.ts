import { cleanValue } from '../cleaners';

interface ServiceIdData {
  readonly service: string;
  readonly id: string;
}

const microserviceSeparator = '_';

const cleanMicroserviceIdPrefix = (value: string): string => {
  try {
    value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return value.replace(/[^A-Za-z0-9]/g, microserviceSeparator)?.toLowerCase();
  } catch (error) {}
  return null;
};

export const splitServiceId = (concatId: string): ServiceIdData => {
  const idList = concatId?.split(microserviceSeparator);
  const id = idList?.pop();
  const service = idList.join(microserviceSeparator);
  return id && { service, id };
};

export const createServiceId = (data: ServiceIdData): string => {
  const service = cleanMicroserviceIdPrefix(data?.service);
  const dataIdSplited = splitServiceId(data?.id);
  const existsService = !!dataIdSplited?.id;
  const id = cleanValue(existsService ? dataIdSplited.id : data?.id);
  return `${service}${microserviceSeparator}${id}`;
};
