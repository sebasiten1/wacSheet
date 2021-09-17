const { authJwt, verifyGame } = require('../middleware');
const controller = require('../controllers/game.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  // ----- GAME -----
  // Create new game
  app.post(
    '/api/games/create/',
    [authJwt.verifyToken, verifyGame.checkDuplicateName, verifyGame.checkPassword],
    controller.createGame
  );

  // Get all games
  app.get('/api/games/all/', [authJwt.verifyToken], controller.getGames);

  // Get all games
  app.get('/api/games/current/', [authJwt.verifyToken], controller.getCurrentPlayerGames);

  // Get a game with game id
  app.get('/api/games', [authJwt.verifyToken], controller.getGameById);

  // Update game with game id
  app.put(
    '/api/games/',
    [
      authJwt.verifyToken,
      verifyGame.isGameOwner,
      verifyGame.checkDuplicateName,
      verifyGame.checkPassword
    ],
    controller.updateGame
  );

  // Delete game with game id
  app.delete('/api/games/', [authJwt.verifyToken, verifyGame.isGameOwner], controller.deleteGame);

  // ----- GAME USERS -----
  // Get players in game with game id
  app.get('/api/games/players/', [authJwt.verifyToken], controller.getPlayers);

  // Get game master id with game id
  app.get('/api/games/players/master', [authJwt.verifyToken], controller.getGmId);

  // Add player in game with game id
  app.post('/api/games/players/add', [authJwt.verifyToken], controller.addPlayer);

  // Delete player in game with game id
  app.delete('/api/games/players/remove', [authJwt.verifyToken], controller.removePlayer);

  // Get bool player exist in game with game id
  app.get('/api/games/players/exist', [authJwt.verifyToken], controller.playerExist);
};
