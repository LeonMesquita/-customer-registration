import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const date = new Date(
      createCustomerDto.birth_date.split('/').reverse().join('/'),
    );
    const customer = await this.prisma.customer.findUnique({
      where: { cpf: createCustomerDto.cpf },
    });
    if (customer) throw new ConflictException('This CPF already exists');
    return await this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        cpf: createCustomerDto.cpf.replace(/\D/g, ''),
        birth_date: date.toISOString(),
      },
    });
  }

  findAll() {
    return `This action returns all customer`;
  }

  async findByCPF(cpf: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { cpf: cpf.replace(/\D/g, '') },
    });
    if (!customer) throw new NotFoundException('Customer nof found');
    return customer;
  }
}
