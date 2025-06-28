import { z } from "zod";
import { ResultType, ResultStatus } from "./result.constant";

// Result Validation Schemas
export const createResultValidationSchema = z.object({
  body: z.object({
    result: z.object({
      studentId: z.string().min(1, "Student ID is required"),
      courseId: z.string().min(1, "Course ID is required"),
      examId: z.string().optional(),
      type: z.enum([...ResultType] as [string, ...string[]]),
      title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      score: z.number().min(0, "Score cannot be negative"),
      totalMarks: z.number().min(1, "Total marks must be at least 1"),
      grade: z.enum([
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "F",
      ]),
      status: z.enum([...ResultStatus] as [string, ...string[]]).optional(),
      submittedAt: z.string().datetime().optional(),
      feedback: z
        .string()
        .max(1000, "Feedback cannot exceed 1000 characters")
        .optional(),
    }),
  }),
});

export const updateResultValidationSchema = z.object({
  body: z.object({
    result: z.object({
      studentId: z.string().min(1, "Student ID is required").optional(),
      courseId: z.string().min(1, "Course ID is required").optional(),
      examId: z.string().optional(),
      type: z.enum([...ResultType] as [string, ...string[]]).optional(),
      title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      score: z.number().min(0, "Score cannot be negative").optional(),
      totalMarks: z
        .number()
        .min(1, "Total marks must be at least 1")
        .optional(),
      grade: z
        .enum([
          "A+",
          "A",
          "A-",
          "B+",
          "B",
          "B-",
          "C+",
          "C",
          "C-",
          "D+",
          "D",
          "F",
        ])
        .optional(),
      status: z.enum([...ResultStatus] as [string, ...string[]]).optional(),
      feedback: z
        .string()
        .max(1000, "Feedback cannot exceed 1000 characters")
        .optional(),
    }),
  }),
});

// Grade Validation Schemas
export const createGradeValidationSchema = z.object({
  body: z.object({
    grade: z.object({
      studentId: z.string().min(1, "Student ID is required"),
      courseId: z.string().min(1, "Course ID is required"),
      semester: z.string().min(1, "Semester is required"),
      academicYear: z.string().min(1, "Academic year is required"),
      grade: z.enum([
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "F",
      ]),
      gpa: z
        .number()
        .min(0, "GPA cannot be negative")
        .max(4, "GPA cannot exceed 4"),
      totalCredits: z.number().min(0, "Total credits cannot be negative"),
      earnedCredits: z.number().min(0, "Earned credits cannot be negative"),
    }),
  }),
});

export const updateGradeValidationSchema = z.object({
  body: z.object({
    grade: z.object({
      studentId: z.string().min(1, "Student ID is required").optional(),
      courseId: z.string().min(1, "Course ID is required").optional(),
      semester: z.string().min(1, "Semester is required").optional(),
      academicYear: z.string().min(1, "Academic year is required").optional(),
      grade: z
        .enum([
          "A+",
          "A",
          "A-",
          "B+",
          "B",
          "B-",
          "C+",
          "C",
          "C-",
          "D+",
          "D",
          "F",
        ])
        .optional(),
      gpa: z
        .number()
        .min(0, "GPA cannot be negative")
        .max(4, "GPA cannot exceed 4")
        .optional(),
      totalCredits: z
        .number()
        .min(0, "Total credits cannot be negative")
        .optional(),
      earnedCredits: z
        .number()
        .min(0, "Earned credits cannot be negative")
        .optional(),
    }),
  }),
});

// Exam Validation Schemas
export const createExamValidationSchema = z.object({
  body: z.object({
    exam: z.object({
      title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      courseId: z.string().min(1, "Course ID is required"),
      type: z.enum([...ResultType] as [string, ...string[]]),
      date: z.string().datetime(),
      duration: z.number().min(1, "Duration must be at least 1 minute"),
      totalMarks: z.number().min(1, "Total marks must be at least 1"),
      passingMarks: z.number().min(0, "Passing marks cannot be negative"),
      instructions: z
        .string()
        .max(1000, "Instructions cannot exceed 1000 characters")
        .optional(),
      status: z.enum([...ResultStatus] as [string, ...string[]]).optional(),
    }),
  }),
});

export const updateExamValidationSchema = z.object({
  body: z.object({
    exam: z.object({
      title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      courseId: z.string().min(1, "Course ID is required").optional(),
      type: z.enum([...ResultType] as [string, ...string[]]).optional(),
      date: z.string().datetime().optional(),
      duration: z
        .number()
        .min(1, "Duration must be at least 1 minute")
        .optional(),
      totalMarks: z
        .number()
        .min(1, "Total marks must be at least 1")
        .optional(),
      passingMarks: z
        .number()
        .min(0, "Passing marks cannot be negative")
        .optional(),
      instructions: z
        .string()
        .max(1000, "Instructions cannot exceed 1000 characters")
        .optional(),
      status: z.enum([...ResultStatus] as [string, ...string[]]).optional(),
    }),
  }),
});

export const ResultValidations = {
  createResultValidationSchema,
  updateResultValidationSchema,
  createGradeValidationSchema,
  updateGradeValidationSchema,
  createExamValidationSchema,
  updateExamValidationSchema,
};
