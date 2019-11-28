const Group = require('./groups');
const json = require('./group.json');
const { ErrorFunctions, SuccessFunctions } = require('../functions');
const {
  queryFindAllParamSchema,
  queryFindByUUIDParamSchema,
  groupSchema,
  groupUpdateSchema
} = require('./groups.validator');
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

const GroupRoute = [
  {
    method: 'GET',
    path: '/groups/',
    handler(request, h) {
      return Group.findAll(request)
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
    path: '/groups/{uuid}',
    handler(request, h) {
      return Group.findByUUID(request.params.uuid)
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
    path: '/groups/',
    handler(request, h) {
      return Group.create(request.payload)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        payload: groupSchema
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
    path: '/groups/{uuid}',
    handler(request, h) {
      return Group.update(request.payload, request)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        params: queryFindByUUIDParamSchema,
        payload: groupUpdateSchema
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
    path: '/groups/{uuid}',
    handler(request, h) {
      return Group.destroy(request.params)
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

module.exports = GroupRoute;
