import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { UserRole } from "./auth.types";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum([
      UserRole.ADMIN,
      UserRole.TEACHER,
      UserRole.STUDENT,
      UserRole.STAFF,
    ]),
    studentId: z.string().optional(),
    teacherId: z.string().optional(),
    staffId: z.string().optional(),
    department: z.string().optional(),
    batch: z.string().optional(),
    semester: z.number().int().min(1).max(8).optional(),
  })
  .refine(
    (data) => {
      // Student validation
      if (data.role === UserRole.STUDENT) {
        return data.studentId && data.batch && data.semester;
      }
      // Teacher validation
      if (data.role === UserRole.TEACHER) {
        return data.teacherId && data.department;
      }
      // Staff validation
      if (data.role === UserRole.STAFF) {
        return data.staffId && data.department;
      }
      // Admin validation
      if (data.role === UserRole.ADMIN) {
        return true;
      }
      return false;
    },
    {
      message: "Missing required fields for the selected role",
    }
  );

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await loginSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      res.status(400).json({ error: "Invalid input" });
    }
  }
};

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await registerSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      res.status(400).json({ error: "Invalid input" });
    }
  }
};
