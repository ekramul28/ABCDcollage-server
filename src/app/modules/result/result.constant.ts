import { TResultType, TResultStatus } from "./result.interface";

export const ResultType: TResultType[] = [
  "exam",
  "assignment",
  "quiz",
  "project",
  "midterm",
  "final",
];

export const ResultStatus: TResultStatus[] = ["published", "draft", "archived"];

export const ResultSearchableFields = [
  "id",
  "studentId",
  "courseId",
  "examId",
  "type",
  "status",
  "grade",
  "score",
];

export const GradeSearchableFields = [
  "id",
  "studentId",
  "courseId",
  "semester",
  "academicYear",
  "grade",
  "gpa",
];

export const ExamSearchableFields = [
  "id",
  "title",
  "courseId",
  "type",
  "date",
  "duration",
  "totalMarks",
  "status",
];
