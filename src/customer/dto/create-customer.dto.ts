import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Paulo Ricardo',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description:
      'CPF do cliente deve ser único e no formato XXX.XXX.XXX-XX ou XXXXXXXXXXX',
    example: '111.444.777-35',
  })
  cpf: string;

  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/, {
    message: '$property must be formatted as DD/MM/YYYY',
  })
  @ApiProperty({
    description: 'Data de nascimento do cliente deve ser no formato DD/MM/YYYY',
    example: '20/05/1992',
  })
  birth_date: string;
}
