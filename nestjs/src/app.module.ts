import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './grpc.config';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env';
import { ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => grpcConfig(cs),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
