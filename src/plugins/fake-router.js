import { person } from '../routes/v2/person.js'
import { organisation } from '../routes/v2/organisation.js'

const router = {
  plugin: {
    name: 'fake-router',
    register: (server, _options) => {
      server.route([...person, ...organisation])
    }
  }
}

export { router }
