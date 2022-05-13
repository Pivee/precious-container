import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: '127.0.0.1:3001',
      package: 'app',
      protoPath: __dirname + '/../.packages/app.proto',
    },
  })
  private readonly grpcClient: ClientGrpc;
  private usersService;

  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    this.usersService = this.grpcClient.getService('AppGrpc');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getHelloFromUsersService() {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      style: 'capital',
      separator: ' ',
    });

    console.log(`Hello, ${randomName}!`);

    const result = await (
      this.usersService.getHello({ name: randomName }) as Observable<any>
    ).toPromise();
  }
}
