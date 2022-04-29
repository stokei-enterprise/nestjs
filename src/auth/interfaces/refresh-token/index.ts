export interface IRefreshTokenPayload {
  readonly code: string;
  readonly accountId: string;
  readonly accessExpiresIn: number | string;
}
