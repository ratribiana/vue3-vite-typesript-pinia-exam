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

Clone the repo:

```bash
$ git clone --depth 1 git@github.com:ratribiana/vue3-vite-typesript-pinia-exam.git
$ cd vue3-vite-typesript-pinia-exam
```

Go to the backend directory and install the dependencies:

```bash
$ cd backend
$ yarn install or npm install
```
Note: Disregard the error in husky (postinstall), that will run after the full install is finish. It is used for linting commit messages, running tests, linting code, etc... when commiting or pushing code to repo

Go to the frontend directory and install the dependencies: 

```bash
$ cd frontend
$ yarn install or npm install
```

## Project Setup/Configuration

Make sure to copy the `.env.example`/`.env-example` or rename them to `.env.development` in each sub directories (backend/frontend).
Note: Env files are not suppose to push in repo but for this case I used `.env.example` and `.env-example` to put the database and mail service credentials

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

## Once you are setup, you can use these credentials or you can register your own user. The backend API will send you the OTP directly to your email

```bash
$ test3@mailinator.com
$ P@ssw0rd01
```