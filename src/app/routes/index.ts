import { Router } from "express";
import AuthRouter from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AttendanceRoutes } from "../modules/attendance/attendance.routes";
import { UserRoutes } from "../modules/user/user.route";

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
    path: "/attendance",
    route: AttendanceRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
