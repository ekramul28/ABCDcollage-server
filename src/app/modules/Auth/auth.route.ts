import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginValidation, registerValidation } from "./auth.validation";

const router = Router();
const authController = new AuthController();

// Auth routes
router.post(
  "/login",
  loginValidation,
  authController.login.bind(authController)
);
router.post(
  "/register",
  registerValidation,
  authController.register.bind(authController)
);
router.post("/logout", authController.logout.bind(authController));

export default router;
