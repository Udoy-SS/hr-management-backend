const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  await knex("hr_users").del();

  const passwordHash = await bcrypt.hash("123456", 10);

  await knex("hr_users").insert([
    {
      email: "hr@example.com",
      password_hash: passwordHash,
      name: "HR Admin",
    },
  ]);
};
