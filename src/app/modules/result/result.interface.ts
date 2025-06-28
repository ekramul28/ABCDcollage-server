import { Model, Types } from "mongoose";

export type TResultType =
  | "exam"
  | "assignment"
  | "quiz"
  | "project"
  | "midterm"
  | "final";
export type TResultStatus = "published" | "draft" | "archived";
export type TGrade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "F";

export type TResult = {
  id: string;
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  examId?: Types.ObjectId;
  type: TResultType;
  title: string;
  description?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  grade: TGrade;
  status: TResultStatus;
  submittedAt: Date;
  gradedAt?: Date;
  gradedBy?: Types.ObjectId;
  feedback?: string;
  isDeleted: boolean;
};

export type TGradeRecord = {
  id: string;
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  semester: string;
  academicYear: string;
  grade: TGrade;
  gpa: number;
  totalCredits: number;
  earnedCredits: number;
  isDeleted: boolean;
};

export type TExam = {
  id: string;
  title: string;
  description?: string;
  courseId: Types.ObjectId;
  type: TResultType;
  date: Date;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  instructions?: string;
  status: TResultStatus;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};

export interface ResultModel extends Model<TResult> {
  // eslint-disable-next-line no-unused-vars
  isResultExists(id: string): Promise<TResult | null>;
}

export interface GradeModel extends Model<TGradeRecord> {
  // eslint-disable-next-line no-unused-vars
  isGradeExists(id: string): Promise<TGradeRecord | null>;
}

export interface ExamModel extends Model<TExam> {
  // eslint-disable-next-line no-unused-vars
  isExamExists(id: string): Promise<TExam | null>;
}
