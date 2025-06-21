import { z } from "zod";
import { AttendanceStatus } from "./attendance.constant";

export const createAttendanceValidationSchema = z.object({
  body: z.object({
    student: z.string().min(1, "Student ID is required"),
    course: z.string().min(1, "Course ID is required"),
    teacher: z.string().min(1, "Teacher ID is required"),
    date: z.string().min(1, "Date is required"),
    status: z.enum([...AttendanceStatus] as [string, ...string[]]),
    remarks: z.string().optional(),
  }),
});

export const updateAttendanceValidationSchema = z.object({
  body: z.object({
    student: z.string().min(1, "Student ID is required").optional(),
    course: z.string().min(1, "Course ID is required").optional(),
    teacher: z.string().min(1, "Teacher ID is required").optional(),
    date: z.string().min(1, "Date is required").optional(),
    status: z.enum([...AttendanceStatus] as [string, ...string[]]).optional(),
    remarks: z.string().optional(),
  }),
});

export const AttendanceValidations = {
  createAttendanceValidationSchema,
  updateAttendanceValidationSchema,
};
