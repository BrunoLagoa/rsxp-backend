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

<<<<<<< HEAD
      table.string("reference");
=======
      // Pessoa responsável pela escola
      table.string("referencia");
>>>>>>> dbb23b3caf274136469278774f6e8e010018de26

      table.integer("score").defaultTo(0);

      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
