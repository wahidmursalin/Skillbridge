import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { makeCrudController } from '../controllers/crudFactory.js'

export function makeCrudRouter(Model) {
  const router = Router()
  const controller = makeCrudController(Model)

  router.use(requireAuth)
  router.get('/', controller.list)
  router.post('/', controller.create)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.remove)

  return router
}
