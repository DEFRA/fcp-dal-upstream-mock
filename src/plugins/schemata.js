import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const schemata = {
  plugin: {
    name: 'schemata',
    register: (server, _options) => {
      server.route([
        // KITS schemata
        {
          method: 'GET',
          path: '/schemata/person.yml',
          handler: {
            file: path.join(__dirname, '../routes/kits-v1/person-schema.oas.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/organisation.yml',
          handler: {
            file: path.join(__dirname, '../routes/kits-v1/organisation-schema.oas.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/authenticate.yml',
          handler: {
            file: path.join(__dirname, '../routes/kits-v1/authenticate-schema.oas.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/siti-agri.yml',
          handler: {
            file: path.join(__dirname, '../routes/kits-v1/siti-agri-schema.oas.yml')
          }
        },
        // Hitachi schemata
        {
          method: 'GET',
          path: '/schemata/payments.yml',
          handler: {
            file: path.join(__dirname, '../routes/hitachi/payments-schema.oas.yml')
          }
        }
      ])
    }
  }
}
