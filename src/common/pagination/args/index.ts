import {
  InputType,
  Field,
  Float,
  Int,
  registerEnumType
} from '@nestjs/graphql';
import {
  IPaginatinInputDTO,
  IWhereData,
  IWhereDataInterval,
  IWhereDataSearch
} from '@/interfaces';

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc'
}

registerEnumType(OrderBy, {
  name: 'OrderBy'
});

export { OrderBy };

@InputType()
export class PaginationInput implements IPaginatinInputDTO {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  number?: number;
}

@InputType()
export class WhereDataStringInput implements IWhereData<string> {
  @Field({ nullable: true })
  equals?: string;
}
@InputType()
export class WhereDataIntInput implements IWhereData<number> {
  @Field(() => Int, { nullable: true })
  equals?: number;
}
@InputType()
export class WhereDataFloatInput implements IWhereData<number> {
  @Field(() => Float, { nullable: true })
  equals?: number;
}
@InputType()
export class WhereDataBooleanInput implements IWhereData<boolean> {
  @Field(() => Boolean, { nullable: true })
  equals?: boolean;
}

@InputType()
export class WhereDataSearchInput
  extends WhereDataStringInput
  implements IWhereDataSearch
{
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  startsWith?: string;

  @Field({ nullable: true })
  endsWith?: string;
}

@InputType()
export class WhereDataIntervalStringInput
  extends WhereDataStringInput
  implements IWhereDataInterval<string>
{
  @Field({ nullable: true })
  greater?: string;

  @Field({ nullable: true })
  greaterEquals?: string;

  @Field({ nullable: true })
  less?: string;

  @Field({ nullable: true })
  lessEquals?: string;
}
@InputType()
export class WhereDataIntervalIntInput
  extends WhereDataIntInput
  implements IWhereDataInterval<number>
{
  @Field(() => Int, { nullable: true })
  greater?: number;

  @Field(() => Int, { nullable: true })
  greaterEquals?: number;

  @Field(() => Int, { nullable: true })
  less?: number;

  @Field(() => Int, { nullable: true })
  lessEquals?: number;
}
@InputType()
export class WhereDataIntervalFloatInput
  extends WhereDataFloatInput
  implements IWhereDataInterval<number>
{
  @Field(() => Float, { nullable: true })
  greater?: number;

  @Field(() => Float, { nullable: true })
  greaterEquals?: number;

  @Field(() => Float, { nullable: true })
  less?: number;

  @Field(() => Float, { nullable: true })
  lessEquals?: number;
}
