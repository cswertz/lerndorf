# lerndorf
[![Build Status](https://travis-ci.org/cswertz/lerndorf.svg?branch=master)](https://travis-ci.org/cswertz/lerndorf)

> WebDidactic@lerndorf

## Purpose

Lerndorf is a learning management system (LMS) with a knowledge base and a metadata system (ontology). The knowledge base supports content in multiple languages and content version control. The content consists of knowledge units (KU) with one knowledge- and media type. The knowledge units are combined to learning units (LU). LUs have one topic. That is: One LU consists of all KUs with the same topic. The topics are unique in the knowledge base and connected by typed relations.

Courses are selections of KUs. KUs can thus easily be resused across courses. Within a course, different learning sequences can be offered. The learning sequences can be created manually or automatically. For the automatic creation of learning sequences the metadata are mapped to learning models. Additionally, learning is supported with a recommender system and AI methods.

## Roadmap (Overwiew)

### Implemented
- [x] Database scheme with default metadata vocabulary
- [x] Metadata editor
- [x] User model
- [x] Role model with editor
- [x] User registration
- [x] User management
- [x] Learning unit editor
- [x] Knowledge unit editor
- [x] Text editor with file upload

### Work in Progress
- [ ] Research Interface
- [ ] Course designer with manual creation of learning sequences
- [ ] UI Design Improvements

### Future Work
- [ ] Bulletin Boards
- [ ] H5P Integration
- [ ] Automatic creation of learning sequences
- [ ] Recommender System

## Documentation
Please find further documentation (data model, interface) at [GoogleDrive](https://drive.google.com/drive/folders/0B-VurHfSvlzpQi1mM2ZXQVZYbDg?usp=sharing)
and in the readme-files in the server and client directory. Lerndorf is based on the results of the [INTUITEL project](https://www.riverpublishers.com/pdf/ebook/RP_E9788793519503.pdf) which was based on the [Web Dicatic concept](https://lerndorf.at/meder/privat/Meder_2006_Web-Didaktik.pdf).

## Structure
This repository has 2 main folders:

* *server*: Contains all the relevant backend code and documentation
* *client*: Contains all the relevant frontend code and documentation

## Running the Development Versions
### Install current LTS version of node, yarn, sequelize, and sqlite3

1. Clone repository
```
git clone https://github.com/cswertz/lerndorf.git ./lerndorf
cd lerndorf
git checkout develop
```

2. Install dependencies, initialize and start the server
```
cd server
yarn install
cd server/config
cp config.example.json config.json
# adjust config if needed
yarn start
```

3. Install dependencies and start the client
```
cd ../../../client
yarn install
# (optionally) copy .env.example to .env and adjust
yarn start
```

4. Login as *user* admin with password **admin**

## Production build
During development, back and front-end are run independently from one another on two different ports. This is obviously not what you want for production.

1. Preperation
```
Create the user you want to use to run the service (any regular account will do). Login as that user.
Install nvm, yarn and node.
Install mysql and add an user account.
```
2. Clone repository
```
git clone https://github.com/cswertz/lerndorf.git ./lerndorf
cd lerndorf
git checkout develop
```
3. Edit the config file.
```
cd server/server/config
cp config.example.json config.json
```
Edit config.json and adjust to your needs

4. Building the client
Run the build script from the root directory of the project:
```
chmod 700 build.sh
./build.sh
```
> Be aware that building is very resource intensive, your machine should at least have 8GB of RAM.

6. Prepare apache webserver (recommended)

If you want to run lerndorf as root on port 80, set user to root and port to 80. If you want to run lerndorf with other user (like lerndorf or www-data) set user to this user and port to 3000.

```
edit lerndorf.conf and adjust to your needd
sudo cp lerndorf.conf /etc/apache/sites-enabled/lerndorf.conf
sudo systemctl restart apache2
```
7. Start lerndorf automatically on reboot
```
edit lerndorf.sh and adjust to your needs
chmod 700 lerndorf.sh
edit lerndorf.service and adjust to your needd
sudo systemctl enable /[YOURPATH]/lerndorf.service
sudo systemctl start lerndorf
```


## Versioning & Branching
This project is following versioning by [semver](https://semver.org/). Further it uses [gitflow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) as a branching model. This specifically means that development is happening on the develop branch. Releases are made on the master branch and tagged accordingly. Major releases might have breaking changes to the versions before. Versions less than *1.0.0* might have breaking changes in the minor bumps to. Please consult the *[CHANGELOG](CHANGELOG.md)*.

A new release will be made after each Milestone.

## Contributions
Contributions are very welcome. Make sure to direct you PR's against the develop branch. Make sure that tests are in place and that your PR is passing all the tests.
