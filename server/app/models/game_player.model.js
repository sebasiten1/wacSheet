module.exports = (sequelize, Sequelize) => {
  const Game_player = sequelize.define(
    'games_player',
    {
      gameId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      }
    },
    { timestamps: false }
  );

  return Game_player;
};
