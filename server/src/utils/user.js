export default class UserUtils {
  static getPublicUserFields(user) {
    const data = UserUtils.getReqBody(user);
    delete data?.password;
    delete data?.confirmPassword;
    return data;
  }

  static getReqBody(body) {
    const data = {};
    Object.entries(body).forEach(([key, value]) => {
      data[key] = value;
    });
    return data;
  }

  static jwtPayload(user) {
    const data = {};

    (data.id = user?.id),
      (data.username = user?.username),
      (data.email = user?.email),
      (data.firstName = user?.firstName),
      (data.lastName = user?.lastName),
      (data.isAdmin = user?.role == "admin");

    return data;
  }

  static getUserSignupData(_req) {
    return {
      username: _req.username,
      firstName: _req.firstName,
      lastName: _req.lastName,
      email: _req.email,
      password: _req.password,
      role: _req.role,
      isAdmin: _req.isAdmin || _req.role === "admin"
    };
  }
}
