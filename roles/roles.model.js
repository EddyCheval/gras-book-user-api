const Sequelize = require('sequelize');
const sequelizeInstance = require('../connectDatabase/connectDatabase');

const { Model } = Sequelize;

class Role extends Model {}
Role.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'role',
    freezeTableName: true
  }
);

module.exports = Role;
