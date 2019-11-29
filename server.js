/* eslint-disable no-console */
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const authKeycloak = require('hapi-auth-keycloak');
const sequelize = require('./connectDatabase/connectDatabase');
const Pack = require('./package');
// Routes :
const UserRoute = require('./users');
const GroupRoute = require('./groups');
const RoleRoute = require('./roles');
const UserGroupRoute = require('./usersGroups');
const TagRoute = require('./tags');
const TagGroupRoute = require('./tagsGroups');
const SubscriptionRoute = require('./subcriptions');

const KEYCLOAK_URL = `${process.env.KEYCLOAK_PROTOCOL}://${process.env.KEYCLOAK_DOMAIN}/auth/realms/${process.env.KEYCLOAK_REALM}`;

const init = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  const swaggerOptions = {
    info: {
      title: 'User API Documentation',
      version: Pack.version
    }
  };

  const authPluginOptions = {};

  const authStrategyOptions = {
    realmUrl: KEYCLOAK_URL,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_CLIENT_SECRET,
    userInfo: ['name', 'email']
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    {
      plugin: authKeycloak,
      options: authPluginOptions
    }
  ]);

  server.auth.strategy('keycloak-jwt', 'keycloak-jwt', authStrategyOptions);
  server.auth.default('keycloak-jwt');

  server.route({
    method: 'GET',
    path: '/ping',
    handler: () => {
      return 'PONG!';
    }
  });
  server.route(UserRoute);
  server.route(GroupRoute);
  server.route(RoleRoute);
  server.route(UserGroupRoute);
  server.route(TagRoute);
  server.route(TagGroupRoute);
  server.route(SubscriptionRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
