import { UserProfile } from "../user/user.types";

export interface TeacherProfile extends UserProfile {
  teacherId: string;
  department: string;
  specialization?: string;
  qualification: string;
  subjects: string[];
  joiningDate: Date;
  experience: number;
  designation: string;
}

export interface CreateTeacherDto {
  email: string;
  password: string;
  name: string;
  teacherId: string;
  department: string;
  specialization?: string;
  qualification: string;
  subjects: string[];
  experience: number;
  designation: string;
}

export interface UpdateTeacherDto {
  department?: string;
  specialization?: string;
  qualification?: string;
  subjects?: string[];
  designation?: string;
  experience?: number;
}

export interface TeacherListFilters {
  department?: string;
  specialization?: string;
  designation?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TeacherSubjectsResponse {
  teacherId: string;
  name: string;
  subjects: {
    subjectId: string;
    name: string;
    semester: number;
  }[];
}
