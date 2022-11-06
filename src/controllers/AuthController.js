const AuthService = require('../services/auth');
const UserService = require('../services/user');

module.exports = {
  async login(req, res) {
    try {
      const token = await AuthService.generateToken(req.body.email, req.body.password);
      const user = await UserService.getUserByEmail(req.body.email);
      res.status(200).json({ token, user });
    } catch (error) {
      return res.status(error?.status || 500).send({
        message: error?.message || 'An unknown error has occurred',
      });
    }
  },
};
