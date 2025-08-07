import { authenticate } from '../routes/v2/authenticate-data.js'
import { organisation } from '../routes/v2/organisation.js'
import { person } from '../routes/v2/person.js'
import { sitiagri } from '../routes/v2/siti-agri.js'

const transformDate = (date) => {
  date.setMilliseconds(0) // faker does not set milliseconds using seed
  return date.toISOString().replace('.', ':') // replicate kits date format
}

const router = {
  plugin: {
    name: 'fake-router',
    register: (server, _options) => {
      server.route([...person, ...organisation, ...authenticate, ...sitiagri])
    }
  }
}

export { router, transformDate }
