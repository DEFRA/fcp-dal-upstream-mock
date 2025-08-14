import { health } from '../routes/health.js'
import { authenticate } from '../routes/rural-payments/authenticate.js'
import { lms } from '../routes/rural-payments/lms.js'
import { notifications } from '../routes/rural-payments/messages.js'
import { organisation } from '../routes/rural-payments/organisation.js'
import { person } from '../routes/rural-payments/person.js'
import { sitiAgri } from '../routes/rural-payments/siti-agri.js'
import { sitiagri } from '../routes/v2/siti-agri.js'

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
        ...sitiAgri,
        ...sitiagri.map((route) => ({
          ...route,
          path: `/v1${route.path}` // change path to v1
        }))
      ])
    }
  }
}

export { router }
