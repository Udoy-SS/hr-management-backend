import db from "../../database/db";

interface AttendancePayload {
  employee_id?: number;
  date?: string;
  check_in_time?: string;
}

interface AttendanceQueryOptions {
  employee_id?: string;
  date?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

class AttendanceService {
  async getAll(filters: AttendanceQueryOptions) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 10;
    const offset = (page - 1) * limit;

    let query = db("attendance")
      .join("employees", "attendance.employee_id", "employees.id")
      .whereNull("employees.deleted_at");

    if (filters.employee_id) {
      query = query.where("attendance.employee_id", filters.employee_id);
    }

    if (filters.date) {
      query = query.where("attendance.date", filters.date);
    }

    if (filters.from && filters.to) {
      query = query.whereBetween("attendance.date", [filters.from, filters.to]);
    }

    const totalResult = (await query
      .clone()
      .count({ total: "attendance.id" })
      .first()) as { total?: string | number } | undefined;

    const total = Number(totalResult?.total || 0);

    const attendance = await query
      .clone()
      .select(
        "attendance.id",
        "attendance.employee_id",
        "employees.name as employee_name",
        "attendance.date",
        "attendance.check_in_time",
        "attendance.created_at",
        "attendance.updated_at"
      )
      .orderBy("attendance.date", "desc")
      .limit(limit)
      .offset(offset);

    return {
      data: attendance,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    return db("attendance")
      .where("attendance.id", id)
      .join("employees", "attendance.employee_id", "employees.id")
      .whereNull("employees.deleted_at")
      .select(
        "attendance.id",
        "attendance.employee_id",
        "employees.name as employee_name",
        "attendance.date",
        "attendance.check_in_time",
        "attendance.created_at",
        "attendance.updated_at"
      )
      .first();
  }

  async createOrUpdate(payload: AttendancePayload) {
    const [attendance] = await db("attendance")
      .insert(payload)
      .onConflict(["employee_id", "date"])
      .merge({
        check_in_time: payload.check_in_time,
        updated_at: new Date(),
      })
      .returning("*");

    return attendance;
  }

  async update(id: string, payload: AttendancePayload) {
    const updateData: Record<string, unknown> = {
      ...payload,
      updated_at: new Date(),
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const [attendance] = await db("attendance")
      .where({ id })
      .update(updateData)
      .returning("*");

    return attendance;
  }

  async delete(id: string) {
    return db("attendance").where({ id }).del();
  }

  async employeeExists(employeeId: number) {
    return db("employees")
      .where({ id: employeeId })
      .whereNull("deleted_at")
      .first();
  }
}

export default new AttendanceService();
