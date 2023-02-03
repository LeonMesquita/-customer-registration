import { Customer } from '@prisma/client';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

export const mockedCustomer: Customer = {
  id: 1,
  name: 'Mocked Name',
  cpf: '111.444.777-35',
  birth_date: new Date(),
  createdAt: new Date(),
};

export const mockedCustomerDto: CreateCustomerDto = {
  name: 'Mocked Name',
  cpf: '111.444.777-35',
  birth_date: '16/04/1998',
};

export const customersList: Array<Customer> = [mockedCustomer];
