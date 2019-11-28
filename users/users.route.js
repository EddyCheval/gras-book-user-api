const User = require('./users');
const json = require('./user.json');
const { ErrorFunctions, SuccessFunctions } = require('../functions');
const {
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  userSchema,
  userUpdateSchema
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
  response204,
  response404
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
responses.resp404 = response404;

const UserRoute = [
  {
    method: 'GET',
    path: '/users/',
    handler(request, h) {
      return User.findAll(request)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
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
    handler(request, h) {
      return User.findByUUID(request.params.uuid)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: { params: queryFindByUUIDParamSchema },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200,
            ...responses.resp403,
            ...responses.resp500,
            ...responses.resp401,
            ...responses.resp404
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
    handler(request, h) {
      return User.create(request.payload)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
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
    handler(request, h) {
      return User.update(request.payload, request)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        params: queryFindByUUIDParamSchema,
        payload: userUpdateSchema
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
    handler(request, h) {
      return User.destroy(request.params)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: { params: queryFindByUUIDParamSchema },
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
