import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const date = new Date(
      createCustomerDto.birth_date.split('-').reverse().join('-'),
    );
    return await this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        birth_date: date.toISOString(),
      },
    });
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }
}
