import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verify,
} from "../controllers/auth.controllers";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validateSchema } from "../middlewares/validate.middleware";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verifyToken", verify);

export default router;
