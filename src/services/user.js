const pick = require('lodash/pick');
const model = require('../models');
const bcrypt = require('bcrypt');
const { makeSafeUser } = require('../utils');
const { User } = model;


module.exports = {
  async create(newUserData) {
    // sanitize inputs and ensure all are present
    const { email, password, firstName, lastName, displayName } = pick(newUserData, [
      'email',
      'password',
      'firstName',
      'lastName',
      'displayName',
    ]);
    if (!email || !password || !firstName || !lastName || !displayName) {
      throw { status: 400, message: 'Error: Missing parameter' };
    }

    //salt the password for security purposes
    const hashedPassword = await bcrypt.hash(password, 10);

    // make sure this email address hasn't already been used
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      throw { status: 422, message: 'Error: Email already exists' };
    }

    // try to make a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      displayName,
      status: 'ACTIVE',
      role: 'USER',
    });

    return makeSafeUser(newUser);
  },
  async getUserByID(id) {
    // check to make sure we have our id
    if (!id) {
      throw { status: 400, message: 'Error: Missing id' };
    }

    // find our user
    const user = await User.findOne({
      where: { id },
    });

    // throw a not found if not found
    if (!user) {
      throw { status: 404, message: 'Error: User not found' };
    }

    return makeSafeUser(user);
  },

  async getUserByEmail(email) {
    // check to make sure we have our email
    if (!email) {
      throw { status: 400, message: 'Error: Missing email' };
    }

    // find our user
    const user = await User.findOne({
      where: { email },
    });

    // throw a not found if not found
    if (!user) {
      throw { status: 404, message: 'Error: User not found' };
    }

    return makeSafeUser(user);
  },

  async updateUserByID(id, userData) {
    // check to make sure we have our id
    if (!id) {
      throw { status: 400, message: 'Error: Missing id' };
    }

    const updateData = {
      password: userData?.password,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      displayName: userData?.displayName,
    };

    // find our user
    const count = await User.update(updateData, {
      where: { id },
    });

    // throw a not found if not found
    if (!count) {
      throw { status: 404, message: 'Error: User not found' };
    }

    return;
  },

  async deleteUserByID(id) {
    // check to make sure we have our param
    if (!id) {
      throw { status: 400, message: 'Error: Missing parameter' };
    }

    // destroy the user
    const count = await User.destroy({
      where: { id },
    });

    if (!count) {
      throw { status: 404, message: 'Error: User not found' };
    }
    return;
  },
  async getAll() {
    // get all users, and let parent catcher handle any errors
    const users = await User.findAll();
    return users;
  },
};
