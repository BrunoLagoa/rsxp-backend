"use strict";
const Talk = use("App/Models/Talk");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with talks
 */
class TalkController {
  /**
   * Show a list of all talks.
   * GET talks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const talks = await Talk.query()
      .with("course")
      .with("speaker")
      .with("school")
      .fetch();

    return talks;
  }

  /**
   * Create/save a new talk.
   * POST talks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all();

    const talk = await Talk.create(data);

    return talk;
  }

  /**
   * Display a single talk.
   * GET talks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const talk = await Talk.query()
      .where("id", request.params.id)
      .with("course")
      .with("speaker")
      .with("school")
      .first();

    return talk;
  }

  /**
   * Update talk details.
   * PUT or PATCH talks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const talk = await Talk.findOrFail(params.id);
    const data = request.only(["date"]);

    talk.merge(data);

    await talk.save();

    return talk;
  }

  /**
   * Delete a talk with id.
   * DELETE talks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = TalkController;
