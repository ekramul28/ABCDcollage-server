import { JwtPayload } from "jsonwebtoken";

export enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
  STAFF = "staff",
}

export interface AuthUser extends JwtPayload {
  userId: number;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
  studentId?: string; // For students
  teacherId?: string; // For teachers
  staffId?: string; // For staff
  department?: string; // For teachers and staff
  batch?: string; // For students
  semester?: number; // For students
}

export interface AuthResponse {
  token?: string;
  message: string;
  user?: UserData;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  studentId?: string;
  teacherId?: string;
  staffId?: string;
  department?: string;
  batch?: string;
  semester?: number;
  createdAt: Date;
  updatedAt: Date;
}

// JWT payload type
export interface JwtPayload {
  userId: number;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
