import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [PrismaModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
