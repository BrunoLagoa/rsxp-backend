"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TalkSchema extends Schema {
  up() {
    this.create("talks", table => {
      table.increments();

      table
        .integer("course_id")
        .unsigned()
        .references("id")
        .inTable("courses")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();

      table
        .integer("speaker_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();

      table
        .integer("school_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL")
        .notNullable();

      table.date("date");

      table.timestamps();
    });
  }

  down() {
    this.drop("talks");
  }
}

module.exports = TalkSchema;
