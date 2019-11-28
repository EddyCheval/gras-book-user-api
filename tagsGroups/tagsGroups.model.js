const Sequelize = require('sequelize');
const sequelizeInstance = require('../connectDatabase/connectDatabase');
const Tag = require('../tags/tags.model');
const Group = require('../groups/groups.model');

const { Model } = Sequelize;

class TagGroup extends Model {}
TagGroup.init(
  {
    tagId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    groupId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'tagGroup',
    freezeTableName: true
  }
);

Tag.belongsToMany(Group, {
  through: {
    model: TagGroup,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});

Group.belongsToMany(Tag, {
  through: {
    model: TagGroup,
    unique: false
  },
  foreignKey: 'groupId',
  constraints: false
});

module.exports = TagGroup;
