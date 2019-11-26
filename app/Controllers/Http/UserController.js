"use strict";

const User = use("App/Models/User");
const Profile = use("App/Models/Profile");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);
    await Profile.create({ user_id: user.id });

    return user;
  }
}

module.exports = UserController;
