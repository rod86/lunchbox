Lunchbox
========

Application to find street food in London. 

The frontend is built with React and Redux and the backend is a Node API with MongoDB.

## Requirements

- Node v8.10.0
- Npm v6.4.0
- MongoDB v3.6


## Setup

- You need to install Node, npm and MongoDB to run this project.

- Clone this repository

- Run in the shell

```
    # Go to project
    $ cd lunchbox

    # Install node dependencies in client and server
    $ npm install

    # Import data fixtures in MongoDB
    $ npm run seed --prefix server
```


### Run server tests

```
    # Load data fixtures and run tests in server
    $ npm run seed --prefix server && npm test --prefix server
```


### Start in development environment

```
    # Start development servers in server and client
    $ npm start
```

- Open browser in http://localhost:3000/.


### Start in production environment

```
    # Build client
    $ npm run build

    # Start production server
    $ npm run start:production
```

- Open browser in http://localhost:5000/.