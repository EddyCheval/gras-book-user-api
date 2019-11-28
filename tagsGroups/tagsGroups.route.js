const TagGroup = require('./tagsGroups');
const json = require('./tagGroup.json');
const tagJson = require('./tags.json');
const groupJson = require('./groups.json');
const { ErrorFunctions, SuccessFunctions } = require('../functions');
const {
  tagGroupSchema,
  deleteTagGroupSchema,
  UUIDvalidatorSchema,
  BasicQuerySchema,
  queryFindAllParamSchema
} = require('./tagsGroups.validator');

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
responses.resp200Tags = response200(tagJson);
responses.resp200Groups = response200(groupJson);
responses.resp206 = response206(json);
responses.resp403 = response403;
responses.resp416 = response416;
responses.resp500 = response500;
responses.resp400 = response400;
responses.resp401 = response401;
responses.resp201 = response201;
responses.resp204 = response204;
responses.resp404 = response404;

const TagGroupRoute = [
  {
    method: 'GET',
    path: '/tagsGroups/',
    handler(request, h) {
      return TagGroup.findAll(request)
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
    path: '/tags/{uuid}/Groups',
    async handler(request, h) {
      return TagGroup.findByTagUUID(request.params.uuid, request.query)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: { params: UUIDvalidatorSchema, query: BasicQuerySchema },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200Tags,
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
    method: 'GET',
    path: '/groups/{uuid}/Tags',
    async handler(request, h) {
      return TagGroup.findByGroupUUID(request.params.uuid, request.query)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: { params: UUIDvalidatorSchema, query: BasicQuerySchema },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200Groups,
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
    path: '/tagsGroups/',
    handler(request, h) {
      return TagGroup.create(request.payload)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: {
        payload: tagGroupSchema
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
    method: 'DELETE',
    path: '/groups/{groupUUID}/tags/{tagUUID}',
    handler(request, h) {
      return TagGroup.destroy(request.params)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: { params: deleteTagGroupSchema },
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
  },
  {
    method: 'DELETE',
    path: '/tags/{groupUUID}/groups/{tagUUID}',
    handler(request, h) {
      return TagGroup.destroy(request.params)
        .then(result => SuccessFunctions.successCodeChange(h, result))
        .catch(err => ErrorFunctions.errorCodeChange(h, err));
    },
    options: {
      validate: { params: deleteTagGroupSchema },
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

module.exports = TagGroupRoute;
