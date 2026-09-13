import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlModuleOptions } from '@nestjs/graphql';
import affirmative from '../utils/affirmative';

export function parseGraphQLConfig(override?: GqlModuleOptions<ApolloDriver>): ApolloDriverConfig {
  const {
    GRAPHQL_SCHEMA_FILE: envGraphqlSchemaFile = true,
    GRAPHQL_INTROSPECTION: envGraphqlIntrospection,
    GRAPHQL_PLAYGROUND: envGraphqlPlayground,
  } = process.env;

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
    ...override,
  };
}

export const config = parseGraphQLConfig();
