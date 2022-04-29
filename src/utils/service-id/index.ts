import { cleanValue } from '../cleaners';

interface ServiceIdData {
  readonly service: string;
  readonly module: string;
  readonly id: string;
}

const microserviceSeparator = '.';
const moduleSeparator = '_';

const cleanMicroserviceModuleIdPrefix = (value: string): string => {
  try {
    value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return value.replace(/[^A-Za-z0-9]/g, moduleSeparator)?.toLowerCase();
  } catch (error) {}
  return null;
};

export const createServiceId = (data: ServiceIdData): string => {
  const module = cleanMicroserviceModuleIdPrefix(data?.module);
  const service = cleanMicroserviceModuleIdPrefix(data?.service);
  const id = cleanValue(data?.id);
  if (module === service) {
    return `${service}${microserviceSeparator}${id}`;
  }
  return `${service}${moduleSeparator}${module}${microserviceSeparator}${id}`;
};

export const splitServiceId = (concatId: string): ServiceIdData => {
  const [serviceWithModule = null, id = null] = concatId?.split(
    microserviceSeparator
  );
  const [service = null, module = null] =
    serviceWithModule?.split(moduleSeparator);
  return { service, module, id };
};
