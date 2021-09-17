module.exports = (sequelize, Sequelize) => {
  const player_equipment = sequelize.define(
    'players_equipments',
    {
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      gameId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      equipmentId: {
        type: Sequelize.INTEGER
      },
      equiped: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    },
    { timestamps: false }
  );

  return player_equipment;
};
