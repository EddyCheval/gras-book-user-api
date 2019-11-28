const Sequelize = require('sequelize');
const sequelizeInstance = require('../connectDatabase/connectDatabase');

const { Model } = Sequelize;

class Tag extends Model {}
Tag.init(
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
    modelName: 'tag',
    freezeTableName: true
  }
);

module.exports = Tag;
