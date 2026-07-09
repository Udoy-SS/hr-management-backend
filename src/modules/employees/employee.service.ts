import db from "../../database/db";

interface EmployeePayload {
  name?: string;
  age?: number;
  designation?: string;
  hiring_date?: string;
  date_of_birth?: string;
  salary?: number;
  photo_path?: string | null;
}

interface EmployeeQueryOptions {
  search?: string;
  page?: number;
  limit?: number;
}

class EmployeeService {
  async getAll(options: EmployeeQueryOptions) {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 10;
    const offset = (page - 1) * limit;

    let query = db("employees").whereNull("deleted_at");

    if (options.search) {
      query = query.whereILike("name", `%${options.search}%`);
    }

    const totalResult = (await query.clone().count({ total: "id" }).first()) as
      { total?: string | number } | undefined;

    const total = Number(totalResult?.total || 0);

    const employees = await query
      .clone()
      .select("*")
      .orderBy("id", "desc")
      .limit(limit)
      .offset(offset);

    return {
      data: employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    return db("employees").where({ id }).whereNull("deleted_at").first();
  }

  async create(payload: EmployeePayload) {
    const [employee] = await db("employees").insert(payload).returning("*");
    return employee;
  }

  async update(id: string, payload: EmployeePayload) {
    const updateData: Record<string, unknown> = {
      ...payload,
      updated_at: new Date(),
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const [employee] = await db("employees")
      .where({ id })
      .whereNull("deleted_at")
      .update(updateData)
      .returning("*");

    return employee;
  }

  async softDelete(id: string) {
    return db("employees").where({ id }).whereNull("deleted_at").update({
      deleted_at: new Date(),
      updated_at: new Date(),
    });
  }
}

export default new EmployeeService();
