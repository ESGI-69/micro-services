import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import {
  USER_SERVICE_NAME,
  USER_V1ALPHA_PACKAGE_NAME,
} from './stubs/user/v1alpha/service';
import { ChannelCredentials } from '@grpc/grpc-js';
import { join } from 'path';
import { HERO_V1ALPHA_PACKAGE_NAME } from './stubs/hero/v1alpha/hero';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { ConfigService } from '@nestjs/config';

export const userGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:${cs.get<number>('USER_PORT')}`,
    package: USER_V1ALPHA_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, './proto')],
    },
    protoPath: [join(__dirname, './proto/user/v1alpha/service.proto')],
    credentials: ChannelCredentials.createInsecure(),
  },
});

export const grpcConfig = (cs: ConfigService): GrpcOptions =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${cs.get<number>('GRPC_PORT')}`,
      package: HERO_V1ALPHA_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/hero/v1alpha/hero.proto'),
    },
  }) as GrpcOptions;
