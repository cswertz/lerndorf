# Lerndorf Server (Backed)
[![Dependency Status](https://david-dm.org/cswertz/lerndorf.svg?path=server)](https://david-dm.org/cswertz/lerndorf) [![devDependencies Status](https://david-dm.org/cswertz/lerndorf/dev-status.svg?path=server)](https://david-dm.org/cswertz/lerndorf?type=dev) [![peerDependencies Status](https://david-dm.org/cswertz/lerndorf/peer-status.svg?path=server)](https://david-dm.org/cswertz/lerndorf?type=peer)

This repository hold all the relevant code for the Lerndorf backend.

## Installation
To install all the projects dependencies simply run:
    yarn install

## Configuration
If you want to use sqlite as your development database simply rename *config.example.json* to *config.json* in the **server/config/** directory.

If you want to use different dialects take a look at this starting point:
```
{
  "development": {
    "username": "user",
    "password": "pass",
    "database": "db_name",
    "host": "127.0.0.1",
    "dialect": "mysql", //'mysql'|'sqlite'|'postgres'|'mssql'
    "use_env_variable": false
  }
}
```

## Initializing the database
For the database to be initailly built, run:
    yarn sequelize db:migrate

Now you can run the seeders to pre populate the database with some data. This will add an admin user, having the admin role and the default password of **admin**.
    yarn sequelize db:seed:all

## Running
### App
    yarn start

### Linter
    yarn lint

### Tests
    yarn test

During development you might want to run the test watcher:
    yarn test-watch

## ENV Variables:
The following ENV variables are available, including their default values, should you not set them:
* NODE_ENV || development
* SERVER_PORT || 3000

## Available Endpoints
This section describes the available Endpoints and their functionality
### /api/users
#### GET
Returns a list of all available users.

#### POST
Create a new user.

### /api/users/:id
#### GET
Get information about a specific user.

#### PATCH
Update submitted fields of a specific user.

#### DELETE
Delete a specific user.

### /api/users/login
#### POST
Login a user.

## First steps
In this section I will describe how to add a new field to a model, by adding a new migration, customizing and running it:
