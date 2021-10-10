# ClockworkBack

The server side for a web app that allows you to track your habits.
(link)[]

## Installation & Usage

### Installation
 
 - Clone or download the repo.
 - Navigate to the `ClockworkBack` directory.
 
 ### Usage

 `bash _scripts/startDev.sh`
 - starts api & db services
 - runs db
 - seeds db for development
 - serves api on localhost:3000

 `bash _scripts/startTest.sh`
 - starts api & db services
 - runs db
 - attaches to api container and triggers a full test run

 `bash _scripts/startCoverage.sh`
 - starts api & db services
 - runs db
 - attaches to api container and triggers a full test run showing the coverage

 `bash _scripts/teardown.sh`
 - stops all running services
 - removes containers
 - removes volumes
 - removes images

 ## Technologies

 - JavaScript
 - Express
 - Cors
 - Bcryptjs
 - JWT
 - Jest
 - Supertest
 - Dotenv
 - PostgreSQL

 ## Process

 - Created basic structure of server and database
 - Added docker-compose files to run the server in a container
 - Created tests for all endpoints, models and controllers
 - Edited controllers to have more functions for routes
 - Deployed back end to heroku (https://clockworkback.herokuapp.com/)[https://clockworkback.herokuapp.com/]

## Wins & Challenges

### Wins

- Managed to get JWT to work and implemented it in every route
- All CRUD functions working 
- Getting tests to work

### Challenges

- Deploying to heroku with docker - changed to deploying directly with PostgreSQL
- Understanding how JWT works
- Understanding how to mock modules and functions for unit and integration testing