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
Please find further documentation (data model, interface) at [GoogleDrive](https://drive.google.com/drive/folders/0B-VurHfSvlzpQi1mM2ZXQVZYbDg?resourcekey=0-JfrVTo-HObkrOflmamA7Fw&usp=sharing)
and in the readme-files in the server and client directory. Lerndorf is based on the results of the [INTUITEL project](https://www.riverpublishers.com/pdf/ebook/RP_E9788793519503.pdf) which was based on the [Web Dicatic concept](https://lerndorf.at/meder/privat/Meder_2006_Web-Didaktik.pdf).

## Structure
This repository has 2 main folders:

* *server*: Contains all the relevant backend code and documentation
* *client*: Contains all the relevant frontend code and documentation

## Running the Development Version
1. Install current LTS version of node, yarn, sequelize, and sqlite3

2. Clone repository
```
git clone https://github.com/cswertz/lerndorf.git ./lerndorf
cd lerndorf
git checkout develop
```

3. Install dependencies, initialize and start the server
```
cd server
yarn install
cd server/config
cp config.example.json config.json
# adjust config if needed
yarn start
```

4. Install dependencies and start the client
```
cd ../../../client
yarn install
yarn start
```

5. Login as *user* admin with password **admin**

## Installing for Production 

1. Install current LTS version of nvm, node, yarn, sequelize, mysql or sqlite and apache2.

2. Create a user account that you want to use to run the software and login with that account

3. If you use mysql: Create a database user for Lerndorf.

4. Create a directory (i. e. /var/www/lerndorf) to install Lerndorf and change to that directory.

5. Clone repository
```
git clone https://github.com/cswertz/lerndorf.git ./
```
6. Copy server/server/config/config.example.json to server/server/config.json and edit 

7. Set the build script as executable and run it
```
chmod 700 build.sh
./build.sh
```
> Be aware that building is very resource intensive, your machine should at least have 8GB of RAM.

8. Set up apache 

Edit lerndorf.conf according to your setup. Copy it to sites-available and activate it. Restart Apache.

9. Start Lerndorf with systemd

Edit lerndorf.sh according to your setup.
Edit lerndorf.service according to your setup.

```
sudo systemctl enable /YOURPATH/lerndorf.service
sudo systemctl start lerndorf
```

## Versioning & Branching
This project is following versioning by [semver](https://semver.org/). Further it uses [gitflow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) as a branching model. This specifically means that development is happening on the develop branch. Releases are made on the master branch and tagged accordingly. Major releases might have breaking changes to the versions before. Versions less than *1.0.0* might have breaking changes in the minor bumps to. Please consult the *[CHANGELOG](CHANGELOG.md)*.

A new release will be made after each Milestone.

## Contributions
Contributions are very welcome. Make sure to direct you PR's against the develop branch. Make sure that tests are in place and that your PR is passing all the tests.
