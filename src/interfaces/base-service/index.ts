export interface IBaseService<TData = any, TResponse = any> {
  readonly execute: (data: TData) => TResponse;
}
