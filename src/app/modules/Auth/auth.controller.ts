import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginCredentials, RegisterData } from "./auth.types";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const credentials: LoginCredentials = req.body;
      const result = await this.authService.login(credentials);

      if (!result) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      res.status(200).json({
        message: "Login successful",
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: RegisterData = req.body;
      const user = await this.authService.createUser(userData);
      const token = await this.authService.generateToken(user);

      res.status(201).json({
        message: "Registration successful",
        token,
        user,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      // In a real implementation, you might want to invalidate the token
      // This could involve adding it to a blacklist or removing it from storage
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
