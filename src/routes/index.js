import userRoutes from './user';

module.exports = (app) => {
  app.use('/api/v1', userRoutes);
};
