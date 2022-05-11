import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AppGrpc', 'getHello')
  getHello(payload: { name?: string }): string {
    console.log(`Hello ${payload.name}!`);

    return this.appService.getHello();
  }
}
