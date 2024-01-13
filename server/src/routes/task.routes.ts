import { Router } from 'express'
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} from '../controllers/tasks.controllers.ts'
import { validateSchema } from '../middlewares/validate.middleware.ts'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.ts'
import { authRequired } from '../middlewares/validateToken.ts'
const router = Router()

router.post('/task', authRequired, validateSchema(createTaskSchema), createTask)
router.get('/task', authRequired, getTasks)
router.get('/task/:id', authRequired, getTask)
router.patch(
  '/task/:id',
  authRequired,
  validateSchema(updateTaskSchema),
  updateTask
)
router.delete('/task/:id', authRequired, deleteTask)

export default router
