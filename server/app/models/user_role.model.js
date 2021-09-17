module.exports = (sequelize, Sequelize) => {
  const User_role = sequelize.define(
    'users_roles',
    {
      roleId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      }
    },
    { timestamps: false }
  );

  return User_role;
};
