#!/bin/sh

# install dependencies
yarn install

# create a dotenv file that interacts with the travis ci instance of mysql
echo "
MYSQL_DATABASE=travis_ci_rbs
MYSQL_USER=travis
MYSQL_PASSWD=
NODE_ENV=development
SERVER_PORT=8080
EOF 
" > .env

# check if it builds correctly
yarn build

if [ $? -ne 0 ]
then
  echo "Build failed"
  exit
fi

# start serving
yarn serve &

# wait for some time for the server to start
sleep 10

# run the tests
yarn ci_test

# once complete, clean up the running server
killall yarn
