import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
// import { USER_ROLE } from "../user/user.constant";
import { NotificationControllers } from "./notification.controller";
import {
  createNotificationValidationSchema,
  updateNotificationValidationSchema,
  markAsReadValidationSchema,
} from "./notification.validation";
import { UserRole } from "../auth/auth.types";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createNotificationValidationSchema),
  NotificationControllers.createNotification
);

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  NotificationControllers.getAllNotifications
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  NotificationControllers.getSingleNotification
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateNotificationValidationSchema),
  NotificationControllers.updateNotification
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  NotificationControllers.deleteNotification
);

router.patch(
  "/mark-as-read",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(markAsReadValidationSchema),
  NotificationControllers.markNotificationsAsRead
);

router.get(
  "/user/:userId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  NotificationControllers.getUserNotifications
);

export const NotificationRoutes = router;
