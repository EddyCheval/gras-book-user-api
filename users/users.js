const User = require('./users.model');

const findAll = options => {
  const where = { ...options.query };
  delete where.limit;
  delete where.page;
  delete where.sort;
  // eslint-disable-next-line no-param-reassign
  options.query.where = where;
  return User.findAll(options.query);
};

const findByUUID = options => {
  return User.findByPk(options);
};
const Update = (values, options) => {
  return User.update(values, options);
};
const Create = (values, options) => {
  return User.create(values, options);
};

const Delete = options => {
  const where = {
    where: {
      id: options.id
    }
  };
  return User.destroy(where); // Necessite DeleteAt
};

module.exports = { findAll, findByUUID, Update, Create, Delete };
