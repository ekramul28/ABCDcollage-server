import { User } from "../../models/User";
import {
  CreateTeacherDto,
  TeacherProfile,
  UpdateTeacherDto,
  TeacherListFilters,
} from "./teacher.types";
import { UserRole } from "../auth/auth.types";

export class TeacherService {
  constructor() {}

  public async createTeacher(
    teacherData: CreateTeacherDto
  ): Promise<TeacherProfile> {
    try {
      const newTeacher = new User({
        ...teacherData,
        role: UserRole.TEACHER,
        joiningDate: new Date(),
      });

      await newTeacher.save();
      return this.mapToTeacherProfile(newTeacher);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating teacher: ${error.message}`);
      }
      throw new Error("Error creating teacher");
    }
  }

  public async getTeacherProfile(
    teacherId: string
  ): Promise<TeacherProfile | null> {
    try {
      const teacher = await User.findOne({ teacherId, role: UserRole.TEACHER });
      return teacher ? this.mapToTeacherProfile(teacher) : null;
    } catch (error) {
      throw new Error("Error fetching teacher profile");
    }
  }

  public async updateTeacher(
    teacherId: string,
    updateData: UpdateTeacherDto
  ): Promise<TeacherProfile> {
    try {
      const teacher = await User.findOneAndUpdate(
        { teacherId, role: UserRole.TEACHER },
        { ...updateData },
        { new: true, runValidators: true }
      );

      if (!teacher) {
        throw new Error("Teacher not found");
      }

      return this.mapToTeacherProfile(teacher);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating teacher: ${error.message}`);
      }
      throw new Error("Error updating teacher");
    }
  }

  public async listTeachers(filters: TeacherListFilters): Promise<{
    teachers: TeacherProfile[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const query = {
        role: UserRole.TEACHER,
        ...(filters.department && { department: filters.department }),
        ...(filters.specialization && {
          specialization: filters.specialization,
        }),
        ...(filters.designation && { designation: filters.designation }),
        ...(filters.search && {
          $or: [
            { name: { $regex: filters.search, $options: "i" } },
            { email: { $regex: filters.search, $options: "i" } },
            { teacherId: { $regex: filters.search, $options: "i" } },
          ],
        }),
      };

      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const skip = (page - 1) * limit;

      const [teachers, total] = await Promise.all([
        User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
        User.countDocuments(query),
      ]);

      return {
        teachers: teachers.map(this.mapToTeacherProfile),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error("Error listing teachers");
    }
  }

  public async deleteTeacher(teacherId: string): Promise<boolean> {
    try {
      const result = await User.deleteOne({
        teacherId,
        role: UserRole.TEACHER,
      });
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error("Error deleting teacher");
    }
  }

  private mapToTeacherProfile(user: any): TeacherProfile {
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      teacherId: user.teacherId,
      department: user.department,
      specialization: user.specialization,
      qualification: user.qualification,
      subjects: user.subjects || [],
      joiningDate: user.joiningDate,
      experience: user.experience,
      designation: user.designation,
      phoneNumber: user.phoneNumber,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
