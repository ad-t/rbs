# Revue Booking System (RBS)
[![Build Status](https://travis-ci.com/ad-t/rbs.svg?token=abdenR5omSSKhjLTgyN7&branch=master)](https://travis-ci.com/ad-t/rbs)

## .env
Required fields:
```
SERVER_PORT
NODE_ENV
MYSQL_USER
MYSQL_PASSWD
MYSQL_DATABASE
```

For PayPal:

```
PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET
```

For Square:

```
SQUARE_ACCESS_TOKEN
SQUARE_LOC_ID
```

Example for development:
```
SERVER_PORT=8080
NODE_ENV=development
MYSQL_USER=test
MYSQL_PASSWD=test
MYSQL_DATABASE=rbs_test
(insert PayPal/Square details as necessary)
```

## To set up local instance
Need to install:

 * MySQL/MariaDB
 * Node.js
 * Yarn
 * `entr`

Once you've done that, set up a new MySQL database for RBS and create a `.env`
file with the respective details in this directory.

Following that:

```
yarn install
yarn build
yarn serve
yarn test
```

