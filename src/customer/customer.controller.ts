import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso',
    type: Customer,
  })
  @ApiResponse({ status: 422, description: 'CPF Inválido' })
  @ApiResponse({
    status: 409,
    description: 'CPF já existente',
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Clientes retornados com sucesso',
    type: Array<Customer>,
  })
  @ApiResponse({
    status: 400,
    description: 'Page ou limit inválidos',
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.customerService.findAll(Number(page), Number(limit));
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'Buscar um cliente pelo CPF' })
  @ApiParam({
    name: 'cpf',
    description: 'CPF do cliente',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente retornado com sucesso',
    type: Customer,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado',
  })
  findByCPF(@Param('cpf') cpf: string) {
    return this.customerService.findByCPF(cpf);
  }
}
