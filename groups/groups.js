const Group = require('./groups.model');
const { ErrorFunctions } = require('../functions');

const findAll = options => {
  const where = { ...options.query };
  const args = { ...options };
  delete where.limit;
  delete where.page;
  delete where.sort;
  args.query.where = where;
  return Group.findAll(args.query).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const findByUUID = options => {
  return Group.findByPk(options).then(result => {
    if (!result) {
      const error = new Error();
      error.message = 'No match found.';
      error.code = 404;
      throw error;
    }
    return result;
  });
};
const update = (values, options) => {
  const args = { ...options };
  const items = { ...values };
  args.where = {};
  args.where.id = args.params.uuid;
  return Group.update(items, args);
};
const create = (values, options) => {
  return Group.create(values, options);
};

const destroy = options => {
  const where = {
    where: {
      id: options.uuid
    }
  };
  return Group.destroy(where); // Necessite DeleteAt
};

module.exports = { findAll, findByUUID, update, create, destroy };
