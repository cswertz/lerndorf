#!/usr/bin/bash -i

source /home/$USER/.bashrc

# export NODE_ENV=test
# export NODE_ENV=development
# export NODE_ENV=production
export NODE_ENV=production_mysql
export SERVER_PORT=3000

# ADJUST TO YOUR PATH
cd /[YOURPATH]/server
exec yarn start 

exit
