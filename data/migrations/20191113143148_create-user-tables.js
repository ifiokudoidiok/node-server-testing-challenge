exports.up = function(knex) {
    return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("username", 128)
      .unique()
      .notNullable();
      table.text("password").notNullable();
      table.string("department", 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("users")
};
