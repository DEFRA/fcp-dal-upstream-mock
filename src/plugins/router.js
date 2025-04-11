import { health } from '../routes/health.js'
import { example } from '../routes/example.js'
import { person } from '../routes/rural-payments/person.js'

const router = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route([health, ...example, ...person])
    }
  }
}

export { router }
