<h1 align="center">Welcome to gras-book-user-api 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1-blue.svg?cacheSeconds=2592000" />
  <a href="api.users.eddycheval.codes/documentation" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> User API of GrasBook social network maybe for Americains&#34;

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

## Other Projects :

- Recreating a facebook-like app. Seperated in micro-services with a service for each part :
  - Posts API (https://gitlab.com/projet-gras-book/post-api)
  - Messaging API (https://gitlab.com/projet-gras-book/message-api)
  - User API (here)
  - Reaction API (https://gitlab.com/projet-gras-book/api-reaction)
  - Gras-Book UI (https://gitlab.com/projet-gras-book/gras-book-ui)

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

- Github: [@EddyCheval](https://github.com/EddyCheval)
- LinkedIn: [@Eddy Cheval](https://linkedin.com/in/Eddy Cheval)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://gitlab.com/projet-gras-book/user-api/issues). You can also take a look at the [contributing guide](ssh://git@gitlab.com/projet-gras-book/user-api/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
