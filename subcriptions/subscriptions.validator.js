const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const subscriptionSchema = Joi.object({
  userId: Joi.string()
    .guid()
    .required()
    .description("Subscription's user uuid"),
  followerId: Joi.string()
    .guid()
    .required()
    .description("Subscription's follower uuid"),

  createdAt: Joi.date()
    .utc()
    .description("Subscription's creation date"),

  updatedAt: Joi.date()
    .utc()
    .description("Subscription's last update date")
});

const deleteSubscriptionSchema = Joi.object({
  followerUUID: Joi.string()
    .guid()
    .required()
    .description("Subscription's follower uuid"),

  userUUID: Joi.string()
    .guid()
    .required()
    .description("Subscription's user uuid")
});

const UUIDvalidatorSchema = Joi.object({
  uuid: Joi.string()
    .guid()
    .required()
    .description("Subscription's follower uuid")
});

const BasicQuerySchema = {
  limit: Joi.number()
    .integer()
    .max(100)
    .description("User's limit")
    .positive()
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
  subscriptionSchema,
  deleteSubscriptionSchema,
  UUIDvalidatorSchema,
  BasicQuerySchema
};
