exports.up = function (knex) {
  return knex.schema.createTable("employees", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("age").notNullable();
    table.string("designation").notNullable();
    table.date("hiring_date").notNullable();
    table.date("date_of_birth").notNullable();
    table.decimal("salary", 12, 2).notNullable();
    table.string("photo_path").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("employees");
};
