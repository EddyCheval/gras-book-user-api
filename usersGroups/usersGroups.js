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
  args.query.where = where;
  return UserGroup.findAll(args.query).then(result => {
    ErrorFunctions.error404(result);
    return result;
  });
};

const create = (values, options) => {
  return UserGroup.create(values, options);
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

  return User.findByPk(id, args).then(result => {
    ErrorFunctions.error404(result);

    if (args.sortColumn === null || args.sortColumn === undefined) {
      args.sortColumn = 'name';
    }
    // Le JS c de la merde faut vraiment être con pour consevoir un merde pareille
    // je savais que l'humanité aime la merde mais a se point (...)
    // Ce principe d'object remplis de bullshit Useless avec d'autres objets avec du bullshit useless dedans ....
    // SI QUELQU'UN CONNAIS UNE METHODE TOJSON POUR UNE OBJET DE MERDE DE TYPE SEQUZLIZE CHIASSE dite le moi
    // Les soluces sont toutes nazes comme js (#salt)
    // https://stackoverflow.com/questions/21961818/sequelize-convert-entity-to-plain-object
    // https://github.com/sequelize/sequelize/issues/4291

    const { groups } = result.dataValues;

    groups.forEach(group => {
      // Euhh ES7 est censé permettre sa mais MAIS j'arrive pas a utiliser cette syntaxe a la zeub ---------> const { userGroup, ...noUserGroup } = group.dataValues;
      const groupWithDeletedAttributes = group.dataValues;
      delete groupWithDeletedAttributes.userGroup;
    });

    // Quasi au plus court et au plus simple ET POURTANT SA RESTE DEGEUX CE CODE DE MERDE
    return OperatorFunctions.sortByKey(groups, args.sortColumn, args.sort).slice(0, args.limit);
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

  return Group.findByPk(id, args).then(result => {
    ErrorFunctions.error404(result);

    if (args.sortColumn === null || args.sortColumn === undefined) {
      args.sortColumn = 'name';
    }
    const { users } = result.dataValues;

    users.forEach(user => {
      const userWithDeletedAttributes = user.dataValues;
      delete userWithDeletedAttributes.userGroup;
    });
    return OperatorFunctions.sortByKey(users, args.sortColumn, args.sort).slice(0, args.limit);
  });
};

const destroy = ({ userUUID, groupUUID }) => {
  const where = {
    where: {
      userId: userUUID,
      groupId: groupUUID
    }
  };
  return UserGroup.destroy(where); // Necessite DeleteAt
};

const update = (values, options) => {
  const args = { ...options };
  const items = { ...values };
  args.where = {};
  args.where.userId = args.params.userUUID;
  args.where.groupId = args.params.groupUUID;
  return UserGroup.update(items, args);
};

module.exports = { findAll, create, findByUserUUID, findByGroupUUID, destroy, update }; // , findByUUID, update, create, destroy };
