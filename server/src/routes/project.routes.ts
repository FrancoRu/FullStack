import { Router } from "express";
import {
  getprojects,
  getproject,
  createproject,
  deleteproject,
  updateproject,
} from "../controllers/project.controllers";
import { validateSchema } from "../middlewares/validate.middleware";
import {
  createprojectSchema,
  updateprojectSchema,
} from "../schemas/project.schema";
import { objectIdSchema } from "../libs/validateId.libs";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.post(
  "/project/",
  authRequired,
  validateSchema(createprojectSchema),
  createproject
);
router.get("/project/", authRequired, getprojects);
router.get(
  "/project/:id",
  authRequired,
  validateSchema(objectIdSchema),
  getproject
);
router.patch(
  "/project/:id",
  authRequired,
  validateSchema(updateprojectSchema),
  updateproject
);

router.delete("/project/:id", authRequired, deleteproject);
export default router;
