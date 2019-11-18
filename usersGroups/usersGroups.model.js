const Sequelize = require('sequelize');
const sequelizeInstance = require('../connectDatabase/connectDatabase');
const User = require('../users/users.model');
const Group = require('../groups/groups.model');
const Role = require('../roles/roles.model');

const { Model } = Sequelize;

class UserGroup extends Model {}
UserGroup.init(
  {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    groupId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    roleId: {
      type: Sequelize.UUID,
      primaryKey: false,
      allowNull: true
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'userGroup',
    freezeTableName: true
  }
);

User.belongsToMany(Group, {
  through: {
    model: UserGroup,
    unique: false
  },
  foreignKey: 'userId',
  constraints: false
});

Group.belongsToMany(User, {
  through: {
    model: UserGroup,
    unique: false
  },
  foreignKey: 'groupId',
  constraints: false
});

Role.hasMany(UserGroup, {
  foreignKey: 'roleId'
});
UserGroup.belongsTo(Role, {
  foreignKey: 'roleId'
});

Group.hasMany(UserGroup, {
  foreignKey: 'groupId'
});
User.hasMany(UserGroup, {
  foreignKey: 'userId'
});

module.exports = UserGroup;
