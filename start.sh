#!/bin/bash

# export NODE_ENV=test
# export NODE_ENV=development
# export NODE_ENV=production
export NODE_ENV=production_mysql
export SERVER_PORT=3001
export CLIENT_PORT=3000
 
# ADJUST TO YOUR PATH
cd /var/www/ld/server
yarn install
nohup yarn start > /dev/null 2>&1 &
cd ../client
yarn install
nohup yarn start >  /dev/null 2>&1 &

exit
