import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginValidation, registerValidation } from "./auth.validation";

const AuthRouter = Router();
const authController = new AuthController();

// Auth routes
AuthRouter.post(
  "/login",
  loginValidation,
  authController.login.bind(authController)
);
AuthRouter.post(
  "/register",
  registerValidation,
  authController.register.bind(authController)
);
AuthRouter.post("/logout", authController.logout.bind(authController));

export default AuthRouter;
