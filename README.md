# lerndorf
[![Build Status](https://travis-ci.org/cswertz/lerndorf.svg?branch=master)](https://travis-ci.org/cswertz/lerndorf)

> WebDidactic@lerndorf

This repository has 2 main folders:

* *server*: Contains all the relevant backend code and documentation for the backend itself
*  *client*: Contains all the relevant frontend code and documentation

## Deployment
During development, backend and frontend are run independently from one another on two different ports. This is obviously not what you want for production.

To prepare for production change to the client and build the production bundle:
```
cd client
yarn run build
```
> Be aware that building is very resource intensive, your machine should at least have 8GB of RAM.

Once the build is done, you can find it in *client/build*, the contents of this folder needs to be served by the server. To do so, simply copy the content of *client/build* to *server/server/public* and start the server as usual.

The frontend will then be available from the root of the server, eg.: http://localhost:3000/

## Versioning & Branching
This project is following versioning by [semver](https://semver.org/). Further it uses [gitflow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) as a branching model. This specifically means that development is happening on the develop branch. Releases are made on the master branch and tagged accordingly. Major releases might have breaking changes to the versions before. Versions less than *1.0.0* might have breaking changes in the minor bumps to. Please consult the *CHANGELOG*.

A new release will be made after each Milestone.

## Contributions
Contributions are very welcome. Make sure to direct you PR's against the dev branch. Make sure that tests are in place and that your PR is passing all the tests.
