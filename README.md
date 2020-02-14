# **Mock Shop**

Mock Shop is a simple shopping server.

## Heroku Build

#### Endpoints

> - [Heroku](https://mock-shop-1.herokuapp.com/)

#### Documentation

> - [Swagger UI](https://mock-shop-1.herokuapp.com/docs)

## Features

>

#### Users

- - User can Sign Up.
- - User can Sign in.
- - Users can vew all products.
- - Users can add product to a Cart.
- - A user can see product in his/her cart.
- - User can delete a product from his/her cart.

#### Admins

- - Admin can vew all products.
- - Admin can add a Product.
- - Admin can delete a Product.
- - Admin can edit a Product.

## Tools

- Server side Framework: **_Nodejs/Express_**
- Linting: **_ESLint_**
- Style Guide: **_Airbnb_**
- Testing: **_Mocha Chai_**
- DB: **_Postgres_**
- Documentation: **_Swagger_**
- Hosting: **_Heroku_**

## Installation

- To get the application running follow this steps:

* Install NodeJs on your local machine
* Clone the repository \$ git clone https://github.com/conquext/mock-shop.git
* Install npm dependencies by running npm install

* Then set the env environment variable according to the .env.sample attached

## Stand out

1. Thorough Swagger Documentation.
2. Design a simple user interface with a React framework to comsume the API
3. implement `Sequelize` ORM for postgres.

## Guide

### API End Points

| METHOD |              DESCRIPTION              |                                               ENDPOINTS |          ACCESS |
| ------ | :-----------------------------------: | ------------------------------------------------------: | --------------: |
| POST   |         `/api/v1/auth/signup`         |                                     Register a new user |    Public / All |
| POST   |         `/api/v1/auth/login`          |                                          Sign in a user |    Public / All |
| POST   |         `/api/v1/auth/google`         |                                     Sign in with google |    Public / All |
| POST   |         `/api/v1/auth/forgot`         |                     Generate a new password reset token |    Public / All |
| POST   |         `/api/v1/auth/reset`          |                                     Reset user password |    Public / All |
| POST   |          `/api/v1/products`           |                            Create a new product listing | Private / Admin |
| GET    |          `/api/v1/products`           |                             Return all product listings |   Private / All |
| GET    |     `/api/v1/products/:productId`     |                               Return a specific product |   Private / All |
| PATCH  |     `/api/v1/products/:productId`     |                                Update a product listing | Private / Admin |
| DELETE |     `/api/v1/products/:productId`     |                                Delete a product listing | Private / Admin |
| POST   |     `/api/v1/users/:userId/carts`     |                Add a new cart item to user userID carts |  Private / User |
| DELETE | `/api/v1/users/:userId/carts/:cartId` | Delete a cart item with specified cartId of user userId |  Private / User |
| GET    |     `/api/v1/users/:userId/carts`     |     Return all cart items of user with specified userId |  Private / User |
| GET    | `/api/v1/users/:userId/carts/:cartId` |   Return cart item with specified cartId of user userId |  Private / User |

### API Specifications

The API endpoints should respond with a JSON object specifying the HTTP **_status_** code, and either a **_data_** property (on success) or an **_error_** property (on failure).

```javascript
// Sucess
{
  "status": 'success',
  "data": {...}
}

// Failure
{
  "status": 'error',
  "error": 'endpoint-error-message'
}
```

### Data Specifications

```javascript
// user
{
  "id": INTEGER,
  "firstName": STRING,
  "lastName": STRING,
  "email": STRING,
  "password": STRING,
  "isAdmin": BOOLEAN,
}

// product
{
  "id": INTEGER,
  "name": STRING,
  "description": STRING,
  "category": STRING, // clothes, electronics, book
  "price": FLOAT,
  "imageUrl": STRING,
  "inStock": BOOLEAN,
}

// cart
{
  "id": INTEGER,
  "productId": INTEGER, //association with product.id
  "userId": INTEGER, //association with user.id
}
```

## Connect

> I am on twitter [![Twitter](https://img.icons8.com/color/50/000000/twitter.png)](www.twitter.com/rash3ye)
>
> And also Instagram [![Instagram](https://img.icons8.com/color/48/000000/instagram-new.png)](https://www.instagram.com/thexxplanet)
