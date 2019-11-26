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

      table.interger("user_type");

      table.string("cpf");
      table.string("telefone");

      table.string("endereco");
      table.string("estado");
      table.string("cidade");

      table.text("descricao");

      table.string("data_nascimento");
      table.string("genero");

      // Pessoa responsável pela escola
      table.string("referencia");

      table.interger("score");

      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
