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
            file: path.join(__dirname, '/v2/person-schema.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/organisation.yml',
          handler: {
            file: path.join(__dirname, '/v2/organisation-schema.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/authenticate.yml',
          handler: {
            file: path.join(__dirname, '/v2/authenticate-schema.yml')
          }
        },
        {
          method: 'GET',
          path: '/schemata/applications.yml',
          handler: {
            file: path.join(__dirname, '/v2/applications-schema.yml')
          }
        }
      ])
    }
  }
}
