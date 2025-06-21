import { Router } from "express";
import AuthRouter from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AttendanceRoutes } from "../modules/attendance/attendance.routes";
import { UserRoutes } from "../modules/user/user.route";
import { NotificationRoutes } from "../modules/notification/notification.routes";
import { TeacherRoutes } from "../modules/teacher/teacher.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/teacher",
    route: TeacherRoutes,
  },
  {
    path: "/attendance",
    route: AttendanceRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/notification",
    route: NotificationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
