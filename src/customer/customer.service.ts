import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CPFValidator } from 'src/utils/cpf-validator.util';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cpfValidator: CPFValidator,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const isValid = this.cpfValidator.validate(createCustomerDto.cpf);
    if (!isValid) {
      throw new UnprocessableEntityException('Invalid CPF');
    }
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

  async findAll(page: number, limit: number): Promise<Customer[]> {
    if (!Number(page) || !Number(limit)) {
      throw new BadRequestException('Page and limit must be numbers');
    }
    const skip = (page - 1) * limit;
    return await this.prisma.customer.findMany({
      skip,
      take: limit,
    });
  }

  async findByCPF(cpf: string): Promise<Customer> {
    const customer = await this.checkCustomerExists(cpf);
    if (!customer) throw new NotFoundException('Customer nof found');
    return customer;
  }

  async checkCustomerExists(cpf: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { cpf: cpf.replace(/\D/g, '') },
    });
    return customer;
  }
}
