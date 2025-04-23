import { Router } from "express";
import { UserController } from "./user.controller";
import {
  updateProfileValidation,
  validateUserListQuery,
} from "./user.validation";
import { authenticateToken } from "../auth/auth.middleware";

const router = Router();
const userController = new UserController();

// Protected routes - require authentication
router.use(authenticateToken);

// Get user profile
router.get("/profile", userController.getProfile.bind(userController));

// Update user profile
router.patch(
  "/profile",
  updateProfileValidation,
  userController.updateProfile.bind(userController)
);

// List users (admin and staff only)
router.get(
  "/list",
  validateUserListQuery,
  userController.listUsers.bind(userController)
);

// Delete user (admin only)
router.delete("/:userId", userController.deleteUser.bind(userController));

export default router;
