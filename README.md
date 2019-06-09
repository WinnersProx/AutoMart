## AUTOMART PROJECT API

[![Coverage Status](https://coveralls.io/repos/github/WinnersProx/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/WinnersProx/AutoMart?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/b757ade85df2231ebb64/maintainability)](https://codeclimate.com/github/WinnersProx/AutoMart/maintainability)

 A market place for both selling and buying automobiles for solving multiple issues that face dealers and buyers at the market (Our sight is to serve you with the best quality of services).

## Documentation
Comprehensive documentation for the API is hosted [here](https://winner1.docs.apiary.io/#reference).

## Deployment
This app his hosted on heroku [here](https://winners-automart.herokuapp.com)

## Features
- Users can sign up or register.
- Users can sign in or log in.
- Users can create a car sale ad.
- Users can create a purchase order.
- Users can update the price of a purchase order. only if the order’s status is still pending.

- Users can mark their posted car ad as sold (If they're the owners)
- Users can update the price of their posted car ad (If they're the owners)
- Users can view a specific car
- Users can view all unsold cars
- Users can view all unsold cars within a price range (considering min and max value)
- Users can delete a specific car Ad ( Obviously if they're owners or admins)
- Users can view all posted ads whether sold or available.
- Users can flag or report a posted AD as fraudulent.
- Users can view all unsold cars of a specific make or manufacturer
- Users view all unsold cars of a specific make or manufacturer.
- Users can view all unsold cars of a specific make or manufacturer.
- Users can view all cars of a specific body type.
- Admins can both see any car add and delete it

## Tools
Tools used for development of this API are;
- Documentation : [Swagger](https://swagger.io/)
- Framework: [ExpressJS](http://expressjs.com/)
- Code Editor/IDE: [VSCode](https://code.visualstudio.com)
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- API Testing environment: [Postman](https://www.getpostman.com)

## Getting Started
1. Clone the github repository [here](https://github.com/WinnersProx/AutoMart), 

2. Install all the dependencies by running the following command in your command line interface

```sh
    $ npm install
```
3. Once you're done making sure that everything is up-to-date start the API server by running the following command in your command line interface:
```sh
    $ npm start
```

## Asserts or tests

To run the tests and make sure that all api endpoints are working perfectly just type in your command line interface the following commands :
```sh
   $ npm test 
 ``` 
if the stated commands are not succesful try to install all the development dependencies to fix it

#Learning resources
- (http://dsernst.com/2015/09/02/node-mocha-travis-istanbul-coveralls-unit-tests-coverage-for-your-open-source-project/)

# Contributor
- Bihame Sikubwabo Vainqueur