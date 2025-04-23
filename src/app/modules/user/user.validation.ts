import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/)
    .optional(),
  address: z.string().min(5).optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  department: z.string().optional(),
  batch: z.string().optional(),
  semester: z.number().int().min(1).max(8).optional(),
  profileImage: z.string().url().optional(),
});

export const updateProfileValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await updateProfileSchema.parseAsync(req.body);
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

export const validateUserListQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const querySchema = z.object({
    role: z.string().optional(),
    department: z.string().optional(),
    batch: z.string().optional(),
    semester: z.coerce.number().int().min(1).max(8).optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  });

  try {
    const query = await querySchema.parseAsync(req.query);
    req.query = query;
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
