import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const createTeacherSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  teacherId: z.string().min(2),
  department: z.string().min(2),
  specialization: z.string().optional(),
  qualification: z.string().min(2),
  subjects: z.array(z.string()).min(1),
  experience: z.number().min(0),
  designation: z.string().min(2),
});

const updateTeacherSchema = z.object({
  department: z.string().min(2).optional(),
  specialization: z.string().optional(),
  qualification: z.string().min(2).optional(),
  subjects: z.array(z.string()).min(1).optional(),
  designation: z.string().min(2).optional(),
  experience: z.number().min(0).optional(),
});

export const createTeacherValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await createTeacherSchema.parseAsync(req.body);
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

export const updateTeacherValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await updateTeacherSchema.parseAsync(req.body);
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

export const validateTeacherListQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const querySchema = z.object({
    department: z.string().optional(),
    specialization: z.string().optional(),
    designation: z.string().optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  });

  try {
    const query = await querySchema.parseAsync(req.query);
    req.query = query as any; // Using any instead of ParsedQs since it's not imported
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
      res.status(400).json({ error: "Invalid query parameters" });
    }
  }
};
