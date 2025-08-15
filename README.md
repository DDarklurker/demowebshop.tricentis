# demowebshop.tricentis

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
npx playwright test
```

Run autorization test case

```npm
npx playwright test tests/tests/login.spec.ts
```
create env with valid user 
```
LOGIN
PASSWORD
```