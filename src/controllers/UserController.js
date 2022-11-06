const UserService = require('../services/user');
const AuthService = require('../services/auth');

module.exports = {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      return res.status(error?.status || 500).send({
        message: error?.message || 'An unknown error has occurred',
      });
    }
  },
  async getUserByID(req, res) {
    try {
      const user = await UserService.getUserByID(req.params.userID);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(error?.status || 500).send({
        message: error?.message || 'An unknown error has occurred',
      });
    }
  },
  async updateUserByID(req, res) {
    try {
      await UserService.updateUserByID(req.params.userID, req.body);
      return res.status(200).send();
    } catch (error) {
      return res.status(error?.status || 500).send({
        message: error?.message || 'An unknown error has occurred',
      });
    }
  },
  async deleteUserByID(req, res) {
    try {
      await UserService.deleteUser(req.params.userID);
      return res.status(204).send();
    } catch (error) {
      return res.status(error?.status || 500).send({
        message: error?.message || 'An unknown error has occurred',
      });
    }
  },
  async getAll(_req, res) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(error?.status || 500).send({
        message: error?.message || 'An unknown error has occurred',
      });
    }
  },
  async register(req, res) {
    try {
      const user = await UserService.create(req.body);
      const token = await AuthService.generateToken(
        req.body.email,
        req.body.password);
      res.status(201).json({ user, token });
    } catch (error) {
      return res.status(error?.status || 500).send({
        message: error?.message || 'An unknown error has occurred',
      });
    }
  },
};
