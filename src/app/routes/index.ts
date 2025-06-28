import { Router } from "express";
import AuthRouter from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AttendanceRoutes } from "../modules/attendance/attendance.routes";
import { UserRoutes } from "../modules/user/user.route";
import { NotificationRoutes } from "../modules/notification/notification.routes";
import { TeacherRoutes } from "../modules/teacher/teacher.route";
import { HomeRoutes } from "../modules/Home/home.route";
import { ResultRoutes } from "../modules/result/result.routes";
import { SmsRoutes } from "../modules/sms/sms.routes";

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
  {
    path: "/home",
    route: HomeRoutes,
  },
  {
    path: "/result",
    route: ResultRoutes,
  },
  {
    path: "/sms",
    route: SmsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
