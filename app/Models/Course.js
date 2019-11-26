"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Course extends Model {
  talks() {
    return this.hasMany("App/Models/Talk");
  }
}

module.exports = Course;
