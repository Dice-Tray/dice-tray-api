const express = require('express');

module.exports = {
  applyMiddlewares(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  },
};
