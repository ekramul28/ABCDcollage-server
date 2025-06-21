import { TAttendanceStatus } from "./attendance.interface";

export const AttendanceStatus: TAttendanceStatus[] = [
  "present",
  "absent",
  "late",
  "excused",
];

export const AttendanceSearchableFields = [
  "id",
  "student",
  "course",
  "teacher",
  "status",
  "date",
];
