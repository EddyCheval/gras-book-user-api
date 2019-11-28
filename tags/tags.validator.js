const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const tagSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required()
    .description("Tag's name"),

  createdAt: Joi.date()
    .utc()
    .description("Tag's creation date"),

  updatedAt: Joi.date()
    .utc()
    .description("Tag's last update date")
});

const queryFindAllParamSchema = {
  query: {
    limit: Joi.number()
      .integer()
      .max(100)
      .description('Tag limit number')
      .positive()
      .default(10),

    page: Joi.number()
      .integer()
      .min(0)
      .description('page number')
      .default(0),

    sort: Joi.string().min(1),
    sortColumn: Joi.string().min(1),

    name: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .description("Tag's name")
  }
};

const queryFindByUUIDParamSchema = {
  uuid: Joi.string()
    .guid()
    .description("Tag's uuid")
};

const tagUpdateSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .description("Tag's name")
});

module.exports = {
  tagSchema,
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  tagUpdateSchema
};
