# Vue3 Vite Pinia Exam

Vue3 + Vite + Pinia + Vue router

## Comes with

- [Vue Router](https://router.vuejs.org) for routing
- [Pinia](https://pinia.vuejs.org) for state management
- [Google Analytics](https://github.com/MatteoGabriele/vue-gtag) for analytics
- [TailwindCSS](https://tailwindcss.com/) Utility first for CSS Framework
- [Vitest](https://vitest.dev/) as testing framework
- [@vue/test-utils](https://test-utils.vuejs.org/) - Vue testing suite for Vue.js 3
- [Cypress](https://www.cypress.io/) for frontend test automation tool for regression testing, javascript component testing and E2E testing of web applications

## Best Practices Applied
1. Project Structure
2. Code Style (ESLint & Prettier)
3. Testing (E2E Testing and Unit Testing)

## Features

- Used Vite for frontend tooling
- Highly performant and flexible
- Tested with some Unit and E2E tests
- Supports Dark Mode
- Written with Composition API in Vue3 and Typescript
- Support for Pinia with Vue Router and Axios
- Includes a Dev-Container for development in a Docker environment (optional)
- All API calls in a single file for easy customization (the Auth Store)
- Global event bus for easy communication with things like Analytics services
- Page analytics
- VSCode launch configuration so you can use breakpoints in your debugging

### Continuous Integration and Continuous Deployment

- Env file support
- Github Actions for CI to run unit and end-to-end tests
- Netlify TOML file for easy deployment on Netlify
- CI validation for missing translation keys
- Pre-push (or pre-commit if you want) hooks for linting and testing right before pushing
- Secrets leak detection during lint process

## Project Setup/Configuration

This Frontend is actively tested with and recommends using Node 20.10.x

## ⚒ How to Install

```bash
$ cd frontend
$ yarn install or npm install
```

Make sure to copy the `.env.example` to `.env.development` or `.env.local` and fill in the values.

### Compile and Hot-Reload for Development

```sh
yarn dev
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