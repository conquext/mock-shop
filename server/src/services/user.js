import db from "../models/index";
const { User, Login } = db;

export default class UserService {
  static async addUser(newUser) {
    try {
      const user = await User.create(newUser);
      return user?.dataValues || user;
    } catch (error) {
      throw error;
    }
  }

  static async addLogin(email, userlogged) {
    try {
      const userToLogin = await User.findOne({
        where: { email }
      });

      if (userToLogin) {
        const createdLoginUser = await Login.create(userlogged);
        return createdLoginUser?.dataValues || createdLoginUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findUserInUsersDb(email) {
    try {
      const loggedUser = await User.findOne({
        where: {
          email
        }
      });
      return loggedUser?.dataValues || loggedUser;
    } catch (error) {
      return error.message;
    }
  }

  static async findUserInLoginsDb(email) {
    try {
      const lastLogin = await Login.findOne({
        where: {
          email
        }
      });
      return lastLogin?.dataValues || lastLogin;
    } catch (error) {
      return error.message;
    }
  }

  static async addUserInLogins(addUser) {
    try {
      const user = await Login.create(addUser);
      return user?.dataValues || user;
    } catch (error) {
      return error.message;
    }
  }

  static async updateLogins(email, loginData) {
    try {
      const login = await Login.update(loginData, {
        where: {
          email
        }
      });
      return login?.dataValues || login;
    } catch (error) {
      return error.message;
    }
  }

  static async findUserById(id) {
    try {
      const user = await User.findOne({
        where: { id }
      });
      return user.dataValues || user;
    } catch (error) {
      throw error;
    }
  }
}
