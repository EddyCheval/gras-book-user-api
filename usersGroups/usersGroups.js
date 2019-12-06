const lodash = require('lodash');
const UserGroup = require('./usersGroups.model');
const User = require('../users/users.model');
const Group = require('../groups/groups.model');
const Role = require('../roles/roles.model');

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

  return UserGroup.findAll(args.query)
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
  return UserGroup.create(values, options).catch(err => {
    throw ErrorFunctions.error400(err);
  });
};

const findByUserUUID = (id, options) => {
  const args = { ...options };
  args.include = [
    {
      model: Group,
      include: {
        model: UserGroup,
        include: [
          {
            model: Role,
            attributes: ['name']
          }
        ],
        where: { userId: id }
      }
    }
  ];

  return User.findByPk(id, args)
    .then(result => {
      ErrorFunctions.error404(result);

      if (lodash.isNull(args.sortColumn) || lodash.isUndefined(args.sortColumn)) {
        args.sortColumn = 'name';
      }

      if (lodash.isNull(args.sort) || lodash.isUndefined(args.sort)) {
        args.sort = 'ASC';
      }
      args.offsetNumber = args.limit * args.page;
      const { groups } = result.dataValues;

      groups.forEach(group => {
        const groupWithDeletedAttributes = group.dataValues;
        delete groupWithDeletedAttributes.userGroup;
      });
      args.offset = args.offsetNumber;
      const sortedVal = OperatorFunctions.sortByKey(groups, args.sortColumn, args.sort).slice(
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

const findByGroupUUID = (id, options) => {
  const args = { ...options };
  args.include = [
    {
      model: User,
      include: [
        {
          model: UserGroup,
          include: [
            {
              model: Role,
              attributes: ['name']
            }
          ],
          where: { groupId: id }
        }
      ]
    }
  ];

  return Group.findByPk(id, args)
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

      users.forEach(user => {
        const userWithDeletedAttributes = user.dataValues;
        delete userWithDeletedAttributes.userGroup;
      });
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

const destroy = ({ userUUID, groupUUID }) => {
  const where = {
    where: {
      userId: userUUID,
      groupId: groupUUID
    }
  };
  return UserGroup.destroy(where).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const update = (values, options) => {
  const args = { ...options };
  const items = { ...values };
  args.where = {};
  args.where.userId = args.params.userUUID;
  args.where.groupId = args.params.groupUUID;
  return UserGroup.update(items, args).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

module.exports = { findAll, create, findByUserUUID, findByGroupUUID, destroy, update };
