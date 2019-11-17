const UserGroup = require('./usersGroups');
const json = require('./userGroup.json');
const usersJson = require('./users.json');
const groupsJson = require('./groups.json');
const { ErrorFunctions } = require('../functions');
const {
  userGroupSchema,
  deleteUserGroupSchema,
  UUIDvalidatorSchema,
  BasicQuerySchema,
  updateUserGroupSchema
} = require('./usersGroups.validator');

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

// SAVE ME FROM THIS SHIT AIE AIE AIE
const responses = {};
responses.resp200 = response200(json);
responses.resp206 = response206(json);
responses.resp200Users = response200(usersJson);
responses.resp200Groups = response200(groupsJson);
responses.resp403 = response403;
responses.resp416 = response416;
responses.resp500 = response500;
responses.resp400 = response400;
responses.resp401 = response401;
responses.resp201 = response201;
responses.resp204 = response204;
responses.resp404 = response404;

const UserGroupRoute = [
  {
    method: 'GET',
    path: '/usersGroups/',
    handler(request, h) {
      return UserGroup.findAll(request).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: userGroupSchema,
      plugins: {
        'hapi-swagger': {
          responses: {
            // deja gérer mais pas formatter
            ...responses.resp400,
            ...responses.resp200,
            // C pas plustot pour le contenu multimédia ?
            ...responses.resp206,
            ...responses.resp416,
            // byat
            // Wait for keycloak
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
    path: '/users/{uuid}/Groups',
    async handler(request, h) {
      return UserGroup.findByUserUUID(request.params.uuid, request.query).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: { params: UUIDvalidatorSchema, query: BasicQuerySchema },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.resp200Users,
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
    path: '/groups/{uuid}/Users',
    async handler(request, h) {
      return UserGroup.findByGroupUUID(request.params.uuid, request.query).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
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
    path: '/usersGroups/',
    handler(request, h) {
      return UserGroup.create(request.payload).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: {
        payload: userGroupSchema
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
    path: '/users/{userUUID}/groups/{groupUUID}/role',
    handler(request, h) {
      return UserGroup.update(request.payload, request).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: {
        params: deleteUserGroupSchema,
        payload: updateUserGroupSchema
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
    // Role ne me parait pas judicieux dans le nom de route. quels est ton avis jeune observateur impétueux ?
    method: 'PUT',
    path: '/groups/{userUUID}/users/{groupUUID}/role',
    handler(request, h) {
      return UserGroup.update(request.payload, request).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: {
        params: deleteUserGroupSchema,
        payload: updateUserGroupSchema
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
    path: '/groups/{groupUUID}/users/{userUUID}',
    handler(request, h) {
      return UserGroup.destroy(request.params).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: { params: deleteUserGroupSchema },
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
    path: '/users/{groupUUID}/groups/{userUUID}',
    handler(request, h) {
      return UserGroup.destroy(request.params).catch(err => {
        return ErrorFunctions.errorCodeChange(h, err);
      });
    },
    options: {
      validate: { params: deleteUserGroupSchema },
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

module.exports = UserGroupRoute;
