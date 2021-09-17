module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING(50)
    },
    email: {
      type: Sequelize.STRING(320)
    },
    password: {
      type: Sequelize.STRING(100)
    }
  });

  return User;
};
