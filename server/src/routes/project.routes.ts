import { Router } from 'express'
import {
  getprojects,
  getproject,
  createproject,
  deleteproject,
  updateproject
} from '../controllers/project.controllers.ts'
import { validateSchema } from '../middlewares/validate.middleware.ts'
import {
  createprojectSchema,
  updateprojectSchema
} from '../schemas/project.schema.ts'
import { objectIdSchema } from '../libs/validateId.libs.ts'
import { authRequired } from '../middlewares/validateToken.ts'

const router = Router()

router.post(
  '/project/',
  authRequired,
  validateSchema(createprojectSchema),
  createproject
)
router.get('/project/', authRequired, getprojects)
router.get(
  '/project/:id',
  authRequired,
  validateSchema(objectIdSchema),
  getproject
)
router.patch(
  '/project/:id',
  authRequired,
  validateSchema(updateprojectSchema),
  updateproject
)

router.delete('/project/:id', authRequired, deleteproject)
export default router
