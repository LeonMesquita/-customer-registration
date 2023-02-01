import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { Customer } from 'src/customer/entities/customer.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockCustomer: CreateCustomerDto = {
    name: 'Leonardo Mesquita',
    cpf: '072.699.313-13',
    birth_date: '16/04/1998',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST) should create a new customer', async () => {
    return request(app.getHttpServer())
      .post('/customer')
      .send(mockCustomer)
      .expect(201);
  });

  it('/ (POST) should throw conflict exception if the CPF already exists', async () => {
    return request(app.getHttpServer())
      .post('/customer')
      .send(mockCustomer)
      .expect(409);
  });

  it('/ (GET) should return a customer by CPF', async () => {
    return request(app.getHttpServer())
      .get(`/customer/${mockCustomer.cpf}`)
      .expect(200)
      .then((response) => {
        const customer = response.body;
        expect(customer).toBeInstanceOf(Object);
      });
  });
});
