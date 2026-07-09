import { Router } from "express";
import { login } from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { loginValidation } from "../../validations/auth.validation";

const router = Router();

router.post("/login", validateBody(loginValidation), login);

export default router;
