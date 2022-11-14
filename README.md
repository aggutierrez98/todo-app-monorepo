# Todo App

[![Deplyment Pipeline](https://github.com/aggutierrez98/todo-app-monorepo/actions/workflows/pipeline.yml/badge.svg)](https://github.com/aggutierrez98/todo-app-monorepo/actions/workflows/pipeline.yml)

This repository is a monorepo that contains both front-end and back-end directory whose dependencies are shared with the main directory.
The main directory has Prettier, Eslint and Husky configurations

## Made with

React, Node, MongoDB, Mongoose, Vite, Tailwind, React-hook-form, React-query and Cypress

### Made by: Agustin Gutierrez

## In this app you can add, edit, delete, do and undo todos

## Scripts

```json
"scripts": {
    "lint": "eslint ./api ./app --fix",
    "prettier": "prettier --write .",
    "prepare": "husky install",
    "dev:api": "npm run build && npm run dev -w api",
    "dev:app": "npm run dev -w app",
    "build": "npm run build -w app",
    "start": "npm run start -w api",
    "cypress": "npm run cypress:open -w app",
    "start-test": "npm run test -w api",
    "test:e2e": "npm run test:e2e -w app"
  },
```

## Installation & Set Up

1. Install project dependecies

   ```sh
   npm install
   ```

2. Start the client development server

   ```sh
   npm dev:app
   ```

3. Start the api development server

   ```sh
   npm dev:api
   ```

4. Start the client development server

   ```sh
   npm dev:app
   ```

## For automated testing

1. Prepare and start server for testing

   ```sh
   npm run start-test
   ```

2. Run tests with cypress

   ```sh
   npm run cypress
   ```

3. If you want headless tests

   ```sh
   npm run test:e2e
   ```

## Deployment

Deployment is automated with Github Actions in a general monorepo deployment pipeline.

### Demo

[Todo App](https://todo-app-aggutierrez.herokuapp.com)
