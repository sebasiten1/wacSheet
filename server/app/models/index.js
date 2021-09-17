const config = require('../config/env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: config.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, Sequelize);
db.user_role = require('../models/user_role.model')(sequelize, Sequelize);
db.game_player = require('../models/game_player.model')(sequelize, Sequelize);
db.role = require('../models/role.model')(sequelize, Sequelize);
db.game = require('../models/game.model')(sequelize, Sequelize);
db.equipment = require('../models/equipment.model')(sequelize, Sequelize);
db.player_equipment = require('../models/player_equipment.model')(sequelize, Sequelize);

// associate "roleId" and "userId" in "users_roles" table
db.role.belongsToMany(db.user, {
  through: db.user_role,
  onDelete: 'CASCADE'
});
db.user.belongsToMany(db.role, {
  through: db.user_role,
  onDelete: 'CASCADE'
});

// associate "gameId" and "userId" in "games_players" table
db.game.belongsToMany(db.user, {
  through: db.game_player,
  onDelete: 'CASCADE'
});
db.user.belongsToMany(db.game, {
  through: db.game_player,
  onDelete: 'CASCADE'
});

db.game.belongsTo(db.user, { foreignKey: 'ownerId', onDelete: 'CASCADE' });

db.player_equipment.belongsTo(db.user, { onDelete: 'CASCADE' });
db.player_equipment.belongsTo(db.game, { onDelete: 'CASCADE' });
db.player_equipment.belongsTo(db.equipment, { onDelete: 'CASCADE' });

db.ROLES = ['user', 'admin'];

module.exports = db;
