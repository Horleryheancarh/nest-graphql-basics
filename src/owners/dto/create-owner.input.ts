import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
