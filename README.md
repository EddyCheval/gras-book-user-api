<h1 align="center">Welcome to gras-book-user-api 👋</h1>
<p>
  <a target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/post-api.svg">
  </a>
  <img alt="Version" src="https://img.shields.io/badge/version-1-blue.svg?cacheSeconds=2592000" />
  <a href="api.users.eddycheval.codes/documentation" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="http://api.users.eddycheval.codes/documentation" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/EddyCheval/grasbook-user-api/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
    <img alt="License: ISC" src="https://img.shields.io/github/license/Singebob/post-api" />
  </a>
</p>

> User API of GrasBook social network maybe for Americains. A Social network developped in a micro-services architecture and using JS and Python&#34;

## Other Projects :

- Recreating a facebook-like app. Seperated in micro-services with a service for each part :
  - Posts API (https://gitlab.com/projet-gras-book/post-api && https://github.com/Singebob/grasbook-post-api)
  - Messaging API (https://gitlab.com/projet-gras-book/message-api)
  - User API (https://gitlab.com/projet-gras-book/user-api && here)
  - Reaction API (https://gitlab.com/projet-gras-book/api-reaction)
  - Gras-Book UI (https://gitlab.com/projet-gras-book/gras-book-ui)

### 🏠 [Homepage](https://gitlab.com/projet-gras-book/user-api#readme)

### ✨ [Demo](.users.eddycheval.codes/documentation)

## Install

```sh
npm install
```

## Run tests

```sh
npm run test
```

## Environement Example :

| **NAME**               | **DESCRIPTION**                         | **TYPE** |
| ---------------------- | --------------------------------------- | -------- |
| PORT                   | The port of your local server           | INT      |
| HOST                   | The host of your local server           | STRING   |
| SRV_PORT               | The port of your dev server             | INT      |
| SRV_HOST               | The port of your dev server             | STRING   |
| DB_PORT                | The port of your database server        | INT      |
| DB_HOST                | The host of your database server        | STRING   |
| DB_USER                | The admin user of your database         | STRING   |
| DB_PASSWORD            | The admin's password                    | STRING   |
| DB_NAME                | Your database's name on your server     | STRING   |
| DB_POOL_MAX            | The maximum pool of your database       | INT      |
| REQUESTED_RANGE        | The size of the requested range for 416 | INT      |
| MAX_RANGE              | Max range available for 416 response    | INT      |
| CONTENT_SIZE           | The size of the requested content       | INT      |
| SCALEWAY_ACESS_KEY     | The A.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_SECRET_KEY    | The S.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_ENDPOINT      | The End. of the SCWL O.Storage service  | STRING   |
| SCALEWAY_REGION        | The Rgion of the SCWL O.Storage service | STRING   |
| SCALEWAY_BUCKET_NAME   | The B.Nme of the SCWL O.Storage service | STRING   |
| KEYCLOAK_PROTOCOL      | The protocole to contact keycloak       | STRING   |
| KEYCLOAK_DOMAIN        | The domaine name or ip adresse          | STRING   |
| KEYCLOAK_REALM         | The realm of client                     | STRING   |
| KEYCLOAK_CLIENT_ID     | The client id for keycloak              | STRING   |
| KEYCLOAK_CLIENT_SECRET | The client's secret                     | STRING   |

## Error description :

| **ID**                      | **DESCRIPTION**                           | **Error** |
| --------------------------- | ----------------------------------------- | --------- |
| id.not.found                | UUID not found                            | 404       |
| invalid.range               | Range (limit && page) provided inadequate | 416       |
| column.not.found            | sortColumn not found                      | 400       |
| unique.constraint.violation | UUID provided already exist               | 400       |
| internal.server.error       | Something went wrong. (bruh)              | 500       |

## Author

👤 **Eddy Cheval**

- Github: [@EddyCheval](https://github.com/EddyCheval)
- LinkedIn: [@Eddy Cheval](https://www.linkedin.com/in/eddy-cheval-0542b8141/)

Others contributors

- Github: [@SimonHuet](https://github.com/SimonHuet)
- Github: [@YannDurand](https://github.com/Nefaden)
- Github: [@Singebob](https://github.com/Singebob)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://gitlab.com/projet-gras-book/user-api/issues). You can also take a look at the [contributing guide](ssh://git@gitlab.com/projet-gras-book/user-api/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

Copyright © 2019 [Eddy Cheval](https://github.com/EddyCheval).<br />
This project is [ISC]() licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
