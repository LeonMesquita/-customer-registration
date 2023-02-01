import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const date = new Date(
      createCustomerDto.birth_date.split('/').reverse().join('/'),
    );
    const cpf = createCustomerDto.cpf.replace(/\D/g, '');
    const customer = await this.prisma.customer.findUnique({
      where: { cpf },
    });

    if (customer) {
      throw new ConflictException('This CPF already exists');
    }
    return await this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        cpf,
        birth_date: date.toISOString(),
      },
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.prisma.customer.findMany();
  }

  async findByCPF(cpf: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { cpf: cpf.replace(/\D/g, '') },
    });
    if (!customer) throw new NotFoundException('Customer nof found');
    return customer;
  }
}
