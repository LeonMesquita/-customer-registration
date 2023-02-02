import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

describe('CustomerService', () => {
  let service: CustomerService;
  const mockedCustomer: Customer = {
    id: 1,
    name: 'Mocked Name',
    cpf: '834.763.564-15',
    birth_date: new Date(),
  };
  const mockedCustomerDto: CreateCustomerDto = {
    name: 'Mocked Name',
    cpf: '834.763.564-15',
    birth_date: '16/04/1998',
  };

  const mockedCreateCustomer = jest.fn().mockResolvedValue(mockedCustomer);
  const mockedFindUnique = jest.fn().mockResolvedValue(null);

  const prismaServiceMock = {
    customer: {
      create: mockedCreateCustomer,
      findUnique: mockedFindUnique,
    },
  };

  const customersList: Array<Customer> = [mockedCustomer];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        PrismaService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created customer', async () => {
      const response = await service.create(mockedCustomerDto);
      expect(mockedFindUnique).toHaveBeenCalled();
      expect(mockedCreateCustomer).toHaveBeenCalled();
      expect(response).toEqual(mockedCustomer);
    });
  });
});
