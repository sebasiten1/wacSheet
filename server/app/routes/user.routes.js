const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  // Get all users
  app.get('/api/users/all', [authJwt.verifyToken], controller.getUsers);

  // Get current user
  app.get('/api/users/current', [authJwt.verifyToken], controller.getCurrentUser);

  // Get user with user id
  app.get('/api/users/', [authJwt.verifyToken], controller.getUserById);

  // Update user with user id
  app.put('/api/users/', [authJwt.verifyToken], controller.updateUser);

  // Delete user with user id
  app.delete('/api/users/', [authJwt.verifyToken], controller.deleteUser);
};
