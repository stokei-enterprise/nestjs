export interface IAuthenticatedAccount {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly avatar: string;
  readonly email: string;
  readonly code: string;
  readonly accessExpiresIn: number | string;
}
