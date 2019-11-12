const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
// Songer a sortir les schemas s'ils deviennent trop nombreux dans un dossier users.validator/ect.js
const userSchema = Joi.object({
  id: Joi.string()
    .guid()
    .required()
    .description("User's uuid"),

  firstName: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required()
    .description("User's first name"),

  lastName: Joi.string()
    .alphanum()
    .min(1)
    .max(50)
    .required()
    .description("User's last name"),

  birthDate: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .description("User's birth date"),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'fr']
      }
    })
    .required()
    .description("User's email"),

  login: Joi.string()
    .min(8)
    .max(30)
    .required()
    .description("User's login"),

  password: Joi.string()
    .min(8)
    .max(250)
    .required()
    .description("User's password"),

  description: Joi.string()
    .max(250)
    .description("User's description"),

  pictureUrl: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .description("User's picture url"),

  createdAt: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .utc()
    .description("User's creation date"),

  updatedAt: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .utc()
    .description("User's creation date")
});

const queryFindAllParamSchema = {
  query: {
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

    firstName: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .description("User's first name"),

    lastName: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .description("User's last name"),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'fr']
        }
      })
      .description("User's email")
  }
};

const queryFindByUUIDParamSchema = {
  query: {
    id: Joi.string()
      .guid()
      .description("User's uuid")
  }
};

module.exports = { userSchema, queryFindAllParamSchema, queryFindByUUIDParamSchema };
