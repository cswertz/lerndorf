#!/bin/bash


if [ "$MODE" == "client" ]; then
  /wait && cd /client && npm run start
else
  /wait && cd /server && npm run start
fi
