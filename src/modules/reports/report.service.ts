import db from "../../database/db";

class ReportService {
  async getMonthlyAttendanceReport(month: string, employeeId?: string) {
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

    return query;
  }
}

export default new ReportService();
