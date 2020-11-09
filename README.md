# lerndorf
[![Build Status](https://travis-ci.org/cswertz/lerndorf.svg?branch=master)](https://travis-ci.org/cswertz/lerndorf)

> WebDidactic@lerndorf

## Purpose

Lerndorf is a learning management system (LMS) with a knowledge base and a metadata system (ontology). The knowledge base supports content in multiple languages and content version control. The content consists of knowledge units (KU) with one knowledge- and media type. The knowledge units are combined to learning units (LU). LUs have one topic. That is: One LU consists of all KUs with the same topic. The topics are unique in the knowledge base and connected by typed relations.

Courses are selections of KUs. KUs can thus easily be resused across courses. Within a course, different learning sequences can be offered. The learning sequences can be created manually or automatically. For the automatic creation of learning sequences the metadata are mapped to learning models. Additionally, learning is supported with a recommender system and AI methods.

## Roadmap (Overwiew)

### Implemented
* Database scheme with default metadata vocabulary
* Metadata editor
* User model
* Role model with editor
* User registration
* User management
* Learning unit editor
* Knowledge unit editor
* Text editor with file upload

### Work in Progress
* Research Interface
* Course designer with manual creation of learning sequences
* UI Design Improvements

### Future Work
* Bulletin Boards
* H5P Integration
* Automatic creation of learning sequences
* Recommender System

## Documentation
Please find further documentation (data model, interface) at [GoogleDrive](https://drive.google.com/drive/folders/0B-VurHfSvlzpQi1mM2ZXQVZYbDg?usp=sharing)
and in the readme-files in the server and client directory. Lerndorf is based on the results of the [INTUITEL project](https://www.riverpublishers.com/pdf/ebook/RP_E9788793519503.pdf) which was based on the [Web Dicatic concept](https://lerndorf.at/meder/privat/Meder_2006_Web-Didaktik.pdf).

## Structure

This repository has 2 main folders:

* *server*: Contains all the relevant backend code and documentation
* *client*: Contains all the relevant frontend code and documentation

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

## Running the Development Versions
### Install current LTS version of node, yarn, sequelize, and sqlite3
1. Clone repository
  ```
  git clone https://github.com/cswertz/lerndorf.git ./lerndorf
  cd lerndorf
  git checkout develop
  ```
 2. Install dependencies, initialise and start
 ```
  cd server
  yarn install
  cd server/config
  cp config.example.json config.json (adjust config if needed)
  yarn start
  cd ../../../client
  yarn install
  yarn start
  ```
3. login
  as user admin with password ```**admin**```

## Versioning & Branching
This project is following versioning by [semver](https://semver.org/). Further it uses [gitflow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) as a branching model. This specifically means that development is happening on the develop branch. Releases are made on the master branch and tagged accordingly. Major releases might have breaking changes to the versions before. Versions less than *1.0.0* might have breaking changes in the minor bumps to. Please consult the *CHANGELOG*.

A new release will be made after each Milestone.

## Contributions
Contributions are very welcome. Make sure to direct you PR's against the develop branch. Make sure that tests are in place and that your PR is passing all the tests.
