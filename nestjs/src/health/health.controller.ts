import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from './health.prisma';
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private pHI: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      /** Nous placerons ici la liste des vérifications de l'état **/

      async () =>
        this.disk.checkStorage('storage', { thresholdPercent: 0.9, path: '/' }),
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      () => this.pHI.isHealthy('prisma_health'),
    ]);
  }
}
