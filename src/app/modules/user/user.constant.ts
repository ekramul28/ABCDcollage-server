export const USER_ROLE = {
  superAdmin: "superAdmin",

  teacher: "teacher",
  admin: "admin",
} as const;

export const UserStatus = ["in-progress", "blocked"];

export const UserSearchableFields = ["email", "id", "role"];
