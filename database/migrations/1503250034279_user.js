"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();

      table.string("username", 80).notNullable();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();

      table.integer("user_type").default(1);

      table.string("cpf");
      table.string("phone");

      table.string("address");
      table.string("state");
      table.string("city");

      table.text("description");

      table.string("date_birth");
      table.string("genre");

      table.string("reference");

      table.integer("score").defaultTo(0);

      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
