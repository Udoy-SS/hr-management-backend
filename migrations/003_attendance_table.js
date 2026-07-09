exports.up = function (knex) {
  return knex.schema.createTable("attendance", function (table) {
    table.increments("id").primary();

    table
      .integer("employee_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("employees")
      .onDelete("CASCADE");

    table.date("date").notNullable();
    table.time("check_in_time").notNullable();

    table.unique(["employee_id", "date"]);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("attendance");
};
