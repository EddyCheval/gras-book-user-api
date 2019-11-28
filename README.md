# Conception, developpement and integration of a Software Service

[![build status](https://gitlab.com/projet-gras-book/user-api/badges/master/build.svg)]()
[![VERSION](https://img.shields.io/static/v1?label=npm&message=1.0.0&color=blue)]()

**Project Gras-Book**

- Recreating a facebook-like app. Seperated in micro-services with a service for each part :
  - Posts API (https://gitlab.com/projet-gras-book/post-api)
  - Messaging API (https://gitlab.com/projet-gras-book/message-api)
  - User API (here)
  - Reaction API (https://gitlab.com/projet-gras-book/api-reaction)
  - Gras-Book UI (https://gitlab.com/projet-gras-book/gras-book-ui)

###Env Example :

| **NAME**             | **DESCRIPTION**                         | **TYPE** |
| -------------------- | --------------------------------------- | -------- |
| PORT                 | The port of your local server           | INT      |
| HOST                 | The host of your local server           | STRING   |
| SRV_PORT             | The port of your dev server             | INT      |
| SRV_HOST             | The port of your dev server             | STRING   |
| DB_PORT              | The port of your database server        | INT      |
| DB_HOST              | The host of your database server        | STRING   |
| DB_USER              | The admin user of your database         | STRING   |
| DB_PASSWORD          | The admin's password                    | STRING   |
| DB_NAME              | Your database's name on your server     | STRING   |
| DB_POOL_MAX          | The maximum pool of your database       | INT      |
| REQUESTED_RANGE      | The size of the requested range for 416 | INT      |
| MAX_RANGE            | Max range available for 416 response    | INT      |
| CONTENT_SIZE         | The size of the requested content       | INT      |
| SCALEWAY_ACESS_KEY   | The A.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_SECRET_KEY  | The S.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_ENDPOINT    | The End. of the SCWL O.Storage service  | STRING   |
| SCALEWAY_REGION      | The Rgion of the SCWL O.Storage service | STRING   |
| SCALEWAY_BUCKET_NAME | The B.Nme of the SCWL O.Storage service | STRING   |

| **ID**                      | **DESCRIPTION**                           | **Error** |
| --------------------------- | ----------------------------------------- | --------- |
| id.not.found                | UUID not found                            | 404       |
| invalid.range               | Range (limit && page) provided inadequate | 416       |
| column.not.found            | sortColumn not found                      | 400       |
| unique.constraint.violation | UUID provided already exist               | 400       |
| internal.server.error       | Something went wrong. (bruh)              | 500       |

###Note :
Joi v16.1.7 replaced by v15.1.1
Joi-date v2.0.1 replaced by v1.3.0
