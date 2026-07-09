import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtUserPayload {
  id: number;
  email: string;
  name: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authorization token missing",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as JwtUserPayload;

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
