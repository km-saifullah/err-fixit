# err-fixit

<p align="center">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MERN-3C873A?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Error%20Handling-FF5733?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-0052CC?style=for-the-badge&logo=postman&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/Open%20Source-0078D4?style=for-the-badge&logo=opensourceinitiative&logoColor=white" />
</p>

## Overview

`err-fixit` is a lightweight and efficient npm package for handling various types of errors in a MERN stack application. It provides structured error responses for MongoDB, Express and general application errors. This package is designed to work seamlessly with both CommonJS and ES Modules.

## Features

- Handles duplicate key errors from MongoDB
- Handles Mongoose validation errors
- Handles cast errors (invalid ObjectId and so on)
- Provides a structured response with a `status: false` field
- Supports both CommonJS (`require`) and ES Modules (`import`)

## Installation

To install the package run:

```sh
npm install error-handler
```

## Usage

### 1. Import the package

#### CommonJS (require)

```js
const { errorHandler } = require("error-handler");
```

#### ES Module (import)

```js
import { errorHandler } from "error-handler";
```

### 2. Use in Express Middleware

```js
const express = require("express");
const { errorHandler } = require("error-handler");

const app = express();

app.use((err, req, res, next) => {
  const errorResponse = errorHandler(err);
  return res.status(errorResponse.errorCode || 500).json(errorResponse);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## Error Handling Details

### Duplicate Key Error (MongoDB)

If a duplicate key error occurs (e.g. a unique field constraint violation) the package will return:

```json
{
  "status": false,
  "message": "'email' must be unique",
  "field": "email",
  "errorCode": 11000
}
```

### Cast Error (Invalid ObjectId)

If an invalid ObjectId is used in a MongoDB query, the package will return:

```json
{
  "status": false,
  "message": "invalid value provided for field '_id'",
  "field": "_id",
  "errorCode": 400
}
```

### Validation Error

If Mongoose validation fails, the package will return:

```json
{
  "status": false,
  "message": "validation failed",
  "errors": [
    {
      "field": "email",
      "message": "email is required"
    }
  ],
  "errorCode": 400
}
```

### Unknown Errors

If an unknown error occurs, the package provides a general response:

```json
{
  "status": false,
  "message": "an unknown error occurred",
  "errorCode": 500
}
```

## License

This package is released under the [MIT](https://mit-license.org/) License.

## Author

Created by [Khaled Md Saifullah](https://github.com/km-saifullah)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue on GitHub.
