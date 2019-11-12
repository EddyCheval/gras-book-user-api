'use strict';

require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const sequelize = require('./connectDatabase/connectDatabase')
const Pack = require('./package');
//Routes :
const UserRoute = require('./users')

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
                version: Pack.version,
            },
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
        handler: (request, h) => {

            return 'PONG!';
        }
    });
    server.route(UserRoute)
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();