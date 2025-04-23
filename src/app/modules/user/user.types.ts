import { UserRole } from "../auth/auth.types";

export interface UserProfile {
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
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserProfileDto {
  name?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
  department?: string;
  batch?: string;
  semester?: number;
  profileImage?: string;
}

export interface UserListFilters {
  role?: UserRole;
  department?: string;
  batch?: string;
  semester?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedUserResponse {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
