import { InvalidTokenException } from '../../errors';

export const extractToken = (authorization: string): string => {
  if (!authorization) {
    throw new InvalidTokenException();
  }

  const parts = authorization.split(' ');
  if (!(parts.length === 2)) {
    throw new InvalidTokenException();
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    throw new InvalidTokenException();
  }

  return token;
};
