/* eslint-disable semi */
'use strict';

const Profile = use('App/Models/Profile');
const User = use('App/Models/User');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const profile = await Profile.query()
      .where('user_id', auth.user.id)
      .with('user')
      .with('avatar')
      .first();

    return profile;
  }

  /**
   * Render a form to be used for creating a new profile.
   * GET profiles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {}

  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {}

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {}

  /**
   * Render a form to update an existing profile.
   * GET profiles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, response, auth }) {
    try {
      const profile = await Profile.findOrFail(auth.user.id);
      const user = await User.findOrFail(auth.user.id);
      const data = request.only([
        'is_admin',
        'avatar_id',
        'cpf',
        'endereco',
        'numero',
        'complemento',
        'cep'
      ]);

      profile.merge(data);
      await profile.save();

      user.username = request.input('username');
      await user.save();

      await profile.load('user');
      await profile.load('avatar');

      return profile;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao atualizar perfil' } });
    }
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = ProfileController;
