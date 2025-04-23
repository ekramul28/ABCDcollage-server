import {
  LoginCredentials,
  RegisterData,
  UserData,
  UserRole,
} from "./auth.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor() {}

  public async validateUser(
    credentials: LoginCredentials
  ): Promise<UserData | null> {
    try {
      // TODO: Implement actual user validation with database
      // This is a mock implementation
      const mockUser: UserData = {
        id: 1,
        email: credentials.email,
        name: "Test User",
        role: UserRole.STUDENT,
        studentId: "ST001",
        batch: "2024",
        semester: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // In real implementation, verify password with bcrypt
      const isValidPassword = await bcrypt.compare(
        credentials.password,
        "$2a$10$mockHashedPassword"
      );
      return isValidPassword ? mockUser : null;
    } catch (error) {
      throw new Error("Error validating user");
    }
  }

  public async createUser(userData: RegisterData): Promise<UserData> {
    try {
      // TODO: Implement actual user creation with database
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // This is a mock implementation
      const newUser: UserData = {
        id: 1,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        studentId: userData.studentId,
        teacherId: userData.teacherId,
        staffId: userData.staffId,
        department: userData.department,
        batch: userData.batch,
        semester: userData.semester,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return newUser;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  public async generateToken(user: UserData): Promise<string> {
    try {
      return jwt.sign(
        {
          userId: user.id,
          role: user.role,
          // Add role-specific data to token
          ...(user.studentId && { studentId: user.studentId }),
          ...(user.teacherId && { teacherId: user.teacherId }),
          ...(user.staffId && { staffId: user.staffId }),
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "1d" }
      );
    } catch (error) {
      throw new Error("Error generating token");
    }
  }

  public async login(
    credentials: LoginCredentials
  ): Promise<{ token: string; user: UserData } | null> {
    const user = await this.validateUser(credentials);
    if (!user) return null;

    const token = await this.generateToken(user);
    return { token, user };
  }
}
