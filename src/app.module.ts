import { ContainerModule } from './modules/container/container.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseModule from './database/database.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ContainerHandlingModule } from './modules/container-handling/container-handling.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    CustomerModule,
    ContainerModule,
    ContainerHandlingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
