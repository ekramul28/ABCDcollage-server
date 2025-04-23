import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UpdateUserProfileDto, UserListFilters } from "./user.types";
import { UserRole } from "../auth/auth.types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const userProfile = await this.userService.getUserProfile(userId);
      if (!userProfile) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user profile" });
    }
  }

  public async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const updateData: UpdateUserProfileDto = req.body;
      const updatedProfile = await this.userService.updateUserProfile(
        userId,
        updateData
      );

      res.status(200).json(updatedProfile);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error updating user profile" });
      }
    }
  }

  public async listUsers(req: Request, res: Response): Promise<void> {
    try {
      // Check if user has permission to list users
      const userRole = req.user?.role;
      if (userRole !== UserRole.ADMIN && userRole !== UserRole.STAFF) {
        res.status(403).json({ error: "Forbidden: Insufficient permissions" });
        return;
      }

      const filters: UserListFilters = {
        role: req.query.role as UserRole | undefined,
        department: req.query.department as string,
        batch: req.query.batch as string,
        semester: req.query.semester ? Number(req.query.semester) : undefined,
        search: req.query.search as string,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
      };

      const users = await this.userService.listUsers(filters);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error listing users" });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      // Check if user has admin permission
      const userRole = req.user?.role;
      if (userRole !== UserRole.ADMIN) {
        res.status(403).json({ error: "Forbidden: Admin access required" });
        return;
      }

      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
      }

      const success = await this.userService.deleteUser(userId);
      if (success) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  }
}
