import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controllers";
import { validateSchema } from "../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import { authRequired } from "../middlewares/validateToken";
const router = Router();

router.post(
  "/task",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);
router.get("/task", authRequired, getTasks);
router.get("/task/:id", authRequired, getTask);
router.patch(
  "/task/:id",
  authRequired,
  validateSchema(updateTaskSchema),
  updateTask
);
router.delete("/task/:id", authRequired, deleteTask);

export default router;
