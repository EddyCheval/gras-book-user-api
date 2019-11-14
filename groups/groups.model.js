const Sequelize = require('sequelize');
const sequelizeInstance = require('../connectDatabase/connectDatabase');

const { Model } = Sequelize;

class Group extends Model {}
Group.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    creationDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'group',
    freezeTableName: true
  }
);

module.exports = Group;
