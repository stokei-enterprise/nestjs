import { Type } from '@nestjs/common';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { IPaginatedType, IWhere } from '../../../interfaces';

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    firstPage: number;

    @Field(() => Int)
    lastPage: number;

    @Field(() => Int)
    nextPage: number;

    @Field(() => Int)
    previousPage: number;

    @Field(() => Boolean)
    hasNextPage: boolean;

    @Field(() => Boolean)
    hasPreviousPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

export function WherePaginated<T>(classRef: Type<T>): Type<IWhere<T>> {
  @InputType()
  abstract class WherePaginatedType implements IWhere<T> {
    @Field(() => classRef, { nullable: true })
    OR?: T;

    @Field(() => classRef, { nullable: true })
    AND?: T;

    @Field(() => classRef, { nullable: true })
    NOT?: T;
  }
  return WherePaginatedType as Type<IWhere<T>>;
}
