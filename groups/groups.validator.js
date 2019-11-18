const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const groupSchema = Joi.object({
  id: Joi.string()
    .guid()
    .required()
    .description("Group's uuid"),

  name: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required()
    .description("Group's name"),

  creationDate: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .description("Group's date of creation"),

  description: Joi.string()
    .max(250)
    .description("Group's description"),

  createdAt: Joi.date()
    .utc()
    .description("Group's creation date"),

  updatedAt: Joi.date()
    .utc()
    .description("Group's last update date")
});

const queryFindAllParamSchema = {
  query: {
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .description('Group limit number')
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
      .description("Group's name")
  }
};

const queryFindByUUIDParamSchema = {
  uuid: Joi.string()
    .guid()
    .description("Group's uuid")
};

const groupUpdateSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .description("Group's name"),

  creationDate: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .description("Group's date of creation"),

  description: Joi.string()
    .max(250)
    .description("Group's description")
});

module.exports = {
  groupSchema,
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  groupUpdateSchema
};
