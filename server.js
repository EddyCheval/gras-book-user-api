/* eslint-disable no-console */
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const sequelize = require('./connectDatabase/connectDatabase');
const Pack = require('./package');
// Routes :
const UserRoute = require('./users');
const GroupRoute = require('./groups');
const RoleRoute = require('./roles');
const UserGroupRoute = require('./usersGroups');

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
    host: process.env.HOST
  });

  const swaggerOptions = {
    info: {
      title: 'User API Documentation',
      version: Pack.version
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

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
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
