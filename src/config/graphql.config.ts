import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlModuleOptions } from '@nestjs/graphql';
import { PinoLogger } from 'nestjs-pino';
import affirmative from '../utils/affirmative';
import { config as pinoConfig } from './pino.config';

export function parseGraphQLConfig(override?: GqlModuleOptions<ApolloDriver>): ApolloDriverConfig {
  const {
    GRAPHQL_SCHEMA_FILE: envGraphqlSchemaFile = true,
    GRAPHQL_INTROSPECTION: envGraphqlIntrospection,
    GRAPHQL_PLAYGROUND: envGraphqlPlayground,
    GRAPHQL_LOG_REQUESTS: envGraphqlLogRequests = 'true',
  } = process.env;

  const logger = new PinoLogger({
    renameContext: 'GraphQL',
    pinoHttp: pinoConfig.pinoHttp,
  });
  (logger as any).log = logger.info;
  (logger as any).debug = logger.trace;
  const plugins = [];

  // if (affirmative(envGraphqlLogRequests)) {
  //   plugins.push(apolloLoggerPlugin(logger as any) as any);
  // }

  return {
    driver: ApolloDriver,
    resolverValidationOptions: {
      requireResolversForResolveType: 'ignore',
    },
    autoSchemaFile: envGraphqlSchemaFile,
    introspection: affirmative(envGraphqlIntrospection),
    playground: affirmative(envGraphqlPlayground),
    fieldResolverEnhancers: ['guards'],
    csrfPrevention: false,
    context: (ctx: { req?: unknown; request?: unknown }) => ({
      req: ctx.req ?? ctx.request,
    }),
    plugins,
    ...override,
  };
}

export const config = parseGraphQLConfig();
