interface ElasticLogConfig {
  index: string;
  indexPrefix: string;
  indexSuffix: string;
  flushInterval: number;
  bufferLimit: number;
  host: string;
}

interface ElasticConfig {
  log: ElasticLogConfig;
}

function parseElasticConfig(): ElasticConfig {
  const {
    APP_CODE: envAppCode = 'nest-api',

    LOGGER_INDEX_PREFIX: envLoggerIndexPrefix,
    LOGGER_INDEX: envLoggerIndex,
    LOGGER_INDEX_SUFFIX_PATTERN: envLoggerIndexSuffixPattern,
    LOGGER_FLUSH_INTERVAL: envLoggerFlushInterval = '100',
    LOGGER_BUFFER_LIMIT: envLoggerBufferLimit = '1000',

    LOGGER_ELASTIC_HOST: envElasticHost = 'https://0.0.0.0:9200',
  } = process.env;

  const indexSuffix = envLoggerIndexSuffixPattern ?? 'YYYY.MM.DD';
  const indexPrefix = envLoggerIndexPrefix ?? envAppCode;
  const index = envLoggerIndex ?? null; //null is important!

  return {
    log: {
      index,
      indexPrefix,
      indexSuffix,
      flushInterval: Number(envLoggerFlushInterval),
      bufferLimit: Number(envLoggerBufferLimit),
      host: envElasticHost,
    },
  };
}

export const config = parseElasticConfig();
