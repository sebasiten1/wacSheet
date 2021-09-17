const { authJwt, verifyGame } = require('../middleware');
const controller = require('../controllers/equipment.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  // ----- EQUIPMENT -----
  // Create equipment
  app.post('/api/equipments/create/', [authJwt.verifyToken], controller.createEquipment);

  // Get all equipments
  app.get('/api/equipments/all/', [authJwt.verifyToken], controller.getEquipments);

  // Get equipment with equipment id
  app.get('/api/equipments/', [authJwt.verifyToken], controller.getEquipmentById);

  // Update equipment with equipment id
  app.put('/api/equipments/', [authJwt.verifyToken], controller.updateEquipment);

  // Delete equipment with equipment id
  app.delete('/api/equipments/', [authJwt.verifyToken], controller.deleteEquipment);

  // ----- EQUIPMENT USERS -----
  // Get current user equipment with game id
  app.get('/api/equipments/game/', [authJwt.verifyToken], controller.getCurrentPlayerEquipments);

  // Add equipment to user with game id, player id and equipment id
  app.post(
    '/api/equipments/add/',
    [authJwt.verifyToken, verifyGame.isGameOwner],
    controller.addPlayerEquipment
  );

  // Remove equipment to user with game id, player id and equipment id
  app.delete('/api/equipments/delete/', [authJwt.verifyToken], controller.removePlayerEquipment);
};
