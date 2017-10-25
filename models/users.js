//jshint esversion:6
module.exports = function(sequelize, DataType) {
  const users = sequelize.define('users', {
    name: { type: DataType.STRING, allowNull: false, unique: true },
  }, {
    tableName: 'users'
  });

  users.associate = function(models) {
    users.hasMany(models.topics, {
      foreignKey: {
        name: 'created_by',
        allowNull: false
      },
      onDelete: 'NO ACTION'
    });
    users.hasMany(models.messages, {
      foreignKey: {
        name: 'author_id',
        allowNull: false
      },
      onDelete: 'NO ACTION'
    });
  };

  return users;
};