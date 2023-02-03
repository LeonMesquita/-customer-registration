import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CPFValidator } from 'src/utils/cpf-validator.util';
import { CustomerService } from './customer.service';
import {
  customersList,
  mockedCustomer,
  mockedCustomerDto,
} from 'src/utils/mocks.util';

describe('CustomerService', () => {
  let service: CustomerService;
  let cpfValidator: CPFValidator;

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
        {
          provide: CPFValidator,
          useValue: {
            validate: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    cpfValidator = module.get<CPFValidator>(CPFValidator);

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

    it('should throw enprocessable entity if the CPF is incorrect', async () => {
      jest.spyOn(cpfValidator, 'validate').mockReturnValue(false);
      expect(service.create(mockedCustomerDto)).rejects.toThrowError(
        new UnprocessableEntityException('Invalid CPF'),
      );
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
      expect(service.findByCPF('')).rejects.toThrowError('Not Found');
    });
  });

  describe('findAll', () => {
    it('should return a list of customers', async () => {
      const response = await service.findAll(1, 10);
      expect(response).toEqual(customersList);
    });
  });
});
