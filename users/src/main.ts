import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '127.0.0.1:3001',
      package: 'app',
      protoPath: './users/.packages/app.proto',
    },
  });
  await app.listen().then(() => {
    Logger.log('Users Service is running on port 3001', 'NestApplication');
  });
}
bootstrap();
