//jshint esversion:6
module.exports = function (sequelize, DataTypes) {
  const messages = sequelize.define('messages', {
    body : { type: DataTypes.TEXT, allowNull: false },
  }, {
    tableName : 'messages'
  });

  return messages;

};