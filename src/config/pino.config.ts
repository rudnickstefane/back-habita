import { Params } from 'nestjs-pino';

export function parseLoggerConfig(override?: Params): Params {
  const { LOGGER_LEVEL: envLoggerLevel = 'info' } = process.env;

  const pinoConfig: Record<string, unknown> = {
    enabled: process.env.NODE_ENV !== 'test',
    formatters: {
      level(severity: string) {
        return { severity };
      },
    },
    messageKey: 'message',
    level: envLoggerLevel,
    autoLogging: false,
    redact: {
      paths: ['req', 'res'],
      remove: true,
    },
    timestamp: () => `,"@timestamp":"${new Date().toISOString()}"`,
  };

  if (process.env.NODE_ENV === 'development') {
    pinoConfig.transport = {
      target: 'pino-pretty',
      options: {
        levelKey: 'severity',
        colorize: true,
        singleLine: true,
        messageKey: 'message',
        timestampKey: '@timestamp',
      },
    };
  }

  return {
    pinoHttp: pinoConfig,
    ...override,
  };
}

export const config = parseLoggerConfig();
