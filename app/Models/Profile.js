/* eslint-disable semi */
'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Profile extends Model {
  user () {
    return this.belongsTo('App/Models/User');
  }

  avatar () {
    return this.belongsTo('App/Models/File', 'avatar_id', 'id');
  }
}

module.exports = Profile;
