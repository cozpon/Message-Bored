//jshint esversion:6
module.exports = function(sequelize, DataType) {
  const users = sequelize.define('users', {
    username: { type: DataType.STRING, allowNull: false, unique: true },
    password: { type: DataType.STRING, allowNull: false }
  });


  return users;
};