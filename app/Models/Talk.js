"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Talk extends Model {
  course() {
    return this.belongsTo("App/Models/Course", "course_id", "id");
  }

  speaker() {
    return this.belongsTo("App/Models/User", "speaker_id", "id");
  }

  school() {
    return this.belongsTo("App/Models/User", "school_id", "id");
  }
}

module.exports = Talk;
