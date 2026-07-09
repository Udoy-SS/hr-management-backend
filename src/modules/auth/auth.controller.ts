import { Request, Response } from "express";
import authService from "./auth.service";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    if (!result) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    res.json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error,
    });
  }
};
