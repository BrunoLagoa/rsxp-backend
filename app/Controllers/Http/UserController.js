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
}

module.exports = UserController;
