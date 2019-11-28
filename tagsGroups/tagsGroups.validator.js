const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const tagGroupSchema = Joi.object({
  groupId: Joi.string()
    .guid()
    .required()
    .description("TagGroup's group uuid"),

  tagId: Joi.string()
    .guid()
    .required()
    .description("TagGroup's tag uuid"),

  createdAt: Joi.date()
    .utc()
    .description("TagGroup's creation date"),

  updatedAt: Joi.date()
    .utc()
    .description("TagGroup's last update date")
});

const deleteTagGroupSchema = Joi.object({
  groupUUID: Joi.string()
    .guid()
    .required()
    .description("TagGroup's group uuid"),

  tagUUID: Joi.string()
    .guid()
    .required()
    .description("TagGroup's tag uuid")
});

const UUIDvalidatorSchema = Joi.object({
  uuid: Joi.string()
    .guid()
    .required()
    .description("TagGroup's group uuid")
});

const BasicQuerySchema = {
  limit: Joi.number()
    .integer()
    .max(100)
    .description("Tag's limit")
    .positive()
    .default(10),

  page: Joi.number()
    .integer()
    .min(0)
    .description("Tag's page")
    .default(0),

  sort: Joi.string().min(1),
  sortColumn: Joi.string().min(4)
};

const queryFindAllParamSchema = {
  query: {
    limit: Joi.number()
      .integer()
      .max(100)
      .description('TagGroups limit number')
      .positive()
      .default(10),

    page: Joi.number()
      .integer()
      .min(0)
      .description('page number')
      .default(0),

    sort: Joi.string().min(1)
  }
};

module.exports = {
  tagGroupSchema,
  deleteTagGroupSchema,
  UUIDvalidatorSchema,
  BasicQuerySchema,
  queryFindAllParamSchema
};
