//jshint esversion:6
module.exports = function (sequelize, DataTypes) {

  const topics = sequelize.define('topics', {
    name : { type: DataTypes.STRING, allowNull: false, unique: true }
  });

  topics.associate = function(models) {
    topics.belongsTo(models.users, {
      foreignKey: {
        name: 'created_by',
        allowNull: false
      },
      onDelete: 'NO ACTION'
    });
  };

  return topics;
};