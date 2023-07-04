import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './health.prisma';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [PrismaService, PrismaHealthIndicator],
})
export class HealthModule {}
