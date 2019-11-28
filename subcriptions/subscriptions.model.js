const Sequelize = require('sequelize');
const sequelizeInstance = require('../connectDatabase/connectDatabase');
const User = require('../users/users.model');

const { Model } = Sequelize;

class Subscription extends Model {}
Subscription.init(
  {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    followerId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'subscription',
    freezeTableName: true
  }
);

User.belongsToMany(User, {
  through: {
    model: Subscription,
    unique: false
  },
  as: 'users',
  foreignKey: 'userId',
  constraints: false
});

User.belongsToMany(User, {
  through: {
    model: Subscription,
    unique: false
  },
  as: 'followers',
  foreignKey: 'followerId',
  constraints: false
});

User.hasMany(Subscription, {
  foreignKey: 'followerId',
  as: 'SubscriptionFollower'
});
User.hasMany(Subscription, {
  foreignKey: 'userId',
  as: 'SubscriptionFollowing'
});

module.exports = Subscription;
