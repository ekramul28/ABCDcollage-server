import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { createAdminValidationSchema } from "../admin/admin.validation";
import { createTeacherValidationSchema } from "../teacher/teacher.validation";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import { UserRole } from "../auth/auth.types";

const router = express.Router();

router.post(
  "/create-teacher",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createTeacherValidationSchema),
  UserControllers.createTeacher
);

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

router.post(
  "/change-status/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  UserControllers.getMe
);

export const UserRoutes = router;
