import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { userGrpcOptions } from 'src/grpc.config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'USER_PACKAGE',
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) => userGrpcOptions(cs),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
