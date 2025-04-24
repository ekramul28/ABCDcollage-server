export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
  STAFF = "staff",
}

// JWT payload type
export interface CustomJwtPayload {
  userId: number;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthUser extends CustomJwtPayload {
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

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
    }
  }
}
