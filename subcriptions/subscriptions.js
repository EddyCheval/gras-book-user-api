const lodash = require('lodash');
const Subscription = require('./subscriptions.model');
const User = require('../users/users.model');

const { ErrorFunctions, OperatorFunctions } = require('../functions');

const findAll = options => {
  const where = { ...options.query };
  const args = { ...options };
  delete where.limit;
  delete where.page;
  delete where.sort;
  delete where.sortColumn;

  // No ParseInt Validation already done before
  args.query.offset = args.query.limit * args.query.page;
  args.query.where = where;

  return Subscription.findAll(args.query)
    .then(result => {
      ErrorFunctions.error416(result, args.query);
      ErrorFunctions.error404(result);
      return { result, code: 206 };
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const create = (values, options) => {
  return Subscription.create(values, options).catch(err => {
    throw ErrorFunctions.error400(err);
  });
};

const findByUserUUID = (id, options) => {
  const args = { ...options };
  args.include = [
    {
      model: User,
      as: 'users'
    }
  ];

  return User.findByPk(id, args)
    .then(result => {
      ErrorFunctions.error404(result);

      if (lodash.isNull(args.sortColumn) || lodash.isUndefined(args.sortColumn)) {
        args.sortColumn = 'firstName';
      }
      if (lodash.isNull(args.sort) || lodash.isUndefined(args.sort)) {
        args.sort = 'ASC';
      }
      args.offsetNumber = args.limit * args.page;
      const { users } = result.dataValues;

      args.offset = args.offsetNumber;
      const sortedVal = OperatorFunctions.sortByKey(users, args.sortColumn, args.sort).slice(
        args.offsetNumber,
        args.offsetNumber + args.limit
      );
      ErrorFunctions.error416(sortedVal, args);
      return sortedVal;
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const findByFollowerUUID = (id, options) => {
  const args = { ...options };
  args.include = [
    {
      model: User,
      as: 'followers'
    }
  ];

  return User.findByPk(id, args)
    .then(result => {
      ErrorFunctions.error404(result);

      if (lodash.isNull(args.sortColumn) || lodash.isUndefined(args.sortColumn)) {
        args.sortColumn = 'firstName';
      }

      if (lodash.isNull(args.sort) || lodash.isUndefined(args.sort)) {
        args.sort = 'ASC';
      }
      args.offsetNumber = args.limit * args.page;
      const { followers } = result.dataValues;

      args.offset = args.offsetNumber;
      const sortedVal = OperatorFunctions.sortByKey(followers, args.sortColumn, args.sort).slice(
        args.offsetNumber,
        args.offsetNumber + args.limit
      );
      ErrorFunctions.error416(sortedVal, args);
      return sortedVal;
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const destroy = ({ userUUID, followerUUID }) => {
  const where = {
    where: {
      userId: userUUID,
      followerId: followerUUID
    }
  };
  return Subscription.destroy(where).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const update = (values, options) => {
  const args = { ...options };
  const items = { ...values };
  args.where = {};
  args.where.userId = args.params.userUUID;
  args.where.followerId = args.params.followerUUID;
  return Subscription.update(items, args).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

module.exports = { findAll, create, findByUserUUID, findByFollowerUUID, destroy, update };
