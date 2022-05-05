import { InvalidTokenException } from '../../errors';

export const extractRefreshToken = (token: string): string => {
  if (!token) {
    throw new InvalidTokenException();
  }
  return token;
};
