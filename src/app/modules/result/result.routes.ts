import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../auth/auth.types";
import { ResultControllers } from "./result.controller";
import {
  createResultValidationSchema,
  updateResultValidationSchema,
} from "./result.validation";

const router = express.Router();

// Result Routes
router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(createResultValidationSchema),
  ResultControllers.createResult
);

router.get("/", ResultControllers.getAllResults);

router.get("/:id", ResultControllers.getSingleResult);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TEACHER),
  validateRequest(updateResultValidationSchema),
  ResultControllers.updateResult
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ResultControllers.deleteResult
);

// Student-specific routes
router.get("/student/:studentId", ResultControllers.getResultsByStudent);

// Course-specific routes
router.get("/course/:courseId", ResultControllers.getResultsByCourse);

export const ResultRoutes = router;
