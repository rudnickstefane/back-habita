interface ServerConfig {
  host: string;
  port: number;
}

export function parseServerConfig(override?: ServerConfig): ServerConfig {
  const { SERVER_HOST: envHost = '0.0.0.0', SERVER_PORT: envPort = '3000' } = process.env;

  return {
    // @see https://www.fastify.io/docs/latest/Guides/Recommendations/#kubernetes
    // @see https://github.com/fastify/fastify-cli/issues/57
    host: envHost === '127.0.0.1' ? '0.0.0.0' : envHost,
    port: Number(envPort),
    ...override,
  };
}

export const config = parseServerConfig();
