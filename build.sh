#!/bin/bash
cd client
yarn install
yarn build

cp -r build/ ../server/server/public
cd ..

cd server
yarn install
