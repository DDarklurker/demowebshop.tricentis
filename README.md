# Demo Web Shop Automation Project

This repository contains an automated testing framework for the [Demo Web Shop](https://demowebshop.tricentis.com/) website. It is built using **Playwright** and **TypeScript**, following modern software engineering practices.

## 🚀 Project Overview

The goal of this project is to provide reliable and scalable end-to-end tests for the main functionalities of the e-commerce platform, such as user registration, authorization, and shopping cart management.

## 🛠 Tech Stack

- **Framework:** [Playwright](https://playwright.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Data Generation:** [Faker.js](https://fakerjs.dev/)
- **Design Pattern:** Page Object Model (POM) with Component-based architecture.

## 📁 Project Structure

- `src/pages/`: Page objects representing different pages of the application.
- `src/components/`: Reusable components (Header, Search, Catalog, etc.).
- `src/fixture/`: Custom Playwright fixtures for easy test setup.
- `tests/`: Test suites organized by functionality (Authorization, Card).
- `setup/`: Global setup configurations.

## ⚙️ How to run tests locally

As the first step you need to install dependencies and browsers

```npm
npm install
npx playwright install
```

Install library for env

```npm
npm install dotenv
```

Run all the tests

```npm 
npm test
```
