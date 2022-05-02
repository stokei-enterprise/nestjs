export interface IAuthModuleConfig {
  readonly secretKey: string;
  readonly accessExpiresIn?: number | string;
}
