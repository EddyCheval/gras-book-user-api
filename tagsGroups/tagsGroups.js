const lodash = require('lodash');
const TagGroup = require('./tagsGroups.model');
const Tag = require('../tags/tags.model');
const Group = require('../groups/groups.model');

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

  return TagGroup.findAll(args.query)
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
  return TagGroup.create(values, options).catch(err => {
    throw ErrorFunctions.error400(err);
  });
};

const findByTagUUID = (id, options) => {
  const args = { ...options };
  args.include = [
    {
      model: Group
    }
  ];
  if (lodash.isNull(args.sortColumn) || lodash.isUndefined(args.sortColumn)) {
    args.sortColumn = 'name';
  }
  if (lodash.isNull(args.sort) || lodash.isUndefined(args.sort)) {
    args.sort = 'ASC';
  }
  args.offsetNumber = args.limit * args.page;

  return Tag.findByPk(id, args)
    .then(result => {
      ErrorFunctions.error404(result);
      return result.getGroups().then(res => {
        ErrorFunctions.error404(res);
        args.offset = args.offsetNumber;
        const sortedVal = OperatorFunctions.sortByKey(res, args.sortColumn, args.sort).slice(
          args.offsetNumber,
          args.offsetNumber + args.limit
        );
        ErrorFunctions.error416(sortedVal, args);
        return sortedVal;
      });
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const findByGroupUUID = (id, options) => {
  const args = { ...options };
  args.include = [
    {
      model: Tag
    }
  ];
  if (lodash.isNull(args.sortColumn) || lodash.isUndefined(args.sortColumn)) {
    args.sortColumn = 'name';
  }
  if (lodash.isNull(args.sort) || lodash.isUndefined(args.sort)) {
    args.sort = 'ASC';
  }

  args.offsetNumber = args.limit * args.page;

  return Group.findByPk(id, args)
    .then(result => {
      ErrorFunctions.error404(result);
      return result.getTags().then(res => {
        ErrorFunctions.error404(res);
        args.offset = args.offsetNumber;
        const sortedVal = OperatorFunctions.sortByKey(res, args.sortColumn, args.sort).slice(
          args.offsetNumber,
          args.offsetNumber + args.limit
        );
        ErrorFunctions.error416(sortedVal, args);
        return sortedVal;
      });
    })
    .catch(err => {
      throw ErrorFunctions.error400(err);
    });
};

const destroy = options => {
  const where = {
    where: {
      tagId: options.tagUUID,
      groupId: options.groupUUID
    }
  };
  return TagGroup.destroy(where).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const update = (values, options) => {
  const args = { ...options };
  const items = { ...values };
  args.where = {};
  args.where.tagId = args.params.tagUUID;
  args.where.groupId = args.params.groupUUID;
  return TagGroup.update(items, args).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

module.exports = { findAll, create, findByTagUUID, findByGroupUUID, destroy, update };
