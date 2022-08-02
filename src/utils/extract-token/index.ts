import { InvalidTokenException } from '../../errors';

export const extractToken = (
  authorization: string,
  prefix?: string
): string => {
  prefix = prefix || 'Bearer';
  if (!authorization) {
    throw new InvalidTokenException();
  }

  const parts = authorization.split(' ');
  if (!(parts.length === 2)) {
    throw new InvalidTokenException();
  }

  const [scheme, token] = parts;
  const existsCorrectSchema = scheme.match(new RegExp(prefix, 'i'));
  if (!existsCorrectSchema) {
    throw new InvalidTokenException();
  }

  return token;
};
