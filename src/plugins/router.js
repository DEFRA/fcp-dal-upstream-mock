import { health } from '../routes/health.js'
import { person } from '../routes/rural-payments/person.js'

const router = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route([health, ...person])
    }
  }
}

export { router }
