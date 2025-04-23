import { Request, Response } from "express";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto, UpdateTeacherDto } from "./teacher.types";
import { UserRole } from "../auth/auth.types";

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  public async createTeacher(req: Request, res: Response): Promise<void> {
    try {
      // Check if user has admin permission
      const userRole = req.user?.role;
      if (userRole !== UserRole.ADMIN) {
        res.status(403).json({ error: "Forbidden: Admin access required" });
        return;
      }

      const teacherData: CreateTeacherDto = req.body;
      const teacher = await this.teacherService.createTeacher(teacherData);
      res.status(201).json(teacher);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error creating teacher" });
      }
    }
  }

  public async getTeacherProfile(req: Request, res: Response): Promise<void> {
    try {
      const { teacherId } = req.params;
      const teacher = await this.teacherService.getTeacherProfile(teacherId);

      if (!teacher) {
        res.status(404).json({ error: "Teacher not found" });
        return;
      }

      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: "Error fetching teacher profile" });
    }
  }

  public async updateTeacher(req: Request, res: Response): Promise<void> {
    try {
      // Check if user is admin or the teacher themselves
      const userRole = req.user?.role;
      const userId = req.user?.userId;
      const { teacherId } = req.params;

      const teacher = await this.teacherService.getTeacherProfile(teacherId);
      if (!teacher) {
        res.status(404).json({ error: "Teacher not found" });
        return;
      }

      if (userRole !== UserRole.ADMIN && userId !== teacher.id) {
        res.status(403).json({ error: "Forbidden: Insufficient permissions" });
        return;
      }

      const updateData: UpdateTeacherDto = req.body;
      const updatedTeacher = await this.teacherService.updateTeacher(
        teacherId,
        updateData
      );

      res.status(200).json(updatedTeacher);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error updating teacher" });
      }
    }
  }

  public async listTeachers(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        department: req.query.department as string,
        specialization: req.query.specialization as string,
        designation: req.query.designation as string,
        search: req.query.search as string,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
      };

      const result = await this.teacherService.listTeachers(filters);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error listing teachers" });
    }
  }

  public async deleteTeacher(req: Request, res: Response): Promise<void> {
    try {
      // Check if user has admin permission
      const userRole = req.user?.role;
      if (userRole !== UserRole.ADMIN) {
        res.status(403).json({ error: "Forbidden: Admin access required" });
        return;
      }

      const { teacherId } = req.params;
      const success = await this.teacherService.deleteTeacher(teacherId);

      if (success) {
        res.status(200).json({ message: "Teacher deleted successfully" });
      } else {
        res.status(404).json({ error: "Teacher not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting teacher" });
    }
  }
}
