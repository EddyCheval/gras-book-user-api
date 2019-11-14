const User = require('./users.model');

const findAll = options => {
  const where = { ...options.query };
  const args = { ...options };
  delete where.limit;
  delete where.page;
  delete where.sort;
  args.query.where = where;
  return User.findAll(args.query);
};

const findByUUID = options => {
  return User.findByPk(options).then(result => {
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
  return User.update(items, args);
};
const create = (values, options) => {
  return User.create(values, options);
};

const destroy = options => {
  const where = {
    where: {
      id: options.uuid
    }
  };
  return User.destroy(where); // Necessite DeleteAt
};

module.exports = { findAll, findByUUID, update, create, destroy };
