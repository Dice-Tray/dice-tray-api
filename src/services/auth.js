const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models');
const { makeSafeUser } = require('../utils');
require('dotenv').config();

const { User } = model;

module.exports = {
  async generateToken(email, password) {
    // sanitize inputs and ensure all are present
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // get the user from the database
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw { status: 401, message: 'Error: User does not exist' };
    }

    // If the password is incorrect, return an error.
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw { status: 401, message: 'Error: Incorrect password' };
    }

    // If there is no JWT_SECRET, return an error.
    if (!process.env.JWT_SECRET) {
      console.log('JWT_SECRET is not defined.', process.env.JWT_SECRET);
      throw { status: 500, message: 'Error: missing env variable (JWT secret)' };
    }

    // Generate a token.
    const token = jwt.sign(makeSafeUser(user), process.env.JWT_SECRET);

    // Send the token.
    return token;
  },
};
