const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
// Songer a sortir les schemas s'ils deviennent trop nombreux dans un dossier roles.validator/ect.js
const roleSchema = Joi.object({
  id: Joi.string()
    .guid()
    .required()
    .description("Role's uuid"),

  name: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required()
    .description("Role's name"),

  createdAt: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .utc()
    .description("Role's creation date"),

  updatedAt: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .utc()
    .description("Role's last update date")
});

const queryFindAllParamSchema = {
  query: {
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .description('Role limit number')
      .default(10),

    page: Joi.number()
      .integer()
      .min(0)
      .description('page number')
      .default(0),

    sort: Joi.string().min(1),

    name: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .description("Role's name")
  }
};

const queryFindByUUIDParamSchema = {
  uuid: Joi.string()
    .guid()
    .description("Role's uuid")
};

const roleUpdateSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .description("Role's name")
});

module.exports = {
  roleSchema,
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  roleUpdateSchema
};
