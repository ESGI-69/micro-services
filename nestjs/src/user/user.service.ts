import { OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FindRequest, FindResponse, User } from '../stubs/user/v1alpha/message';
import { UserServiceClient } from '../stubs/user/v1alpha/service';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;
  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    private configService: ConfigService,
  ) {}
  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }
  async findUser(req: FindRequest, md: Record<string, any>): Promise<User> {
    const meta = new Metadata();
    Object.entries(md).map(([k, v]) => meta.add(k, v));
    const res: FindResponse = await firstValueFrom(
      this.userService.find(req, meta) as any,
    );
    return res.user?.[0];
  }
}
