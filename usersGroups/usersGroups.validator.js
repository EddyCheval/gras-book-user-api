const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
// Songer a sortir les schemas s'ils deviennent trop nombreux dans un dossier roles.validator/ect.js
const userGroupSchema = Joi.object({
  groupId: Joi.string()
    .guid()
    .required()
    .description("UserGroup's group uuid"),

  userId: Joi.string()
    .guid()
    .required()
    .description("UserGroup's user uuid"),

  roleId: Joi.string()
    .guid()
    .description("UserGroup's role uuid"),

  createdAt: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .utc()
    .description("UserGroup's creation date"),

  updatedAt: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .utc()
    .description("UserGroup's last update date")
});

const deleteUserGroupSchema = Joi.object({
  groupUUID: Joi.string()
    .guid()
    .required()
    .description("UserGroup's group uuid"),

  userUUID: Joi.string()
    .guid()
    .required()
    .description("UserGroup's user uuid")
});

const updateUserGroupSchema = Joi.object({
  roleId: Joi.string()
    .guid()
    .required()
    .description("UserGroup's user uuid")
});

const UUIDvalidatorSchema = Joi.object({
  uuid: Joi.string()
    .guid()
    .required()
    .description("UserGroup's group uuid")
});

const BasicQuerySchema = {
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .description("User's limit")
    .default(10),

  page: Joi.number()
    .integer()
    .min(0)
    .description("User's page")
    .default(0),

  sort: Joi.string().min(1),
  sortColumn: Joi.string().min(4)
};

module.exports = {
  userGroupSchema,
  deleteUserGroupSchema,
  UUIDvalidatorSchema,
  BasicQuerySchema,
  updateUserGroupSchema
};
