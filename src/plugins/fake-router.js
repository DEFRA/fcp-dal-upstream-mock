import { authenticate } from '../routes/v2/authenticate-data.js'
import { organisation } from '../routes/v2/organisation.js'
import { person } from '../routes/v2/person.js'

const router = {
  plugin: {
    name: 'fake-router',
    register: (server, _options) => {
      server.route([...person, ...organisation, ...authenticate])
    }
  }
}

export { router }
