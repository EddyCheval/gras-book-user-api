const lodash = require('lodash');
const Sequelize = require('sequelize');
const User = require('./users.model');
const Subscription = require('../subcriptions/subscriptions.model');
const { ErrorFunctions, OperatorFunctions } = require('../functions');

const findAll = options => {
  const where = { ...options.query };
  const args = { ...options };
  if (lodash.isNull(args.query.sortColumn) || lodash.isUndefined(args.query.sortColumn)) {
    args.query.sortColumn = 'firstName';
    args.query.sort = 'ASC';
  }
  const inclusionList = ['description', 'firstName', 'lastName', 'birthDate', 'email'];
  if (!lodash.isUndefined(args.query.sortColumn) || !lodash.isUndefined(args.query.sort))
    args.order = [[args.query.sortColumn, args.query.sort]];

  // Esquive du Bug liée a include + limit qui créais un subquery bizarre dans ce cas :
  // args.limit = args.query.limit;
  // No ParseInt Validation already done before
  args.offset = Sequelize.literal(
    `${args.query.limit * args.query.page} LIMIT ${args.query.limit}`
  );

  delete where.limit;
  delete where.page;
  delete where.sort;
  delete where.sortColumn;
  args.attributes = {};
  args.attributes.include = [
    [Sequelize.fn('COUNT', Sequelize.col('SubscriptionFollower.userId')), 'followerCount'],
    [Sequelize.fn('COUNT', Sequelize.col('SubscriptionFollowing.followerId')), 'followingCount']
  ];
  args.include = [
    { model: Subscription, as: 'SubscriptionFollower', attributes: [] },
    { model: Subscription, as: 'SubscriptionFollowing', attributes: [] }
  ];
  args.group = ['user.id'];
  args.where = OperatorFunctions.formatQueryiLike(where, inclusionList);

  return User.findAll(args)
    .then(result => {
      ErrorFunctions.error416(result, args.query);
      ErrorFunctions.error404(result);
      return { result, code: 206 };
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const findByUUID = options => {
  const args = {};
  args.attributes = {};
  args.attributes.include = [
    [Sequelize.fn('COUNT', Sequelize.col('SubscriptionFollower.userId')), 'followerCount'],
    [Sequelize.fn('COUNT', Sequelize.col('SubscriptionFollowing.followerId')), 'followingCount']
  ];
  args.include = [
    { model: Subscription, as: 'SubscriptionFollower', attributes: [] },
    { model: Subscription, as: 'SubscriptionFollowing', attributes: [] }
  ];
  args.group = ['user.id'];
  return User.findByPk(options, args).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};
const update = async (values, options) => {
  const args = { ...options };
  const items = { ...values };
  args.where = {};
  args.where.id = args.params.uuid;
  if (items.pictureBlob) {
    items.pictureUrl = await OperatorFunctions.UploadBinaryToUri(values);
  }
  return User.update(items, args).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};
const create = async (values, options) => {
  const obj = { ...values };
  obj.pictureUrl = await OperatorFunctions.UploadBinaryToUri(values);
  return User.create(obj, options).catch(err => {
    throw ErrorFunctions.error400(err);
  });
};

const destroy = options => {
  const where = {
    where: {
      id: options.uuid
    }
  };
  return User.destroy(where).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

module.exports = { findAll, findByUUID, update, create, destroy };
