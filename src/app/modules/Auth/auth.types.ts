export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type CustomJwtPayload = {
  userId: string;
  role: UserRole;
  email?: string;
  iat?: number;
  exp?: number;
};
