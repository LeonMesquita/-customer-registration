import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

describe('CustomerController', () => {
  let controller: CustomerController;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockedCustomer),
            findAll: jest.fn(),
            findByCPF: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created customer', async () => {
      const response = await controller.create(mockedCustomerDto);
      expect(response).toEqual(mockedCustomer);
    });

    it('should throw conflict exception on create', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new ConflictException());
      expect(controller.create(mockedCustomerDto)).rejects.toThrowError(
        'Conflict',
      );
    });
  });
});
