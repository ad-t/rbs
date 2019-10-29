#!/bin/sh

# install dependencies
yarn install

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
