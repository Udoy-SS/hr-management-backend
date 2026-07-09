import { Request, Response } from "express";
import db from "../../database/db";

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

    let query = db("attendance")
      .join("employees", "attendance.employee_id", "employees.id")
      .whereRaw("TO_CHAR(attendance.date, 'YYYY-MM') = ?", [month])
      .select("attendance.employee_id", "employees.name")
      .count("attendance.id as days_present")
      .sum({
        times_late: db.raw(
          "CASE WHEN attendance.check_in_time > '09:45:00'::time THEN 1 ELSE 0 END"
        ),
      })
      .groupBy("attendance.employee_id", "employees.name")
      .orderBy("attendance.employee_id", "asc");

    if (employeeId) {
      query = query.where("attendance.employee_id", employeeId);
    }

    const report = await query;

    res.json({
      message: "Monthly attendance report fetched successfully",
      month,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate attendance report",
      error,
    });
  }
};
