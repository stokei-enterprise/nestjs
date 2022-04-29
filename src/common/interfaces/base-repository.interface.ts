export interface IBaseRepository<TData = any, TResponse = any> {
  readonly execute: (data: TData) => TResponse;
}
