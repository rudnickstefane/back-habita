import { Controller, Get } from '@nestjs/common';

import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from '@health-check/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @HealthCheck()
  @Get()
  healthcheck() {
    return this.health.check();
  }
}
