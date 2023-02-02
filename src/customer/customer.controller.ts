import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.customerService.findAll(Number(page), Number(limit));
  }

  @Get(':cpf')
  findByCPF(@Param('cpf') cpf: string) {
    return this.customerService.findByCPF(cpf);
  }
}
