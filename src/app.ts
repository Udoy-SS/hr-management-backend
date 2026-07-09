import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import employeeRoutes from "./modules/employees/employee.routes";
import attendanceRoutes from "./modules/attendance/attendance.routes";
import reportRoutes from "./modules/reports/report.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/employees", authMiddleware, employeeRoutes);
app.use("/attendance", authMiddleware, attendanceRoutes);
app.use("/reports", authMiddleware, reportRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "HR Management Backend API is running",
  });
});

export default app;
