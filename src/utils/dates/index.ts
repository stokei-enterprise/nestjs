import dayjs from 'dayjs';

export const convertToISOTimestamp = (date: Date | number | string): number => {
  if (!date) {
    return null;
  }
  if (date instanceof Date) {
    return date.getTime();
  }
  return dayjs(date).toDate().getTime();
};

export const convertToISODateString = (
  date: Date | number | string
): string => {
  if (!date) {
    return null;
  }
  return dayjs(date).toISOString();
};

export const convertToISODate = (date: Date | number | string): Date => {
  if (!date) {
    return null;
  }
  let currentDate: Date = date as Date;
  if (!(date instanceof Date)) {
    currentDate = new Date(currentDate);
  }
  return dayjs(currentDate.toISOString()).toDate();
};

export const isExpiredDate = (date: Date | number | string): boolean => {
  if (!date) {
    return null;
  }
  const now = dayjs(Date.now());
  const dateToCompare = dayjs(date);
  return now.isAfter(dateToCompare);
};

export const addDays = (days: number) => {
  if (!days) {
    return null;
  }
  const date = dayjs(Date.now());
  return date.add(days, 'day').toDate();
};

export const addMinutes = (minutes: number) => {
  if (!minutes) {
    return null;
  }
  const date = dayjs(Date.now());
  return date.add(minutes, 'minute').toDate();
};
