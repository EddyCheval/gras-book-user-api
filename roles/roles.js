const lodash = require('lodash');
const Role = require('./roles.model');
const { ErrorFunctions, OperatorFunctions } = require('../functions');

const findAll = options => {
  const where = { ...options.query };
  const args = { ...options };
  const inclusionList = ['name'];
  if (lodash.isNull(args.query.sortColumn) || lodash.isUndefined(args.query.sortColumn)) {
    args.query.sortColumn = 'name';
    args.query.sort = 'ASC';
  }
  if (!lodash.isUndefined(args.query.sortColumn) || !lodash.isUndefined(args.query.sort))
    args.query.order = [[args.query.sortColumn, args.query.sort]];

  delete where.limit;
  delete where.page;
  delete where.sort;
  delete where.sortColumn;

  // No ParseInt Validation already done before
  args.query.offset = args.query.limit * args.query.page;
  args.query.where = OperatorFunctions.formatQueryiLike(where, inclusionList);

  return Role.findAll(args.query)
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
  return Role.findByPk(options).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};
const update = (values, options) => {
  const args = { ...options };
  const items = { ...values };
  args.where = {};
  args.where.id = args.params.uuid;
  return Role.update(items, args).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};
const create = (values, options) => {
  return Role.create(values, options)
    .then(result => {
      ErrorFunctions.error404(result);
      return result;
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const destroy = options => {
  const where = {
    where: {
      id: options.uuid
    }
  };
  return Role.destroy(where).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

module.exports = { findAll, findByUUID, update, create, destroy };
