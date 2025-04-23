import { Router } from "express";
import { TeacherController } from "./teacher.controller";
import {
  createTeacherValidation,
  updateTeacherValidation,
  validateTeacherListQuery,
} from "./teacher.validation";
import { authenticateToken } from "../../middlewares/auth.middleware";

const router = Router();
const teacherController = new TeacherController();

// All routes require authentication
router.use(authenticateToken);

// Create new teacher (Admin only)
router.post(
  "/",
  createTeacherValidation,
  teacherController.createTeacher.bind(teacherController)
);

// Get teacher profile
router.get(
  "/:teacherId",
  teacherController.getTeacherProfile.bind(teacherController)
);

// Update teacher (Admin or self only)
router.patch(
  "/:teacherId",
  updateTeacherValidation,
  teacherController.updateTeacher.bind(teacherController)
);

// List teachers with filters
router.get(
  "/",
  validateTeacherListQuery,
  teacherController.listTeachers.bind(teacherController)
);

// Delete teacher (Admin only)
router.delete(
  "/:teacherId",
  teacherController.deleteTeacher.bind(teacherController)
);

export default router;
