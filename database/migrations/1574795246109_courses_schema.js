"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CoursesSchema extends Schema {
  up() {
    this.create("courses", table => {
      table.increments();

      table.string("name", 80).notNullable();
      table.string("description",150);
      table.integer("step").notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("courses");
  }
}

module.exports = CoursesSchema;
