const Sequelize = require('sequelize');
const sequelizeInstance = require('../connectDatabase/connectDatabase')

const Model = Sequelize.Model;

class User extends Model {}
User.init({
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false  
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pictureUrl: {
        type: Sequelize.STRING,
        allowNull: true
    }

},{
    sequelize: sequelizeInstance,
    modelName: 'user'
})

module.exports = User;