import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../auth/auth.types";
import { SmsControllers } from "./sms.controller";
import {
  createSmsValidationSchema,
  updateSmsValidationSchema,
  createTemplateValidationSchema,
  updateTemplateValidationSchema,
  createGroupValidationSchema,
  updateGroupValidationSchema,
  createScheduleValidationSchema,
  updateScheduleValidationSchema,
  sendBulkSmsValidationSchema,
  sendGroupSmsValidationSchema,
} from "./sms.validation";

const router = express.Router();

// SMS Routes
router.post(
  "/",
  auth(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.TEACHER
    // UserRole.STUDENT
  ),
  validateRequest(createSmsValidationSchema),
  SmsControllers.createSms
);

router.get("/", SmsControllers.getAllSms);

router.get("/:id", SmsControllers.getSingleSms);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(updateSmsValidationSchema),
  SmsControllers.updateSms
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SmsControllers.deleteSms
);

// SMS Template Routes
router.post(
  "/template",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(createTemplateValidationSchema),
  SmsControllers.createTemplate
);

router.get("/template", SmsControllers.getAllTemplates);

router.get("/template/:id", SmsControllers.getSingleTemplate);

router.patch(
  "/template/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(updateTemplateValidationSchema),
  SmsControllers.updateTemplate
);

router.delete(
  "/template/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SmsControllers.deleteTemplate
);

// SMS Group Routes
router.post(
  "/group",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(createGroupValidationSchema),
  SmsControllers.createGroup
);

router.get("/group", SmsControllers.getAllGroups);

router.get("/group/:id", SmsControllers.getSingleGroup);

router.patch(
  "/group/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(updateGroupValidationSchema),
  SmsControllers.updateGroup
);

router.delete(
  "/group/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SmsControllers.deleteGroup
);

// SMS Schedule Routes
router.post(
  "/schedule",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(createScheduleValidationSchema),
  SmsControllers.createSchedule
);

router.get("/schedule", SmsControllers.getAllSchedules);

router.get("/schedule/:id", SmsControllers.getSingleSchedule);

router.patch(
  "/schedule/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(updateScheduleValidationSchema),
  SmsControllers.updateSchedule
);

router.delete(
  "/schedule/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SmsControllers.deleteSchedule
);

// Bulk SMS Routes
router.post(
  "/bulk",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(sendBulkSmsValidationSchema),
  SmsControllers.sendBulkSms
);

// Group SMS Routes
router.post(
  "/group-send",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(sendGroupSmsValidationSchema),
  SmsControllers.sendGroupSms
);

export const SmsRoutes = router;
