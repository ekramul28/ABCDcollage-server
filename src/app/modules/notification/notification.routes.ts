import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { NotificationControllers } from "./notification.controller";
import {
  createNotificationValidationSchema,
  updateNotificationValidationSchema,
  markAsReadValidationSchema,
} from "./notification.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.teacher),
  validateRequest(createNotificationValidationSchema),
  NotificationControllers.createNotification
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  NotificationControllers.getAllNotifications
);

router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.teacher),
  NotificationControllers.getSingleNotification
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateNotificationValidationSchema),
  NotificationControllers.updateNotification
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  NotificationControllers.deleteNotification
);

router.patch(
  "/mark-as-read",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.teacher),
  validateRequest(markAsReadValidationSchema),
  NotificationControllers.markNotificationsAsRead
);

router.get(
  "/user/:userId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.teacher),
  NotificationControllers.getUserNotifications
);

export const NotificationRoutes = router;
