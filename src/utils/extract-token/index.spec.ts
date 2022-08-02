import { InvalidTokenException } from '../../errors';
import { extractToken } from '.';

describe('extractToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have token with default Bearer prefix', () => {
    expect(extractToken('Bearer myToken')).toStrictEqual('myToken');
  });

  it('should return token with Bearer token', () => {
    expect(extractToken('Bearer myToken')).toStrictEqual('myToken');
  });

  it('should show InvalidTokenException when authorization is empty', () => {
    expect(() => extractToken('')).toThrow(InvalidTokenException);
  });

  it('should show InvalidTokenException when authorization has invalid prefix', () => {
    expect(() => extractToken('Berear token', 'IntegratedBearer')).toThrow(
      InvalidTokenException
    );
  });

  it('should show InvalidTokenException when authorization has no prefix', () => {
    expect(() => extractToken('myToken')).toThrow(InvalidTokenException);
  });
});
