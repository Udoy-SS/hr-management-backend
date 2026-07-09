import { Request, Response } from "express";
import reportService from "./report.service";

export const getMonthlyAttendanceReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const month = req.query.month as string | undefined;
    const employeeId = req.query.employee_id as string | undefined;

    if (!month) {
      res.status(400).json({
        message: "month query is required. Example: ?month=2025-08",
      });
      return;
    }

    const monthRegex = /^\d{4}-\d{2}$/;

    if (!monthRegex.test(month)) {
      res.status(400).json({
        message: "month must be in YYYY-MM format",
      });
      return;
    }

    const report = await reportService.getMonthlyAttendanceReport(
      month,
      employeeId
    );

    res.json({
      message: "Monthly attendance report fetched successfully",
      month,
      data: report,
    });
  } catch {
    res.status(500).json({
      message: "Failed to generate attendance report",
    });
  }
};
