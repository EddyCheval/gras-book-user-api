const Role = require('./roles');
const json = require('./role.json');
const ErrorFunctions = require('../functions/functions.error');
const {
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  roleSchema,
  roleUpdateSchema
} = require('./roles.validator');
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

const RoleRoute = [
  {
    method: 'GET',
    path: '/roles/',
    handler(request, h) {
      return Role.findAll(request).catch(err => {
        ErrorFunctions.errorCodeChange(h, err);
      });
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
    path: '/roles/{uuid}',
    handler(request, h) {
      return Role.findByUUID(request.params.uuid).catch(err => {
        ErrorFunctions.errorCodeChange(h, err);
      });
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
    path: '/roles/',
    handler(request, h) {
      return Role.create(request.payload).catch(err => {
        ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: {
        payload: roleSchema
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
    path: '/roles/{uuid}',
    handler(request, h) {
      return Role.update(request.payload, request).catch(err => {
        ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: {
        params: queryFindByUUIDParamSchema,
        payload: roleUpdateSchema
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
    path: '/roles/{uuid}',
    handler(request, h) {
      return Role.destroy(request.params).catch(err => {
        ErrorFunctions.errorCodeChange(h, err);
      });
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

module.exports = RoleRoute;
