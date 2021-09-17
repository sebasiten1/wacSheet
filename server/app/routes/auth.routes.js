const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  // Create user
  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkUserName,
      verifySignUp.checkEmail,
      verifySignUp.checkPassword
    ],
    controller.signup
  );
  // Log user
  app.post('/api/auth/signin', controller.signin);
  // Forgot password
  app.post('/api/auth/forgot-password', controller.forgotPassword);
  // Reset password
  app.post('/api/auth/reset', controller.resetPassword);
  // Check token
  app.get('/api/auth/checktoken', controller.checkToken);
};
