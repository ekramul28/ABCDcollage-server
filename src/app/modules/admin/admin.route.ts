import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../auth/auth.types";
import { AdminControllers } from "./admin.controller";
import { updateAdminValidationSchema } from "./admin.validation";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.getAllAdmins
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.getSingleAdmin
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin
);

router.delete(
  "/:adminId",
  auth(UserRole.SUPER_ADMIN),
  AdminControllers.deleteAdmin
);

export const AdminRoutes = router;
