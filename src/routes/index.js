const userRoutes = require('./user');
const authRoutes = require('./auth');

module.exports = (app) => {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', authRoutes);
};
