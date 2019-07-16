# Express Typescript Backend Base + Sequelize

This is boilerplate of [Express.js]('https://expressjs.com/), [Sequelize]('http://docs.sequelizejs.com/') written in [Typescript]('https://www.typescriptlang.org/'). Also using [ApiDoc]('http://apidocjs.com/') for easier writing documentation docker container ready.

## Requirement and first run
  * Make sure you have NodeJS and PosgreSQL/MySQL installed on your machine
  * Clone this repo and hit `npm install` or `yarn install` in project root directory
  * Run `cp .env.example .env` in terminal
  * Fill values on these key to connect database on your machine 
    * DB_USERNAME
    * DB_PASSWORD
    * DB_NAME
    * DB_HOSTNAME
  * If you want to use MySQL, change `dialect` property in `/src/config/index.ts`
  * Try run it with `npm run debug`
  * Application will start on `http://localhost:3000`

## Runing on docker
Running with docker will execute production build
1. Clone this project
2. run `docker build -t express-backend-base .`
3. run `docker run -p 3000:3000 -d express-backend-base`

## Project structure
> **Note:** Make sure you have hit `npm install` and try run the app using `npm run debug`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the output from the TypeScript build                                                 |
| **migrations**           | Contains the table migrations file for database                                               |
| **node_modules**         | Contains all the npm dependencies                                                             |
| **public**               | Contains the api documentation files generated using [apiDoc](http://apidocjs.com/)           |
| **seeders**              | Contains the table seeders file for database                                                  |
| **src**                  | Contains all the source code that will be compiled to dist folder                             |
| **src/config**           | The sequelize configuration                                                                   |
| **src/controllers**      | Controllers defines functions that respond to http request                                    |
| **src/locales**          | Language translation for messages                                                             |
| **src/middlewares**      | Middlewares defines functions for validating input request                                    |
| **src/models**           | Models sequelize for interacting with database                                                |
| **src/routes**           | Routes defines the routing for application                                                    |
| **src/utils**            | Utils defines the utility files                                                               |
| **src**/app.ts           | Express app main configuration                                                                |
| **src**/global.d.ts      | Defines the global interfaces                                                                 |
| **src** /server.ts       | Entry point express server                                                                    |

## Detailed documentation
  Will available soon

## LICENCE
MIT