//jshint esversion:6
module.exports = function (sequelize, DataTypes) {
  const topics = sequelize.define('topics', {
    name : { type: DataTypes.STRING, allowNull: false, unique: true },
    }, {
    tableName : 'topics'
  });

  topics.associate = function(models) {
    topics.hasMany(models.messages, {
      foreignKey: {
        name: 'topic_id',
        as: 'messages',
        allowNull: false
      },
      onDelete: 'NO ACTION'
    });
  };

  return topics;
};