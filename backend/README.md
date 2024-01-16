<h1 align="center">
  TypeScript + Express + Mongoose + MongoDB Exam
</h1>

<h4 align="center">🚀 Express RESTful API with TypeScript and Mongoose Exam</h4>

<br />

## Introduction

## Best Practices Applied
1. Project Structure
2. Error Handling
3. Code Style (ESLint & Prettier)
4. Testing (E2E Testing and Unit Testing)

## Features

- **TypeScript:** for static typing, enhanced code maintainability, and better developer tooling.
- **Express:** Node JS framework.
- **Mongoose:** MongoDB object modeling library.

- **Error Handling:** Implemented a centralized error handling and consistent error responses across your application.
- **Linting and Formatting:** Maintain clean and consistent code with ESLint and Prettier as Code Style Practices.
- **Unit Testing with Jest:** Unit testing framework.
- **E2E Testing with chai:** End-to-end testing framework.

- **Environment Configuration:** Manage application's configuration using environment variables with the help of the dotenv library.
- **Process Management:** Used PM2 or Nodemon for process management and automatic application restarts during development and production.
- **SWC Compiler:** Utilized SWC compiler for faster TypeScript compilation and improved performance.

- **Docker Integration:** Containerized the application and let you test, deploy, and scale your application into any environment.
- **API Documentation using Swagger and Swagger UI:** Generate API documentation effortlessly.


## ⚒ How to Install

Go to the backend directory and install the dependencies:

```bash
$ cd backend
$ yarn install or npm install
```
## Project Setup/Configuration

Before starting the project, make sure to set up the database credentials in the `.env.development` file. Check the contents of  `.env-example` for reference

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests

```sh
yarn test
```

### To add seed data directly to database just follow this format

```sh
yarn seed ${model} <number> [type(optional)] [role(optional)]
yarn seed roles 1 newrole NewRole
yarn seed users 1 users users
```

### To clear and clean the test users

```sh
yarn clearDB
```


