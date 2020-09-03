exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments();
    users.string("firstName", 128).notNullable();
    users.string("lastName", 128).notNullable();
    users.string("email", 128).notNullable().unique();
    users.string("password", 128).notNullable();
  });

  await knex.schema.createTable("bet", (table) => {
    table.increments("id");
    table.string("opponent1").notNullable();
    table.string("opponent2").notNullable();
    table.string("win/loss").notNullable();
    table.string("month").notNullable();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("bet").dropTableIfExists("users");
};
