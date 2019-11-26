"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ request, response, view }) {
    const users = await User.query().fetch();

    return users;
  }

  async store({ request, response }) {
    try {
      const data = request.only([
        "username",
        "email",
        "password",
        "user_type",
        "cpf",
        "phone",
        "address",
        "state",
        "city",
        "description",
        "date_birth",
        "genre",
        "reference",
        "score"
      ]);

      const user = await User.create(data);

      return user;
    } catch (error) {
      return response
        .status(401)
        .send("Ops. Algo deu errado, tente novamente.");
    }
  }

  async update({ params, request, response, auth }) {
    try {
      const user = await User.findByOrFail("user_type", params.id);

      // const data = request.only([
      //   "username",
      //   "email",
      //   "password",
      //   "user_type",
      //   "cpf",
      //   "phone",
      //   "address",
      //   "state",
      //   "city",
      //   "description",
      //   "date_birth",
      //   "genre",
      //   "reference",
      //   "score"
      // ]);

      // user.merge(data);
      // await user.save();

      return user;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Erro ao atualizar dados." } });
    }
  }

  async show({ params, request, response, auth }) {
    try {
      const user = await User.query()
        .where("user_type", params.id)
        .with("talks")
        .with("avatar")
        .first();

      return user;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Erro ao encontrar usuário." } });
    }
  }
}

module.exports = UserController;
