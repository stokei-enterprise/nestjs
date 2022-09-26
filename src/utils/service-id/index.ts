import { cleanValue } from '../cleaners';

interface ServiceIdData {
  readonly service: string;
  readonly module: string;
  readonly id: string;
}

const microserviceSeparator = '.';
const moduleSeparator = '_';

const cleanMicroserviceIdPrefix = (value: string): string => {
  try {
    value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return value.replace(/[^A-Za-z0-9]/g, moduleSeparator)?.toLowerCase();
  } catch (error) {}
  return null;
};

export const splitServiceId = (concatId: string): ServiceIdData => {
  const [serviceWithModule = null, id = null] = concatId?.split(
    microserviceSeparator
  );
  const [service = null, module = null] =
    serviceWithModule?.split(moduleSeparator);
  return id && { service, module, id };
};

export const createServiceId = (data: ServiceIdData): string => {
  const module = cleanMicroserviceIdPrefix(data?.module);
  const service = cleanMicroserviceIdPrefix(data?.service);
  const dataIdSplited = splitServiceId(data?.id);
  const existsService = !!dataIdSplited?.id;
  const id = cleanValue(existsService ? dataIdSplited.id : data?.id);
  if (module === service) {
    return `${service}${microserviceSeparator}${id}`;
  }
  return `${service}${moduleSeparator}${module}${microserviceSeparator}${id}`;
};
