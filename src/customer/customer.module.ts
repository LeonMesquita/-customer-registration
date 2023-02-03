import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CPFValidator } from 'src/utils/cpf-validator.util';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, CPFValidator],
})
export class CustomerModule {}
