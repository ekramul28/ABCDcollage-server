import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../auth/auth.types";
import { AttendanceControllers } from "./attendance.controller";
import {
  createAttendanceValidationSchema,
  updateAttendanceValidationSchema,
} from "./attendance.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(createAttendanceValidationSchema),
  AttendanceControllers.createAttendance
);

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  AttendanceControllers.getAllAttendances
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  AttendanceControllers.getSingleAttendance
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(updateAttendanceValidationSchema),
  AttendanceControllers.updateAttendance
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AttendanceControllers.deleteAttendance
);

export const AttendanceRoutes = router;
