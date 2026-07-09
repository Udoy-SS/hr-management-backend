import { Router } from "express";
import { getMonthlyAttendanceReport } from "./report.controller";

const router = Router();

router.get("/attendance", getMonthlyAttendanceReport);

export default router;
