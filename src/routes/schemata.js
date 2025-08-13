import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const schemata = {
  plugin: {
    name: 'schemata',
    register: (server, _options) => {
      server.route([
        {
          method: 'GET',
          path: '/schemata/person.yml',
          handler: {
            file: path.join(__dirname, '/v2/person-schema.oas.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/organisation.yml',
          handler: {
            file: path.join(__dirname, '/v2/organisation-schema.oas.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/authenticate.yml',
          handler: {
            file: path.join(__dirname, '/v2/authenticate-schema.oas.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/siti-agri.yml',
          handler: {
            file: path.join(__dirname, '/v2/siti-agri-schema.oas.yml')
          }
        }
      ])
    }
  }
}
