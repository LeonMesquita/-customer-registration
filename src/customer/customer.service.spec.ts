import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Customer, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  const mockedCustomer: Customer = {
    id: 1,
    name: 'Mocked Name',
    cpf: '834.763.564-15',
    birth_date: new Date(),
    createdAt: new Date(),
  };
  const mockedCustomerDto: CreateCustomerDto = {
    name: 'Mocked Name',
    cpf: '834.763.564-15',
    birth_date: '16/04/1998',
  };

  const customersList: Array<Customer> = [mockedCustomer];

  const mockedCreateCustomer = jest.fn().mockResolvedValue(mockedCustomer);
  const mockedFindUnique = jest.fn().mockResolvedValue(null);
  const mockedFindMany = jest.fn().mockResolvedValue(customersList);

  const prismaServiceMock = {
    customer: {
      create: mockedCreateCustomer,
      findUnique: mockedFindUnique,
      findMany: mockedFindMany,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        PrismaService,
        PrismaClient,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);

    jest
      .spyOn(service, 'checkCustomerExists')
      .mockResolvedValue(mockedCustomer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created customer', async () => {
      const response = await service.create(mockedCustomerDto);
      expect(mockedFindUnique).toHaveBeenCalled();
      expect(response).toEqual(mockedCustomer);
    });
  });

  describe('findByCPF', () => {
    it('should return a customer by CPF', async () => {
      const response = await service.findByCPF('');
      expect(mockedFindUnique).toHaveBeenCalled();
      expect(response).toEqual(mockedCustomer);
    });

    it('should throw not found exception if customer was not found', async () => {
      jest
        .spyOn(service, 'checkCustomerExists')
        .mockRejectedValueOnce(new NotFoundException());
      expect(mockedFindUnique).toHaveBeenCalled();
      expect(service.findByCPF('')).rejects.toThrowError('Not Found');
    });
  });
});
