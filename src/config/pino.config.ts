import { Params } from 'nestjs-pino';
import pinoElastic from 'pino-elasticsearch';
import { multistream } from 'pino-multi-stream';
import { config as elasticConfig } from './elastic.config';

export function parseLoggerConfig(override?: Params): Params {
  const { LOGGER_LEVEL: envLoggerLevel = 'info', LOGGER_TARGET: envLoggerTarget } = process.env;

  let stream;

  if (envLoggerTarget === 'elasticsearch') {
    stream = multistream([
      {
        stream: pinoElastic({
          index: function (logTime) {
            return `${elasticConfig.log.indexPrefix}-${logTime.substring(0, 10)}`;
          },
          node: elasticConfig.log.host,
          'flush-bytes': Number(process.env.LOG_FLUSH_BYTES) || 1000,
          'es-version': Number(process.env.ELASTIC_VERSION) || 7,
        }),
      },
      {
        stream: process.stdout,
      },
    ]);
  }

  const pinoConfig: any = {
    enabled: process.env.NODE_ENV !== 'test',
    formatters: {
      level(severity: any) {
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

  if (process.env.NODE_ENV === 'development' && envLoggerTarget !== 'elasticsearch') {
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
    pinoHttp: [pinoConfig, stream],
    ...override,
  };
}

export const config = parseLoggerConfig();
