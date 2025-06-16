import { health } from '../routes/health.js'
import { authenticate } from '../routes/rural-payments/authenticate.js'
import { lms } from '../routes/rural-payments/lms.js'
import { notifications } from '../routes/rural-payments/messages.js'
import { sitiAgri } from '../routes/rural-payments/siti-agri.js'
// v2
import { organisation } from '../routes/v2/organisation.js'
import { person } from '../routes/v2/person.js'

const router = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route([
        health,
        ...person,
        ...organisation,
        ...authenticate,
        ...lms,
        ...notifications,
        ...sitiAgri
      ])
    }
  }
}

export { router }
