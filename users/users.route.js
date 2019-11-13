const User = require('./users');
const json = require('./user.json');
const {
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  userSchema
} = require('./users.validator');
const {
  response400,
  response200,
  response416,
  response206,
  response403,
  response500,
  response401,
  response201,
  response204
} = require('../reponses');

const responses = {};
responses.resp200 = response200(json);
responses.resp206 = response206(json);
responses.resp403 = response403;
responses.resp416 = response416;
responses.resp500 = response500;
responses.resp400 = response400;
responses.resp401 = response401;
responses.resp201 = response201;
responses.resp204 = response204;

const UserRoute = [
  {
    method: 'GET',
    path: '/users/',
    handler(request) {
      return User.findAll(request);
    },
    options: {
      validate: queryFindAllParamSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp400,
            ...responses.resp200,
            ...responses.resp206,
            ...responses.resp416,
            ...responses.resp403,
            ...responses.resp500
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/users/{uuid}',
    handler(request) {
      return User.findByUUID(request.query.id);
    },
    options: {
      validate: queryFindByUUIDParamSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/users/',
    handler(request) {
      return User.Create(request.payload);
    },
    options: {
      validate: {
        payload: userSchema
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp201,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/users/{uuid}',
    handler(request) {
      return User.Create(request.payload);
    },
    options: {
      validate: {
        payload: userSchema
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  },
  {
    method: 'DELETE',
    path: '/users/{uuid}',
    handler(request) {
      return User.Delete(request.query);
    },
    options: {
      validate: queryFindByUUIDParamSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp204,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401
          },
          payloadType: 'form'
        }
      },
      tags: ['api']
    }
  }
];

module.exports = UserRoute;
