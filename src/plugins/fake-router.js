import { authenticate } from '../routes/authenticate-data.js'
import { land } from '../routes/land.js'
import { notifications } from '../routes/messages.js'
import { organisation } from '../routes/organisation.js'
import { person } from '../routes/person.js'
import { sitiagri } from '../routes/siti-agri.js'

const router = {
  plugin: {
    name: 'fake-router',
    register: (server, _options) => {
      server.route([
        ...person,
        ...organisation,
        ...authenticate,
        ...sitiagri,
        ...notifications,
        ...land
      ])
    }
  }
}

export { router }
