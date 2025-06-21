import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../auth/auth.types";
import { TeacherControllers } from "./teacher.controller";
import { updateTeacherValidationSchema } from "./teacher.validation";

const router = express.Router();

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  TeacherControllers.getSingleTeacher
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateTeacherValidationSchema),
  TeacherControllers.updateTeacher
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  TeacherControllers.deleteTeacher
);

router.get("/", TeacherControllers.getAllTeachers);

export const TeacherRoutes = router;
