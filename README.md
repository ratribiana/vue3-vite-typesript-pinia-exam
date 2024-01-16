# Vue3 Vite Pinia Exam

Frontend
Vue3 + Typescript + Vite + Pinia + Vue Router

Backend
TypeScript + Express + Mongoose + MongoDB

## 😎 Introduction

I created a backend API made with NodeJs Express Typescript and use a dummy/public API in frontend.
Basically the users are created in mongodb database (MongoDB Atlas) and the backend API is fetching the user from the public API and return the user info and token in login.

What I am showcasing here is a can create a full-stack application with different tooling, environments and testing while I can integrate third-party APIs and microservices.

Note: Please Read README.md inside subdirectories for best practices and features

## ⚒ How to Install

Go to the backend directory and install the dependencies:

```bash
$ cd backend
$ yarn install or npm install
```

Go to the frontend directory and install the dependencies: 

```bash
$ cd frontend
$ yarn install or npm install
```

## Project Setup/Configuration

Make sure to copy the `.env.example`/`.env-example` to `.env.development` and fill in the values.

## Run the BACKEND

### Compile and Hot-Reload for Development

```bash
$ cd backend
$ yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests

```sh
yarn test
```

### To add seed data directly to database just follow this format ()

```sh
yarn seed ${model} <number> [type(optional)] [role(optional)]
yarn seed roles 1 newrole NewRole
yarn seed users 1 users users
```

### To clear and clean the test users

```sh
yarn clearDB
```

## Run the FRONTEND

### Compile and Hot-Reload for Development

```bash
$ cd frontend
$ yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```