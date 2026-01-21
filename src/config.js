import convict from 'convict'

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const config = convict({
  serviceVersion: {
    doc: 'The service version, this variable is injected into your docker container in CDP environments',
    format: String,
    nullable: true,
    default: null,
    env: 'SERVICE_VERSION'
  },
  host: {
    doc: 'The IP address to bind',
    format: (host) => new URL(`http://${host}`),
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },
  serviceName: {
    doc: 'Api Service Name',
    format: String,
    default: 'fcp-dal-upstream-mock'
  },
  cdpEnvironment: {
    doc: 'The CDP environment the app is running in. With the addition of "local" for local development',
    format: ['local', 'infra-dev', 'management', 'dev', 'test', 'perf-test', 'ext-test', 'prod'],
    default: 'local',
    env: 'ENVIRONMENT'
  },
  log: {
    isEnabled: {
      doc: 'Is logging enabled',
      format: Boolean,
      default: !isTest,
      env: 'LOG_ENABLED'
    },
    level: {
      doc: 'Logging level',
      format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      default: 'info',
      env: 'LOG_LEVEL'
    },
    format: {
      doc: 'Format to output logs in',
      format: ['ecs', 'pino-pretty'],
      default: isProduction ? 'ecs' : 'pino-pretty',
      env: 'LOG_FORMAT'
    }
  },
  isMetricsEnabled: {
    doc: 'Enable metrics reporting',
    format: Boolean,
    default: isProduction,
    env: 'ENABLE_METRICS'
  },
  tracing: {
    header: {
      doc: 'CDP tracing header name',
      format: String,
      default: 'x-cdp-request-id',
      env: 'TRACING_HEADER'
    }
  },
  personIdOverride: {
    doc: 'This is the person ID that can be used in place of an actual personId for external users and will return the data corresponding to their crn',
    format: 'int',
    default: 3337243,
    env: 'KIT_EXT_PERSON_ID_OVERRIDE'
  },
  tls: {
    key: {
      doc: 'TLS private key',
      format: String,
      nullable: true,
      default: null,
      env: 'TLS_KEY'
    },
    cert: {
      doc: 'TLS certificate',
      format: String,
      nullable: true,
      default: null,
      env: 'TLS_CERT'
    },
    ca: {
      doc: 'TLS client CA certificate (for mTLS)',
      format: String,
      nullable: true,
      default: null,
      env: 'TLS_CA'
    },
    requireClientCert: {
      doc: 'Require client certificate (mTLS) when the server is running in TLS mode',
      format: Boolean,
      nullable: true,
      default: process.env.TLS_KEY && process.env.TLS_CERT,
      env: 'TLS_REQUIRE_CLIENT_CERT'
    }
  }
})

config.validate({ allowed: 'strict' })

const decodeBase64Config = (value) => Buffer.from(value, 'base64').toString('utf-8').trim()

if (config.get('tls.key') || config.get('tls.cert')) {
  config.decodedTLS = {
    key: config.get('tls.key') && decodeBase64Config(config.get('tls.key')),
    cert: config.get('tls.cert') && decodeBase64Config(config.get('tls.cert'))
  }
  if (config.get('tls.ca')) config.decodedTLS.ca = decodeBase64Config(config.get('tls.ca'))
}

export { config }
