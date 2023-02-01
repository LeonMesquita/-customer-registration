import { Customer } from '../entities/customer.entity';
import { IsDate, IsString, Matches } from 'class-validator';

export class CreateCustomerDto extends Customer {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @Matches(
    /^(0[1-9]|[12][0-9]|3[01])[\/|-](0[1-9]|1[012])[\/|-](19|20)\d\d$/i,
    {
      message: '$property must be formatted as DD-MM-YYYY or DD/MM/YYYY',
    },
  )
  birth_date: string;
}
